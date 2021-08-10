

function toInput(){
    const newInput = document.createElement('input')
    Object.assign(newInput, {
        className: 'input-custom',
        type: 'text',
        placeholder: '0',
        test: ''
    })

    test.replaceWith(newInput)
    test.getElementsByClassName('input-custom').value = 0
};

const test = document.querySelector('[tip-custom]');
test.onclick = toInput
