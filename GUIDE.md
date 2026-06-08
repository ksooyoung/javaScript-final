# 💡 계산기 고도화 — JavaScript 최종 과제

> 기존 계산기에 **계산 기록 저장**, **localStorage 연동**을 추가하여 실제 서비스처럼 동작하는 계산기를 완성하세요.

---

## 🚀 시작하기 (클론 & 실행)

### 1단계 — 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/calculator-final.git
cd calculator-final
```

### 2단계 — VS Code로 열기

```bash
code .
```

### 3단계 — Live Server로 실행

> ES 모듈(`type="module"`)은 `file://` 프로토콜에서 동작하지 않습니다.
> 반드시 **Live Server**를 사용하세요.

1. VS Code 확장 탭(`Ctrl+Shift+X`)에서 **Live Server** 검색 후 설치
2. `index.html` 파일을 열고 우하단 **Go Live** 버튼 클릭
3. 브라우저에서 `http://127.0.0.1:5500` 자동 오픈

---

## 📋 과제 진행 방법

### 수정할 파일

| 파일 | 과제 |
|------|------|
| `js/calculator.js` | 과제 1 ~ 4 + 도전 1, 3 |
| `js/history.js` | 과제 5 ~ 7 + 도전 2 |

### 수정 금지 파일

| 파일 | 이유 |
|------|------|
| `index.html` | UI 구조 완성본 |
| `style.css` | 스타일 완성본 |
| `js/main.js` | 이벤트 연결 완성본 |

### 과제 순서 (권장)

```
과제 1 (appendNumber)  →  과제 2 (appendOperator)
       ↓
과제 3 (calculate)     →  과제 4 (deleteLast)
       ↓
과제 5 (loadHistory)   →  과제 6 (saveHistory)  →  과제 7 (addHistory)
       ↓
도전 과제 (선택)
```

### 작업 흐름

1. `js/calculator.js` 또는 `js/history.js` 파일을 엽니다.
2. `// 💡` 주석이 있는 빈칸을 찾습니다.
3. 주석의 규칙과 힌트를 읽고 코드를 작성합니다.
4. **Live Server**로 브라우저에서 직접 동작을 확인합니다.
5. 다음 과제로 이동합니다.

### 테스트 체크리스트

각 과제를 마친 후 브라우저에서 직접 확인하세요.

- [ ] 숫자 버튼을 누르면 화면에 표시된다
- [ ] 연산자를 연속으로 누르면 마지막 것으로 교체된다
- [ ] `3 + 4 =` 계산 시 결과 `7`이 표시된다
- [ ] `=` 직후 숫자를 누르면 새 계산이 시작된다
- [ ] `8 ÷ 0 =` 시 에러 메시지가 표시된다
- [ ] `0.1 + 0.2 =` 결과가 `0.3`이다 (부동소수점 오류 없음)
- [ ] `⌫` 버튼으로 마지막 글자가 지워진다
- [ ] `=` 직후 `⌫` 를 누르면 전체 초기화된다
- [ ] 계산 결과가 기록 패널에 표시된다
- [ ] 페이지 새로고침 후에도 기록이 남아 있다
- [ ] "전체 삭제" 버튼으로 기록이 모두 지워진다

---

## 구현 내용

- [ ] **숫자 입력:** 숫자와 소수점을 입력할 수 있다.
- [ ] **연산자 입력:** +, -, ×, ÷ 연산자를 입력할 수 있다.
- [ ] **계산 실행:** = 버튼 또는 Enter 키로 계산 결과를 출력한다.
- [ ] **삭제 기능:** ⌫ 버튼 또는 Backspace 키로 마지막 입력을 지운다.
- [ ] **기록 저장:** 계산 결과를 localStorage에 저장한다.
- [ ] **기록 불러오기:** 페이지를 새로고침해도 기록이 유지된다.
- [ ] **기록 렌더링:** 저장된 기록을 화면의 기록 패널에 표시한다.
- [ ] **기록 삭제:** "전체 삭제" 버튼으로 모든 기록을 지운다.

**도전 과제 (선택)**

- [ ] **% 연산:** 현재 숫자를 백분율로 변환하는 % 버튼을 추가한다.
- [ ] **기록 개별 삭제:** 기록 항목마다 × 버튼으로 개별 삭제할 수 있다.
- [ ] **기록 클릭:** 기록 항목을 클릭하면 해당 결과를 계산기에 불러온다.

