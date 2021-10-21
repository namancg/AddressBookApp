class AddressBookContact{
    id;
    get name() {return this.name; }
    set name(name){
        let nameRegex = RegExp('^[A-Z][a-zA-Z]{2,}([ ][A-Z][a-zA-Z]*)?$');
        if(nameRegex.test(name)) 
            this.name = name;
        else throw "Name is Incorrect";
    }

    get address() { return this.address; }
    set address(address) {
        let addressRegex = RegExp('[a-zA-Z]{3,}(([ ][a-zA-Z]{3,})+)');
        if(addressRegex.test(address))
        this.address = address;
        else throw "Address is Incorrect";
    }

    get phoneNumber() { return this.phoneNumber; }
    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('^(([+]?[1-9][0-9])?)([6-9][0-9]{9})$');
        if(phoneNumberRegex.test(phoneNumber))
            this.phoneNumber = phoneNumber;
        else throw "Phone number is incorrect";
    }
    
    get city() { return this.city; }
    set city(city) {
        this.city = city;
    }

    get state() { return this.state; }
    set state(state) {
        this.state = state;
    }

    get zip() { return this.zip; }
    set zip(zip) {
        let zipRegex = RegExp('(^[0-9]{3})([ ]?)([0-9]{3}$)')
        if(zipRegex.test(zip))
            this.zip = zip;
        else throw "Zip Code is wrong";
    }

    toString() {
        return "Name: "+ this.name+", PhoneNumber: "+ this.phoneNumber+ ", Address: "+ this.address+", City: "+ this.city + ", State: "+ this.state + 
                ", Zip Code: "+ this.zip;
    }
}