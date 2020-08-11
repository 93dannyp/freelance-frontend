import React from 'react'

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

handleSubmit = (event) => {
    event.preventDefault()
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
                    <label htmlFor='img'></label>
                    <input type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} placeholder='add photo'/>

                    <label htmlFor='firstName'></label>
                    <input type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} placeholder='First name'/>

                    <label htmlFor='lastName'></label>
                    <input type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} placeholder='Last name'/>

                    <label htmlFor='phoneNumber'></label>
                    <input type='text' id='phoneNumber' name='phoneNumber' onChange={this.handleChange} value={this.state.phoneNumber} placeholder='phone'/>

                    <label htmlFor='email'></label>
                    <input type='text' id='email' name='email' onChange={this.handleChange} value={this.state.email} placeholder='email'/>

                    <input type='submit' value='Done'/>
                </form>
            </div>
        )
    }
}

export default NewContact