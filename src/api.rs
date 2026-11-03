//! HTTP API used by the browser UI.

use crate::levels::{Book, Kind, Level, World};
use crate::progress::{Completion, Progress, RANKS, Settings, today};
use crate::runner;
use crate::teacher::{self, Mode};
use axum::body::Body;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{Json, Router};
use serde::Deserialize;
use serde_json::{Value, json};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};
use tokio_stream::StreamExt;
use tokio_stream::wrappers::ReceiverStream;

pub const REVIEW_BONUS_XP: u32 = 15;
const EFFORTS: &[&str] = &["low", "medium", "high", "xhigh", "max"];

pub struct AppState {
    /// Where progress and scratch files live (`save/`, or `FERRIS_SAVE_DIR`).
    pub save_dir: PathBuf,
    pub worlds: Vec<World>,
    pub book: Book,
    pub progress: Mutex<Progress>,
    pub usage: Arc<Mutex<Option<Value>>>,
    /// Set when the last save failed (shown in the game), cleared when a save works again.
    pub save_error: Mutex<Option<String>>,
    /// A one-time message from startup, e.g. that a damaged save was backed up.
    pub notice: Mutex<Option<String>>,
    /// The compiler's version ("1.99.0"), shown on the sign on the title screen.
    pub rustc: Option<String>,
}

type Shared = Arc<AppState>;

impl AppState {
    fn save_path(&self) -> PathBuf {
        self.save_dir.join("progress.json")
    }
    fn work_dir(&self) -> PathBuf {
        self.save_dir.join("tmp")
    }
    fn ferris_dir(&self) -> PathBuf {
        self.save_dir.join("ferris")
    }
    fn save(&self, progress: &Progress) {
        let result = progress.save(&self.save_path());
        if let Err(e) = &result {
            eprintln!("⚠ Saving failed: {e}");
        }
        *self.save_error.lock().unwrap() = result.err();
    }
    fn level(&self, id: &str) -> Result<(&World, usize, &Level), ApiError> {
        World::find(&self.worlds, id)
            .ok_or(ApiError(StatusCode::NOT_FOUND, format!("no level {id}")))
    }

    /// Find a level the player is allowed to play right now.
    fn playable(&self, id: &str) -> Result<(&World, usize, &Level), ApiError> {
        let (world, li, level) = self.level(id)?;
        let wi = self
            .worlds
            .iter()
            .position(|w| w.id == world.id)
            .unwrap_or(0);
        let p = self.progress.lock().unwrap();
        if !self.level_unlocked(&p, wi, li) && !p.is_done(id) {
            return Err(ApiError(
                StatusCode::FORBIDDEN,
                "That level is still locked.".into(),
            ));
        }
        Ok((world, li, level))
    }

    fn world_unlocked(&self, p: &Progress, idx: usize) -> bool {
        idx == 0
            || self.worlds[idx - 1]
                .levels
                .last()
                .is_some_and(|l| p.has_reached(&l.id))
    }

    fn level_unlocked(&self, p: &Progress, world_idx: usize, level_idx: usize) -> bool {
        self.world_unlocked(p, world_idx)
            && (level_idx == 0 || p.has_reached(&self.worlds[world_idx].levels[level_idx - 1].id))
    }

    /// The first unfinished level that is open to play.
    fn next_level(&self, p: &Progress) -> Option<String> {
        for (wi, w) in self.worlds.iter().enumerate() {
            for (li, l) in w.levels.iter().enumerate() {
                if !p.is_done(&l.id) && self.level_unlocked(p, wi, li) {
                    return Some(l.id.clone());
                }
            }
        }
        None
    }

    fn level_after(&self, id: &str) -> Option<String> {
        let all: Vec<&Level> = self.worlds.iter().flat_map(|w| &w.levels).collect();
        let i = all.iter().position(|l| l.id == id)?;
        all.get(i + 1).map(|l| l.id.clone())
    }

