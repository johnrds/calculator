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
            return 'not a valid operator';
    };
};