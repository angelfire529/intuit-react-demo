import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddContact from './AddContact';
import EditContact  from './EditContact';

class ContactDetails extends Component {
    constructor(props) {
        super(props)
 
        this.props = props;
        
        this.handleAction = this.handleAction.bind(this);
        this.getFormType = this.getFormType.bind(this);
        

    }

    getFormType() {
        if(this.props.openModal) {
            return this.props.isAdd ? 
            <AddContact ref="addForm" toggle={this.props.toggle} add={this.props.add} unique={this.props.unique}/> : 
            <EditContact ref="editForm" contact={this.props.contact} update={this.props.update} toggle={this.props.toggle} />
        }

        return '';       
    }

    handleAction(e) {
        e.preventDefault();
        if(!this.props.isAdd) {
            this.refs.editForm.handleSubmit();
        }
        else {
            this.refs.addForm.handleSubmit();
        }
    }    


    render() {
     return(
            <div>
                <Modal isOpen={this.props.openModal} >
                    <ModalHeader toggle={this.props.toggle}>{this.props.isAdd ? 'Add Contact' : 'Edit Contact'}</ModalHeader>
                    <ModalBody>
                        {this.getFormType()}
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" type="submit" onClick={this.handleAction}>{this.props.isAdd ? 'Add': 'Save Changes'}</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ContactDetails;