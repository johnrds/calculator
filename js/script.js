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
        calcDisplay.textContent = a = operate(Number(a), operator, Number(b));
        operatorSelectec = true;
        bSelect = false;
        return;
    };

    if (char === '/' ||
        char === '*' ||
        char === '-' ||
        char === '+' ) {

        if(!operatorSelectec && bSelect){
            calcDisplay.textContent = a = operate(Number(a), operator, Number(b));
            b = '';
        };

        if (operatorSelectec && !bSelect) {
            b = '';
            operator = char;
            bSelect = true;
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
        return;
    };

    if (char === 'Del'){
        if(bSelect){
            calcDisplay.textContent = b = calcDisplay.textContent.slice(0,-1);
        } else{
            calcDisplay.textContent = a = calcDisplay.textContent.slice(0,-1);
        };
        return
    };

    if (char === 'AC') {
        calcDisplay.textContent = '';
        a = '';
        b = '';
        operator='';
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
        b ='';
        operatorSelectec = false;
    } else if (operatorSelectec && !bSelect){
        calcDisplay.textContent = ''
        operatorSelectec = false;
        a ='';
        b = '';
        operator='';
    };

    if (bSelect) {
        b += char;
    } else {
        a += char;
    };
    
    return displayUpdate(char);
};

const calcDisplay = document.querySelector('.display');
const displayUpdate = (char) => {
    if (calcDisplay.textContent.length >= 19) return

    if (char === '.' && calcDisplay.textContent.length === 0) calcDisplay.innerText = 0;

    calcDisplay.innerText += char;
};

const detectKey = (e) => {
    if(e.key === 'Enter'){
        return charMatch('=')
    };
    if(e.key === 'backspace' || e.target.innerText === '⇐'){
        charMatch('Del')
    } else {
        if(e.key.match(/\W|\d/gi)){
            charMatch(e.key|| e.target.innerText)};
        };

};

const Btns = document.querySelectorAll('.btn');
Btns.forEach(button => button.addEventListener('click', detectKey));

window.addEventListener('keydown', detectKey);