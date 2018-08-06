

class Contact {
    constructor(fName='', lName='', email='', phone='', title='', img=undefined, collapse=false) {
        this.firstName = fName;
        this.lastName = lName;
        this.email = email;
        this.phone = phone;
        this.title = title;
        this.img = img;
        this.collapse = this.collapse;
    }
}

export default Contact;