let contactList;
window.addEventListener("DOMContentLoaded", (event) => {
  if (site_properties.use_local_storage.match("true")) {
    getContactDataFromStorage();
  } else {
    getContactDataFromServer();
  }
});

const getContactDataFromStorage = () => {
  contactList = localStorage.getItem("AddressBookList")
    ? JSON.parse(localStorage.getItem("AddressBookList"))
    : [];
  processContactDataResponse();
};

const processContactDataResponse = () => {
  document.querySelector(".addr-count").textContent = contactList.length;
  createInnerHtml();
  localStorage.removeItem("editContact");
};

const getContactDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((responseText) => {
      contactList = JSON.parse(responseText);
      //console.log(contactList)
      processContactDataResponse();
    })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      contactList = [];
      processContactDataResponse();
    });
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
  if (site_properties.use_local_storage) {
    localStorage.setItem("AddressBookList", JSON.stringify(contactList));
    document.querySelector(".addr-count").textContent = contactList.length;
    createInnerHtml();
  } else {
    const deleteURL = site_properties.server_url + contactData.id.toString();
    makeServiceCall("DELETE", deleteURL, false)
      .then((responseText) => {
        document.querySelector(".addr-count").textContent = contactList.length;
        createInnerHtml();
      })
      .catch((error) => {
        console.log("DELETE error status: " + JSON.stringify(error));
      });
  }
};

const update = (node) => {
  let contactData = contactList.find((data) => data.id == node.id);
  if (!contactData) return;
  localStorage.setItem("editContact", JSON.stringify(contactData));
  window.location.replace(site_properties.add_contact_page);
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
          <td>${contactData.name}</td>
          <td>${contactData.address}</td>
          <td>${contactData.city}</td>
          <td>${contactData.state}</td>
          <td>${contactData.pincode}</td>
          <td>${contactData.phone}</td>
          <td>
          <img id="${contactData.id}" onclick="remove(this)" alt="delete" src="../assets/delete.svg">
          <img id="${contactData.id}" alt="edit" onclick="update(this)" src="../assets/edit.svg">
          </td>
          </tr>
          `;
    }
  }
  document.querySelector("#table-display").innerHTML = innerHtml;
};

