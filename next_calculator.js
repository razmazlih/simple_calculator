let lastTap;
let lastOperator;
let memoryDisplay;

function isOperator(character) {
    const operators = ['+', '-', '*', '/', '%'];
    return operators.includes(character);
}

// const isPoint = character => character == "."

function input(value) {
    if (isOperator(value)) {
        lastOperator = value;
        memoryDisplay = display.value;
    }
    if (display.value == 0 || isOperator(lastTap)) {
        display.value = "";
    }
    if (display.value.includes(".") && value == ".") {
        lastTap = "point";
        return;
    }
    if (isOperator(value)) {
        lastTap = value
    } else {
        lastTap = "number";
        display.value += value;
    }
}
function clearDisplay() {
    display.value = 0;
    lastTap = "clear";
}
function deleteDigit() {
    if (lastTap == "equals") {
        return;
    }
    display.value = display.value.slice(0, -1);
    lastTap = "delete one";
}

function calculate() {
    let result;
    if (lastOperator == "+") {
        result = memoryDisplay + display.value;
    } else if (lastOperator == "-") {
        result = memoryDisplay - display.value;
    } else if (lastOperator == "*") {
        result = memoryDisplay * display.value;
    } else if (lastOperator == "/") {
        result = memoryDisplay / display.value;
    } else if (lastOperator == "%") {
        result = memoryDisplay % display.value;
    } else {
        console.log(`Error: the lastOperator is ${lastOperator}`);
    }
    display.value = result;
}