---

## 1. 프로젝트 세팅

### 파일 구성

```
calculator-final/
├── index.html        ✅ 완성본 제공 (수정 불필요)
├── style.css         ✅ 완성본 제공 (수정 불필요)
└── js/
    ├── calculator.js 📝 과제 1~4 작성
    ├── history.js    📝 과제 5~7 작성
    └── main.js       ✅ 완성본 제공 (수정 불필요)
```

### 실행 방법

ES 모듈(`type="module"`)은 `file://` 프로토콜에서 동작하지 않습니다.
반드시 **VS Code Live Server**로 실행하세요.

> VS Code에서 `index.html` 파일을 열고 우하단 **Go Live** 버튼 클릭

---

## 2. 핵심 코드 가이드

### 📁 `js/calculator.js` — 계산기 핵심 로직

💡 표시된 빈칸을 채워 완성하세요. 나머지 코드는 수정하지 않습니다.

```js
// 계산기 상태 변수
let expression     = "";    // 현재 입력 중인 수식
let justCalculated = false; // 방금 = 을 눌렀는지 여부
```

**과제 1 — `appendNumber`: 숫자 입력**

```js
export const appendNumber = (num) => {
    // 💡 [과제 1] 아래 규칙에 따라 코드를 작성하세요.
    //
    // 규칙 1. justCalculated가 true이면 expression을 ""로 초기화 후 입력
    //         (새로운 계산 시작)
    //
    // 규칙 2. expression이 "0"일 때 숫자를 누르면 "0"을 대체
    //         (예: "0" + "5" → "5",  "0" + "." → "0.")
    //
    // 규칙 3. 소수점(.)은 현재 숫자 구간에 이미 있으면 추가하지 않음
    //         (예: "3.14" 상태에서 "." 을 눌러도 무시)



    justCalculated = false;
    updateDisplay();
};
```

**과제 2 — `appendOperator`: 연산자 입력**

```js
export const appendOperator = (op) => {
    // 💡 [과제 2] 아래 규칙에 따라 코드를 작성하세요.
    //
    // 규칙 1. expression이 비어 있으면 무시 (연산자로 시작 불가)
    //
    // 규칙 2. 마지막 문자가 이미 연산자이면 새 연산자로 교체
    //         (예: "3+" 상태에서 "*" 누르면 → "3*")
    //
    // 규칙 3. justCalculated가 true이면 expression을 유지하고 연산자 추가
    //         (= 누른 직후 이어서 계산 가능)
    //
    // 힌트: 문자열의 마지막 문자 → expression[expression.length - 1]
    // 힌트: 마지막 문자 제거    → expression.slice(0, -1)



    justCalculated = false;
    updateDisplay();
};
```

**과제 3 — `calculate`: 계산 실행**

```js
export const calculate = () => {
    // 💡 [과제 3] 아래 규칙에 따라 코드를 작성하세요.
    //
    // 규칙 1. expression이 비어 있거나 연산자로 끝나면 null 반환
    //
    // 규칙 2. 0으로 나누기 감지 → subDisplay에 에러 메시지 표시 후 null 반환
    //         (힌트: /\/0/.test(expression) 으로 감지)
    //
    // 규칙 3. 계산 성공 시:
    //         - mainDisplay.textContent = 결과값
    //         - subDisplay.textContent  = "수식 ="
    //         - justCalculated = true
    //
    // 규칙 4. 반환값: { expression: 수식, result: 결과값 문자열 }
    //         (main.js에서 기록 저장에 사용합니다)
    //
    // 힌트 — 수식 계산:
    //   Function('"use strict"; return (' + expression + ')')()
    //
    // 힌트 — 부동소수점 오류 방지:
    //   parseFloat(result.toFixed(10)).toString()



};
```

**과제 4 — `deleteLast`: 마지막 문자 삭제**

```js
export const deleteLast = () => {
    // 💡 [과제 4] 아래 규칙에 따라 코드를 작성하세요.
    //
    // 규칙 1. justCalculated가 true이면 전체 초기화 (clearAll 호출)
    //
    // 규칙 2. 그렇지 않으면 expression의 마지막 글자 하나만 제거
    //         (힌트: expression.slice(0, -1))



    updateDisplay();
};
```

