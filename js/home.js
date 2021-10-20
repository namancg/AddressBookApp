let contactList;
window.addEventListener("DOMContentLoaded", (event) => {
    contactList = getContactDataFromStorage();
    document.querySelector(".addr-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem("editContact");
});

const getContactDataFromStorage = () => {
    return localStorage.getItem("AddressBookList")
        ? JSON.parse(localStorage.getItem("AddressBookList"))
        : [];
};
const createInnerHtml = () => {
    const headerHtml = `
  <thead>
            <tr>
              <th style="width: 20%">Fullname</th>
              <th style="width: 30%">Address</th>
              <th style="width: 9%">City</th>
              <th style="width: 10%">State</th>
              <th style="width: 9%">Zip Code</th>
              <th style="width: 12%">Phone Number</th>
              <th></th>
            </th>
          </thead>`;
    let innerHtml = "";
    if (!contactList.length == 0) {
        innerHtml = `${headerHtml}`;
        for (const contactData of contactList) {
            innerHtml = `${innerHtml}
          <tr>
          <td>${contactData._name}</td>
          <td>${contactData._address}</td>
          <td>${contactData._city}</td>
          <td>${contactData._state}</td>
          <td>${contactData._zip}</td>
          <td>${contactData._phoneNumber}</td>
          <td>
          <img id="${contactData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
          <img id="${contactData.id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
          </td>
          </tr>
          `;
        }
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
};

const remove = (node) => {
    let contactData = contactList.find(
        (contactPerson) => contactPerson.id == node.id
    );
    if (!contactData) return;
    const index = contactList
        .map((contactPerson) => contactPerson.id)
        .indexOf(contactData.id);
    contactList.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(contactList));
    document.querySelector(".addr-count").textContent = contactList.length;
    createInnerHtml();
};

const update = (node) => {
    let contactData = contactList.find((contactData) => contactData.id == node.id);
    if (!contactData) return;
    localStorage.setItem("editContact", JSON.stringify(contactData));
    window.location.replace(site_properties.add_contact_page);
};