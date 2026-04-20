let input = document.getElementById("inputbox");
let expression = "";

document.querySelector(".calculator").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        handleInput(e.target.innerText);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleInput("=");
    else if (e.key === "Backspace") handleInput("DEL");
    else if (e.key === "Escape") handleInput("AC");
    else if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
        handleInput(e.key);
    }
});

function handleInput(value) {
    let lastChar = expression.slice(-1);
    let result = calculate(expression);

    if (isOperator(value) && isOperator(lastChar)) return;

    if (value === "=") {
    addToHistory(expression, result);
    expression = result.toString();
}
     else if (value === "AC") {
        expression = "";
    } else if (value === "DEL") {
        expression = expression.slice(0, -1);
    } else {
        expression += value;
    }

    input.value = expression;
}

function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char);
}

function calculate(expr) {
    try {
        return Function('"use strict"; return (' + expr + ')')();
    } catch {
        return "Error";
    }
}

let historyList = document.getElementById("historyList");

function addToHistory(expression, result) {
    let li = document.createElement("li");
    li.innerText = `${expression} = ${result}`;
    historyList.prepend(li);
}