---

### 📁 `js/history.js` — 계산 기록 관리

```js
const STORAGE_KEY = "calc_history"; // localStorage 키
const MAX_COUNT   = 20;             // 최대 저장 개수
```

**과제 5 — `loadHistory`: 기록 불러오기**

```js
export const loadHistory = () => {
    // 💡 [과제 5] localStorage에서 기록을 불러오세요.
    //
    // 순서:
    //  1. localStorage.getItem(STORAGE_KEY) 로 값을 가져옵니다.
    //  2. 값이 없으면(null) 빈 배열 [] 을 반환합니다.
    //  3. 값이 있으면 JSON.parse() 로 변환해 반환합니다.



};
```

**과제 6 — `saveHistory`: 기록 저장**

```js
export const saveHistory = (history) => {
    // 💡 [과제 6] 기록 배열을 localStorage에 저장하세요.
    //
    // 순서:
    //  1. MAX_COUNT(20)개 초과분을 제거합니다.
    //     (힌트: history.slice(0, MAX_COUNT))
    //  2. JSON.stringify() 로 배열을 문자열로 변환합니다.
    //  3. localStorage.setItem(STORAGE_KEY, ...) 으로 저장합니다.



};
```

**과제 7 — `addHistory`: 기록 항목 추가**

```js
export const addHistory = (expression, result) => {
    // 💡 [과제 7] 새 계산 결과를 기록에 추가하고 저장하세요.
    //
    // 저장할 항목 형식:
    //   { expression, result, date: new Date().toLocaleString("ko-KR") }
    //
    // 순서:
    //  1. loadHistory() 로 기존 기록 배열을 가져옵니다.
    //  2. 새 항목을 배열 맨 앞에 추가합니다.
    //     (힌트: [새항목, ...기존배열]  또는  배열.unshift(새항목))
    //  3. saveHistory() 로 저장합니다.
    //  4. 업데이트된 배열을 반환합니다.



};
```

---

## 3. 예시 출력

```
[입력: 3, +, 4, =]
디스플레이: 7
서브 텍스트: 3+4 =

[기록 패널]
3+4 =
7
2025. 6. 4. 오후 3:24:00
```

```
[에러: 8 ÷ 0]
디스플레이: 8/0
서브 텍스트: 0으로 나눌 수 없습니다
```

---

## 4. 도전 과제 (선택)

### 도전 1 — % 연산 추가

`index.html`에 `%` 버튼을 추가하고 `calculator.js`에 함수를 구현하세요.

```
동작: 현재 입력된 숫자를 100으로 나눕니다.
예)  "50"  → % 클릭 →  "0.5"
     "200" → % 클릭 →  "2"
     연산자 뒤에는 동작하지 않습니다.
```

```js
// calculator.js에 추가
export const appendPercent = () => {
    // 힌트: 현재 expression의 마지막 숫자 부분을 parseFloat으로 읽어
    //       100으로 나눈 값으로 교체합니다.
};
```

### 도전 2 — 기록 개별 삭제

각 기록 항목 옆에 `×` 버튼을 추가하고 클릭 시 해당 항목만 삭제하세요.

```js
// history.js에 추가
export const deleteHistoryItem = (index) => {
    // 힌트 1: loadHistory()로 배열을 가져옵니다.
    // 힌트 2: filter() 또는 splice()로 해당 인덱스 항목을 제거합니다.
    // 힌트 3: saveHistory()로 저장하고 업데이트된 배열을 반환합니다.
};
```

```js
// main.js의 renderHistory 함수 내 map 부분 수정 예시
history.map((item, index) => `
    <li class="history-item">
        ...
        <button class="delete-item-btn" data-index="${index}">×</button>
    </li>
`)
```

### 도전 3 — 기록 클릭 시 결과 불러오기

기록 항목을 클릭하면 해당 결과값이 계산기에 로드되도록 구현하세요.

```js
// calculator.js에 추가
export const setExpression = (value) => {
    // 힌트: expression에 value를 넣고 justCalculated = true,
    //       updateDisplay()를 호출합니다.
};
```

---

## 5. 주의사항

