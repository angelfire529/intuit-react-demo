import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function AddContact(props) {
    return (
        <Form>
            <FormGroup>
            <Label for="firstName">FirstName</Label>
            <Input type="text" name="firstName" id="firstName" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
            <Label for="lastName">LastName</Label>
            <Input type="text" name="lastName" id="lastName" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input type="email" name="phone" id="phone" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
          <Label for="imgFile">File</Label>
          <Input type="file" name="imgFile" id="imgFile" />
          <FormText color="muted">
            Please choose an image to upload with your contact information
          </FormText>
        </FormGroup>
        </Form>
    );
}

export default AddContact;