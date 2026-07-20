// ============================================================
//  calculator.js — 계산기 핵심 로직
//  📝 과제: 💡 표시된 빈칸을 채워 기능을 완성하세요.
// ============================================================

const mainDisplay = document.getElementById("mainDisplay");
const subDisplay = document.getElementById("subDisplay");

let expression = ""; // 현재 입력 중인 수식 문자열
let justCalculated = false; // 방금 = 을 눌렀는지 여부

// 디스플레이 갱신 — main.js에서도 호출합니다 (수정 금지)
export const updateDisplay = () => {
  mainDisplay.textContent = expression || "0";
  mainDisplay.style.fontSize = expression.length > 10 ? "1.8rem" : "2.6rem";
};

// ── 과제 1: 숫자 / 소수점 입력 ──────────────────────────────
/**
 * 버튼에서 눌린 숫자(또는 '.')를 expression에 추가합니다.
 *
 * 구현해야 할 규칙:
 *  1. justCalculated가 true이면 expression을 ""로 초기화 후 입력 (새 계산 시작)
 *  2. expression이 "0"일 때 숫자를 누르면 "0"을 대체 (앞자리 0 방지)
 *  3. 소수점(.)은 현재 숫자 구간에 이미 있으면 추가하지 않음
 *
 * @param {string} num - 입력된 숫자 문자 ("0"~"9", ".")
 */
export const appendNumber = (num) => {
  // 💡 [과제 1] 아래 규칙에 따라 코드를 작성하세요.
  //
  // 규칙 1. justCalculated가 true이면 expression을 ""로 초기화 후 입력
  //         (새로운 계산 시작)
  if (justCalculated) {
    expression = "";
    justCalculated = false;
  }

  // 규칙 3. 소수점(.)은 현재 숫자 구간에 이미 있으면 추가하지 않음
  //         (예: "3.14" 상태에서 "." 을 눌러도 무시)
  //         힌트: expression.split(/[+\-*\/]/) 로 숫자 구간을 나눌 수 있습니다.

  // 현재 입력 중인 마지막 숫자 체크하기
  const splitNum = expression.split(/[+\-*\/]/);
  const lastNum = splitNum[splitNum.length - 1];

  // 소수점(.)을 입력할때 처리
  if (num === ".") {
    // 숫자에 .이 이미 포함되어 있으면 입력 안되도록
    if (lastNum.includes(".")) {
      return;
    }

    // 배운 내용 -> for문으로 .이 포함되어 있는지 여부 확인하기
    // let hasDot = false;

    // for (let i = 0; i < lastNum.length; i++) {
    //   if (lastNum[i] === ".") {
    //     hasDot = true;
    //     break;
    //   }
    // }

    // if (!hasDot) {
    //   expression += num;
    // }

    // 마지막 값에 문자가 없는 상태에서 .을 넣으면 0.으로 나오게 변경
    if (lastNum === "") {
      expression += "0.";
    } else {
      expression += num;
    }
  }

  // 규칙 2. expression이 "0"일 때 숫자를 누르면 "0"을 대체
  //         (예: "0" + "5" → "5",  "0" + "." → "0.")
  else if (lastNum === "0") {
    if (num === "0") return; // 0이 연속 입력되는 것 방지
    expression = expression.slice(0, -1) + num;
  }

  // 일반 숫자 입력하기
  else {
    expression += num;
  }

  updateDisplay();
};

// ── 과제 2: 연산자 입력 ─────────────────────────────────────
/**
 * 연산자(+, -, *, /)를 expression 끝에 추가합니다.
 *
 * 구현해야 할 규칙:
 *  1. expression이 비어 있으면 무시 (연산자로 시작 불가)
 *  2. 마지막 문자가 이미 연산자이면 새 연산자로 교체
 *  3. justCalculated가 true이면 이전 결과에 이어서 연산 가능 (expression 유지)
 *
 * @param {string} op - 연산자 문자 ("+", "-", "*", "/")
 */
export const appendOperator = (op) => {
  // 💡 [과제 2] 아래 규칙에 따라 코드를 작성하세요.
  //
  // 규칙 1. expression이 비어 있으면 무시 (연산자로 시작 불가)
  if (expression === "") {
    return; // 아무것도 하지 않고 함수 종료
  }

  // 규칙 3. justCalculated가 true이면 expression을 유지하고 연산자 추가
  //         (= 누른 직후 이어서 계산 가능)
  // justCalculate만 false로 만들고 그냥 기존 그대로 사용하면 됨... expression 뒤에 바로 연산자 안되게 한적 없음.
  if (justCalculated) {
    justCalculated = false;
  }

  let lastChar = expression[expression.length - 1];

  // 규칙 2. 마지막 문자가 이미 연산자이면 새 연산자로 교체
  //         (예: "3+" 상태에서 "*" 누르면 → "3*")
  if (["+", "-", "*", "/"].includes(lastChar)) {
    expression = expression.slice(0, -1) + op;
  }
  // includes 사용하여 축약
  // lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/"
  else {
    expression += op;
  }

  updateDisplay();
};

