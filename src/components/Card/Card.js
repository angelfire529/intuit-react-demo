import React, {Component} from 'react';
import 'bootstrap-scss';

import { Collapse, Button, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './card.scss';

class Card extends Component{
    
    constructor(props) {
        super(props);
        this.props = props;
        
        this.state = {
            collapse: false
        }
    }

    toggle() {
        this.setState(prevState => {
            return {
                collapse: !prevState.collapse
            }
        })
    }

    toggleIcon() {
        if(this.state.collapse) {
            return "angle-up";
        }

        return "angle-down";
    }

    show () {
        if(!this.state.collapse) {
            return 'hidden';
        }
        else {
            return 'show'
        }
    }

    showEdit(contact, e) {
        this.props.getContact(contact);
    }

    formatPhone (number) {
        return `(${number.substring(0,3)}) ${number.substring(3,6)}-${number.substring(6)}`
    }


        
    render() {
        const imgSrc = !this.props.contact.img ? 'http://placehold.it/700x400' : this.props.contact.img
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 portfolio-item">
                <div className="card h-100">
                <button type="button" className="close close-right-top" aria-label="Close" onClick={this.props.remove}><span aria-hidden="true">&times;</span></button>
                <img className="card-img-top" src={imgSrc} alt="" />
                <div className="card-body card-body--toggle">
                <FontAwesomeIcon icon="edit" className="card-edit"  pull="right" onClick={this.showEdit.bind(this, this.props.contact)}/>
                    <h4 className="card-title" onClick={this.toggle.bind(this)}>
                    {this.props.contact.firstName} {this.props.contact.lastName}&nbsp;&nbsp;<FontAwesomeIcon icon={this.toggleIcon()} />
                    </h4>
                   <Collapse isOpen={this.state.collapse}>
                   <div>
                    <Label className="text--bold">Email</Label>
                    <p>{this.props.contact.email}</p>
                    </div>
                    <div>
                    <Label className="text--bold">Title</Label>
                    <p>{this.props.contact.title}</p>
                    </div>
                   </Collapse>
                    <div className="card-text">
                        <p>{this.formatPhone(this.props.contact.phone)}</p>
                    </div> 
                </div>
                </div>
            </div>
        );
    }
    
}



export default Card;