    /// Bonus XP for idiomatic code, once per finished level.
    fn award_review_bonus(&self, level_id: &str) -> bool {
        let mut p = self.progress.lock().unwrap();
        if !p.completed.contains_key(level_id) || !p.review_bonus.insert(level_id.to_string()) {
            return false;
        }
        p.xp += REVIEW_BONUS_XP;
        if let Some(c) = p.completed.get_mut(level_id) {
            c.xp += REVIEW_BONUS_XP;
        }
        self.save(&p);
        true
    }

    fn player(&self, p: &Progress) -> Value {
        let (rank, next) = p.rank();
        let total: usize = self.worlds.iter().map(|w| w.levels.len()).sum();
        json!({
            "name": p.name,
            "xp": p.xp,
            "rank": rank,
            "next_rank": next.map(|(xp, name)| json!({"xp": xp, "name": name})),
            "ranks": RANKS.iter().map(|(xp, name)| json!({"xp": xp, "name": name})).collect::<Vec<_>>(),
            "streak": p.streak(),
            "days": p.days_played.len(),
            "completed": p.completed.len(),
            "total_levels": total,
            "save_error": *self.save_error.lock().unwrap(),
        })
    }
}

pub struct ApiError(StatusCode, String);

/// The longest code the game accepts to save or run (far more than any level needs).
const MAX_CODE_BYTES: usize = 200_000;

fn check_code_size(code: &str) -> Result<(), ApiError> {
    if code.len() > MAX_CODE_BYTES {
        return Err(ApiError(
            StatusCode::PAYLOAD_TOO_LARGE,
            format!(
                "That's more than {} KB of code. Please keep it shorter.",
                MAX_CODE_BYTES / 1000
            ),
        ));
    }
    Ok(())
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        (self.0, Json(json!({ "error": self.1 }))).into_response()
    }
}

pub fn router(state: Shared) -> Router {
    Router::new()
        .route("/api/state", get(get_state))
        .route("/api/level/{id}", get(get_level))
        .route("/api/lesson/{id}", get(get_lesson))
        .route("/api/run", post(run_level))
        .route("/api/play", post(play))
        .route("/api/quiz", post(quiz))
        .route("/api/skip", post(skip))
        .route("/api/replay", post(replay))
        .route("/api/draft", post(save_draft))
        .route("/api/name", post(set_name))
        .route("/api/settings", post(set_settings))
        .route("/api/models", get(models))
        .route("/api/models/test", post(test_model))
        .route("/api/models/refresh", post(refresh_models))
        .route("/api/explain/{code}", get(explain))
        .route("/api/ferris", post(ferris))
        .route("/api/vim", get(crate::nvim::vim_ws))
        .with_state(state)
}

async fn get_state(State(s): State<Shared>) -> Json<Value> {
    let p = s.progress.lock().unwrap();
    let worlds: Vec<Value> = s
        .worlds
        .iter()
        .enumerate()
        .map(|(wi, w)| {
            let levels: Vec<Value> = w
                .levels
                .iter()
                .enumerate()
                .map(|(li, l)| {
                    let status = if p.completed.contains_key(&l.id) {
                        "done"
                    } else if p.skipped.contains(&l.id) {
                        "skipped"
                    } else if s.level_unlocked(&p, wi, li) {
                        "open"
                    } else {
                        "locked"
                    };
                    json!({
                        "id": l.id, "num": format!("{}.{}", w.id, li + 1),
                        "title": l.title, "kind": l.kind, "xp": l.xp, "status": status,
                        "earned": p.completed.get(&l.id).map(|c| c.xp),
                    })
                })
                .collect();
            let done = w.levels.iter().filter(|l| p.is_done(&l.id)).count();
            let planned: Vec<Value> = w
                .planned
                .iter()
                .map(|pl| json!({"title": pl.title, "kind": pl.kind, "about": pl.about, "book": s.book.labels(&pl.book)}))
                .collect();
            json!({
                "id": w.id, "name": w.name, "blurb": w.blurb, "tag": w.tag,
                "available": !w.levels.is_empty(),
                "unlocked": !w.levels.is_empty() && s.world_unlocked(&p, wi),
                "done": done, "levels": levels, "planned": planned,
                "chapters": world_chapters(&s.book, w),
            })
        })
        .collect();
    let codex: Vec<Value> = p
        .codex
        .iter()
        .map(|(code, e)| json!({"code": code, "count": e.count, "first_level": e.first_level}))
        .collect();
    Json(json!({
        "player": s.player(&p),
        "rustc": s.rustc,
        "settings": p.settings,
        "usage": *s.usage.lock().unwrap(),
        "worlds": worlds,
        "codex": codex,
        "next_level": s.next_level(&p),
        "notice": s.notice.lock().unwrap().take(),
    }))
}

