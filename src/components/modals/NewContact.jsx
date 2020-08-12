import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewContact extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        img: '',
    }

handleChange = (event) => {
    this.setState({
        [event.currentTarget.id]: event.currentTarget.value
    })
}

handleSubmit = () => {
    fetch(this.props.baseURL + '/api/contacts/', {
        crossDomain: true,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state),
        
    }).then((res) => {
        res.json()
    })
    .then(resJson => {
        this.props.handleAddContact(resJson)
        this.setState({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            img: '',
        })
    }).catch(error => console.error({'Error': error}))
}

    render () {
        return (
            <div>
               <h2>New Contact</h2> 
                <form onSubmit={this.handleSubmit}>
                    <Form.Label htmlFor='img'></Form.Label>
                    <input type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} placeholder='add photo'/>

                    <Form.Label htmlFor='firstName'></Form.Label>
                    <Form.Control type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} placeholder='First name'/>

                    <Form.Label htmlFor='lastName'></Form.Label>
                    <Form.Control type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} placeholder='Last name'/>

                    <Form.Label htmlFor='phoneNumber'></Form.Label>
                    <Form.Control type='text' id='phoneNumber' name='phoneNumber' onChange={this.handleChange} value={this.state.phoneNumber} placeholder='phone'/>

                    <Form.Label htmlFor='email'></Form.Label>
                    <Form.Control type='text' id='email' name='email' onChange={this.handleChange} value={this.state.email} placeholder='email'/>

                    <Button type='submit' value='Done'>Done</Button>
                </form>
            </div>
        )
    }
}

export default NewContact