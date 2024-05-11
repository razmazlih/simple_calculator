display.value = 0
const operators = ['+', '-', '*', '/', '%'];

const lastCharacter = () => display.value[display.value.length - 1];
const isLastOperator = () => operators.includes(lastCharacter());

function addNumber(value) {
    if (lastCharacter() == ")") {
        return;
    }

    if (display.value == 0 && display.value.length == 1) {
        display.value = value;
        return;
    }
    display.value += value;
}

function clearDisplay() {
    display.value = 0;
}

function deleteDigit() {
    if (display.value.length == 1) {
        display.value = 0;
        return;
    }
    display.value = display.value.slice(0, -1);
}

function addOperator(operator) {
    if (lastCharacter() == "(") {
        return;
    }

    if (isLastOperator()) {
        deleteDigit();
    }
    display.value += operator;
}

function addPoint() {

    if (isLastOperator() || lastCharacter() == "(") {
        display.value += "0.";
        return;
    }

    let noPoint = !display.value.includes(".");
    if (noPoint) {
        display.value += ".";
        return;
    }

    let lastCheck;

    for (let character = display.value.length; character != 0; character--) {
        lastCheck = display.value[character];
        if (operators.includes(lastCheck)) {
            display.value += ".";
            return;
        } else if (lastCheck == ".") {
            return;
        }
    }
}

function parentheses() {
    let isParentheses = display.value.includes("(");

    if (!isLastOperator() && !isParentheses) {
        display.value += "*";
    }

    if (!display.value.includes("(")) {
        display.value += "(";
        return;
    }

    for (let character = display.value.length; character != 0; character--) {
        lastCheck = display.value[character];
        if (lastCheck == "(") {
            if (lastCharacter() == "(" || isLastOperator()) {
                return;
            }
            display.value += ")";
            return;
        } else if (lastCheck == ")") {
            if (!isLastOperator()) {
                display.value += "*";
            }
            display.value += "(";
            return;
        }
    }

}

function calculate() {
    if (display.value.includes("(")) {
        for (let character = display.value.length; character != 0; character--) {
            lastCheck = display.value[character];
            if (lastCheck == "(") {
                display.value += ")";
                break;
            } else if (lastCheck == ")") {
                break;
            }
        }
    }

    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = "Error";
    }
}