/// The book chapters a world covers, e.g. ["Ch 4: Understanding Ownership"].
fn world_chapters(book: &Book, w: &World) -> Vec<String> {
    let mut chapters: Vec<String> = Vec::new();
    let ids = w
        .levels
        .iter()
        .flat_map(|l| &l.book)
        .chain(w.planned.iter().flat_map(|p| &p.book));
    for id in ids {
        let chapter = id.split('.').next().unwrap_or(id);
        let label = match book.get(chapter) {
            Some(s) if chapter.chars().all(|c| c.is_ascii_digit()) => {
                format!("Ch {chapter}: {}", s.title)
            }
            _ => "Appendices".to_string(),
        };
        if !chapters.contains(&label) {
            chapters.push(label);
        }
    }
    chapters
}

/// Book links for a level: id, title and URL of each section it teaches.
fn book_links(book: &Book, ids: &[String]) -> Vec<Value> {
    ids.iter()
        .filter_map(|id| book.get(id))
        .map(|sec| json!({"id": sec.id, "title": sec.title, "url": book.url(sec)}))
        .collect()
}

async fn get_level(
    State(s): State<Shared>,
    Path(id): Path<String>,
) -> Result<Json<Value>, ApiError> {
    let (world, li, level) = s.playable(&id)?;
    let p = s.progress.lock().unwrap();
    let done = p.completed.contains_key(&id);
    Ok(Json(json!({
        "id": level.id, "num": format!("{}.{}", world.id, li + 1),
        "title": level.title, "kind": level.kind, "goal": level.goal,
        "stdin": level.stdin, "args": level.args, "env": level.env, "files": level.files.keys().collect::<Vec<_>>(),
        "lesson": level.lesson, "c_compare": level.c_compare, "py_compare": level.py_compare,
        "starter": level.starter,
        "code": p.drafts.get(&id).cloned().unwrap_or_else(|| level.starter.clone()),
        "check": level.check, "expected_output": level.expected_output, "tests": level.tests,
        "choices": level.choices, "xp": level.xp,
        "hint_count": level.hints.len().max(3), "hint_tier": p.hint_tier.get(&id).copied().unwrap_or(0),
        "done": done, "skipped": p.skipped.contains(&id),
        "explanation": if done { level.explanation.clone() } else { String::new() },
        "world": {"id": world.id, "name": world.name},
        "index": li + 1, "count": world.levels.len(),
        "next_id": s.level_after(&id),
        "book": book_links(&s.book, &level.book),
    })))
}

/// The reading material for any level, even a locked one: no code, tests or answers.
async fn get_lesson(
    State(s): State<Shared>,
    Path(id): Path<String>,
) -> Result<Json<Value>, ApiError> {
    let (world, li, level) = s.level(&id)?;
    Ok(Json(json!({
        "id": level.id, "num": format!("{}.{}", world.id, li + 1),
        "title": level.title, "kind": level.kind, "goal": level.goal,
        "lesson": level.lesson, "c_compare": level.c_compare, "py_compare": level.py_compare,
        "book": book_links(&s.book, &level.book),
    })))
}

#[derive(Deserialize)]
struct CodeReq {
    id: String,
    code: String,
}

