import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EditContact  from './EditContact';

class ContactDetails extends Component {
    constructor(props) {
        super(props)
 
        this.props = props;
        
        this.handleAction = this.handleAction.bind(this);
    }


    handleAction(e) {
        e.preventDefault();
        this.refs.editForm.handleSubmit();
    }    


    render() {
        const btnMsg = this.props.isAdd ? 'Add': 'Save Changes';
     return(
            <div>
                <Modal isOpen={this.props.openModal} onExit={this.props.onExit} >
                    <ModalHeader toggle={this.props.toggle}>{this.props.isAdd ? 'Add Contact' : 'Edit Contact'}</ModalHeader>
                    <ModalBody>
                    <EditContact ref="editForm" contact={this.props.contact} update={this.props.update} add={this.props.add} 
                    isAdd={this.props.isAdd} unique={this.props.unique} toggle={this.props.toggle} formatPhone={this.props.formatPhone}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" type="submit" onClick={this.handleAction}>{btnMsg}</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ContactDetails;