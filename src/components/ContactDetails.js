import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddContact from './AddContact';

class ContactDetails extends Component {
    constructor(props) {
        super(props)
 
        this.props = props;
    }

    doNothing(e) {
        e.preventDefault();
    }


    render() {
        return(
            <div>
                <Modal isOpen={this.props.openModal}>
                    <ModalHeader toggle={this.props.toggle}>{this.props.isAdd ? 'Add Contact' : 'Edit Contact'}</ModalHeader>
                    <ModalBody>
                        <AddContact />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.doNothing}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ContactDetails;