async fn run_level(
    State(s): State<Shared>,
    Json(req): Json<CodeReq>,
) -> Result<Json<Value>, ApiError> {
    check_code_size(&req.code)?;
    let (world, li, level) = s.playable(&req.id)?;
    if matches!(level.kind, Kind::Predict | Kind::Quiz) {
        return Err(ApiError(
            StatusCode::BAD_REQUEST,
            "Predict and quiz levels are answered, not run.".into(),
        ));
    }
    // Save the submitted code *before* compiling. Edits the player makes while it compiles
    // are autosaved afterwards and must win, so the result below never touches the draft.
    let generation = {
        let mut p = s.progress.lock().unwrap();
        p.drafts.insert(req.id.clone(), req.code.clone());
        s.save(&p);
        p.replays.get(&req.id).copied().unwrap_or(0)
    };
    let result = runner::check_level(level, &req.code, &s.work_dir()).await;

    let mut p = s.progress.lock().unwrap();
    // The level was replayed while this compiled: the run belongs to the old attempt,
    // so it must not clear (or count against) the fresh one.
    if p.replays.get(&req.id).copied().unwrap_or(0) != generation {
        return Ok(Json(json!({
            "result": result, "xp_gained": 0, "first_clear": false, "world_cleared": false,
            "stale": true, "player": s.player(&p), "next_id": s.level_after(&req.id),
        })));
    }
    p.days_played.insert(today());
    p.record_errors(&req.id, &result.error_codes);
    let first_clear = result.passed && !p.completed.contains_key(&req.id);
    let mut xp_gained = 0;
    if !p.completed.contains_key(&req.id) {
        *p.attempts.entry(req.id.clone()).or_default() += 1;
    }
    if first_clear {
        xp_gained = p.xp_for(&req.id, level.xp);
        p.xp += xp_gained;
        let completion = Completion {
            xp: xp_gained,
            hints_used: p.hint_tier.get(&req.id).copied().unwrap_or(0),
            attempts: p.attempts.get(&req.id).copied().unwrap_or(1),
        };
        p.completed.insert(req.id.clone(), completion);
        p.skipped.remove(&req.id);
        p.reached.insert(req.id.clone());
    }
    let world_cleared = first_clear && li + 1 == world.levels.len();
    s.save(&p);
    Ok(Json(json!({
        "result": result, "xp_gained": xp_gained, "first_clear": first_clear,
        "world_cleared": world_cleared, "player": s.player(&p), "next_id": s.level_after(&req.id),
    })))
}

#[derive(Deserialize)]
struct PlayReq {
    code: String,
    /// For a level's "Run it" button: give the program that level's input and files.
    #[serde(default)]
    id: Option<String>,
}

async fn play(State(s): State<Shared>, Json(req): Json<PlayReq>) -> Result<Json<Value>, ApiError> {
    check_code_size(&req.code)?;
    let setup = req
        .id
        .as_deref()
        .and_then(|id| s.level(id).ok())
        .map(|(_, _, l)| runner::Setup::from_level(l))
        .unwrap_or_default();
    Ok(Json(json!(
        runner::play(&req.code, &setup, &s.work_dir()).await
    )))
}

#[derive(Deserialize)]
struct QuizReq {
    id: String,
    choice: usize,
}

async fn quiz(State(s): State<Shared>, Json(req): Json<QuizReq>) -> Result<Json<Value>, ApiError> {
    let (world, li, level) = s.playable(&req.id)?;
    let correct = level.answer == Some(req.choice);
    let mut p = s.progress.lock().unwrap();
    p.days_played.insert(today());
    let mut xp_gained = 0;
    let first_clear = correct && !p.completed.contains_key(&req.id);
    if first_clear {
        let wrong = p.wrong_guesses.get(&req.id).copied().unwrap_or(0);
        let base = if wrong == 0 { level.xp } else { level.xp / 2 };
        xp_gained = p.xp_for(&req.id, base);
        p.xp += xp_gained;
        let completion = Completion {
            xp: xp_gained,
            hints_used: p.hint_tier.get(&req.id).copied().unwrap_or(0),
            attempts: wrong + 1,
        };
        p.completed.insert(req.id.clone(), completion);
        p.skipped.remove(&req.id);
        p.reached.insert(req.id.clone());
    } else if !correct && !p.completed.contains_key(&req.id) {
        *p.wrong_guesses.entry(req.id.clone()).or_default() += 1;
        *p.attempts.entry(req.id.clone()).or_default() += 1;
    }
    s.save(&p);
    Ok(Json(json!({
        "correct": correct,
        "explanation": if correct { level.explanation.clone() } else { String::new() },
        "xp_gained": xp_gained, "first_clear": first_clear,
        "world_cleared": first_clear && li + 1 == world.levels.len(),
        "player": s.player(&p), "next_id": s.level_after(&req.id),
    })))
}

