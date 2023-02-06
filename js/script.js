const calcAdd = (a, b) => a + b;
const calcSubtract = (a, b) => a - b;
const calcMultiply = (a, b) => a * b;
const calcDivide = (a, b) => a / b;

const operate = (a, operator, b) => {
    switch (operator) {
        case '+':
            return calcAdd(a, b);
        case '-':
            return calcSubtract(a, b);
        case '*':
            return calcMultiply(a, b);
        case '/':
            return calcDivide(a, b);
        default:
            return 0;
    };
};

let a = '',
    b = '',
    operator = '',
    operatorSelectec = false,
    bSelect = false;

const charMatch = (char) => {
    if (char === '=' && calcDisplay.textContent === '') return
    if (char === '=' && operator === '') return

    if (char === '=') {
        a = operate(Number(a), operator, Number(b));
        operatorSelectec = true;
        bSelect = false;
        prevCalc.textContent = `${a} ${operator}`;
        return;
    };

    if (char === '/' ||
        char === '*' ||
        char === '-' ||
        char === '+') {

        if (!operatorSelectec && bSelect) {
            calcDisplay.textContent = a = operate(Number(a), operator, Number(b));
            b = '';
        };

        if (operatorSelectec && !bSelect) {
            operator = char;
            bSelect = true;
            prevCalc.textContent = `${a} ${operator}`;
            return;
        };

        if (operatorSelectec) {
            calcDisplay.textContent = a = operate(Number(a), operator, Number(b));
            operatorSelectec = false;
        } else {
            operatorSelectec = true;
            bSelect = true
        };

        operator = char
        prevCalc.textContent = `${a} ${operator}`;
        b = a;
        return;
    };

    if (char === 'Del') {
        if (bSelect) {
            calcDisplay.textContent = b = calcDisplay.textContent.slice(0, -1);
        } else {
            calcDisplay.textContent = a = calcDisplay.textContent.slice(0, -1);
        };
        return
    };

    if (char === 'AC') {
        calcDisplay.textContent = '';
        a = '';
        b = '';
        operator = '';
        prevCalc.textContent = '';
        operatorSelectec = false;
        bSelect = false;
        return;
    };

    if (char === '%') {
        if (bSelect) {
            return b = calcDisplay.textContent = Number(calcDisplay.textContent) / 100;
        } else {
            return a = calcDisplay.textContent = Number(calcDisplay.textContent) / 100;
        };
    };

    if (char === '+/-') {
        if (bSelect) {
            return b = calcDisplay.textContent = Number(calcDisplay.textContent) * -1;
        } else {
            return a = calcDisplay.textContent = Number(calcDisplay.textContent) * -1;
        };
    };

    if (operatorSelectec && bSelect) {
        calcDisplay.textContent = ''
        b = '';
        operatorSelectec = false;
    } else if (operatorSelectec && !bSelect) {
        calcDisplay.textContent = ''
        operatorSelectec = false;
        prevCalc.textContent='';
        a = '';
        b = '';
        operator = '';
    };

    if (bSelect) {
        b += char;
    } else {
        a += char;
    };

    return displayUpdate(char);
};

const calcDisplay = document.querySelector('.newNumber');
const prevCalc = document.querySelector('.prevNumbers');
const displayUpdate = (char) => {
    if (calcDisplay.textContent.length >= 19) return

    if (char === '.' && calcDisplay.textContent.length === 0) calcDisplay.innerText = 0;

    calcDisplay.innerText += char;
};

const detectKey = (e) => {
    if (e.key === "'" || e.key === ',' || e.key === 'Space') return;

    if (e.key === 'Enter') {
        return charMatch('=')
    };
    if (e.key === 'Backspace') {
        charMatch('Del')
    } else {
        if (e.key.match(/\d|\W/gi)) {
            charMatch(e.key)
        };
    };

};

const buttonKey = (e) => {
    if (e.target.innerText === '⇐') {
        charMatch('Del')
    } else {
        charMatch(e.target.innerText);
    };
}

const Btns = document.querySelectorAll('.btn');
Btns.forEach(button => button.addEventListener('click', buttonKey));

window.addEventListener('keydown', detectKey);