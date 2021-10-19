window.addEventListener('DOMContentLoaded', (event) => {
    const fullName = document.querySelector('#fullName');
    fullName.addEventListener('input', function() {
        if (fullName.value.length == 0) {
            setTextValue('.text-error', "");
            return
        }
        try {
            checkFullName(fullName.value)
            setTextValue('.text-error', "");
        } catch (e) {
            setTextValue('.text-error', e);
        }
    });

    const phoneNo = document.querySelector('#tel');
    phoneNo.addEventListener('input', function() {
        if (phoneNo.value.length == 0) {
            setTextValue('.mobno-error', "");
            return;
        }
        try {
            checkPhoneNo(phoneNo.value);
            setTextValue('.mobno-error', "");
        } catch (e) {
            setTextValue('.mobno-error', e);
        }
    });

    const address = document.querySelector('#address');
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            setTextValue('.address-error', "");
            return;
        }
        try {
            checkAddress(address.value);
            setTextValue('.address-error', "");
        } catch (e) {
            setTextValue('.address-error', e);
        }
    });
    
    const setTextValue = (id, value) => {
        const element = document.querySelector(id);
        element.textContent = value;
    }
});