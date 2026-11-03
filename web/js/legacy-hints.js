// Maps saved English offline hints to their translated versions.
export const LEGACY_HINTS = {
  "2.1": {
    "Look at the types of the two branches of the `if`. Are they the same?": "看看 `if` 兩個分支的型別，它們相同嗎？",
    "One branch gives a string, the other a number. `status` can only have one type.": "一個分支回傳字串，另一個回傳數字。`status` 只能有一種型別。",
    "Change the `else` branch to `{ \"wounded\" }`.": "把 `else` 分支改成 `{ \"wounded\" }`。"
  },
  "2.2": {
    "Replace `todo!()` with an expression that uses `n`.": "把 `todo!()` 換成一個會用到 `n` 的運算式。",
    "The last expression in a function (without a `;`) is what it returns.": "函式最後一個沒有加 `;` 的運算式，就是它的回傳值。",
    "The body should be just `n * n`.": "函式本體只要寫 `n * n`。"
  },
  "2.3": {
    "The error says the function returns `()`. Where does a function's value come from?": "錯誤指出函式回傳了 `()`。函式的回傳值是從哪裡來的？",
    "A single character on line 2 is turning the expression into a statement.": "第 2 行有一個字元，讓運算式變成了陳述式。",
    "Remove the `;` after `n * 2`.": "移除 `n * 2` 後面的 `;`。"
  },
  "2.5": {
    "You'll need a running total that starts at 0 and changes inside the loop.": "你需要一個從 0 開始、並在迴圈中持續累加的總和變數。",
    "Make `let mut total = 0;`, loop with `for i in 1..=n`, add `i` each time, then return `total` as the last expression.": "先寫 `let mut total = 0;`，用 `for i in 1..=n` 迴圈，每次把 `i` 加進總和，最後以 `total` 作為函式的回傳值。"
  },
  "2.7": {
    "You need a step counter and a loop that keeps going while `n` isn't 1. Can `n` change if it's not `mut`?": "你需要步數計數器，以及一個在 `n` 不等於 1 時持續執行的迴圈。`n` 沒有標成 `mut` 的話可以改變嗎？",
    "Make the parameter `mut n: u64`, use `while n != 1`, and inside use `if n % 2 == 0` to pick the next value. Count each step.": "把參數設為 `mut n: u64`，使用 `while n != 1`，並在迴圈內用 `if n % 2 == 0` 決定下一個值。每次都要累計步數。"
  },
  "2.labels": {
    "Right now the loops keep going and find another pair later. How do you stop the outer loop from inside the inner one?": "目前迴圈會繼續跑，之後還會找到其他配對。要怎麼在內層迴圈中停止外層迴圈？",
    "Put a label like `'outer:` before the first `for`, then use `break 'outer;`.": "在第一個 `for` 前加上像 `'outer:` 這樣的標籤，再使用 `break 'outer;`。",
    "Write `'outer: for a in 1..=5 {` and replace the TODO with `break 'outer;`.": "寫上 `'outer: for a in 1..=5 {`，再把 TODO 換成 `break 'outer;`。"
  },
  "2.8": {
    "There are four cases. In which order should you check them so that 15 doesn't get caught as just \"Fizz\"?": "有四種情況。要按照什麼順序檢查，才不會讓 15 只被判定為「Fizz」？",
    "Use `if n % 15 == 0 { ... } else if n % 3 == 0 { ... } else if ...`. Each branch must produce a `String`: use `String::from(\"Fizz\")` for words and `n.to_string()` for the number.": "使用 `if n % 15 == 0 { ... } else if n % 3 == 0 { ... } else if ...`。每個分支都必須回傳 `String`：文字用 `String::from(\"Fizz\")`，數字則用 `n.to_string()`。"
  },
  "3.1": {
    "After line 3, who owns the `String`? Can `sword` still be used?": "第 3 行之後，這個 `String` 由誰擁有？還能繼續使用 `sword` 嗎？",
    "Ownership *moved* to `hero_item`. To keep `sword` usable, give `hero_item` its own copy of the text.": "所有權已*移動*到 `hero_item`。若想繼續使用 `sword`，就要讓 `hero_item` 擁有一份文字副本。",
    "Write `let hero_item = sword.clone();` on line 3.": "在第 3 行寫上 `let hero_item = sword.clone();`。"
  },
  "3.3": {
    "After the first `shout(battle_cry)`, who owns the text?": "第一次呼叫 `shout(battle_cry)` 之後，文字的所有權歸誰？",
    "The first call moves `battle_cry` into the function. Give the first call a copy, and let the last call take the original.": "第一次呼叫會把 `battle_cry` 移進函式。第一次呼叫時傳入副本，最後一次呼叫再傳入原本的值。",
    "Change line 7 to `shout(battle_cry.clone());`": "把第 7 行改成 `shout(battle_cry.clone());`。"
  },
  "3.4": {
    "The function doesn't exist yet. What should its parameter type and return type be?": "這個函式還不存在。它的參數型別和回傳型別應該是什麼？",
    "`fn add_star(mut s: String) -> String`: append with `push_str`, then return `s` as the last expression.": "函式簽章是 `fn add_star(mut s: String) -> String`：用 `push_str` 附加文字，最後讓 `s` 作為回傳值。"
  },
  "3.6": {
    "Read the note about the *previous iteration of loop*. What happens to `name` on the first pass?": "讀讀關於「*上一輪迴圈*」的提示。第一輪執行時，`name` 發生了什麼事？",
    "Each call to `greet` takes ownership. Give each call its own copy.": "每次呼叫 `greet` 都會取得所有權。請為每次呼叫各準備一份副本。",
    "Use `greet(name.clone())` inside the loop.": "在迴圈內使用 `greet(name.clone())`。"
  },
  "3.8": {
    "Compare the lengths with `.len()`. `if` is an expression, so it can be the whole body.": "用 `.len()` 比較長度。`if` 是運算式，因此可以直接當作整個函式本體。",
    "Return `b` only when it's strictly longer; otherwise return `a`.": "只有在 `b` 比 `a` 長時才回傳 `b`；否則回傳 `a`。"
  },
  "3.boxmove": {
    "After `open_chest(chest)`, who owns the chest?": "呼叫 `open_chest(chest)` 之後，箱子由誰擁有？",
    "Either give the function a copy, or read `chest.len()` before you hand it over.": "可以傳一份副本給函式，也可以在交出箱子前先讀取 `chest.len()`。",
    "Change the call to `open_chest(chest.clone())`.": "把呼叫改成 `open_chest(chest.clone())`。"
  },
  "3.9": {
    "Start with the compile error in `main`: which value is used after being moved? Then do the two functions.": "先看 `main` 中的編譯錯誤：哪個值移動後又被使用了？接著再完成兩個函式。",
    "`pick_up` needs a `mut` parameter so it can `push`. `count` should read `.len()` first, then return `(inventory, n)`. In `main`, give `pick_up` a clone of `sword`.": "`pick_up` 的參數需要加上 `mut` 才能呼叫 `push`。`count` 應先讀取 `.len()`，再回傳 `(inventory, n)`。在 `main` 裡，傳 `sword` 的副本給 `pick_up`。",
    "```rust\nfn pick_up(mut inventory: Vec<String>, item: String) -> Vec<String> {\n    inventory.push(item);\n    inventory\n}\n\nfn count(inventory: Vec<String>) -> (Vec<String>, usize) {\n    let n = inventory.len();\n    (inventory, n)\n}\n```\nAnd in `main`: `pick_up(inventory, sword.clone())`.": "```rust\nfn pick_up(mut inventory: Vec<String>, item: String) -> Vec<String> {\n    inventory.push(item);\n    inventory\n}\n\nfn count(inventory: Vec<String>) -> (Vec<String>, usize) {\n    let n = inventory.len();\n    (inventory, n)\n}\n```\n並在 `main` 中呼叫：`pick_up(inventory, sword.clone())`。"
  },
  "4.1": {
    "The function takes ownership of the word, so main can't print it afterwards. Could the function just borrow it?": "函式取得了字串的所有權，所以 `main` 之後無法再印出它。能不能讓函式只借用字串？",
    "Change the parameter type to a reference, and pass a reference at the call site.": "把參數型別改成參照，並在呼叫函式時傳入參照。",
    "`fn count_letters(word: &String)` and call it with `count_letters(&word)`.": "`fn count_letters(word: &String)`，呼叫時使用 `count_letters(&word)`。"
  },
  "4.3": {
    "The function wants to change the String, but it only got a read-only borrow.": "函式想修改 `String`，但目前拿到的只是唯讀借用。",
    "You need `&mut` in two places, and `mut` on the variable itself.": "有兩個地方需要加上 `&mut`，變數本身也要加上 `mut`。",
    "`fn add_star(name: &mut String)`, `let mut name = ...`, and `add_star(&mut name)`.": "`fn add_star(name: &mut String)`、`let mut name = ...`，並呼叫 `add_star(&mut name)`。"
  },
  "4.4": {
    "Two mutable borrows are alive at the same time. Can you finish with the first before making the second?": "目前同時存在兩個可變借用。能不能先用完第一個，再建立第二個？",
    "Move `*a += 5;` up, so `a` is done before `b` is created.": "把 `*a += 5;` 移到前面，讓 `a` 在建立 `b` 之前就結束使用。",
    "Order the lines: `let a = &mut score;` `*a += 5;` `let b = &mut score;` `*b += 5;`": "依序排列這幾行：`let a = &mut score;`、`*a += 5;`、`let b = &mut score;`、`*b += 5;`。"
  },
  "4.6": {
    "There are two real errors (and one thing that looks wrong but is fine). Start with E0507 on line 3.": "這裡有兩個真正的錯誤（還有一處看起來不對、實際上沒問題）。先處理第 3 行的 E0507。",
    "Line 3: borrow the name instead of moving it. Line 12: `biggest` is a reference into `scores`; copy the number out so `scores` is free to change.": "第 3 行：借用名稱，不要移動它。第 12 行：`biggest` 是指向 `scores` 的參照；把數字複製出來，`scores` 才能繼續修改。",
    "`let first = &names[0];` and `let biggest = *scores.iter().max().unwrap();`": "`let first = &names[0];`，並寫成 `let biggest = *scores.iter().max().unwrap();`。"
  },
  "4.7": {
    "Look at each byte until you find a space. What do you return then, and what if there's no space at all?": "逐一檢查位元組，直到找到空格。找到時要回傳什麼？如果完全沒有空格呢？",
    "Use `for (i, b) in s.bytes().enumerate()`. If `b == b' '`, return the slice before it. After the loop, the whole string is one word.": "使用 `for (i, b) in s.bytes().enumerate()`。如果 `b == b' '`，就回傳空格前的切片。迴圈結束後，整個字串就是一個單字。"
  },
  "4.8": {
    "Two cases: fewer than two items, or enough to cut off both ends.": "分成兩種情況：元素少於兩個，或足以去掉前後兩端。",
    "If `items.len() < 2` return `&[]`, otherwise slice from index 1 up to (not including) the last index.": "如果 `items.len() < 2`，就回傳 `&[]`；否則取從索引 1 開始、到最後一個索引之前為止的切片。"
  },
  "4.10": {
    "Start with count_words: `split_whitespace()` gives you the words. For longest_word, keep the best word so far in a variable.": "先完成 `count_words`：用 `split_whitespace()` 取得單字。`longest_word` 則用變數記住目前最長的單字。",
    "count_words: `.count()` the words. longest_word: start with `let mut best = \"\";` and replace it when a word is longer. shout: replace `*text` with the uppercase version, then push '!'.": "`count_words`：用 `.count()` 計算單字數。`longest_word`：先寫 `let mut best = \"\";`，遇到更長的單字就更新它。`shout`：把 `*text` 換成大寫版本，再附加 `!`。"
  },
  "5.1": {
    "The compiler can't find a type called `Crab`. You need to define it above main.": "編譯器找不到名為 `Crab` 的型別。你需要在 `main` 上方定義它。",
    "Write `struct Crab { ... }` with each field as `name: Type,`.": "寫出 `struct Crab { ... }`，每個欄位的格式都是 `name: Type,`。"
  },
  "5.3": {
    "First define `Feet` the same way `Meters` is defined.": "先比照 `Meters` 的寫法定義 `Feet`。",
    "Inside to_feet, read the number with `m.0`, multiply it, and wrap the result in `Feet(...)`.": "在 `to_feet` 裡用 `m.0` 取出數值、進行乘法，再用 `Feet(...)` 包住結果。",
    "`struct Feet(f64);` and the body `Feet(m.0 * 3.28084)`.": "宣告 `struct Feet(f64);`，函式本體回傳 `Feet(m.0 * 3.28084)`。"
  },
  "5.4": {
    "The compiler wants a lifetime for the `&str` field. Is there a simpler type for a name the Pet owns?": "編譯器要求 `&str` 欄位標註生命週期。若名稱由 Pet 自己擁有，有沒有更簡單的型別？",
    "Make the struct own its name.": "讓這個結構體擁有自己的名稱。",
    "Change the field to `name: String,`.": "把欄位改成 `name: String,`。"
  },
  "5.5": {
    "Two things to do: let the struct be printed with {:?}, and fill in area.": "要完成兩件事：讓結構體能用 `{:?}` 印出，並補上 `area` 函式。",
    "Put `#[derive(Debug)]` on the line above `struct Rectangle`, and multiply the two fields in area.": "在 `struct Rectangle` 上方加上 `#[derive(Debug)]`，並在 `area` 裡將兩個欄位相乘。",
    "`#[derive(Debug)]` above the struct, and `rect.width * rect.height` as area's body.": "在結構體上方加上 `#[derive(Debug)]`，並將 `rect.width * rect.height` 作為 `area` 函式本體。"
  },
  "5.6": {
    "Inside a method, the rectangle is `self`, so its fields are `self.width` and `self.height`.": "在方法中，這個矩形就是 `self`，所以欄位是 `self.width` 和 `self.height`。",
    "can_hold compares both sides of self with both sides of other. grow adds `by` to both fields.": "`can_hold` 要比較 `self` 和 `other` 的寬與高。`grow` 則把 `by` 加到兩個欄位。",
    "area: `self.width * self.height`. can_hold: `self.width > other.width && self.height > other.height`. grow: `self.width += by; self.height += by;`": "`area`：`self.width * self.height`。`can_hold`：`self.width > other.width && self.height > other.height`。`grow`：`self.width += by; self.height += by;`。"
  },
  "5.7": {
    "Each function builds and returns a new Rectangle.": "每個函式都會建立並回傳新的 `Rectangle`。",
    "In new, use field init shorthand: `Self { width, height }`. square can call `Self::new`.": "在 `new` 中使用欄位簡寫 `Self { width, height }`。`square` 可以呼叫 `Self::new`。",
    "`Self { width, height }` in new, and `Self::new(size, size)` in square.": "在 `new` 中使用 `Self { width, height }`，並在 `square` 中使用 `Self::new(size, size)`。"
  },
  "5.8": {
    "Do `new` and `describe` first, then the methods that change the hero (`&mut self`).": "先完成 `new` 和 `describe`，再處理會修改英雄狀態的方法（使用 `&mut self`）。",
    "new: `Self { name: name.to_string(), level: 1, hp: 10, max_hp: 10 }`. take_damage: `saturating_sub`. heal: add, then `.min(self.max_hp)`.": "`new`：回傳 `Self { name: name.to_string(), level: 1, hp: 10, max_hp: 10 }`。`take_damage`：使用 `saturating_sub`。`heal`：先相加，再用 `.min(self.max_hp)` 限制上限。"
  },
  "6.1": {
    "The compiler can't find `Shape`. Define it with the `enum` keyword above `area`.": "編譯器找不到 `Shape`。請在 `area` 上方用 `enum` 關鍵字定義它。",
    "Each variant is written like `Name(Type),` inside the braces.": "每個變體都要寫在大括號內，格式像 `Name(Type),`。"
  },
  "6.2": {
    "`spot` is an `Option<usize>`, not a number. What do you need to do before adding 1?": "`spot` 的型別是 `Option<usize>`，不是數字。要加 1 之前需要先做什麼？",
    "Get the number out of the Option. Here we know Ferris is on the beach.": "從 `Option` 取出數字。這裡我們確定 Ferris 就在海灘上。"
  },
  "6.3": {
    "Use `match coin { ... }` with one arm per coin.": "使用 `match coin { ... }`，並為每種硬幣寫一個分支。",
    "Each arm looks like `Coin::Penny => 1,`.": "每個分支的格式像 `Coin::Penny => 1,`。"
  },
  "6.5": {
    "The compiler says some numbers aren't covered. Which arm would handle 7?": "編譯器指出有些數字尚未處理。哪個分支可以處理 7？",
    "Add a last arm that matches anything else.": "在最後加上一個可以比對其他所有情況的分支。"
  },
  "6.6": {
    "`name.chars().next()` gives an `Option<char>`: Some(first letter), or None for an empty name.": "`name.chars().next()` 會回傳 `Option<char>`：有字時是 `Some(第一個字元)`，空字串則是 `None`。",
    "greet: `if let Some(n) = name { ... } else { ... }`. initial: `let Some(first) = name.chars().next() else { return '?'; };`": "`greet`：使用 `if let Some(n) = name { ... } else { ... }`。`initial`：使用 `let Some(first) = name.chars().next() else { return '?'; };`。"
  },
  "6.8": {
    "Match on the pair `(state, action)` and write one arm per rule, with a catch-all at the end.": "對 `(state, action)` 這個配對使用 `match`，每條規則各寫一個分支，最後再加上兜底分支。",
    "For Choose, match `(State::HasCoins(c), Action::Choose(snack))` and decide with an `if c >= 3` inside the arm. The last arm `(state, _) => state` keeps everything else unchanged.": "處理 Choose 時，比對 `(State::HasCoins(c), Action::Choose(snack))`，並在分支內用 `if c >= 3` 判斷。最後的 `(state, _) => state` 會讓其他情況維持原狀。"
  },
  "7.1": {
    "backpack: start with `let mut bag = Vec::new();`. safe_get: `items.get(i)` is an Option, so match on it.": "`backpack`：先寫 `let mut bag = Vec::new();`。`safe_get`：`items.get(i)` 會回傳 `Option`，因此要用 `match` 處理。",
    "Push each item with `bag.push(String::from(\"rope\"))`. In safe_get, `Some(item) => item.clone()` and `None => String::from(\"nothing\")`.": "用 `bag.push(String::from(\"rope\"))` 加入每個物品。`safe_get` 中，`Some(item)` 回傳 `item.clone()`，`None` 回傳 `String::from(\"nothing\")`。"
  },
  "7.2": {
    "`first` borrows from `v`, and it's still in use after the push.": "`first` 借用了 `v` 的內容，而且在 `push` 之後還會繼續使用。",
    "A number is cheap to copy. Do you need a reference at all?": "複製一個數字很方便。這裡真的需要參照嗎？",
    "`let first = v[0];` copies the 1 out, so `v` is free to change.": "`let first = v[0];` 會複製出 1，因此 `v` 就能繼續修改。"
  },
  "7.3": {
    "double_all needs to change each item through a mutable reference. total just reads.": "`double_all` 需要透過可變參照修改每個元素；`total` 則只需要讀取。",
    "In double_all: `for x in v.iter_mut() { *x *= 2; }`. In total, keep a running sum.": "在 `double_all` 中使用 `for x in v.iter_mut() { *x *= 2; }`。在 `total` 中逐步累加總和。"
  },
  "7.4": {
    "make_tag can be a single `format!`. exclaim adds text to the String it borrows.": "`make_tag` 可以只用一個 `format!`。`exclaim` 則在借用到的 `String` 後面加上文字。",
    "`format!(\"{} {} (lvl {})\", first, last, level)` and `s.push_str(\"!!\")`.": "使用 `format!(\"{} {} (lvl {})\", first, last, level)`，並呼叫 `s.push_str(\"!!\")`。",
    "make_tag: `format!(\"{} {} (lvl {})\", first, last, level)`. exclaim: `s.push_str(\"!!\");`": "`make_tag`：`format!(\"{} {} (lvl {})\", first, last, level)`。`exclaim`：`s.push_str(\"!!\");`。"
  },
  "7.6": {
    "prices: make a `HashMap::new()` and insert two entries. price_of: `.get(item)` gives an Option.": "`prices`：建立 `HashMap::new()` 並插入兩筆資料。`price_of`：`.get(item)` 會回傳 `Option`。",
    "`map.insert(String::from(\"apple\"), 3);` and `map.get(item).copied().unwrap_or(0)`.": "使用 `map.insert(String::from(\"apple\"), 3);` 和 `map.get(item).copied().unwrap_or(0)`。"
  },
  "7.7": {
    "Loop over `text.split_whitespace()`, and for each word, add one to its count.": "迴圈走訪 `text.split_whitespace()`，每遇到一個單字，就將它的計數加一。"
  },
  "7.9": {
    "Do add and names first, then average, then best_student (which can use the other two).": "先完成 `add` 和 `names`，接著完成 `average`，最後再寫可使用前兩者的 `best_student`。",
    "add: `self.scores.entry(name.to_string()).or_default().push(score)`. average: get the list (return None if missing), sum it, divide by the length as f64. best_student: walk the sorted names and keep the best average so far, only replacing it when a later one is strictly greater.": "`add`：使用 `self.scores.entry(name.to_string()).or_default().push(score)`。`average`：取得分數清單（不存在時回傳 `None`）、加總後除以轉成 `f64` 的筆數。`best_student`：依序檢查排序後的名字並記住目前最高平均，只有遇到更高的平均才更新。",
    "```rust\nfn names(&self) -> Vec<String> {\n    let mut names: Vec<String> = Vec::new();\n    for name in self.scores.keys() { names.push(name.clone()); }\n    names.sort();\n    names\n}\n```\nIn average, `let list = self.scores.get(name)?;` returns None early when the name is missing.": "```rust\nfn names(&self) -> Vec<String> {\n    let mut names: Vec<String> = Vec::new();\n    for name in self.scores.keys() { names.push(name.clone()); }\n    names.sort();\n    names\n}\n```\n在 `average` 中，`let list = self.scores.get(name)?;` 會在找不到姓名時提早回傳 `None`。"
  },
  "8.2": {
    "`parse_level` returns a Result, not a number. What do you use to look inside an enum?": "`parse_level` 回傳的是 `Result`，不是數字。要用什麼方式檢查列舉中的值？",
    "Replace each `let` + `println!` pair with a `match` that has an `Ok(n)` arm and an `Err(e)` arm.": "把每組 `let` 和 `println!` 改成 `match`，並加入 `Ok(n)` 與 `Err(e)` 分支。",
    "```rust\nmatch parse_level(\"7\") {\n    Ok(n) => println!(\"Level {}\", n + 1),\n    Err(e) => println!(\"Error: {}\", e),\n}\n```\nand the same for `\"seven\"`.": "```rust\nmatch parse_level(\"7\") {\n    Ok(n) => println!(\"Level {}\", n + 1),\n    Err(e) => println!(\"Error: {}\", e),\n}\n```\n`\"seven\"` 也要用相同方式處理。"
  },
  "8.4": {
    "Parse `left` and `right` with `.parse::<i32>()` and put `?` after each, then wrap both numbers in Ok.": "用 `.parse::<i32>()` 解析 `left` 和 `right`，各自在後面加上 `?`，再用 `Ok` 包住兩個數字。",
    "parse_pair ends with `Ok((a, b))`. first_upper: `let c = s.chars().next()?;` then return `Some(...)`.": "`parse_pair` 最後回傳 `Ok((a, b))`。`first_upper` 則先寫 `let c = s.chars().next()?;`，再回傳 `Some(...)`。",
    "```rust\nlet a = left.parse::<i32>()?;\nlet b = right.parse::<i32>()?;\nOk((a, b))\n```\nand\n```rust\nlet c = s.chars().next()?;\nSome(c.to_ascii_uppercase())\n```": "```rust\nlet a = left.parse::<i32>()?;\nlet b = right.parse::<i32>()?;\nOk((a, b))\n```\n另外\n```rust\nlet c = s.chars().next()?;\nSome(c.to_ascii_uppercase())\n```"
  },
  "8.5": {
    "Both functions do the same range check. One panics, the other returns an Err.": "兩個函式都要檢查相同的範圍，一個會 panic，另一個則回傳 `Err`。",
    "Check `if value < 1 || value > 100`. In new, call `panic!(...)`; in try_new, `return Err(...)`, and finish with `Ok(Guess { value })`.": "檢查 `if value < 1 || value > 100`。在 `new` 中呼叫 `panic!(...)`；在 `try_new` 中使用 `return Err(...)`，最後回傳 `Ok(Guess { value })`。"
  },
  "8.6": {
    "Keep three `Option`s (name, players, music), fill them while looping over `text.lines().enumerate()`, then build the Config at the end.": "保留三個 `Option`（`name`、`players`、`music`），走訪 `text.lines().enumerate()` 時逐一填入，最後再建立 `Config`。",
    "For each line: skip blanks/comments, `split_once('=')` (BadLine if None), trim both halves, then `match key`. At the end use `name.ok_or(ConfigError::MissingKey(\"name\".to_string()))?`.": "每一行先略過空行和註解，再用 `split_once('=')` 拆開（若是 `None` 就回傳 `BadLine`），修剪兩側空白後對 `key` 使用 `match`。最後用 `name.ok_or(ConfigError::MissingKey(\"name\".to_string()))?`。"
  },
  "9.1": {
    "You need `io::stdin()` and its `read_line` method.": "你需要使用 `io::stdin()` 和它的 `read_line` 方法。",
    "`read_line` wants a mutable borrow of the String, and returns a Result.": "`read_line` 需要可變借用 `String`，並會回傳 `Result`。"
  },
  "9.2": {
    "`guess` is still text. You can't add 1 to text.": "`guess` 目前還是文字，不能直接對文字加 1。",
    "Turn it into a number first: trim it, then parse it, and say which number type you want.": "先把它轉成數字：移除前後空白，再解析，並指定數值型別。",
    "Add `let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");` before the addition.": "在加法前加入 `let guess: u32 = guess.trim().parse().expect(\"Please type a number!\");`。"
  },
  "9.4": {
    "Compare with `guess.cmp(&secret)` and match on the result.": "使用 `guess.cmp(&secret)` 比較，並對結果進行 `match`。",
    "There are three arms: `Ordering::Less`, `Ordering::Greater` and `Ordering::Equal`. Each returns a String.": "這裡有三個分支：`Ordering::Less`、`Ordering::Greater` 和 `Ordering::Equal`。每個分支都要回傳 `String`。"
  },
  "9.5": {
    "Start with the loop and the reading. Make sure you `break` when read_line returns 0, or the game never ends.": "先完成迴圈和輸入讀取。`read_line` 回傳 0 時記得 `break`，否則遊戲永遠不會結束。",
    "Parse with a `match` that `continue`s on Err, then match on `guess.cmp(&secret)`. Remember to `break` after \"You win!\".": "用 `match` 解析輸入，遇到 `Err` 時 `continue`；接著對 `guess.cmp(&secret)` 使用 `match`。印出「You win!」後記得 `break`。"
  },
  "10.2": {
    "background is one `if let ... else if ... else if let ... else` chain. parse_score needs two `let ... else { return None; };` lines.": "`background` 要用一串 `if let ... else if ... else if let ... else`。`parse_score` 則需要兩行 `let ... else { return None; };`。",
    "Start background with `if let Some(color) = favorite { color.to_string() }`. In parse_score, first `split_once(':')`, then `parse::<u32>()`, each with `let ... else`.": "`background` 從 `if let Some(color) = favorite { color.to_string() }` 開始。`parse_score` 先用 `split_once(':')`，再用 `parse::<u32>()`，兩者都搭配 `let ... else`。"
  },
  "10.3": {
    "`Some(word)` doesn't match `None`, so a plain `let` can't use it. What should happen when the line is empty?": "`Some(word)` 無法比對 `None`，所以一般的 `let` 不能處理這種情況。遇到空行時應該怎麼辦？",
    "Add an `else` block to that `let`: print `no words`, then `continue` to the next line. (`if let` / `else` works too.)": "在 `let` 後面加上 `else` 區塊：印出 `no words`，然後用 `continue` 處理下一行。（也可以用 `if let` 搭配 `else`。）"
  },
  "10.4": {
    "Both functions are a single `match`. Use `|` to list several values in one arm and `..=` for ranges.": "兩個函式都只需要一個 `match`。用 `|` 在同一個分支列出多個值，並用 `..=` 表示範圍。",
    "Put the vowels arm (`'a' | 'e' | 'i' | 'o' | 'u'`) before the `'a'..='z'` arm, since the first matching arm wins.": "把母音分支（`'a' | 'e' | 'i' | 'o' | 'u'`）放在 `'a'..='z'` 前面，因為會採用第一個符合的分支。"
  },
  "10.5": {
    "locate needs four arms, from most specific (both 0) to most general. describe needs one arm per variant, and two for ChangeColor.": "`locate` 需要四個分支，從最明確（兩個值都是 0）排到最一般。`describe` 每種變體各需要一個分支，而 `ChangeColor` 需要兩個。",
    "Mix literals and names in one pattern: `Point { x, y: 0 }` matches only when y is 0 and names x. Nest enums: `Message::ChangeColor(Color::Rgb(r, g, b))`.": "可以在同一個模式中混用常值和名稱：`Point { x, y: 0 }` 只會比對 `y` 為 0 的情況，並綁定 `x`。列舉也能巢狀比對：`Message::ChangeColor(Color::Rgb(r, g, b))`。"
  },
  "10.6": {
    "ends is a one-line `let` pattern. ticket and parity are matches. update matches on the pair `(current, new)`.": "`ends` 是單行的 `let` 模式。`ticket` 和 `parity` 使用 `match`。`update` 則比對 `(current, new)` 這組配對。",
    "ticket: `kid @ 0..=12 => ...`. parity: `Some(x) if x < 0 => ...`. update: `(Some(_), Some(_)) => current` and `_ => new`.": "`ticket`：`kid @ 0..=12 => ...`。`parity`：`Some(x) if x < 0 => ...`。`update`：使用 `(Some(_), Some(_)) => current`，其他情況用 `_ => new`。"
  },
  "10.8": {
    "Lowercase the line, split it into `words: Vec<&str>`, then `match words.as_slice()` with one arm per command shape. Finish with `[verb, ..]` for everything else.": "先將整行轉成小寫，再拆成 `words: Vec<&str>`，接著對 `words.as_slice()` 使用 `match`，每種指令格式各寫一個分支。最後用 `[verb, ..]` 處理其他輸入。",
    "`[\"go\", dir] => Ok(Command::Go(direction(dir)?))` uses `?` to pass a BadDirection up. For `[\"take\", count, item]`, match `count.parse::<u32>()` with an `Ok(n @ 1..)` arm and a `_` arm.": "`[\"go\", dir] => Ok(Command::Go(direction(dir)?))` 會用 `?` 將 BadDirection 往上傳。對 `[\"take\", count, item]`，使用 `match count.parse::<u32>()`，並加入 `Ok(n @ 1..)` 和 `_` 分支。"
  },
  "11.2": {
    "The compiler says `module hosting is private`. What keyword makes something visible outside its module?": "編譯器說 `module hosting is private`。要用哪個關鍵字才能讓項目在模組外可見？",
    "Add `pub` to `mod hosting`. After that, the function is still private: add `pub` to it too.": "在 `mod hosting` 前加上 `pub`。這樣函式仍是私有的，所以函式前面也要加上 `pub`。"
  },
  "11.3": {
    "`seasonal_fruit` is private, so `main` can neither set it nor build a Breakfast with `Breakfast { ... }`. Is there a public function that builds one?": "`seasonal_fruit` 是私有欄位，所以 `main` 不能設定它，也不能用 `Breakfast { ... }` 建立早餐。有沒有公開函式可以建立它？",
    "Build the meal with `back_of_house::Breakfast::summer(\"Rye\")`, keep the line that changes the toast, and delete the line that changes the fruit.": "用 `back_of_house::Breakfast::summer(\"Rye\")` 建立餐點，保留修改吐司的那一行，並刪除修改水果的那一行。"
  },
  "11.4": {
    "Each broken name is looked up in the wrong module. For each one, ask: where am I, and where does the item live?": "每個出錯的名稱都在錯誤的模組中查找。逐一想想：目前在哪個模組？該項目又在哪裡？",
    "`deliver_order` lives one level up from back_of_house (`super::`). `back_of_house` is at the crate root (`crate::`). `main` needs the full path through `front_of_house`.": "`deliver_order` 位於 `back_of_house` 的上一層（`super::`）。`back_of_house` 位於 crate 根目錄（`crate::`）。`main` 則需要經過 `front_of_house` 使用完整路徑。"
  },
  "11.5": {
    "Two problems: two different `Result`s are imported under the same name, and the `use garden::tools;` at the top doesn't reach inside `mod shed`.": "有兩個問題：兩種不同的 `Result` 用同一個名稱匯入，而且頂端的 `use garden::tools;` 不會延伸到 `mod shed` 裡面。",
    "Import `std::fmt` and `std::io` instead and write `fmt::Result` / `io::Result<()>` (or rename one with `as`). Move the tools import inside `mod shed` as `use crate::garden::tools;`.": "改為匯入 `std::fmt` 和 `std::io`，並寫成 `fmt::Result`／`io::Result<()>`（或用 `as` 重新命名其中一個）。把 tools 的匯入移到 `mod shed` 裡，寫成 `use crate::garden::tools;`。"
  },
  "11.7": {
    "The compiler doesn't know `mine` exists yet. Which line tells it to read `mine.rs`?": "編譯器還不知道 `mine` 存在。要加哪一行才能讓它讀取 `mine.rs`？",
    "Add `mod mine;` at the top. Then `Cart` lives at `crate::mine::carts::Cart`: bring it in with `use`.": "在檔案頂端加上 `mod mine;`。接著用 `use` 匯入位於 `crate::mine::carts::Cart` 的 `Cart`。"
  },
  "11.8": {
    "Wrap everything except `main` in `mod mine { ... }`, then put the enum in `pub mod ore { ... }` and the two digging functions in `pub mod tunnels { ... }`.": "把 `main` 以外的內容放進 `mod mine { ... }`，再將列舉放入 `pub mod ore { ... }`，兩個挖掘函式放入 `pub mod tunnels { ... }`。",
    "Inside `mine`, add `pub use ore::Ore;` so `mine::Ore` works and `Cart` can name `Ore`. Inside `tunnels`, add `use super::Ore;`. In `main`, call `tunnels::dig` after `use mine::{Cart, tunnels};`.": "在 `mine` 裡加入 `pub use ore::Ore;`，讓 `mine::Ore` 可用，並讓 `Cart` 能引用 `Ore`。在 `tunnels` 裡加入 `use super::Ore;`。在 `main` 裡匯入 `use mine::{Cart, tunnels};` 後呼叫 `tunnels::dig`。"
  },
  "12.1": {
    "Inside `mod tests`, write a function with `#[test]` on the line above it, and use `assert_eq!` or `assert!` inside.": "在 `mod tests` 中寫一個函式，並在函式上方加上 `#[test]`；函式內使用 `assert_eq!` 或 `assert!`。",
    "Write one test per function: `add_two(2)` should be 4, `is_even(7)` should be false (`assert!(!is_even(7))`), `shout(\"hi\")` should be \"HI!\".": "每個函式各寫一個測試：`add_two(2)` 應回傳 4，`is_even(7)` 應為 false（`assert!(!is_even(7))`），`shout(\"hi\")` 應回傳 \"HI!\"。"
  },
  "12.3": {
    "`too_big_pot` panics, which is correct, so it needs an attribute saying so. `reads_liters` uses `?`, so it must return a Result. And read the real panic message in `Pot::new`.": "`too_big_pot` 發生 panic 是正確的，因此要加上對應屬性。`reads_liters` 使用 `?`，所以必須回傳 `Result`。另外，請查看 `Pot::new` 實際的 panic 訊息。",
    "Add `#[should_panic(expected = \"at most 10 liters\")]` above `too_big_pot`, change `reads_liters` to return `Result<(), String>` and end it with `Ok(())`, and fix the expected text in `way_too_big`.": "在 `too_big_pot` 上方加上 `#[should_panic(expected = \"at most 10 liters\")]`；讓 `reads_liters` 回傳 `Result<(), String>` 並以 `Ok(())` 結尾；也要修正 `way_too_big` 中預期的文字。"
  },
  "12.6": {
    "Write one test per function using the examples in the lesson, including the edges: `grade(90)`, `average(&[])`, and a list with fewer than three scores.": "依照課程中的範例，每個函式各寫一個測試，也要涵蓋邊界情況：`grade(90)`、`average(&[])`，以及少於三筆分數的清單。",
    "The bugs: `average` divides integers (and crashes on an empty list), `top_three` keeps the *lowest* scores, and `grade` uses `>` where it needs `>=`.": "這些錯誤是：`average` 使用整數除法（空清單時還會當掉）；`top_three` 保留了*最低*分；`grade` 應該用 `>=`，卻用了 `>`。"
  },
  "13.1": {
    "Copy the body of either function into `largest`. Then read the compiler's suggestion.": "把其中一個函式的本體複製到 `largest`，再看看編譯器的建議。",
    "Comparing `item > largest` needs `T` to be comparable: write `fn largest<T: PartialOrd>(list: &[T]) -> &T`. You can delete the two old functions.": "比較 `item > largest` 需要 `T` 可以比較大小：寫成 `fn largest<T: PartialOrd>(list: &[T]) -> &T`。接著可以刪除原本的兩個函式。"
  },
  "13.2": {
    "`Point` only holds `i32`s. Give it a type parameter. `Pair` doesn't exist yet: it needs two.": "`Point` 目前只能存放 `i32`。請替它加入型別參數。`Pair` 尚未定義，需要兩個型別參數。",
    "Write `struct Point<T> { x: T, y: T }` and `struct Pair<T, U> { first: T, second: U }`.": "寫出 `struct Point<T> { x: T, y: T }` 和 `struct Pair<T, U> { first: T, second: U }`。"
  },
  "13.3": {
    "Write two impl blocks: `impl<T> Point<T> { ... }` with x and y, and `impl Point<f64> { ... }` with distance_from_origin.": "寫兩個 `impl` 區塊：`impl<T> Point<T> { ... }` 放入 x 和 y 方法；`impl Point<f64> { ... }` 放入 `distance_from_origin`。",
    "The getters return `&self.x` and `&self.y`. The distance is `(self.x.powi(2) + self.y.powi(2)).sqrt()`. mixup builds `Point2 { x: self.x, y: other.y }`.": "getter 回傳 `&self.x` 和 `&self.y`。距離公式是 `(self.x.powi(2) + self.y.powi(2)).sqrt()`。`mixup` 則建立 `Point2 { x: self.x, y: other.y }`。"
  },
  "13.5": {
    "Write `impl Summary for Tweet { ... }` with just `summarize_author`, and `impl Summary for NewsArticle { ... }` with both methods.": "寫出 `impl Summary for Tweet { ... }`，裡面只實作 `summarize_author`；再寫 `impl Summary for NewsArticle { ... }`，實作兩個方法。",
    "Tweet: `format!(\"@{}\", self.username)`. Article: `self.author.clone()`, and `summarize` returns `format!(\"{}, by {}\", self.headline, self.author)`.": "Tweet：使用 `format!(\"@{}\", self.username)`。Article：回傳 `self.author.clone()`；`summarize` 則回傳 `format!(\"{}, by {}\", self.headline, self.author)`。"
  },
  "13.6": {
    "For each function, ask what it does with its values: print with `{}`? print with `{:?}`? compare? call a trait method? Each needs a matching bound.": "逐一確認函式如何使用值：用 `{}` 印出、用 `{:?}` 印出、進行比較，還是呼叫 trait 方法？每種操作都需要對應的 trait bound。",
    "`announce` needs `T: Display`, `bigger` needs `T: PartialOrd`, `show_pair` needs `T: Display` and `U: Debug`, and `notify` takes `&impl Summary`.": "`announce` 需要 `T: Display`；`bigger` 需要 `T: PartialOrd`；`show_pair` 需要 `T: Display` 和 `U: Debug`；`notify` 則接收 `&impl Summary`。"
  },
  "13.8": {
    "One line above the struct does it all: `#[derive(...)]` with the traits listed in the comment.": "只要在結構體上方加一行 `#[derive(...)]`，列出註解中指定的 traits 即可。",
    "List all nine: Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default.": "列出全部九種：Debug、Clone、Copy、PartialEq、Eq、PartialOrd、Ord、Hash、Default。"
  },
  "13.9": {
    "Start with the three `impl Shape for ...` blocks (area and name). Then override `describe` inside `impl Shape for Rect`. Last, write the two generic functions.": "先完成三個 `impl Shape for ...` 區塊（包含 area 和 name）。接著在 `impl Shape for Rect` 中覆寫 `describe`。最後再寫兩個泛型函式。",
    "largest: loop over the slice, keeping `best: Option<&T>` and replacing it when a shape has a bigger area. compare: compare `a.area()` with `b.area()` and build the sentence with `format!`.": "`largest`：走訪切片並用 `best: Option<&T>` 記住目前最佳項目，遇到面積更大的形狀就更新。`compare`：比較 `a.area()` 和 `b.area()`，再用 `format!` 組出句子。"
  },
  "14.2": {
    "Error E0106: missing lifetime specifier. The compiler even suggests the fix.": "錯誤 E0106：缺少生命週期標註。編譯器甚至直接提供了修正建議。",
    "Declare a lifetime after the name, `longest<'a>`, and put `'a` on both inputs and the output.": "在函式名稱後宣告生命週期 `longest<'a>`，並在兩個輸入和回傳值上都標註 `'a`。"
  },
  "14.3": {
    "`result` is used after `string2` is dropped, and `result` might point into `string2`.": "`string2` 被釋放後，程式還會使用 `result`；而 `result` 可能指向 `string2` 裡的內容。",
    "Move the `println!` inside the inner block, so it runs while `string2` is still alive. (Or move `string2` out of the block.)": "把 `println!` 移進內層區塊，讓它在 `string2` 還有效時執行。（也可以把 `string2` 移出區塊。）"
  },
  "14.4": {
    "Write `struct Highlight<'a> { part: &'a str }` and an `impl<'a> Highlight<'a> { ... }` block with the two methods.": "寫出 `struct Highlight<'a> { part: &'a str }`，並加入包含兩個方法的 `impl<'a> Highlight<'a> { ... }` 區塊。",
    "`part` returns `self.part`; `words` counts `self.part.split_whitespace()`. In first_sentence, `text.find('.')` gives the index of the dot: slice `&text[..=i]`.": "`part` 回傳 `self.part`；`words` 計算 `self.part.split_whitespace()` 的數量。在 `first_sentence` 中，`text.find('.')` 會回傳句點索引，取切片 `&text[..=i]`。"
  },
  "14.8": {
    "`new` stores `Some(text)`. In `next_piece`, start with `let rest = self.rest?;` so a finished splitter returns None, then use `rest.split_once(self.delim)`.": "`new` 儲存 `Some(text)`。在 `next_piece` 中，先寫 `let rest = self.rest?;`，讓已經處理完的切分器回傳 `None`，接著使用 `rest.split_once(self.delim)`。",
    "If split_once finds the delimiter, keep `after` as the new rest and return the piece. If not, this is the last piece: set `self.rest = None` and return all of `rest`. key_value is `split_once('=')?` plus two `trim()`s.": "若 `split_once` 找到分隔符，就把 `after` 留作剩餘內容並回傳目前片段。若找不到，這就是最後一段：設定 `self.rest = None`，並回傳整個 `rest`。`key_value` 則使用 `split_once('=')?`，再對兩部分呼叫 `trim()`。"
  },
  "15.1": {
    "Each function is one line. giveaway calls `preference.unwrap_or_else(...)`, sort_by_length calls `words.sort_by_key(...)`, and apply_twice calls `f` twice.": "每個函式都只需一行。`giveaway` 呼叫 `preference.unwrap_or_else(...)`，`sort_by_length` 呼叫 `words.sort_by_key(...)`，`apply_twice` 則呼叫 `f` 兩次。",
    "A closure with no parameters is written `|| ...`. sort_by_key wants a closure from a word to its length: `|w| w.len()`.": "沒有參數的閉包寫成 `|| ...`。`sort_by_key` 需要一個將單字轉成長度的閉包：`|w| w.len()`。"
  },
  "15.3": {
    "Write `impl Iterator for Countdown { type Item = u32; fn next(&mut self) -> Option<u32> { ... } }`.": "寫出 `impl Iterator for Countdown { type Item = u32; fn next(&mut self) -> Option<u32> { ... } }`。",
    "In next: if `current` is 0, return None. Otherwise lower `current` by one and return the old value. total and as_vec are one line each: `Countdown::new(n).sum()` / `.collect()`.": "在 `next` 中，若 `current` 為 0 就回傳 `None`；否則先將 `current` 減一，再回傳原本的值。`total` 和 `as_vec` 各只要一行：`Countdown::new(n).sum()`／`.collect()`。"
  },
  "15.4": {
    "Each function is one chain: start with `.iter()` (or `.into_iter()` for the shoes), add `.filter(...)` and/or `.map(...)`, and end with `.collect()`.": "每個函式都由一串 iterator 方法組成：先用 `.iter()`（鞋子要用 `.into_iter()`），再加上 `.filter(...)` 和／或 `.map(...)`，最後用 `.collect()`。",
    "squares_of_evens: `.filter(|n| *n % 2 == 0).map(|n| n * n)`. shoes_in_size: `shoes.into_iter().filter(|s| s.size == size)`. shout_all: `.map(|n| n.to_uppercase())`.": "`squares_of_evens`：`.filter(|n| *n % 2 == 0).map(|n| n * n)`。`shoes_in_size`：`shoes.into_iter().filter(|s| s.size == size)`。`shout_all`：`.map(|n| n.to_uppercase())`。"
  },
  "15.7": {
    "Write two helpers first: `level(line)` (the 2nd word) and `duration(line)` (the 5th word without `ms`, parsed). Then each function is one chain over `log.lines()`.": "先寫兩個輔助函式：`level(line)` 取得第 2 個單字，`duration(line)` 取得第 5 個單字、移除 `ms` 後解析。接著每個函式都對 `log.lines()` 串接 iterator 方法。",
    "count_level: `.filter(...).count()`. error_messages: filter ERROR lines, then `.map(|line| line.split_whitespace().skip(5).collect::<Vec<_>>().join(\" \"))`. slowest: `.max_by_key(|line| duration(line))`, then take the 4th word.": "`count_level`：使用 `.filter(...).count()`。`error_messages`：篩選 ERROR 行，再使用 `.map(|line| line.split_whitespace().skip(5).collect::<Vec<_>>().join(\" \"))`。`slowest`：使用 `.max_by_key(|line| duration(line))`，再取第 4 個單字。"
  },
  "16.1": {
    "The Vec is empty, so `args[1]` panics: index out of bounds. Fill it from `env::args()`.": "`Vec` 是空的，因此存取 `args[1]` 會因索引越界而 panic。請從 `env::args()` 填入參數。",
    "`env::args()` is an iterator. Turn it into a Vec with `.collect()`.": "`env::args()` 是 iterator。用 `.collect()` 把它收集成 `Vec`。"
  },
  "16.2": {
    "`contents` is an empty String. It should hold the text of the file at `file_path`.": "`contents` 目前是空的 `String`，應該存放 `file_path` 指向的檔案內容。",
    "Use `fs::read_to_string(file_path)`. It returns a Result, so finish with `.expect(\"...\")`.": "使用 `fs::read_to_string(file_path)`。它會回傳 `Result`，所以最後加上 `.expect(\"...\")`。"
  },
  "16.3": {
    "Change the two return types first: `Result<Config, &'static str>` and `Result<(), Box<dyn Error>>`. Then the compiler will show you every line that has to follow.": "先修改兩個回傳型別：`Result<Config, &'static str>` 和 `Result<(), Box<dyn Error>>`。接著編譯器就會指出其餘需要調整的地方。",
    "In build: `return Err(\"not enough arguments\")` instead of panicking, and wrap the result in `Ok(...)`. In run: replace `.expect(...)` with `?` and end with `Ok(())`. main then needs `unwrap_or_else` and `if let Err(e) = run(config)`.": "在 `build` 中改用 `return Err(\"not enough arguments\")`，不要 panic，並以 `Ok(...)` 包住結果。在 `run` 中把 `.expect(...)` 換成 `?`，最後回傳 `Ok(())`。`main` 則需要 `unwrap_or_else` 和 `if let Err(e) = run(config)`。"
  },
  "16.4": {
    "Two jobs: add a second `#[test]` function inside `mod tests`, and write the body of `search`.": "有兩件事要做：在 `mod tests` 中再加一個 `#[test]` 函式，並補上 `search` 的函式本體。",
    "In search: make an empty Vec, loop over `contents.lines()`, and push every line that `contains(query)`. Return the Vec at the end.": "在 `search` 中建立空的 `Vec`，走訪 `contents.lines()`，把每個 `contains(query)` 的行加入其中，最後回傳 `Vec`。"
  },
  "16.5": {
    "Two TODOs: read the environment variable in `Config::build`, and write `search_case_insensitive`.": "有兩個 TODO：在 `Config::build` 中讀取環境變數，並實作 `search_case_insensitive`。",
    "`env::var(\"IGNORE_CASE\").is_ok()` tells you if it's set. For the search, copy `search` and compare `line.to_lowercase()` with a lowercased query.": "`env::var(\"IGNORE_CASE\").is_ok()` 可以檢查環境變數是否已設定。搜尋函式可複製 `search`，再將 `line.to_lowercase()` 與轉成小寫的查詢字串比較。"
  },
  "16.6": {
    "Everything prints fine, but one of the lines goes to the wrong stream.": "輸出內容看起來都正確，但有一行被寫到了錯誤的輸出串流。",
    "The \"Skipping\" message is an error. Which macro writes to standard error?": "「Skipping」訊息屬於錯誤。哪個巨集會寫入標準錯誤？",
    "Change `Err(e) => println!(...)` to `Err(e) => eprintln!(...)`.": "把 `Err(e) => println!(...)` 改成 `Err(e) => eprintln!(...)`。"
  },
  "16.7": {
    "Change build's parameter to `mut args: impl Iterator<Item = String>`. Skip the first item with `args.next();`, then take the query and the file path with `args.next()` too.": "把 `build` 的參數改成 `mut args: impl Iterator<Item = String>`。先用 `args.next();` 略過第一個項目，再用 `args.next()` 依序取得查詢字串和檔案路徑。",
    "Each `args.next()` returns an Option: `match` it, returning `Err(\"Didn't get a query string\")` (or `\"Didn't get a file path\"`) on None. In main, pass `env::args()` straight in. search becomes `contents.lines().filter(...).collect()`.": "每次呼叫 `args.next()` 都會回傳 `Option`：用 `match` 處理，遇到 `None` 就回傳 `Err(\"Didn't get a query string\")`（或 `Err(\"Didn't get a file path\")`）。在 `main` 中直接傳入 `env::args()`。`search` 則可改成 `contents.lines().filter(...).collect()`。"
  },
  "16.8": {
    "Start from the pieces you already wrote: `Config::build` reading `env::args()` and `IGNORE_CASE`, `run` reading the file, and a search function.": "從你已經寫好的部分開始：`Config::build` 讀取 `env::args()` 和 `IGNORE_CASE`、`run` 讀取檔案，以及搜尋函式。",
    "For line numbers, search with `contents.lines().enumerate().filter(...).map(|(i, line)| (i + 1, line)).collect()`, returning `Vec<(usize, &str)>`. In run, print each pair and then `results.len()`.": "若要附上行號，可用 `contents.lines().enumerate().filter(...).map(|(i, line)| (i + 1, line)).collect()`，並回傳 `Vec<(usize, &str)>`。在 `run` 中印出每組結果，再印出 `results.len()`。"
  },
  "17.1": {
    "First the type: `Cons(i32, Box<List>)`. Then sum and len are both a `match self` with a `Cons` arm and a `Nil` arm.": "先定義型別：`Cons(i32, Box<List>)`。接著 `sum` 和 `len` 都用 `match self`，分別處理 `Cons` 和 `Nil`。",
    "In the Cons arm, the Box can be used like the List inside it: `rest.sum()` works directly. sum is `value + rest.sum()`, and len is `1 + rest.len()`. Nil gives 0.": "在 `Cons` 分支中，可以像使用裡面的 `List` 一樣直接使用 `Box`，例如呼叫 `rest.sum()`。`sum` 回傳 `value + rest.sum()`，`len` 回傳 `1 + rest.len()`。`Nil` 則回傳 0。"
  },
  "17.4": {
    "Every new owner is made with `Rc::clone(map)`. The count is `Rc::strong_count(map)`.": "每新增一個擁有者，就呼叫 `Rc::clone(map)`。擁有者數量可用 `Rc::strong_count(map)` 取得。",
    "share: make `n` clones and collect them, for example `(0..n).map(|_| Rc::clone(map)).collect()`. prepend: `Cons(value, Rc::clone(tail))`.": "`share`：建立 `n` 份副本並收集起來，例如 `(0..n).map(|_| Rc::clone(map)).collect()`。`prepend`：使用 `Cons(value, Rc::clone(tail))`。"
  },
  "17.5": {
    "`send` only gets `&self`, so `sent_messages` can't be pushed to. Wrap the Vec in a `RefCell`. The account has the same problem: an `Rc<i32>` is read-only.": "`send` 只取得 `&self`，所以無法對 `sent_messages` 呼叫 `push`。把 `Vec` 放進 `RefCell`。帳戶也有相同問題：`Rc<i32>` 是唯讀的。",
    "Field type `RefCell<Vec<String>>`, made with `RefCell::new(vec![])`, and push with `self.sent_messages.borrow_mut().push(...)`. For the account, use `Rc<RefCell<i32>>` everywhere and add with `*account.borrow_mut() += amount`. (main then prints `mock.sent_messages.borrow()`.)": "欄位型別設為 `RefCell<Vec<String>>`，並用 `RefCell::new(vec![])` 建立；呼叫 `self.sent_messages.borrow_mut().push(...)` 加入訊息。帳戶則各處都使用 `Rc<RefCell<i32>>`，並以 `*account.borrow_mut() += amount` 加值。（之後在 `main` 中印出 `mock.sent_messages.borrow()`。）"
  },
  "17.7": {
    "new: `Rc::new(Node { value, parent: RefCell::new(Weak::new()), children: RefCell::new(vec![]) })`. To read the parent, `node.parent.borrow().upgrade()` gives an `Option<Rc<Node>>`.": "`new`：建立 `Rc::new(Node { value, parent: RefCell::new(Weak::new()), children: RefCell::new(vec![]) })`。讀取父節點時，`node.parent.borrow().upgrade()` 會回傳 `Option<Rc<Node>>`。",
    "add_child: `*child.parent.borrow_mut() = Rc::downgrade(parent);` then push the child into `parent.children.borrow_mut()`. ancestors: loop with `while let Some(p) = current`, moving `current` up each time. total: `node.value` plus the totals of `node.children.borrow()`.": "`add_child`：先寫 `*child.parent.borrow_mut() = Rc::downgrade(parent);`，再把子節點加入 `parent.children.borrow_mut()`。`ancestors`：使用 `while let Some(p) = current` 逐層往上走。`total`：將 `node.value` 加上 `node.children.borrow()` 中所有子節點的總和。"
  },
  "18.2": {
    "Three jobs: `impl Draw for Button`, `impl Draw for SelectBox`, and change `components` to a Vec of trait objects. Then write run.": "要完成三件事：為 Button 和 SelectBox 實作 `Draw`，將 `components` 改成 trait object 的 `Vec`，再寫出 `run`。",
    "The field type is `Vec<Box<dyn Draw>>`. Button draws `format!(\"[ {} ]\", self.label)`, SelectBox draws `format!(\"<{}>\", self.options.join(\"|\"))`. run maps each component to `c.draw()` and collects. (main must now box its button too.)": "欄位型別是 `Vec<Box<dyn Draw>>`。Button 使用 `format!(\"[ {} ]\", self.label)` 繪製；SelectBox 使用 `format!(\"<{}>\", self.options.join(\"|\"))`。`run` 對每個元件呼叫 `c.draw()` 並收集結果。（`main` 裡的按鈕也要包進 Box。）"
  },
  "18.3": {
    "Post::approve looks just like Post::request_review. Then each new state needs an `impl State for ...` with `request_review` and `approve`.": "`Post::approve` 和 `Post::request_review` 的寫法很像。接著為每個新狀態實作 `State`，加入 `request_review` 和 `approve`。",
    "PendingReview: `request_review` returns `self` (no change), `approve` returns `Box::new(Published {})`. Published: both return `self`, and it overrides `content` to return `&post.content`.": "PendingReview：`request_review` 回傳 `self`（狀態不變），`approve` 回傳 `Box::new(Published {})`。Published：兩個方法都回傳 `self`，並覆寫 `content` 以回傳 `&post.content`。"
  },
  "18.6": {
    "Each method builds the next struct and moves `self.content` into it. `request_review` starts at 0 approvals and `reject` forgets them.": "每個方法都會建立下一個結構體，並將 `self.content` 移入其中。`request_review` 將核准數設為 0，`reject` 則重設核准數。",
    "approve: add one to `self.approvals`. If that's 2 or more, return `Approval::Published(Post { content: self.content })`, otherwise `Approval::Pending(PendingReviewPost { content: self.content, approvals })`.": "`approve`：將 `self.approvals` 加一。若結果至少是 2，就回傳 `Approval::Published(Post { content: self.content })`；否則回傳 `Approval::Pending(PendingReviewPost { content: self.content, approvals })`。"
  },
  "19.1": {
    "Each thread needs to own its half: `thread::spawn(move || first.iter().sum::<u64>())`. Keep the handles and call `.join().unwrap()` on each.": "每個執行緒都需要取得自己那一半資料的所有權：`thread::spawn(move || first.iter().sum::<u64>())`。保留所有 handle，並各自呼叫 `.join().unwrap()`。",
    "For greet_all, first start **all** the threads (collect the handles into a Vec), then join them in order. Joining right after each spawn would make them run one at a time.": "在 `greet_all` 中，先啟動**所有**執行緒（把 handles 收集到 `Vec`），再依序 join。若每次 spawn 後立刻 join，執行緒就會一個接一個執行。"
  },
  "19.2": {
    "In the helper thread: `for word in words { tx.send(word.to_uppercase()).unwrap(); }`. In the main thread, the receiver is an iterator: `rx.iter().collect()` gathers everything until the sender hangs up.": "在輔助執行緒中寫 `for word in words { tx.send(word.to_uppercase()).unwrap(); }`。主執行緒中的接收端是 iterator：`rx.iter().collect()` 會收集所有訊息，直到傳送端關閉。",
    "For the workers: clone `tx` for each thread (`let tx = tx.clone();` before `thread::spawn(move || ...)`). Then **drop the original** `tx`, or `rx.iter()` waits forever. Finish with `rx.iter().sum()`.": "對 worker 而言，每個執行緒都要複製一份 `tx`（在 `thread::spawn(move || ...)` 前寫 `let tx = tx.clone();`）。接著**丟棄原本的** `tx`，否則 `rx.iter()` 會永遠等待。最後使用 `rx.iter().sum()`。"
  },
  "19.3": {
    "`first` is still alive (still holding the lock) when `second` asks for it. A guard only lets go when it's dropped.": "`second` 嘗試取得鎖時，`first` 還在使用中（仍持有鎖）。guard 被 drop 後才會釋放鎖。",
    "Put each guard in its own `{ ... }` block, or call `drop(first);` before locking again (and the same for `second` before the print).": "把每個 guard 放在各自的 `{ ... }` 區塊中，或在再次鎖定前呼叫 `drop(first);`（印出前也要對 `second` 做同樣處理）。"
  },
  "19.4": {
    "Make the shared value once: `Arc::new(Mutex::new(0))`. For each thread, `let counter = Arc::clone(&counter);` and move that clone into the thread. Keep the handles and join them all before reading the result.": "先建立共享值：`Arc::new(Mutex::new(0))`。每個執行緒都用 `let counter = Arc::clone(&counter);` 複製一份，再將副本移入執行緒。保留所有 handles，全部 join 後再讀取結果。",
    "Inside a thread, `*counter.lock().unwrap() += 1;`. For the words, share `Arc<Mutex<HashMap<String, usize>>>` and do `*tally.lock().unwrap().entry(word.to_string()).or_insert(0) += 1;`. At the end, `tally.lock().unwrap().clone()` gives you the map.": "執行緒內使用 `*counter.lock().unwrap() += 1;`。若要統計單字，使用共享的 `Arc<Mutex<HashMap<String, usize>>>`，並寫 `*tally.lock().unwrap().entry(word.to_string()).or_insert(0) += 1;`。最後呼叫 `tally.lock().unwrap().clone()` 取得 map。"
  },
  "19.6": {
    "Put the URLs in an `Arc<Mutex<Vec<&str>>>` and make a channel. Start `workers` threads, each with its own `Arc::clone` of the queue and its own `tx.clone()`.": "把網址放進 `Arc<Mutex<Vec<&str>>>`，並建立 channel。啟動 `workers` 個執行緒，每個都取得 queue 的 `Arc::clone` 和自己的 `tx.clone()`。",
    "Each worker loops: `let next = queue.lock().unwrap().pop();` (the lock is released at the end of that line), stop when it's None, otherwise fetch, count with `split_whitespace().count()`, and send `(url.to_string(), count)`. After starting the workers, `drop(tx)`, collect `rx.iter()`, and sort.": "每個 worker 都在迴圈中執行：`let next = queue.lock().unwrap().pop();`（該行結束時鎖就會釋放）；若結果是 `None` 就停止，否則取得內容、用 `split_whitespace().count()` 計數，並傳送 `(url.to_string(), count)`。啟動所有 worker 後，呼叫 `drop(tx)`，收集 `rx.iter()` 並排序。"
  },
  "20.2": {
    "In dinner, don't await the two cooks one after the other. Build both futures and give them to `join(...)`, then await that. For double_later, return `async move { ... }`.": "在 `dinner` 中，不要依序等待兩位廚師。建立兩個 future 並交給 `join(...)`，再等待結果。`double_later` 則回傳 `async move { ... }`。",
    "`join(cook(\"pasta\", 3, 30, log), cook(\"soup\", 2, 75, log)).await;`. The async block: sleep with `sleep(Duration::from_millis(10)).await;`, then end with `x * 2`.": "使用 `join(cook(\"pasta\", 3, 30, log), cook(\"soup\", 2, 75, log)).await;`。async 區塊中先呼叫 `sleep(Duration::from_millis(10)).await;`，最後以 `x * 2` 作為結果。"
  },
  "20.3": {
    "fetch_all: make one future per page with `.iter().map(...)` and give them all to `join_all(...).await`. fastest and timeout both `match` on `race(...).await`.": "`fetch_all`：用 `.iter().map(...)` 為每個頁面建立 future，並全部交給 `join_all(...).await`。`fastest` 和 `timeout` 都要對 `race(...).await` 使用 `match`。",
    "In fetch_all the closure gets `&(&str, u64)`, so write `|(name, ms)| fetch(name, *ms)`. In fastest, both arms return the page: `Either::Left(page) | Either::Right(page) => page`. timeout races the future against `sleep(max)`.": "在 `fetch_all` 中，閉包收到的是 `&(&str, u64)`，所以寫成 `|(name, ms)| fetch(name, *ms)`。`fastest` 的兩個分支都回傳頁面：`Either::Left(page) | Either::Right(page) => page`。`timeout` 則讓該 future 和 `sleep(max)` 競速。"
  },
  "20.4": {
    "evens_doubled: `let mut stream = stream_from_iter(numbers);` then a `while let Some(n) = stream.next().await` loop that pushes `n * 2` for even numbers.": "`evens_doubled`：先寫 `let mut stream = stream_from_iter(numbers);`，再用 `while let Some(n) = stream.next().await` 迴圈，將偶數乘以 2 後加入結果。",
    "ticks: `let (tx, mut rx) = channel();`. The producer is an `async move { ... }` block with a for loop that sends and sleeps. The consumer is an `async { ... }` block that collects with `while let Some(msg) = rx.next().await`. Then `join(producer, consumer).await` and return the consumer's part.": "`ticks`：寫 `let (tx, mut rx) = channel();`。producer 使用 `async move { ... }`，在 for 迴圈中傳送訊息並休眠。consumer 使用 `async { ... }`，以 `while let Some(msg) = rx.next().await` 收集訊息。最後呼叫 `join(producer, consumer).await`，並回傳 consumer 的結果。"
  },
  "20.7": {
    "download_with_limit is your `timeout` from 20.3: `race(download(url), sleep(limit))`. fetch_all is `join_all` over `urls.iter().map(...)`.": "`download_with_limit` 和第 20.3 關的 `timeout` 相同：使用 `race(download(url), sleep(limit))`。`fetch_all` 則對 `urls.iter().map(...)` 使用 `join_all`。",
    "fetch_with_progress: make a channel. Build an `async move` block that owns `tx`; inside it, map each url to an `async move` block that awaits the download, sends the url through its own `tx.clone()`, and returns the result; `join_all` them. A second async block collects from `rx.next().await`. `join` the two.": "`fetch_with_progress`：先建立 channel。建立一個擁有 `tx` 的 `async move` 區塊；其中將每個網址映射成 `async move` 區塊，等待下載、用自己的 `tx.clone()` 傳送網址，再回傳結果，並以 `join_all` 等待全部完成。另一個 async 區塊則用 `rx.next().await` 收集資料。最後將兩者交給 `join`。"
  },
  "21.2": {
    "Replace the `// TODO` comments: the first one with `//!` lines, the other two with `///` lines right above each `pub fn`.": "取代 `// TODO` 註解：第一處改成 `//!` 文件註解，另外兩處則在各個 `pub fn` 正上方加上 `///` 文件註解。",
    "Inside a `///` block, sections are Markdown headings: `/// # Examples`, `/// # Panics`, `/// # Errors`. A code block starts with a line that is `///` plus three backticks, then the code (each line starting with `///`), and ends with another `///` plus three backticks.": "在 `///` 文件註解中，章節標題使用 Markdown 格式，例如 `/// # Examples`、`/// # Panics`、`/// # Errors`。程式碼區塊以 `///` 加三個反引號開頭，每行程式碼前都加上 `///`，最後再用 `///` 加三個反引號結束。"
  },
  "21.5": {
    "Three jobs: write the `match` in mix, add the docs (`//!` at the top, `///` above `pub fn mix`), and add three `pub use` lines at the top level.": "有三件事要做：在 mix 中寫出 `match`、補上文件註解（檔案頂端用 `//!`，`pub fn mix` 上方用 `///`），並在最外層加上三行 `pub use`。",
    "mix: match on the pair `(c1, c2)`, e.g. `(Red, Yellow) | (Yellow, Red) => Some(SecondaryColor::Orange)`, and `_ => None` for the rest. Re-exports: `pub use self::kinds::PrimaryColor;` and the same for `SecondaryColor` and `self::utils::mix`.": "`mix`：對 `(c1, c2)` 這組配對使用 `match`，例如 `(Red, Yellow) | (Yellow, Red) => Some(SecondaryColor::Orange)`，其餘情況使用 `_ => None`。重新匯出則寫 `pub use self::kinds::PrimaryColor;`，並對 `SecondaryColor` 和 `self::utils::mix` 做同樣處理。"
  },
  "22.3": {
    "Five small pieces: `impl Add for Point`, `impl Add<Meters> for Millimeters`, `impl fmt::Display for Wrapper`, `impl fmt::Display for Point` plus an empty `impl OutlinePrint for Point {}`, and a different call in pilot_announcement.": "要完成五個部分：`impl Add for Point`、`impl Add<Meters> for Millimeters`、`impl fmt::Display for Wrapper`、`impl fmt::Display for Point` 加上空的 `impl OutlinePrint for Point {}`，以及修改 `pilot_announcement` 中的呼叫。",
    "Each `Add` impl needs `type Output = ...;` and `fn add(self, other: ...) -> ...`. A meter is 1000 millimeters. The Display impls use `write!(f, ...)`. pilot_announcement must call the Pilot version: `Pilot::fly(person)`.": "每個 `Add` 實作都需要 `type Output = ...;` 和 `fn add(self, other: ...) -> ...`。1 公尺等於 1000 毫米。Display 實作使用 `write!(f, ...)`。`pilot_announcement` 必須呼叫 Pilot 版本：`Pilot::fly(person)`。"
  },
  "22.5": {
    "do_twice is `f(arg) + f(arg)`. to_strings and statuses use a function name in `map`: `.map(ToString::to_string)` and `.map(Status::Value)`. make_adder needs `move` and `+ n`.": "`do_twice` 是 `f(arg) + f(arg)`。`to_strings` 和 `statuses` 在 `map` 中使用函式名稱：`.map(ToString::to_string)` 和 `.map(Status::Value)`。`make_adder` 需要 `move` 和 `+ n`。",
    "make_pipeline: make a `Vec<Box<dyn Fn(i32) -> i32>>`, `match *step` and push `Box::new(|x| x * 2)` and friends. run_pipeline: `pipeline.iter().fold(start, |value, step| step(value))`.": "`make_pipeline`：建立 `Vec<Box<dyn Fn(i32) -> i32>>`，對 `*step` 使用 `match`，並加入 `Box::new(|x| x * 2)` 等閉包。`run_pipeline`：使用 `pipeline.iter().fold(start, |value, step| step(value))`。"
  },
  "22.6": {
    "Each macro is `macro_rules! name { (pattern) => { output }; }`, written above main. square needs one arm with `$x:expr`.": "每個巨集都採用 `macro_rules! name { (pattern) => { output }; }` 格式，並寫在 main 上方。square 只需要一個使用 `$x:expr` 的分支。",
    "maximum needs two arms: one value `($x:expr) => { $x }`, and `($first:expr, $($rest:expr),+)` which compares `$first` with `maximum!($($rest),+)`. hashmap matches `$($key:expr => $value:expr),*` and repeats `map.insert($key, $value);`. Use double braces `{{ ... }}` so the output is a block.": "maximum 需要兩個分支：單一值 `($x:expr) => { $x }`，以及會比較 `$first` 和 `maximum!($($rest),+)` 的 `($first:expr, $($rest:expr),+)`。hashmap 比對 `$($key:expr => $value:expr),*`，並重複執行 `map.insert($key, $value);`。輸出是區塊時要用雙大括號 `{{ ... }}`。"
  },
  "22.7": {
    "count! has two arms: nothing gives `0usize`, and `$head:tt $($tail:tt)*` gives `1usize + count!($($tail)*)`. my_vec! has three arms: `()`, `($value:expr; $n:expr)` and `($($x:expr),+ $(,)?)`, in that order.": "`count!` 有兩個分支：空輸入回傳 `0usize`，`$head:tt $($tail:tt)*` 則回傳 `1usize + count!($($tail)*)`。`my_vec!` 有三個分支，依序是 `()`、`($value:expr; $n:expr)` 和 `($($x:expr),+ $(,)?)`。",
    "The list arm makes `Vec::with_capacity(count!($($x)*))` and repeats `v.push($x);` with `$( ... )+`. The `;` arm makes an empty Vec and calls `v.resize($n, $value)`. Wrap each output in `{{ ... }}`.": "清單分支建立 `Vec::with_capacity(count!($($x)*))`，並用 `$( ... )+` 重複執行 `v.push($x);`。`;` 分支則建立空的 Vec 並呼叫 `v.resize($n, $value)`。每種輸出都要用 `{{ ... }}` 包起來。"
  },
  "23.1": {
    "accept_one: `let (stream, _) = listener.accept().unwrap();` and pass `&stream` to read_request. read_request wraps the stream in `BufReader::new(stream)` and goes through its `.lines()`.": "`accept_one`：使用 `let (stream, _) = listener.accept().unwrap();`，並將 `&stream` 傳給 `read_request`。`read_request` 用 `BufReader::new(stream)` 包住 stream，並走訪其 `.lines()`。",
    "Each line is a `Result`, so `.map(|result| result.unwrap())`. Then `.take_while(|line| !line.is_empty())` stops at the empty line, and `.collect()` builds the Vec.": "每一行都是 `Result`，所以使用 `.map(|result| result.unwrap())`。接著 `.take_while(|line| !line.is_empty())` 會在空行處停止，最後用 `.collect()` 建立 Vec。"
  },
  "23.2": {
    "response is one `format!` with `\\r\\n` line endings, using `contents.len()` for the length. route is an `if request_line == \"GET / HTTP/1.1\"` returning a pair of string literals.": "`response` 使用一個 `format!`，並以 `\\r\\n` 換行；長度使用 `contents.len()`。`route` 則用 `if request_line == \"GET / HTTP/1.1\"` 判斷，並回傳一組字串常值。",
    "In handle_connection: `let (status_line, filename) = route(&request_line);`, then `fs::read_to_string(filename).unwrap()`, then `stream.write_all(response(status_line, &contents).as_bytes()).unwrap();`.": "在 `handle_connection` 中，先寫 `let (status_line, filename) = route(&request_line);`，再呼叫 `fs::read_to_string(filename).unwrap()`，最後執行 `stream.write_all(response(status_line, &contents).as_bytes()).unwrap();`。"
  },
  "23.4": {
    "new: `assert!(size > 0)`, make a channel, wrap the receiver in `Arc::new(Mutex::new(receiver))`, and create `size` workers, each with an `Arc::clone` of it. execute: `self.sender.send(Box::new(f)).unwrap()`.": "`new`：呼叫 `assert!(size > 0)`、建立 channel，將接收端包在 `Arc::new(Mutex::new(receiver))` 中，再建立 `size` 個 worker，各自取得它的 `Arc::clone`。`execute`：呼叫 `self.sender.send(Box::new(f)).unwrap()`。",
    "Worker::new spawns a thread with `thread::spawn(move || loop { ... })`. Inside: `let job = receiver.lock().unwrap().recv().unwrap();` then `job();`. Return `Worker { id, thread }`.": "`Worker::new` 使用 `thread::spawn(move || loop { ... })` 建立執行緒。裡面先寫 `let job = receiver.lock().unwrap().recv().unwrap();`，再呼叫 `job();`。最後回傳 `Worker { id, thread }`。"
  },
  "23.5": {
    "Two problems. Drop can't move `worker.thread` out of a borrowed Vec (use `self.workers.drain(..)`), and the workers never stop, so joining them waits forever.": "有兩個問題：Drop 無法從借用中的 Vec 移出 `worker.thread`（改用 `self.workers.drain(..)`）；而 worker 不會停止，因此 join 會永遠等待。",
    "Make the field `sender: Option<mpsc::Sender<Job>>` (with `Some(sender)` in new and `self.sender.as_ref().unwrap()` in execute). In drop, first `drop(self.sender.take());`. In the worker, `match` on `recv()` and `break` on `Err`.": "將欄位改成 `sender: Option<mpsc::Sender<Job>>`（在 new 中使用 `Some(sender)`，execute 中使用 `self.sender.as_ref().unwrap()`）。在 drop 中先呼叫 `drop(self.sender.take());`。worker 則對 `recv()` 使用 `match`，遇到 `Err` 時 `break`。"
  },
  "23.6": {
    "Start with the ThreadPool from the last two levels: `new` with `assert!`, a shared `Arc<Mutex<Receiver>>`, workers that `break` when `recv` fails, and a Drop that takes the sender and drains the workers. Then route (a `match` on the request line) and handle_connection (from 23.2).": "先沿用前兩關的 ThreadPool：`new` 中加入 `assert!` 和共享的 `Arc<Mutex<Receiver>>`；worker 在 `recv` 失敗時 `break`；Drop 則取出 sender 並清空 workers。接著完成 `route`（對 request line 使用 `match`）和第 23.2 關的 `handle_connection`。",
    "serve: `let pool = ThreadPool::new(workers);` then `for stream in listener.incoming().take(max_requests) { let stream = stream.unwrap(); pool.execute(|| handle_connection(stream)); }`. The pool is dropped when serve ends, which waits for every request.": "`serve`：先寫 `let pool = ThreadPool::new(workers);`，接著使用 `for stream in listener.incoming().take(max_requests) { let stream = stream.unwrap(); pool.execute(|| handle_connection(stream)); }`。`serve` 結束時會 drop pool，並等待所有請求完成。"
  }
};
