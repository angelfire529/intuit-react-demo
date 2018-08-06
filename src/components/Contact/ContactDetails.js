import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import EditContact  from './EditContact';

const ContactDetails = (props) => {
    return(
        <div>
            <Modal isOpen={props.openModal} onExit={props.onExit} >
                <ModalHeader toggle={props.toggle}>{props.isAdd ? 'Add Contact' : 'Edit Contact'}</ModalHeader>
                <ModalBody>
                <EditContact contact={props.contact} update={props.update} add={props.add} 
                isAdd={props.isAdd} unique={props.unique} toggle={props.toggle} formatPhone={props.formatPhone}/>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ContactDetails;