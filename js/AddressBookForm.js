let addressBookContactJsonObj = {};

window.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookContact()).name = name.value;
            textError.textContent = "";
        }
        catch (e) {
            textError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function () {
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new AddressBookContact()).phoneNumber = phone.value;
            phoneError.textContent = "";
        }
        catch (e) {
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new AddressBookContact()).address = address.value;
            addressError.textContent = "";
        }
        catch (e) {
            addressError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            zipError.textContent = "";
            return;
        }
        try {
            (new AddressBookContact()).zip = zip.value;
            zipError.textContent = "";
        }
        catch (e) {
            zipError.textContent = e;
        }
    });
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setaddressBookContactJsonObj();
        createAndUpdateStorage();
        resetForm();
    }
    catch (e) {
        return;
    }
}

const setaddressBookContactJsonObj = () => {
    addressBookContactJsonObj.id = createContactId();
    addressBookContactJsonObj._name = getValueById('#name');
    addressBookContactJsonObj._phoneNumber = getValueById('#phone');
    addressBookContactJsonObj._address = getValueById('#address');
    addressBookContactJsonObj._city = getValueById('#city');
    addressBookContactJsonObj._state = getValueById('#state');
    addressBookContactJsonObj._zip = getValueById('#zip');
}

const setContactData = () => {
    let contact = new AddressBookContact();
    contact.id = addressBookContactJsonObj.id;
    const textError = document.querySelector('.text-error');
    try {
        contact._name = addressBookContactJsonObj._name;
    }
    catch (e) {
        textError.textContent = e;
        throw e;
    }
    const phoneError = document.querySelector('.phone-error');
    try {
        contact._phoneNumber = addressBookContactJsonObj._phoneNumber;
    }
    catch (e) {
        phoneError.textContent = e;
        throw e;
    }
    const addressError = document.querySelector('.address-error');
    try {
        contact._address = addressBookContactJsonObj._address;
    }
    catch (e) {
        addressError.textContent = e;
        throw e;
    }
    contact._city = addressBookContactJsonObj._city;
    contact._state = addressBookContactJsonObj._state;
    const zipError = document.querySelector('.zip-error');
    try {
        contact._zip = addressBookContactJsonObj._zip;
    }
    catch (e) {
        zipError.textContent = e;
        throw e;
    }
    alert(contact.toString());
    return contact;
}
const createAndUpdateStorage = () => {
    let addressBookContactList = JSON.parse(localStorage.getItem("AddressBookContactList"));
    if (addressBookContactList) {
        addressBookContactList.push(setContactData());
    }
    else {
        addressBookContactList = [setContactData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookContactList));
}

const createContactId = () => {
    let contactID = localStorage.getItem("ContactID");
    contactID = !contactID ? "1" : (parseInt(contactID) + 1).toString();
    localStorage.setItem("ContactID", contactID);
    return contactID;
}

const getValueById = (value) => {
    return document.querySelector(value).value;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zip', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}