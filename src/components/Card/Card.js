import React from 'react';
import { Collapse, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './card.scss';

export const Card = props => {
    const imgSrc = !props.contact.img ? 'http://placehold.it/700x400' : props.contact.img

    const toggleIcon = (icon) => {
        return icon ? "angle-up" : "angle-down";
    }

    const toggle = (e) => {
        e.preventDefault();
        props.toggle(props.index);
    }
    
    const showEdit = (contact) => {
        props.getContact(contact);
    }

    const formatPhone = (number) => {
        return `(${number.substring(0,3)}) ${number.substring(3,6)}-${number.substring(6)}`
    }

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 portfolio-item">
                <div className="card h-100">
                <button type="button" className="close close-right-top" aria-label="Close" onClick={props.remove}><span aria-hidden="true">&times;</span></button>
                <img className="card-img-top" src={imgSrc} alt="" />
                <div className="card-body card-body--toggle">
                <FontAwesomeIcon icon="edit" className="card-edit"  pull="right" onClick={showEdit.bind(this, props.contact)}/>
                    <h4 className="card-title" onClick={toggle}>
                    {props.contact.firstName} {props.contact.lastName}&nbsp;&nbsp;<FontAwesomeIcon icon={toggleIcon(props.collapse)} />
                    </h4>
                    <Collapse isOpen={props.collapse}>
                        <div>
                        <Label className="text--bold">Email</Label>
                        <p>{props.contact.email}</p>
                        </div>
                        <div>
                        <Label className="text--bold">Title</Label>
                        <p>{props.contact.title}</p>
                        </div>
                    </Collapse>
                    <div className="card-text">
                        <p>{formatPhone(props.contact.phone)}</p>
                    </div> 
                </div>
                </div>
            </div>
    );
}