#[derive(Deserialize)]
struct IdReq {
    id: String,
}

async fn skip(State(s): State<Shared>, Json(req): Json<IdReq>) -> Result<Json<Value>, ApiError> {
    let (_, _, level) = s.playable(&req.id)?;
    if level.kind == Kind::Boss {
        return Err(ApiError(
            StatusCode::BAD_REQUEST,
            "Bosses can't be skipped — you've got this!".into(),
        ));
    }
    let mut p = s.progress.lock().unwrap();
    if !p.completed.contains_key(&req.id) {
        p.skipped.insert(req.id.clone());
        p.reached.insert(req.id.clone());
    }
    s.save(&p);
    Ok(Json(json!({ "next_id": s.level_after(&req.id) })))
}

/// Play a level again from scratch (its XP is taken back and can be earned again).
async fn replay(State(s): State<Shared>, Json(req): Json<IdReq>) -> Result<Json<Value>, ApiError> {
    s.playable(&req.id)?;
    let mut p = s.progress.lock().unwrap();
    let xp_returned = p.replay(&req.id);
    s.save(&p);
    Ok(Json(
        json!({ "xp_returned": xp_returned, "player": s.player(&p) }),
    ))
}

/// Autosave. Fails loudly (500) when the save file can't be written, so the page can say so.
async fn save_draft(
    State(s): State<Shared>,
    Json(req): Json<CodeReq>,
) -> Result<StatusCode, ApiError> {
    // Only real levels get drafts, so the save file can't grow without bound.
    s.level(&req.id)?;
    check_code_size(&req.code)?;
    let mut p = s.progress.lock().unwrap();
    p.drafts.insert(req.id, req.code);
    s.save(&p);
    match s.save_error.lock().unwrap().clone() {
        Some(e) => Err(ApiError(
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Couldn't save: {e}"),
        )),
        None => Ok(StatusCode::NO_CONTENT),
    }
}

#[derive(Deserialize)]
struct NameReq {
    name: String,
}

async fn set_name(State(s): State<Shared>, Json(req): Json<NameReq>) -> StatusCode {
    let mut p = s.progress.lock().unwrap();
    p.name = req.name.trim().chars().take(24).collect();
    s.save(&p);
    StatusCode::NO_CONTENT
}

async fn set_settings(
    State(s): State<Shared>,
    Json(new): Json<Settings>,
) -> Result<Json<Settings>, ApiError> {
    if !EFFORTS.contains(&new.effort.as_str()) {
        return Err(ApiError(
            StatusCode::BAD_REQUEST,
            "unknown effort level".into(),
        ));
    }
    if !["claude_code", "offline"].contains(&new.teacher.as_str()) {
        return Err(ApiError(
            StatusCode::BAD_REQUEST,
            "unknown teacher mode".into(),
        ));
    }
    let model = new.model.trim();
    if model.is_empty()
        || model.len() > 80
        || !model
            .chars()
            .all(|c| c.is_ascii_alphanumeric() || "-_.[]".contains(c))
    {
        return Err(ApiError(
            StatusCode::BAD_REQUEST,
            "that doesn't look like a model name".into(),
        ));
    }
    let mut p = s.progress.lock().unwrap();
    p.settings = Settings {
        model: model.to_string(),
        ..new
    };
    s.save(&p);
    Ok(Json(p.settings.clone()))
}

/// The model cards. Each card is a Claude Code alias, which always means the newest model
/// in that family. The fallback name is only shown until Claude Code has told us which
/// model the alias really is (after a reply, a test, or "Check for new versions").
const MODEL_CARDS: &[(&str, &str, &str, &str)] = &[
    (
        "fable",
        "Claude Fable",
        "Wizard",
        "The most capable model. Deepest explanations, slowest replies, uses the most of your plan's limits.",
    ),
    (
        "opus",
        "Claude Opus",
        "Sage",
        "Excellent teacher. Thoughtful and clear — the recommended default.",
    ),
    (
        "sonnet",
        "Claude Sonnet",
        "Ranger",
        "Fast and smart. A great everyday choice that's lighter on your limits.",
    ),
    (
        "haiku",
        "Claude Haiku",
        "Sprite",
        "The quickest replies and the lightest on your limits. Best for quick hints.",
    ),
];

