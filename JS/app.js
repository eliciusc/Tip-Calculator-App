//constants
const customTipInput = document.querySelector(".input-custom");
const customTipPreDefined = document.querySelectorAll(".t");
const bill = document.querySelector('.bill');
const numberOfPeople = document.querySelector('.n-people');
const totalPerPerson = document.querySelector(".display2")
const tipPerPerson = document.querySelector('.display1')
const spanError = document.querySelector('p span')
const reset = document.querySelector('button')
const regex = /^[0-9]*([0-9]|[\.])[0-9]*$/

//objects
const statusCalculator= {
    bill: "",
    tip: "",
    people: "",
    totalTipPerson: "$0.00",
    totalPerson: "$0.00",
    showCalc: [false, false, false],
    cantBeZero: '',
    reset: false
};

let statusCalculatorCopy = {...statusCalculator};

//functions

//Display the message error if user tryes to divide by 0
function cantBeZeroError(){
    if(inputSet(numberOfPeople) === 0){
        spanError.innerHTML = "Can't be zero";
        numberOfPeople.setAttribute('error', 'true');
    }else{
        spanError.innerHTML = "";
        numberOfPeople.setAttribute('error', 'false');
    }
}

//Checks if inputs are valid numbers and decimal point
function inputSet(element) {
    let testRegex = regex.test(element.value);
    let valueParsed = element.value;

    //checks for repeated 0 on inputs
    if((valueParsed.charAt(0) === '0') && (valueParsed.charAt(1) === '0')){
        element.value = "0";
    }else if((valueParsed.charAt(0) === '0') && (valueParsed.charAt(1) > '0')){
        element.value = valueParsed.charAt(1);
    }

    if(testRegex === true){
        return parseFloat(valueParsed);
    }else{
        let temp = valueParsed.substring(0, (valueParsed.length - 1));
        element.value = temp;
    }
}

//Checks if pre-defined inputs were selected
const clicked = () => 
    document.querySelectorAll('.clicked').forEach(t => t.setAttribute("class", "t"));

//Reset the calculator
function resetCalc(obj){
    clicked() ;
    statusCalculatorCopy = {...obj};

    bill.value = obj.bill;
    customTipInput.value = obj.tip;
    numberOfPeople.value = obj.people;
    tipPerPerson.innerHTML = obj.totalTipPerson;
    totalPerPerson.innerHTML = obj.totalPerson;
    spanError.innerHTML = obj.cantBeZero;
    statusCalculatorCopy.showCalc = [false, false, false];

    numberOfPeople.setAttribute('error', 'false')
    reset.setAttribute("class", "disabled")
}

//Calculates tip amount and total per person
function calculate(obj){
    reset.setAttribute("class", "")
    obj.reset = true;

    //check if all inputs were inserted
    const checker = arr => arr.every(item => item === true)
    if(checker(obj.showCalc) === true){
        obj.totalTipPerson = (((obj.bill * obj.tip) / 100) / obj.people).toFixed(2);
        obj.totalPerson = ((obj.bill + (obj.totalTipPerson * obj.people)) / obj.people ).toFixed(2);
        
        if(isNaN(obj.totalPerson) === true){
            totalPerPerson.innerHTML = "$0.00";
            tipPerPerson.innerHTML = "$0.00";
        }else{
            totalPerPerson.innerHTML = `$${obj.totalPerson}`;
            tipPerPerson.innerHTML = `$${obj.totalTipPerson}`;
        }
    }
}

//Events
bill.addEventListener('input', e => {
    statusCalculatorCopy.bill = inputSet(bill);
    statusCalculatorCopy.showCalc[0] = true;
    calculate(statusCalculatorCopy);
})

customTipInput.addEventListener('input', e => {
    clicked();
    statusCalculatorCopy.tip = inputSet(customTipInput);
    statusCalculatorCopy.showCalc[1] = true ;
    calculate(statusCalculatorCopy);
})

customTipPreDefined.forEach(item => {item.addEventListener('click', e => {
    let temp = item.innerHTML;
    statusCalculatorCopy.tip = parseFloat(temp.slice(0, temp.length -1));
    statusCalculatorCopy.showCalc[1] = true;

    clicked()
    //If a pre-defined tip was selected unselect the previous option 
    if(item.className === "t"){
        item.setAttribute("class", "clicked");
        customTipInput.value= "";
    }
    calculate(statusCalculatorCopy);
    })
})

numberOfPeople.addEventListener('input', e => {
    cantBeZeroError()
    statusCalculatorCopy.people = inputSet(numberOfPeople);
    statusCalculatorCopy.showCalc[2] = true;
    calculate(statusCalculatorCopy);
})

reset.addEventListener("click", e => {
    if(statusCalculatorCopy.reset === true){
        resetCalc(statusCalculator);
    }
})

window.onload = resetCalc(statusCalculator);
