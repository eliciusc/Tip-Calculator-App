
//creat
// const test = document.querySelector('[class=tC]');
// function toInput() {
//     const newInput = document.createElement('input')
//     Object.assign(newInput, {
//         className: 'input-custom',
//         type: 'text',
//         placeholder: '0',
//     })

//     newInput.setAttribute('test', '')
//     test.replaceWith(newInput)

// };

const tipPercentage = document.querySelector("[class=tip_grid]", "div", "input");
tipPercentage.onclick = e => {
    const con = e.target.className;
    if (con === 't') {
       return console.log(e.target.innerHTML);
    } else if (con === 'input-custom') {
        const regex = new RegExp(/^[1-9][0-9]?$|^100$/)
        console.log(e.target.value)
        // if(regex.test(tipPercentage.onkeyup = keyup)){
        //     console.log()          
        // }
    }
}

function keyup(e) {
    let inputTextValue = e.target.value
    return console.log(inputTextValue)
}

const billValue = document.querySelector('[bill]')
billValue.onclick = () => {
    billValue.onkeyup = keyup
}

const numberOfPeople = document.querySelector('[n_people]')
numberOfPeople.onclick = () => {
    numberOfPeople.onkeyup = keyup
}