// ── 과제 3: 계산 실행 ───────────────────────────────────────
/**
 * expression을 계산하여 결과를 화면에 출력합니다.
 *
 * 구현해야 할 규칙:
 *  1. expression이 비어 있거나 연산자로 끝나면 null 반환 (계산 안 함)
 *  2. 0으로 나누기 감지 → subDisplay에 에러 메시지 표시 후 null 반환
 *  3. 성공 시:
 *     - mainDisplay → 결과값
 *     - subDisplay  → "입력한 수식 ="
 *     - justCalculated = true
 *  4. 반환값: { expression, result } 객체 (기록 저장에 사용)
 *
 * 힌트 — 수식 문자열을 안전하게 계산하는 방법:
 *   Function('"use strict"; return (' + expression + ')')()
 *   eval() 과 같은 역할이지만 전역 스코프에 접근하지 않아 조금 더 안전합니다.
 *
 * 힌트 — 부동소수점 오류 처리:
 *   parseFloat(result.toFixed(10)).toString()
 *
 * @returns {{ expression: string, result: string } | null}
 */
export const calculate = () => {
  // 💡 [과제 3] 아래 규칙에 따라 코드를 작성하세요.

  let lastChar = expression[expression.length - 1];

  // 규칙 1. expression이 비어 있거나 연산자로 끝나면 null 반환
  if (["+", "-", "*", "/", ""].includes(lastChar)) // 아래 내용 축약함
  // expression === "" || lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/"
  {
    return null;
  }

  // 규칙 2. 0으로 나누기 감지 → subDisplay에 에러 메시지 표시 후 null 반환
  //         (힌트: /\/0/.test(expression) 으로 감지)
  if (/\/0(?![1-9.])/.test(expression)) {
    subDisplay.textContent = "0으로 나눌 수 없습니다";
    return null;
  }

  // 실제 계산 수행
  const rawResult = Function('"use strict"; return (' + expression + ")")();

  // 부동 소수점 오차 해결 및 문자열로 반환
  const result = parseFloat(rawResult.toFixed(10)).toString();

  // 규칙 3. 계산 성공 시:
  // - mainDisplay.textContent    = 결과값
  mainDisplay.textContent = result;

  //         - mainDisplay.style.fontSize = 결과값 길이에 따라 조정
  mainDisplay.style.fontSize = result.length > 10 ? "1.8rem" : "2.6rem";

  // - subDisplay.textContent     = "수식 ="
  subDisplay.textContent = expression + " =";
  const currentExpression = expression;

  // - justCalculated = true
  justCalculated = true;

  // - expression = 결과값 (이후 연산에 이어 쓸 수 있도록)
  expression = result;

  // 규칙 4. 반환값: { expression: 수식, result: 결과값 문자열 }
  //        (main.js에서 기록 저장에 사용합니다)
  return {
    expression: currentExpression,
    result: result,
  };
};

// ── 과제 4: 마지막 문자 삭제 ────────────────────────────────
/**
 * expression의 마지막 글자 하나를 제거합니다.
 * justCalculated 상태(계산 직후)라면 전체를 초기화합니다.
 */
export const deleteLast = () => {
  // 💡 [과제 4] 아래 규칙에 따라 코드를 작성하세요.
  //
  // 규칙 1. justCalculated가 true이면 전체 초기화 (clearAll 호출)
  //
  if (justCalculated) {
    clearAll();
  }
  // 규칙 2. 그렇지 않으면 expression의 마지막 글자 하나만 제거
  //         (힌트: expression.slice(0, -1))
  else {
    expression = expression.slice(0, -1);
  }

  updateDisplay();
};

// ── 도전 1: % 연산 (선택 과제) ──────────────────────────────
/**
 * 현재 입력된 마지막 숫자를 100으로 나눕니다.
 * 연산자로 끝나거나 expression이 비어 있으면 무시합니다.
 *
 * 예) "50"    → % 클릭 → "0.5"
 *     "100+50" → % 클릭 → "100+0.5"
 *     연산자 뒤에는 동작하지 않습니다.
 *
 * 힌트: expression.lastIndexOf("+") 등으로 마지막 연산자 위치를 찾고
 *       그 뒤의 숫자 부분만 parseFloat(numStr) / 100 으로 교체합니다.
 */
export const appendPercent = () => {
  // 💡 [도전 1] 여기에 코드를 작성하세요.
  // 수식이 비어있으면 무시
  if (!expression) return;

  // 맨 뒤에 있는 숫자(소수점 포함)를 찾습니다.
  const splitNum = expression.split(/[+\-*\/]/);
  const numStr = splitNum[splitNum.length - 1];

  // 맨 뒤가 숫자가 아니면(연산자로 끝나면) 종료
  if (!numStr) return;

  // 100으로 나눈 숫자 계산
  const percentNum = parseFloat(numStr) / 100;
  const changeNum = parseFloat(percentNum.toFixed(10));
  console.log(changeNum);

  // expression의 맨 뒤에 있던 기존 숫자 길이만큼 잘라내고 새 숫자 덧붙이기
  expression = expression.slice(0, -numStr.length) + changeNum;

  updateDisplay();
};

// ── 도전 3: 기록 클릭 시 결과 불러오기 (선택 과제) ──────────
/**
 * 외부에서 expression 값을 직접 설정합니다.
 * 기록 항목을 클릭했을 때 해당 결과를 계산기에 불러오는 데 사용합니다.
 *
 * 힌트: expression = value 로 대입하고
 *       justCalculated = true, updateDisplay() 를 호출합니다.
 */
export const setExpression = (value) => {
  // 💡 [도전 3] 여기에 코드를 작성하세요.
  expression = value;
  justCalculated = true;
  updateDisplay();
};

// ── 전체 초기화 (완성 코드 — 수정 금지) ─────────────────────
export const clearAll = () => {
  expression = "";
  justCalculated = false;
  mainDisplay.textContent = "0";
  mainDisplay.style.fontSize = "2.6rem";
  subDisplay.textContent = "";
  document
    .querySelectorAll(".btn-op")
    .forEach((b) => b.classList.remove("active"));
};
