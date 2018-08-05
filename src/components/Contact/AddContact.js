import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import InputMask from 'react-input-mask';
import Contact from './Contact';
import './contact.scss';


class AddContact extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            contact: new Contact(),
            errors: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this);
        this.validateControl = this.validateControl.bind(this);
        this.getClass = this.getClass.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState(prevState => {
            delete prevState.errors[name];

            return {
                contact: {
                    [name]: value
                },
                errors: prevState.errors
            }
                
        })
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
                if(!fields.phone && typeof fields.phone === "undefined") {
                    formIsValid = false;
                    errors.phone = "Cannot be empty";
                } else if(fields.phone.length < 11 || fields.phone.length > 10) {
                    formIsValid = false;
                    errors.phone = "Enter valid phone number including area code";
                } else if(Number.isInteger(Number.parseInt(fields.phone))){
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

    validateControl(name) {
        let errors = this.state.errors;
        return errors[name] ? true : false;
    }

    getClass() {
        return `form-control ${this.state.errors.phone ? 'error--border' : ''}`
    }

    handleSubmit() {
        if(this.handleFormValidation()) {
            if(this.props.unique(this.state.contact)) {
                this.props.add(this.state);
            }

            this.props.toggle();
        }
        
    }

    render() {
        return (
            <Form >
                <FormGroup onSubmit={this.handleSubmit}>
                <Label for="firstName">FirstName</Label>
                <Input type="text" name="firstName"  placeholder="first name" invalid={this.validateControl('firstName')} value={this.state.contact.firstName} onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                <Label for="lastName">LastName</Label>
                <Input type="text" name="lastName"  placeholder="last name" invalid={this.validateControl('lastName')} value={this.state.contact.lastName} onChange={this.handleInputChange}  />
                </FormGroup>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email"  placeholder="email address" invalid={this.validateControl('email')} value={this.state.contact.email} onChange={this.handleInputChange} />
                <span className="error" style={{display: this.state.errors.email ? 'block' : 'none'}}>{this.state.errors.email || 'error'}</span>
                </FormGroup>
                <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title"  placeholder="job title" invalid={this.validateControl('title')} value={this.state.contact.title} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                <Label for="phone">Phone Number</Label>
                <InputMask type="text" className={this.getClass()} name="phone" mask="(999)999-9999" maskChar="_"  value={this.state.contact.phone} onChange={this.handleInputChange} />
                <span className="error" style={{display: this.state.errors.phone ? 'block' : 'none'}}>{this.state.errors.phone || 'error'}</span>
                </FormGroup>
                <FormGroup>
             
              <Label for="img">Image</Label>
          <CustomInput type="select" name="img" id="imgFile-edit" value={this.state.img} onChange={this.handleInputChange}>
          <option value="">Select</option>
          <option value="http://placekitten.com/g/700/400">Kittens</option>
          <option value="https://dummyimage.com/700x400/000/fff&text=Nice+Placeholder">Placeholder</option>
          </CustomInput>
              <FormText color="muted">
                Please choose an image to upload with your contact information
              </FormText>
            </FormGroup>
            </Form>
        );
    }
}

export default AddContact;