/// "claude-opus-5-5" -> "Claude Opus 5.5", "claude-haiku-4-5-20251001" -> "Claude Haiku 4.5".
fn model_name(id: &str) -> String {
    let (mut words, mut version) = (Vec::new(), Vec::new());
    for part in id.split(['-', '_']) {
        if part.chars().all(|c| c.is_ascii_digit()) {
            // Long numbers are release dates, not versions.
            if part.len() < 6 {
                version.push(part);
            }
        } else {
            let mut chars = part.chars();
            let first = chars.next().map(|c| c.to_ascii_uppercase());
            words.push(first.into_iter().chain(chars).collect::<String>());
        }
    }
    let name = words.join(" ");
    if version.is_empty() {
        name
    } else {
        format!("{name} {}", version.join("."))
    }
}

impl AppState {
    fn model_cards(&self) -> Value {
        let p = self.progress.lock().unwrap();
        MODEL_CARDS
            .iter()
            .map(|(alias, family, tag, blurb)| {
                let resolved = p.models.get(*alias);
                json!({
                    "id": alias, "tag": tag, "blurb": blurb,
                    "name": resolved.map(|m| model_name(m)).unwrap_or_else(|| family.to_string()),
                    "resolved": resolved,
                })
            })
            .collect()
    }

    /// Remember which model an alias turned out to be.
    fn note_model(&self, alias: &str, model: &str) {
        if !MODEL_CARDS.iter().any(|(a, ..)| *a == alias) || !model.starts_with("claude-") {
            return;
        }
        let mut p = self.progress.lock().unwrap();
        if p.models.get(alias).map(String::as_str) != Some(model) {
            p.models.insert(alias.to_string(), model.to_string());
            self.save(&p);
        }
    }
}

async fn models(State(s): State<Shared>) -> Json<Value> {
    Json(s.model_cards())
}

/// Ask every alias once (a tiny prompt each) to learn the newest model behind it.
async fn refresh_models(State(s): State<Shared>) -> Json<Value> {
    let mut checks = tokio::task::JoinSet::new();
    for (alias, ..) in MODEL_CARDS {
        let s = s.clone();
        checks.spawn(async move {
            let result = teacher::test_model(alias, "low", &s.ferris_dir(), &s.usage).await;
            (*alias, result)
        });
    }
    let mut errors = Vec::new();
    while let Some(Ok((alias, result))) = checks.join_next().await {
        match result {
            Ok((model, _)) => s.note_model(alias, &model),
            Err(e) => errors.push(json!({"id": alias, "error": e})),
        }
    }
    Json(json!({ "models": s.model_cards(), "errors": errors }))
}

#[derive(Deserialize)]
struct TestReq {
    model: String,
    effort: String,
}

async fn test_model(State(s): State<Shared>, Json(req): Json<TestReq>) -> Json<Value> {
    let effort = if EFFORTS.contains(&req.effort.as_str()) {
        req.effort.as_str()
    } else {
        "low"
    };
    match teacher::test_model(&req.model, effort, &s.ferris_dir(), &s.usage).await {
        Ok((model, reply)) => {
            s.note_model(&req.model, &model);
            Json(json!({"ok": true, "model": model, "reply": reply}))
        }
        Err(e) => Json(json!({"ok": false, "error": e})),
    }
}

async fn explain(Path(code): Path<String>) -> Json<Value> {
    Json(json!({ "code": code, "text": runner::explain(&code).await }))
}

#[derive(Deserialize)]
struct FerrisReq {
    id: String,
    mode: String,
    #[serde(default)]
    code: String,
    #[serde(default)]
    output: String,
    #[serde(default)]
    message: String,
    #[serde(default)]
    history: Vec<(String, String)>,
    #[serde(default)]
    choice: Option<usize>,
}

