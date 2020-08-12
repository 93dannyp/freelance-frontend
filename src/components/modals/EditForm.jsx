import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



const baseURL = 'http://localhost:3003'

class EditForm extends React.Component {
    // state = {
    //     firstName: '',
    //     lastName: '',
    //     phoneNumber: '',
    //     email: '',
    //     img: '',
    // }

    state = {
        id: this.props.contactBeingEdited.id,
        firstName: this.props.contactBeingEdited.firstName,
        lastName: this.props.contactBeingEdited.lastName,
        phoneNumber: this.props.contactBeingEdited.phoneNumber,
        email: this.props.contactBeingEdited.email,
        img: this.props.contactBeingEdited.img,
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    // componentDidMount() {
    //     this.setState({
    //         firstName: this.props.contactBeingEdited.firstName,
    //         lastName: this.props.contactBeingEdited.lastName,
    //         phoneNumber: this.props.contactBeingEdited.phoneNumber,
    //         email: this.props.contactBeingEdited.email,
    //         img: this.props.contactBeingEdited.img,
    //     })
        
    // }

    render () {
        return (
            <div>
               <h2>Edit Contact</h2> 
                <Form onSubmit={(event) => {this.props.updateContact(event, this.state)}}>
                    <Form.Label htmlFor='img'></Form.Label>
                    <Form.Control type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} />

                    <Form.Label htmlFor='firstName'></Form.Label>
                    <Form.Control type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} />

                    <Form.Label htmlFor='lastName'></Form.Label>
                    <Form.Control type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} />

                    <Form.Label htmlFor='phoneNumber'></Form.Label>
                    <Form.Control type='tel' id='phoneNumber' name='phoneNumber' onChange={this.handleChange} value={this.state.phoneNumber} />

                    <Form.Label htmlFor='email'></Form.Label>
                    <Form.Control type='email' id='email' name='email' onChange={this.handleChange} value={this.state.email} />

                    <Button type='submit' value='Done'>Done</Button>
                </Form>
            </div>
        )
    }

}


export default EditForm