- **ES 모듈 필수:** `<script type="module">` 이 적용되어 있어 반드시 **Live Server**로 실행해야 합니다. `index.html`을 직접 더블클릭하면 동작하지 않습니다.
- **수정 금지 파일:** `index.html`, `style.css`, `main.js` 는 수정하지 않습니다.
- **`clearAll` 함수:** `calculator.js` 하단에 완성 코드로 제공됩니다. `deleteLast` 과제에서 활용하세요.
- **부동소수점 오류:** `0.1 + 0.2 = 0.30000000000000004` 같은 오류는 `parseFloat(result.toFixed(10))` 으로 해결합니다.

---

## 6. 제출

- GitHub 저장소 링크 또는 실행 화면 스크린샷 제출
- 도전 과제 구현 시 별도 표시

---

## 7. 정답 코드

### 📁 `js/calculator.js`

```js
// ============================================================
//  calculator.js — 계산기 핵심 로직
// ============================================================

const mainDisplay = document.getElementById("mainDisplay");
const subDisplay  = document.getElementById("subDisplay");

let expression     = "";    // 현재 입력 중인 수식 문자열
let justCalculated = false; // 방금 = 을 눌렀는지 여부

// 디스플레이 갱신 — main.js에서도 호출합니다 (수정 금지)
export const updateDisplay = () => {
    mainDisplay.textContent = expression || "0";
    mainDisplay.style.fontSize = expression.length > 10 ? "1.8rem" : "2.6rem";
};

// ── 과제 1: 숫자 / 소수점 입력 ──────────────────────────────
export const appendNumber = (num) => {
    // 규칙 1: 방금 = 을 눌렀으면 새 계산 시작 (expression 초기화)
    if (justCalculated) expression = "";

    if (num === ".") {
        // 규칙 3: 현재 숫자 구간에 이미 소수점이 있으면 무시
        const segments = expression.split(/[+\-*\/]/);
        const current  = segments[segments.length - 1];
        if (current.includes(".")) { justCalculated = false; updateDisplay(); return; }
        // 소수점으로 시작하면 "0" 자동 삽입 (예: "." → "0.")
        if (current === "") expression += "0";
    } else if (expression === "0") {
        // 규칙 2: expression이 "0"일 때 숫자 입력 → "0" 대체
        expression = num;
        justCalculated = false;
        updateDisplay();
        return;
    }

    expression += num;
    justCalculated = false;
    updateDisplay();
};

// ── 과제 2: 연산자 입력 ─────────────────────────────────────
export const appendOperator = (op) => {
    // 규칙 1: expression이 비어 있으면 무시 (연산자로 시작 불가)
    if (expression === "") { justCalculated = false; updateDisplay(); return; }

    const last = expression[expression.length - 1];
    const ops  = ["+", "-", "*", "/"];

    if (ops.includes(last)) {
        // 규칙 2: 마지막 문자가 연산자이면 새 연산자로 교체
        expression = expression.slice(0, -1) + op;
    } else {
        // 규칙 3: justCalculated여도 이전 결과에 이어서 연산 가능
        expression += op;
    }

    justCalculated = false;
    updateDisplay();
};

// ── 과제 3: 계산 실행 ───────────────────────────────────────
export const calculate = () => {
    // 규칙 1: expression이 비어 있거나 연산자로 끝나면 null 반환
    if (expression === "") return null;
    const last = expression[expression.length - 1];
    if (["+", "-", "*", "/"].includes(last)) return null;

    // 규칙 2: 0으로 나누기 감지 → 에러 메시지 표시 후 null 반환
    if (/\/0(?![.\d])/.test(expression)) {
        subDisplay.textContent = "0으로 나눌 수 없습니다";
        return null;
    }

    try {
        // 수식 계산 (Function으로 eval 대체)
        const raw    = Function('"use strict"; return (' + expression + ')')();
        // 부동소수점 오류 방지
        const result = parseFloat(raw.toFixed(10)).toString();
        const expr   = expression;

        // 규칙 3: 화면 갱신
        mainDisplay.textContent    = result;
        mainDisplay.style.fontSize = result.length > 10 ? "1.8rem" : "2.6rem";
        subDisplay.textContent     = expr + " =";
        justCalculated             = true;
        expression                 = result;

        // 규칙 4: { expression, result } 반환
        return { expression: expr, result };
    } catch (e) {
        subDisplay.textContent = "올바른 수식이 아닙니다";
        return null;
    }
};

// ── 과제 4: 마지막 문자 삭제 ────────────────────────────────
export const deleteLast = () => {
    // 규칙 1: 계산 직후이면 전체 초기화
    if (justCalculated) {
        clearAll();
        return;
    }
    // 규칙 2: 마지막 글자 하나 제거
    expression = expression.slice(0, -1);
    updateDisplay();
};

// ── 전체 초기화 (완성 코드 — 수정 금지) ─────────────────────
export const clearAll = () => {
    expression     = "";
    justCalculated = false;
    mainDisplay.textContent    = "0";
    mainDisplay.style.fontSize = "2.6rem";
    subDisplay.textContent     = "";
    document.querySelectorAll(".btn-op").forEach(b => b.classList.remove("active"));
};
```

