import React, {Component} from 'react';
import _ from 'lodash';
import 'bootstrap-scss';
import './cards.scss';
import Card from './Card';
import ContactDetails from '../Contact/ContactDetails';


class Cards extends Component {
    constructor() {
        super();
        this.state = {
            contacts: [
                {firstName: 'Joe', lastName: 'Shmoe', phone: '5552221123', email: 'jshmoe@gmail.com', title: 'Director of Finance'},
                {firstName: 'Jane', lastName: 'Doe', phone: '4159874521', email: 'kdoe@gmail.com', title: 'Sr. Accounts Manager'},
                {firstName: 'Mike', lastName: 'Hannity', phone: '5322221123', email: 'mhannity@gmail.com', title: 'Sales'},
            ],
            selectedContact: null,
            openModal: false,
            isAdd: false,
            isEdit: false,
        }


        this.toggle = this.toggle.bind(this);
        this.getContact = this.getContact.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.isUnique = this.isUnique.bind(this);
    }

    remove(i, e) {
        e.preventDefault();
        this.setState((prevState) => {
           return {
               contacts: prevState.contacts.filter((contact, index) => {
                   return index !== i
               })
            }
        })
    }

    openAddContact(e) {
        e.preventDefault();
        return this.setState({
            openModal: true,
            isAdd: true
        })
    }

    addContact(contact) {
        this.setState(prevState => {
            prevState.contacts.push(contact)
            return {
                contacts: prevState.contacts
            }
        })
    }

    updateContact(original, newContact) {
        this.setState(prevState => {
           let index = prevState.contacts.indexOf(original);
           _.merge(prevState.contacts[index], newContact);
           return {
               contacts: prevState.contacts
           };
        })
    }

    isUnique(contact) {
        return _.findIndex(this.state.contacts, (c)=> { 
            return c.firstName.trim().toUpperCase() === contact.firstName.trim().toUpperCase() 
            && c.lastName.trim().toUpperCase() === contact.lastName.trim().toUpperCase() 
            || c.email.trim().toUpperCase() === contact.email.trim().toUpperCase()})===-1;
    }

    getContact(contact) {
        this.setState({
            selectedContact: contact,
            openModal: true
        })
    }

    getIndex(contact) {
        return this.state.contacts.indexOf(contact);
    }
    

    toggle(e) {
        if(e) {
            e.preventDefault();
        }

        this.setState(prevState => {
            return {
                openModal: !prevState.openModal,
                isAdd: false,
            }
        });
    }

    printCards () {
       return this.state.contacts.map((contact, i) => {
          return <Card key={i} contact={contact} remove={this.remove.bind(this, i)} index={i} getContact={this.getContact}/>
        })
    }

    render () {
        return (
            <div className="row">
                {this.printCards()}
                <div className="add-contact" onClick={this.openAddContact.bind(this)}>
                <span className="add">&#43;</span>
                <p>Add new contact</p>
                </div>
                <ContactDetails openModal={this.state.openModal} isAdd={this.state.isAdd} unique={this.isUnique} toggle={this.toggle} add={this.addContact.bind(this)} update={this.updateContact} contact={this.state.selectedContact} />
            </div>
        );
    };
    
}

export default Cards;