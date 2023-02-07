let a = ''
    , b = ''
    , operator = ''
    , operatorSelectec = false
    , bSelect = false
    , didOperate = false;

const lowerDisplay = document.querySelector('.newNumber')
    , upperDisplay = document.querySelector('.prevNumbers');

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return `${Math.round(((Number(a) + Number(b)) + Number.EPSILON) * (10 ** 5)) / (10 ** 5)}`
        case '-':
            return `${Math.round(((Number(a) - Number(b)) + Number.EPSILON) * (10 ** 5)) / (10 ** 5)}`
        case '*':
            return `${Math.round(((Number(a) * Number(b)) + Number.EPSILON) * (10 ** 5)) / (10 ** 5)}`
        case '/':
            return `${Math.round(((Number(a) / Number(b)) + Number.EPSILON) * (10 ** 5)) / (10 ** 5)}`
    };
};

function numberChar(number) {
    if (didOperate) specialChar('AC');
    if (a.length > 10 && !bSelect || b.length > 10 && bSelect) return

    if (bSelect) {
        if (b === 0 || b === '0') b = ''
        lowerDisplay.textContent = b += number
    } else {
        if (a === 0 || a === '0') a = ''
        lowerDisplay.textContent = a += number
    };
};

function operatorChar(char) {
    if (a === '') return
    if (b === '') {
        bSelect = true;
    } else if (!didOperate) {
        a = operate(a, operator, b);
        b = '';
    } else { b = '' };

    operatorSelectec = true;
    didOperate = false;
    operator = char;
    upperDisplay.textContent = `${a} ${operator}`;
};

function doOperation() {
    if (a === '') return
    if (!operatorSelectec) {
        if (b != '') a = b
        bSelect = true
        didOperate = true;
        upperDisplay.textContent = `${a} =`;
        b = '';
        return
    };
    if (b === '') b = a
    upperDisplay.textContent = `${a} ${operator} ${b} = `;
    lowerDisplay.textContent = a = operate(a, operator, b);
    didOperate = true;
};

function specialChar(char) {
    switch (char) {
        case '⇐':
        case 'Backspace':
            if (bSelect && !didOperate) {
                (lowerDisplay.textContent.length === 1)
                    ? lowerDisplay.textContent = b = '0'
                    : lowerDisplay.textContent = b = lowerDisplay.textContent.slice(0, -1)
            } else if (!didOperate) {
                (lowerDisplay.textContent.length === 1)
                    ? lowerDisplay.textContent = a = '0'
                    : lowerDisplay.textContent = a = lowerDisplay.textContent.slice(0, -1)
            };
            return
        case 'AC':
        case 'Delete':
            lowerDisplay.textContent
                = upperDisplay.textContent
                = operator
                = a
                = b = '';
            operatorSelectec
                = bSelect
                = didOperate = false;
            return
        case '.':
            if (didOperate) {
                if (a.includes('.')) return
            };
            if (a.length > 10 && !bSelect || b.length > 10 && bSelect) return
            if (bSelect) {
                if (b.includes('.')) return;
                if (b === '') b = lowerDisplay.textContent = '0';
                lowerDisplay.textContent = b += '.'
            } else {
                if (a.includes('.')) return;
                if (a === '') a = lowerDisplay.textContent = '0';
                lowerDisplay.textContent = a += '.'
            };
            didOperate = false;
            return
        case '%':
            lowerDisplay.textContent = a = `${Math.round(((Number(lowerDisplay.textContent) / 100) + Number.EPSILON) * (10 ** 5)) / (10 ** 5)}`
            return
        case '+/-':
            lowerDisplay.textContent = a = `${Math.round(((Number(lowerDisplay.textContent) * -1) + Number.EPSILON) * (10 ** 5)) / (10 ** 5)}`
            return
    };
};

const detectKey = (e) => {
    if (e.key.match(/[0-9]/gi)) return numberChar(e.key);
    if (e.key === 'Delete' || e.key === 'Backspace' || e.key === '.' || e.key === "%") return specialChar(e.key);
    if (e.key.match(/\/|\*|-|\+/gi)) return operatorChar(e.key);
    if (e.key === 'Enter' || e.key === '=') return doOperation();
};

const buttonKey = (e) => {
    if (e.target.textContent.match(/[0-9]/gi)) return numberChar(e.target.textContent);
    if (e.target.textContent.match(/AC|\.|⇐|\+\/-|%/gi)) return specialChar(e.target.textContent);
    if (e.target.textContent.match(/\/|\*|-|\+/gi)) return operatorChar(e.target.textContent);
    if (e.target.textContent = '=') return doOperation();
};

const Btns = document.querySelectorAll('.btn');
Btns.forEach(button => button.addEventListener('click', buttonKey));

window.addEventListener('keydown', detectKey);