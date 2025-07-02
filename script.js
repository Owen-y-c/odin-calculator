/* ---------------------------------------
    INITIAL LOGIC
*/

//define operation position in "screen"
const operationRowTop = document.querySelector("#operationRowTop");
const operationRowBottom = document.querySelector("#operationRowBottom");

let firstOperand = '';   //first  operand is the a in "a+b"
let secondOperand = '';  //second operand is the b in "a+b"

let currentOperation = null;
let shouldResetRowBottom = false;


/*---------------------------------------
    BUTTONS
*/

//*initialize buttons
const buttonsNumber   = document.querySelectorAll("[data-number]");
const buttonsOperator = document.querySelectorAll("[data-operator]");
const buttonEquals    = document.querySelector("#btnEquals");
const buttonClear     = document.querySelector("#btnClear" );
const buttonDelete    = document.querySelector("#btnDelete");
const buttonPoint     = document.querySelector("#btnPoint" );

//*set up button presses
window.addEventListener('keydown', handleKeyboardInput);
buttonEquals.addEventListener('click', evaluate);
buttonClear.addEventListener ('click', clearAllRows);
buttonDelete.addEventListener('click', deleteNumber);
buttonPoint.addEventListener ('click', appendPoint);
buttonsNumber.forEach((button) => {
    button.addEventListener('click', () => {appendNumber(button.textContent)})
})
buttonsOperator.forEach((button) => {
    button.addEventListener('click', () => {setOperation(button.textContent)})
})

/*KEYBOARD INPUT*/
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9)
        {appendNumber(e.key)}
    if (e.key === '.')
        {appendPoint()}
    if (e.key === '=' || e.key === 'Enter')
        {evaluate()}
    if (e.key === 'Backspace')
        {deleteNumber()}
    if (e.key === 'Escape')
        {clearAllRows()}
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        {setOperation(convertOperator(e.key))}
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') {return '÷'}
    if (keyboardOperator === '*') {return '×'}
    if (keyboardOperator === '-') {return '−'}
    if (keyboardOperator === '+') {return '+'}
}

/*BUTTON LOGIC*/
function evaluate(){
    if(currentOperation === null || shouldResetRowBottom) {return}
    if(currentOperation === "÷" && operationRowBottom.textContent === "0"){
        return alert("You cannot divide by 0!")
    }
    secondOperand = operationRowBottom.textContent;
    operationRowBottom.textContent = roundResult(operate(firstOperand, currentOperation, secondOperand))
    operationRowTop.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}
function clearAllRows(){
    operationRowBottom.textContent = "0";
    operationRowTop.textContent = '';
    firstOperand  = '';
    secondOperand = '';
    currentOperation = null;
}
function deleteNumber(){
    operationRowBottom.textContent = operationRowBottom.textContent.toString().slice(0, -1);
    if (operationRowBottom.textContent === '') {
        operationRowBottom.textContent = '0'
    }
}
function appendPoint() {
    if (shouldResetRowBottom) {resetBottomRow()}
    if (operationRowBottom.textContent === ''){operationRowBottom.textContent = '0'}
    if (operationRowBottom.textContent.includes('.')) {return}
    operationRowBottom.textContent += '.';
}

function appendNumber(number) {
    if (operationRowBottom.textContent === '0' || shouldResetRowBottom){resetBottomRow()}
    operationRowBottom.textContent += number;
}

function setOperation(operator) {
    if (currentOperation !== null) {evaluate()}
    firstOperand = operationRowBottom.textContent;
    currentOperation = operator;
    operationRowTop.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetRowBottom = true;
    resetBottomRow();
}

function resetBottomRow(){
    operationRowBottom.textContent = "";
    shouldResetRowBottom = false;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}


/*---------------------------------------
    MATH
*/

function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}

function operate(a, operator, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
    case '+':
        return add(a, b)
    case '−':
        return subtract(a, b)
    case '×':
        return multiply(a, b)
    case '÷':
        return divide(a, b)
    default:
        return null
    }
}