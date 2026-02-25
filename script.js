const displayEl = document.getElementById("calc-display");
const historyEl = document.getElementById("calc-history");
const keysEl = document.querySelector(".calculator__keys");

let currentValue = "0";
let storedValue = null;
let pendingOp = null;
let justEvaluated = false;

function formatNumber(value) {
  const [intPart, decimalPart] = value.split(".");
  const int = Number(intPart).toLocaleString("en-US");
  if (decimalPart !== undefined && decimalPart !== "") {
    return `${int}.${decimalPart.slice(0, 8)}`;
  }
  return int;
}

function updateDisplay() {
  displayEl.textContent = formatNumber(currentValue);

  if (storedValue !== null && pendingOp) {
    historyEl.textContent = `${formatNumber(storedValue)} ${opSymbol(
      pendingOp
    )}`;
  } else {
    historyEl.textContent = "";
  }

  updateActiveOpButton();
}

function opSymbol(op) {
  switch (op) {
    case "add":
      return "+";
    case "subtract":
      return "−";
    case "multiply":
      return "×";
    case "divide":
      return "÷";
    default:
      return "";
  }
}

function clearAll() {
  currentValue = "0";
  storedValue = null;
  pendingOp = null;
  justEvaluated = false;
  updateDisplay();
}

function inputDigit(digit) {
  if (justEvaluated) {
    currentValue = digit === "." ? "0." : digit;
    justEvaluated = false;
    return updateDisplay();
  }

  if (digit === ".") {
    if (!currentValue.includes(".")) {
      currentValue += ".";
    }
  } else {
    if (currentValue === "0") {
      currentValue = digit;
    } else if (currentValue === "-0") {
      currentValue = "-" + digit;
    } else {
      currentValue += digit;
    }
  }

  updateDisplay();
}

function setOperator(op) {
  if (pendingOp && !justEvaluated) {
    // chain operations: perform existing op first
    evaluate();
  }

  storedValue = parseFloat(currentValue);
  pendingOp = op;
  justEvaluated = false;
  updateDisplay();
}

function evaluate() {
  if (pendingOp === null || storedValue === null) {
    return;
  }

  const a = storedValue;
  const b = parseFloat(currentValue);
  let result;

  switch (pendingOp) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) {
        currentValue = "0";
        historyEl.textContent = "Cannot divide by 0";
        storedValue = null;
        pendingOp = null;
        justEvaluated = true;
        updateDisplay();
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  currentValue = String(result);
  storedValue = null;
  pendingOp = null;
  justEvaluated = true;
  updateDisplay();
}

function toggleSign() {
  if (currentValue === "0") return;
  if (currentValue.startsWith("-")) {
    currentValue = currentValue.slice(1);
  } else {
    currentValue = "-" + currentValue;
  }
  updateDisplay();
}

function percent() {
  const value = parseFloat(currentValue);
  currentValue = String(value / 100);
  updateDisplay();
}

function handleButtonClick(e) {
  const btn = e.target.closest(".key");
  if (!btn) return;

  const digit = btn.getAttribute("data-digit");
  const action = btn.getAttribute("data-action");

  if (digit !== null) {
    inputDigit(digit);
  } else if (action) {
    switch (action) {
      case "clear":
        clearAll();
        break;
      case "sign":
        toggleSign();
        break;
      case "percent":
        percent();
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        setOperator(action);
        break;
      case "equals":
        evaluate();
        break;
    }
  }
}

function updateActiveOpButton() {
  const opButtons = document.querySelectorAll(".key--op");
  opButtons.forEach((btn) => {
    const btnOp = btn.getAttribute("data-action");
    if (btnOp === pendingOp) {
      btn.classList.add("key--active-op");
    } else {
      btn.classList.remove("key--active-op");
    }
  });
}

function handleKeydown(e) {
  const key = e.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    inputDigit(key);
    pulseMatchingButton(`[data-digit="${key}"]`);
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    const map = {
      "+": "add",
      "-": "subtract",
      "*": "multiply",
      "/": "divide",
    };
    const op = map[key];
    setOperator(op);
    pulseMatchingButton(`[data-action="${op}"]`);
    e.preventDefault();
    return;
  }

  if (key === "Enter" || key === "=") {
    evaluate();
    pulseMatchingButton('[data-action="equals"]');
    e.preventDefault();
    return;
  }

  if (key === "Escape") {
    clearAll();
    pulseMatchingButton('[data-action="clear"]');
    return;
  }

  if (key === "%") {
    percent();
    pulseMatchingButton('[data-action="percent"]');
    return;
  }

  if (key === "Backspace") {
    if (justEvaluated) {
      // if just evaluated, treat backspace as clear
      clearAll();
    } else if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = "0";
    }
    updateDisplay();
    return;
  }
}

function pulseMatchingButton(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  btn.classList.add("is-pressed");
  setTimeout(() => {
    btn.classList.remove("is-pressed");
  }, 120);
}

document.addEventListener("keydown", handleKeydown);
keysEl.addEventListener("click", handleButtonClick);

updateDisplay();
