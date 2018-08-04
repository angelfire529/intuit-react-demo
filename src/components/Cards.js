import React, {Component} from 'react';
import 'bootstrap-scss';
import './cards.scss';
import Card from './Card';
import ContactDetails from './ContactDetails';

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            contacts: [
                {firstName: 'Joe', lastName: 'Shmoe', phone: '5552221123'},
                {firstName: 'Jane', lastName: 'Doe', phone: '4159874521'},
                {firstName: 'Mike', lastName: 'Hannity', phone: '5322221123'},
            ],
            openModal: false,
            isAdd: false,
            isEdit: false,
        }


        this.toggle = this.toggle.bind(this);
        // this.toggleCollapse = this.toggleCollapse.bind(this);
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

    addContact(e) {
        e.preventDefault();
        return this.setState(prevState => {
            return {
                openModal: !prevState.openModal,
                isAdd: true
            } 
        })
    }

    toggle(e) {
        e.preventDefault();

        this.setState(prevState => {
            return {
                openModal: !prevState.openModal,
                isAdd: false,
                isEdit: false
            }
        });
    }

    // toggleCollapse (i) {
        
    //     this.setState(prevState => {
    //         prevState.collapse[i] = !prevState.collapse[i]
    //         return {
    //             contacts: prevState.collapse
    //         }
    //     })
    // }

    printCards () {
       return this.state.contacts.map((contact, i) => {
          return <Card key={i} contact={contact} remove={this.remove.bind(this, i)}  index={i}/>
        })
    }

    render () {
        return (
            <div className="row">
                {this.printCards()}
                <div className="add-contact" onClick={this.addContact.bind(this)}>
                <span className="add">&#43;</span>
                <p>Add new contact</p>
                </div>
                <ContactDetails openModal={this.state.openModal} isAdd={this.state.isAdd} toggle={this.toggle}/>
            </div>
        );
    };
    
}

export default Cards;