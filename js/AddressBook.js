const fullName = document.querySelector('#fullName');
const textError = document.querySelector('.text-error');
fullName.addEventListener('input', function() {
    let nameRegex = RegExp(/^[A-Z][a-z]{2,}/);
    if (nameRegex.test(fullName.value))
        textError.textContent = "";
    else textError.textContent = "Name is Incorrect";
});

const address = document.querySelector('#address');
const addressError = document.querySelector('.address-error');
fullName.addEventListener('input', function() {
    let words = address.split(" ");
    let addressPattern = RegExp('([A-Z a-z 0-9]{3,})+');
    for (const word of words) {
        if (!addressPattern.test(word))
            throw 'Invalid Address !';
    }
});


const number = document.querySelector('#tel');
const numberError = document.querySelector('.mobno-error');
number.addEventListener('input', function() {
    let numberRegex = RegExp('^[0-9]{1,2}\\s[0-9]{10}$');
    if (numberRegex.test(number.value))
        numberError.textContent = "";
    else numberError.textContent = "Mobile number is Incorrect";
});