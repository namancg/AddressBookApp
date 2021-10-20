
let addressBookContactJsonObj = {};
let isUpdate = false;
window.addEventListener('DOMContentLoaded', () => {

    const name = document.getElementById('name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
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
            checkPhoneNumber(phone.value);
            phoneError.textContent = "";
        }
        catch (e) {
            phoneError.textContent = e; <img id="${contact.id}" class="edit-icon" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg"></img>
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
            checkAddress(address.value);
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
            checkZip(zip.value);
            zipError.textContent = "";
        }
        catch (e) {
            zipError.textContent = e;
        }
    });
    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setaddressBookContactJsonObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page)
    }
    catch (e) {
        return;
    }


}

const setaddressBookContactJsonObj = () => {
    if (!isUpdate) addressBookContactJsonObj.id = createContactId();
    addressBookContactJsonObj._name = getValueById('#name');
    addressBookContactJsonObj._phoneNumber = getValueById('#phone');
    addressBookContactJsonObj._address = getValueById('#address');
    addressBookContactJsonObj._city = getValueById('#city');
    addressBookContactJsonObj._state = getValueById('#state');
    addressBookContactJsonObj._zip = getValueById('#zip');
}

const createAndUpdateStorage = () => {
    let addressBookContactList = JSON.parse(localStorage.getItem("AddressBookList"));

    if (addressBookContactList) {
        if (isUpdate) {
            const index = addressBookContactList.map((data) => data.id).indexOf(addressBookContactJsonObj.id);
            addressBookContactList.splice(index, 1, addressBookContactJsonObj);
        } else {
            addressBookContactList.push(addressBookContactJsonObj);
        }
    } else {
        addressBookContactList = [addressBookContactJsonObj];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookContactList));
};


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
const checkForUpdate = () => {
    let contactJson = localStorage.getItem("editContact");
    isUpdate = contactJson ? true : false;
    if (!isUpdate) return;
    addressBookContactJsonObj = JSON.parse(contactJson);
    setForm();
};

const setForm = () => {
    setValue("#name", addressBookContactJsonObj._name);
    setValue("#phone", addressBookContactJsonObj._phoneNumber);
    setValue("#address", addressBookContactJsonObj._address);
    setValue("#city", addressBookContactJsonObj._city);
    setValue("#state", addressBookContactJsonObj._state);
    setValue("#zip", addressBookContactJsonObj._zip);
};