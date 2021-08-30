//constants
const customTipInput = document.querySelector(".input-custom");
const customTipDiv = document.querySelectorAll(".t");
const bill = document.querySelector('.bill');
const numberOfPeople = document.querySelector('[n_people]');
const totalPerPerson = document.querySelector(".display2")
const tipPerPerson = document.querySelector('.display1')
const reset = document.querySelector('button')

//objects

const statusCalculator= {
    bill: "",
    tip: "",
    people: "",
    totalTipPerson: "$0.00",
    totalPerson: "$0.00",
    showCalc: [false, false, false],
    reset: false
}

let statusCalculatorCopy = {...statusCalculator}

//functions

function inputSet(element) {
    let valueParsed = parseFloat(element.value)
    if(isNaN(valueParsed) === false){
        return valueParsed
    }else{
        element.value = ""
        alert("Only number allowed")
    }
}

const clicked = () => 
    document.querySelectorAll('.clicked').forEach(t => t.setAttribute("class", "t"))

function resetCalc(obj){
    clicked() 
    statusCalculatorCopy = {...obj}

    bill.value = obj.bill
    customTipInput.value = obj.tip
    numberOfPeople.value = obj.people
    tipPerPerson.innerHTML = obj.totalTipPerson
    totalPerPerson.innerHTML = obj.totalPerson
    statusCalculatorCopy.showCalc = [false, false, false]

    reset.setAttribute("class", "disabled")
}

function calculate(obj){
    reset.setAttribute("class", "")
    obj.reset = true

    const checker = arr => arr.every(item => item === true)
    if(checker(obj.showCalc) === true){
        obj.reset = true
        obj.totalTipPerson = (((obj.bill * obj.tip) / 100) / obj.people).toFixed(2)
        obj.totalPerson = (obj.bill + (obj.totalTipPerson * obj.people)).toFixed(2)

        totalPerPerson.innerHTML = `$${obj.totalPerson}`
        tipPerPerson.innerHTML = `$${obj.totalTipPerson}`
    }
    
    console.log(obj)

}

//Events

bill.addEventListener('input', e => {
    statusCalculatorCopy.bill = inputSet(bill)
    statusCalculatorCopy.showCalc[0] = true
    calculate(statusCalculatorCopy)
})

customTipInput.addEventListener('input', e => {
    clicked()
    statusCalculatorCopy.tip = inputSet(customTipInput)
    statusCalculatorCopy.showCalc[1] = true 
    calculate(statusCalculatorCopy)
})


customTipDiv.forEach(item => {item.addEventListener('click', e => {
    let temp = item.innerHTML
    statusCalculatorCopy.tip = parseFloat(temp.slice(0, temp.length -1))
    statusCalculatorCopy.showCalc[1] = true

    clicked() 
    if(item.className === "t")
        item.setAttribute("class", "clicked")
    
    calculate(statusCalculatorCopy)
    })
})

numberOfPeople.addEventListener('input', e => {
    statusCalculatorCopy.people = inputSet(numberOfPeople)
    statusCalculatorCopy.showCalc[2] = true
    calculate(statusCalculatorCopy)
})

reset.addEventListener("click", e => {
    if(statusCalculatorCopy.reset === true){
        resetCalc(statusCalculator)
    }
})

window.onload = resetCalc(statusCalculator)
