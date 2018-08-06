import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, FormText, CustomInput, Button, Alert } from 'reactstrap';
import InputMask from 'react-input-mask';
import Contact from './Contact'

import './editContact.scss';

const FormInput = (props) => {
    const handleClass = (name) => {
        return props.getClass(name);
    }
    const getMask = (maskType) => {
        switch(maskType) {
            default:
                return "(999)999-9999"
        }
    }

    const getInputType = (addMask) => {
        switch(addMask) {
            case "true":
                return <InputMask type="text" className={handleClass(props.name)} name={props.name} mask={getMask(props.maskType)} maskChar="_" placeholder={props.placeholder}  value={props.contact[props.name]} onChange={props.handleInputChange} />
            default:
                return <Input type={props.type} name={props.name} invalid={props.onValidate(props.name)}  value={props.contact[props.name]}  onChange={props.handleInputChange} placeholder={props.placeholder}/>
        }
    }

    return (
        <FormGroup >
            <Label for={props.name}>{props.label}</Label>
            {getInputType(props.addMask)}
         </FormGroup>
    );
}


class EditContact extends Component {
   constructor(props) {
       super(props);
       this.props = props;
       let contact = this.props.isAdd ? new Contact() : new Contact(props.contact.firstName, props.contact.lastName, props.contact.email, props.contact.phone, props.contact.title, props.contact.img, props.contact.collapse)

       this.state = {
           contact: contact,
           errors: {},
           showAlert: false,
           isDupe: false
       };

       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleFormValidation = this.handleFormValidation.bind(this);
       this.validateControl = this.validateControl.bind(this);
       this.getClass = this.getClass.bind(this);
       this.onDismiss = this.onDismiss.bind(this);
       this.setIsDupe = this.setIsDupe.bind(this);
   }

   handleFormValidation() {
    let fields = this.state.contact;
    let errors = this.state.errors;
    let formIsValid = true;
    let keys = Object.keys(fields);
    
    keys.forEach(key => {
        switch(key) {
            case 'firstName':
            if(!fields.firstName) {
                formIsValid = false;
                errors.firstName = "Cannot be empty";
            } 
            break;
            case 'lastName':
            if(!fields.lastName) {
                formIsValid = false;
                errors.lastName = "Cannot be empty";
            }
            break;
            case 'email':
            if(!fields.email && typeof fields.email === "undefined") {
                formIsValid = false;
                errors.email = "Cannot be empty";
            } else if(!fields.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                formIsValid = false;
                errors.email = "Invalid email";
            }
            break;
            case 'phone':
            if(!fields.phone && typeof fields.phone === "undefined" || fields.phone == '') {
                formIsValid = false;
                errors.phone = "Cannot be empty";
            } else if(this.props.formatPhone(fields.phone).length < 10) {
                formIsValid = false;
                errors.phone = "Enter valid phone number including area code";
            }
            break;
            case 'title':
                if(!fields.title) {
                    formIsValid = false;
                    errors.title = "Cannot be empty";
                }
            break;
            default:
                break;
        }
    });

    this.setState({
        errors: errors
    })
    return formIsValid;
}

onDismiss() {
    this.setState(prevState => {
        return {
            showAlert: !prevState.showAlert
        };
    })
}

setIsDupe(condition) {
    this.setState({
        isDupe: condition
    })
}

validateControl(name) {
    let errors = this.state.errors;
    return errors[name] ? true : false;
}

getClass(name) {
    let classes = `form-control ${this.state.errors[name] == null ? '' : 'error--border'}`;
    return classes
}

   handleSubmit(e) {
       e.preventDefault();
       if(this.handleFormValidation()) {
           let close = true;
        switch(this.props.isAdd) {
            case true :
                let isUnique = this.props.unique(this.state.contact);
                this.setIsDupe(!isUnique);
                if(isUnique) {
                    this.props.add(this.state.contact);
                } else {
                    close = false;
                    this.onDismiss();
                }
            break;
            default:
                this.props.update(this.props.contact, this.state.contact);
            break;
        }
        if (close) {
            this.props.toggle(e);
        }
       } 
       else {
           this.onDismiss();
       }
        
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        
        this.setState(prevState => {
            delete prevState.errors[name];
            prevState.contact[name] = value;
            return {
                contact: prevState.contact,
                errors: prevState.errors
            }
        })
    }

    
   render() {
       const msg = this.state.isDupe ? 'No duplicates allowed' : 'There were errors on the page';
       const btnMsg = this.props.isAdd ? 'Add': 'Save Changes';
    return (
        <div>
             <Alert color="danger" isOpen={this.state.showAlert} toggle={this.onDismiss}>
                {msg}
            </Alert>
        <Form onSubmit={this.handleSubmit}>
            <FormInput type="text" name="firstName" label="First Name"  contact={this.state.contact} onValidate={this.validateControl} handleInputChange={this.handleInputChange} placeholder="Enter First Name"/>
            <FormInput type="text" name="lastName" label="Last Name" contact={this.state.contact} onValidate={this.validateControl} handleInputChange={this.handleInputChange} placeholder="Enter Last Name"/>
            <FormInput type="email" name="email" label="Email"  contact={this.state.contact} onValidate={this.validateControl} handleInputChange={this.handleInputChange} placeholder="Enter an email" />
            <FormInput type="text" name="title" label="Title"  contact={this.state.contact} onValidate={this.validateControl} handleInputChange={this.handleInputChange} placeholder="Enter a job description"/>
            <FormInput type="text" name="phone" label="Phonenumber" getClass={this.getClass} contact={this.state.contact} onValidate={this.validateControl} handleInputChange={this.handleInputChange} placeholder="Enter a phone number including area code" addMask="true" maskType="tel"/>
            
            <FormGroup>
            <FormGroup>
                <Label for="img">Image</Label>
                <CustomInput type="select" name="img" id="imgFile-edit" value={this.state.contact.img} onChange={this.handleInputChange}>
                <option value="">Select</option>
                <option value="http://placekitten.com/g/700/400">Kittens</option>
                <option value="https://dummyimage.com/700x400/000/fff&text=Nice+Placeholder">Placeholder</option>
                </CustomInput>
            </FormGroup>
          <FormText color="muted">
            Please choose an image to upload with your contact information
          </FormText>
        </FormGroup>
            <div className="btn-container">
            <Button color="primary" type="submit">{btnMsg}</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </div>
        </Form>      
        </div>
    );
   }
}

export default EditContact;

