
let addressBookContactJsonObj = {};
let isUpdate;
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
        setaddressBookContactJsonObj();
        if(site_properties.use_local_storage.match(true)){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        }
        else {
            createOrUpdateAddressBookDB();
        }


}

const setaddressBookContactJsonObj = () => {
    if (!isUpdate) addressBookContactJsonObj.id = createContactId();
    addressBookContactJsonObj.name = getValueById('#name');
    addressBookContactJsonObj.phoneNumber = getValueById('#phone');
    addressBookContactJsonObj.address = getValueById('#address');
    addressBookContactJsonObj.city = getValueById('#city');
    addressBookContactJsonObj.state = getValueById('#state');
    addressBookContactJsonObj.zip = getValueById('#zip');
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


const createOrUpdateAddressBookDB = () => {
    postUrl = site_properties.server_url;
    methodType = "POST";
    if(isUpdate){
        methodType="PUT";
        postUrl = postUrl + addressBookContactJsonObj.id.toString();
    }
    makeServiceCall(methodType, postUrl, true, addressBookContactJsonObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}
function checkform()
{
    let formElements = document.getElementById("myform").elements;
    let cansubmit = true;
    for (let i = 0; i < formElements.length-2; i++) {
        if (formElements[i].value.length == 0) cansubmit = false;
    }
    if (cansubmit) {
        document.getElementById('submitButton').disabled = false;
    }
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
const checkForUpdate = () => {
    let contactJson = localStorage.getItem("editContact");
    console.log(contactJson);   
    isUpdate = contactJson ? true : false;
    if (!isUpdate) return;
    addressBookContactJsonObj = JSON.parse(contactJson);
    setForm();
};

const setForm = () => {
    setValue("#name", addressBookContactJsonObj.name);
    setValue("#phone", addressBookContactJsonObj.phoneNumber);
    setValue("#address", addressBookContactJsonObj.address);
    setValue("#city", addressBookContactJsonObj.city);
    setValue("#state", addressBookContactJsonObj.state);
    setValue("#zip", addressBookContactJsonObj.zip);
};