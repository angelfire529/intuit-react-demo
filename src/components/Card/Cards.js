import React, {Component} from 'react';
import _ from 'lodash';
// import './cards.scss';
import {Card} from './Card';
import ContactDetails from '../Contact/ContactDetails';
import ContactsService from '../../services/ContactsService';
import {isUnique} from "./Util";


class Cards extends Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
            selectedContact: null,
            openModal: false,
            isAdd: false,
        }


        this.toggle = this.toggle.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.getContact = this.getContact.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.isUnique = this.isUnique.bind(this);
        this.formatPhone = this.formatPhone.bind(this);
        this.onExit = this.onExit.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    componentWillMount() {
        ContactsService.GetContacts()
        .then( response => {
            this.setState({
                contacts: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
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
        contact.phone = this.formatPhone(contact.phone);
        //
        this.setState(prevState => {
            //TODO: how would you do this without mutation?
            prevState.contacts.push(contact)
            return {
                contacts: prevState.contacts
            }
        })
    }

    updateContact(original, newContact) {
        newContact.phone = this.formatPhone(newContact.phone);
        this.setState(prevState => {
            //TODO: time complexity?, how do you make this O(1)?
           let index = prevState.contacts.indexOf(original);
           _.merge(prevState.contacts[index], newContact);
           return {
               contacts: prevState.contacts,

           };
        })
    }

    isUnique(contact) {
			return isUnique(this.state.contacts, contact);
    }

    formatPhone (phoneNumber) {
        const number = phoneNumber.match(/\d/g);
        return number.join('');
    }

    getContact(contact) {
        this.setState({
            selectedContact: contact,
            openModal: true,
            isAdd: false
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
            }
        });
    }

    toggleCollapse(index){
        this.setState(prevState => {
            prevState.contacts[index].collapse = !prevState.contacts[index].collapse; 
            return {
                contacts: prevState.contacts
            }
        })
    }

    onExit() {
        this.setState(prevState => {
            return {
                isAdd: false,
            }
        });
    }

    printCards () {
       return this.state.contacts.map((contact, i) => {
          return <Card key={i} contact={contact} remove={this.remove.bind(this, i)} index={i} collapse={contact.collapse} getContact={this.getContact} toggle={this.toggleCollapse}/>
        })
    }

    render () {
        return (
            <div className="row">
                {this.printCards()}
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 add-contact" onClick={this.openAddContact.bind(this)}>
                <span className="add">&#43;</span>
                <p>Add new contact</p>
                </div>
                <ContactDetails openModal={this.state.openModal} isAdd={this.state.isAdd} unique={this.isUnique} 
                toggle={this.toggle} onExit={this.onExit} add={this.addContact} update={this.updateContact} 
                contact={this.state.selectedContact} formatPhone={this.formatPhone}/>
            </div>
        );
    };
    
}

export default Cards;