//constants
const customTipInput = document.querySelector(".input-custom");
const customTipDiv = document.querySelectorAll(".t");
const bill = document.querySelector('.bill');
const numberOfPeople = document.querySelector('[n_people]');
const total = document.querySelector("[test]")
const reset = document.querySelector('.reset_button')

let statusCalculator= {
    bill: 0,
    tip: 0,
    people: 0,
    totalTipPerson: 0,
    totalPerson: 0,
    showCalc: [false, false, false],
    reset: false
}

//functions

function resetCalc(obj){
    bill.value = ""
    customTipInput.value= ""
    numberOfPeople.value= ""
}

function checkCalcStatus(obj){
    if(obj.reset === true){
        
    }
}

function calculate(obj){

    const checker = arr => arr.every(item => item === true)
    if(checker(obj.showCalc) === true){
        obj.reset = true
        obj.totalTipPerson = (((obj.bill * obj.tip) / 100) / obj.people).toFixed(2)
        obj.totalPerson = (obj.bill + (obj.totalTipPerson * obj.people)).toFixed(2)

        console.log(obj)
    }
    
}

//Events

bill.addEventListener('input', e => {
    e.preventDefault()
    statusCalculator.bill = parseFloat(bill.value)
    statusCalculator.showCalc[0] = true
    calculate(statusCalculator)
})

customTipInput.addEventListener('input', e => {
    e.preventDefault()
    statusCalculator.tip = parseFloat(customTipInput.value)
    statusCalculator.showCalc[1] = true 
    calculate(statusCalculator)
})


customTipDiv.forEach(item => {item.addEventListener('click', e => {
    e.preventDefault()
    let temp = item.innerHTML
    statusCalculator.tip = parseFloat(temp.slice(0, temp.length -1))
    statusCalculator.showCalc[1] = true
    calculate(statusCalculator)
    })
})

numberOfPeople.addEventListener('input', e => {
    e.preventDefault()
    statusCalculator.people = parseFloat(numberOfPeople.value)
    statusCalculator.showCalc[2] = true
    calculate(statusCalculator)
})

window.onload = resetCalc(statusCalculator)