---

### 📁 `js/history.js`

```js
// ============================================================
//  history.js — 계산 기록 관리 (localStorage)
// ============================================================

const STORAGE_KEY = "calc_history";
const MAX_COUNT   = 20;

// ── 과제 5: 기록 불러오기 ────────────────────────────────────
export const loadHistory = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];      // 저장된 값이 없으면 빈 배열 반환
    return JSON.parse(raw);
};

// ── 과제 6: 기록 저장 ────────────────────────────────────────
export const saveHistory = (history) => {
    // MAX_COUNT 초과분 제거 후 문자열로 변환하여 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_COUNT)));
};

// ── 과제 7: 기록 항목 추가 ───────────────────────────────────
export const addHistory = (expression, result) => {
    const history = loadHistory();
    const item    = { expression, result, date: new Date().toLocaleString("ko-KR") };
    const updated = [item, ...history];   // 새 항목을 맨 앞에 추가
    saveHistory(updated);
    return updated;
};

// ── 기록 전체 삭제 (완성 코드 — 수정 금지) ──────────────────
export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    return [];
};
```

---

### 📁 도전 과제 정답

#### 도전 1 — % 연산 (`calculator.js`에 추가)

```js
export const appendPercent = () => {
    if (expression === "") return;
    // 연산자로 끝나면 무시
    if (["+", "-", "*", "/"].includes(expression[expression.length - 1])) return;

    // 마지막 연산자 위치를 찾아 숫자 구간만 /100 으로 교체
    const opIdx  = Math.max(
        expression.lastIndexOf("+"), expression.lastIndexOf("-"),
        expression.lastIndexOf("*"), expression.lastIndexOf("/")
    );
    const prefix = opIdx >= 0 ? expression.slice(0, opIdx + 1) : "";
    const numStr = opIdx >= 0 ? expression.slice(opIdx + 1)    : expression;

    if (!numStr || isNaN(parseFloat(numStr))) return;

    expression = prefix + (parseFloat(numStr) / 100).toString();
    justCalculated = false;
    updateDisplay();
};
```

#### 도전 2 — 기록 개별 삭제 (`history.js`에 추가)

```js
export const deleteHistoryItem = (index) => {
    const history = loadHistory();
    const updated = history.filter((_, i) => i !== index);
    saveHistory(updated);
    return updated;
};
```

#### 도전 3 — 기록 클릭 시 결과 불러오기 (`calculator.js`에 추가)

```js
export const setExpression = (value) => {
    expression     = value;
    justCalculated = true;
    updateDisplay();
};
```

#### 도전 2+3 연결 — `main.js` renderHistory 수정

```js
// renderHistory 함수의 map 부분을 아래와 같이 수정
historyList.innerHTML = history.map((item, index) => `
    <li class="history-item" data-result="${item.result}">
        <div class="hist-expr">${item.expression} =</div>
        <div class="hist-result">${item.result}</div>
        <div class="hist-date">${item.date}</div>
        <button class="del-item-btn" data-index="${index}" title="삭제">×</button>
    </li>
`).join("");
```

```js
// clearAllBtn 이벤트 아래에 추가
historyList.addEventListener("click", (e) => {
    // 개별 삭제 버튼 클릭
    const delBtn = e.target.closest(".del-item-btn");
    if (delBtn) {
        e.stopPropagation();
        renderHistory(deleteHistoryItem(Number(delBtn.dataset.index)));
        return;
    }
    // 기록 항목 클릭 → 결과 불러오기
    const item = e.target.closest(".history-item");
    if (item && item.dataset.result) setExpression(item.dataset.result);
});
```
