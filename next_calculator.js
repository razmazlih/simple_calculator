display.value = 0;
const operators = ['+', '-', '*', '/', '%'];

let activeOperator;
const allOperators = document.querySelectorAll('.operator');

const lastCharacter = () => display.value[display.value.length - 1];
const isLastOperator = () => operators.includes(lastCharacter());

function addNumber(value) {
    let checkParentheses = display.value[display.value.length - 2] == "(";
    let checkOperator = operators.includes(display.value[display.value.length - 2]);
    let isLastZero = lastCharacter() == "0";
    if (isLastZero && value == "0" && checkParentheses) {
        return;
    }

    if (lastCharacter() != "(" && value == "0" && isLastZero && checkOperator) {
        return;
    }

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
    activeThisOperator()
    display.value = 0;
}

function deleteDigit() {
    activeThisOperator()
    if (display.value.length == 1) {
        display.value = 0;
        return;
    }
    display.value = display.value.slice(0, -1);
}

function activeThisOperator() {
    // הסרת המחלקה 'active' מכל הכפתורים פרט לכפתור שנלחץ
    allOperators.forEach(btn => {
        btn.classList.remove('active-operator');
    });
    let isOperator = String(this.classList).includes("operator");
    // הוספת המחלקה 'active' לכפתור שנלחץ כעת
    if (isOperator) {
        this.classList.add('active-operator');
    }
}

function addOperator(operator) {

    // פונקציה שמטפלת באירוע לחיצה על כל כפתור
    allOperators.forEach(button => {
        button.addEventListener('click', activeThisOperator)
    });


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
    activeThisOperator();
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
    activeThisOperator();
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