/// Streams Ferris' reply as newline-delimited JSON events.
async fn ferris(State(s): State<Shared>, Json(req): Json<FerrisReq>) -> Result<Response, ApiError> {
    check_code_size(&req.code)?;
    let (world, _, level) = s.playable(&req.id)?;
    let (world, level) = (world.clone(), level.clone());

    // Hints cost XP, so the server keeps track of the tier.
    let (mode, settings, profile) = {
        let mut p = s.progress.lock().unwrap();
        let tier = if req.mode == "hint" {
            let t = p.hint_tier.entry(req.id.clone()).or_default();
            *t = (*t + 1).min(3);
            *t
        } else {
            0
        };
        let mode = Mode::parse(&req.mode, tier)
            .ok_or(ApiError(StatusCode::BAD_REQUEST, "unknown mode".into()))?;
        s.save(&p);
        (mode, p.settings.clone(), p.learner_profile())
    };

    let (tx, rx) = tokio::sync::mpsc::channel::<Value>(512);
    let state = s.clone();
    tokio::spawn(async move {
        if let Mode::Hint(tier) = mode {
            let _ = tx.send(json!({"type": "hint_tier", "tier": tier})).await;
        }
        let ctx = teacher::Context {
            world: &world,
            level: &level,
            code: &req.code,
            output: &req.output,
            message: &req.message,
            history: &req.history,
            choice: req.choice,
            profile,
            book: state.book.labels(&level.book),
        };

        let reply = if settings.teacher == "offline" {
            Err(None)
        } else {
            let prompt = teacher::build_prompt(mode, &ctx);
            teacher::ask(
                prompt,
                &settings.model,
                &settings.effort,
                &state.ferris_dir(),
                &tx,
                &state.usage,
            )
            .await
            .map_err(Some)
        };

        match reply {
            Ok(teacher::Reply { text, model }) => {
                if let Some(m) = &model {
                    state.note_model(&settings.model, m);
                }
                if mode == Mode::Review
                    && verdict_is_idiomatic(&text)
                    && state.award_review_bonus(&level.id)
                {
                    let _ = tx
                        .send(json!({"type": "bonus", "xp": REVIEW_BONUS_XP}))
                        .await;
                }
            }
            Err(Some(message)) if message == teacher::CANCELLED => {}
            Err(err) => {
                if let Some(message) = err {
                    let _ = tx.send(json!({"type": "error", "message": message})).await;
                }
                let _ = tx.send(json!({"type": "offline"})).await;
                let text = offline_reply(mode, &ctx);
                let _ = tx.send(json!({"type": "delta", "text": text})).await;
            }
        }
        let _ = tx.send(json!({"type": "done"})).await;
    });

    let stream = ReceiverStream::new(rx).map(|v| Ok::<_, std::io::Error>(format!("{v}\n")));
    Ok(Response::builder()
        .header("content-type", "application/x-ndjson")
        .header("cache-control", "no-cache")
        .body(Body::from_stream(stream))
        .unwrap())
}

/// Reads the `VERDICT: idiomatic|improvable` line at the end of a code review.
fn verdict_is_idiomatic(text: &str) -> bool {
    text.rfind("VERDICT")
        .map(|i| text[i..].to_lowercase())
        .is_some_and(|rest| rest.contains("idiomatic") && !rest.contains("improvable"))
}

/// What Ferris says without Claude: built-in hints and error notes.
fn offline_reply(mode: Mode, ctx: &teacher::Context) -> String {
    let level = ctx.level;
    match mode {
        Mode::Hint(tier) => {
            let i = tier as usize - 1;
            match level.hints.get(i) {
                Some(h) => h.clone(),
                None if !level.solution.is_empty() => {
                    format!("這裡提供一種解法：\n```rust\n{}\n```", level.solution.trim())
                }
                None => level.hints.last().cloned().unwrap_or_else(|| "再慢慢讀一次關卡目標吧。🦀".into()),
            }
        }
        Mode::Explain => explain_offline(ctx.output),
        Mode::Review => {
            if level.solution.is_empty() {
                "做得好！🎉（目前是離線模式，所以這次沒辦法提供詳細檢視。）".into()
            } else {
                format!(
                    "做得好！🎉 目前是離線模式，先把你的程式和我的版本比較看看：\n```rust\n{}\n```",
                    level.solution.trim()
                )
            }
        }
        Mode::Chat => "我目前處於**離線模式**，沒辦法聊天。試試看提示（💡），或到設定 ⚙ 開啟我的大腦。".into(),
        Mode::Quiz => "還差一點！再逐行讀一次程式碼，想想看：*每個值由誰擁有？每一行又在什麼時候執行？* 然後再試一次。".into(),
    }
}

fn explain_offline(output: &str) -> String {
    const NOTES: &[(&str, &str)] = &[
        (
            "E0382",
            "**移動後仍使用值。** 值的所有權已移交給新擁有者，程式卻又使用舊名稱。在 C 中這可能造成釋放後使用；Rust 會在編譯時阻止。試試 `.clone()`，或之後學到的 `&` 借用。",
        ),
        (
            "E0384",
            "**對不可變變數再次賦值。** Rust 變數預設不能修改；若要修改，請寫成 `let mut x`。",
        ),
        (
            "E0308",
            "**型別不相符。** Rust 預期一種型別，實際卻得到另一種。檢查運算兩側的型別；也要留意函式結尾多出的 `;`，它會讓回傳值變成 `()`。",
        ),
        (
            "E0425",
            "**找不到名稱。** 你使用了此處不存在的變數或函式。檢查拼字和作用域：在 `{ }` 內宣告的名稱會在對應的 `}` 結束時失效。",
        ),
        (
            "E0423",
            "**預期是函式，卻遇到巨集。** `println!` 這類巨集名稱後面需要加上 `!`。",
        ),
        (
            "E0277",
            "**缺少 trait 實作。** 常見原因是混用了不同型別，例如 `i32 * f64`。Rust 不會自動轉換數字型別，請使用 `as f64`。",
        ),
        (
            "E0502",
            "**借用衝突。** 同一個值不能同時存在可變借用和不可變借用。",
        ),
        (
            "E0499",
            "**同時有兩個可變借用。** 同一時間只能有一個 `&mut`。",
        ),
        (
            "E0596",
            "**要可變借用的值沒有標成 `mut`。** 請在宣告變數時加上 `mut`。",
        ),
        (
            "E0599",
            "**沒有這個方法。** 這個型別沒有此名稱的方法。請檢查拼字和型別。",
        ),
    ];
    let mut out = String::from("目前是離線模式，不過我可以告訴你：\n\n");
    let mut found = false;
    for (code, note) in NOTES {
        if output.contains(&format!("[{code}]")) {
            out.push_str(&format!("- `{code}` — {note}\n"));
            found = true;
        }
    }
    if !found {
        let first = output
            .lines()
            .find(|l| l.starts_with("error") || l.contains("panicked") || l.contains("FAILED"))
            .unwrap_or("請逐行比對你的輸出和預期結果。");
        out.push_str(&format!("先從**第一個**問題開始：\n```\n{first}\n```\n`-->` 那一行會告訴你行號。"));
    }
    out
}

#[cfg(test)]
mod tests {
    use super::model_name;

    #[test]
    fn model_names_come_from_ids() {
        assert_eq!(model_name("claude-opus-5-5"), "Claude Opus 5.5");
        assert_eq!(model_name("claude-fable-5-1"), "Claude Fable 5.1");
        assert_eq!(model_name("claude-haiku-4-5-20251001"), "Claude Haiku 4.5");
        assert_eq!(model_name("claude-sonnet-6"), "Claude Sonnet 6");
    }

    use super::verdict_is_idiomatic;

    #[test]
    fn reads_the_review_verdict() {
        assert!(verdict_is_idiomatic("Nice!\n\nVERDICT: idiomatic"));
        assert!(verdict_is_idiomatic("Nice!\n---\n**VERDICT: idiomatic**"));
        assert!(!verdict_is_idiomatic("Close.\nVERDICT: improvable"));
        assert!(!verdict_is_idiomatic(
            "No verdict at all, but idiomatic code"
        ));
    }
}
