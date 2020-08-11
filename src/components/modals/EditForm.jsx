import React from 'react'
const baseURL = 'http://localhost:3003'

class EditForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        img: '',
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.contactBeingEdited.firstName,
            lastName: this.props.contactBeingEdited.lastName,
            phoneNumber: this.props.contactBeingEdited.phoneNumber,
            email: this.props.contactBeingEdited.email,
            img: this.props.contactBeingEdited.img,
        })
        
    }

    render () {
        return (
            <div>
               <h2>New Contact</h2> 
                <form onSubmit={(event) => {this.updateContact(event, this.state)}}>
                    <label htmlFor='img'></label>
                    <input type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} />

                    <label htmlFor='firstName'></label>
                    <input type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} />

                    <label htmlFor='lastName'></label>
                    <input type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} />

                    <label htmlFor='phoneNumber'></label>
                    <input type='text' id='phoneNumber' name='phoneNumber' onChange={this.handleChange} value={this.state.phoneNumber} />

                    <label htmlFor='email'></label>
                    <input type='text' id='email' name='email' onChange={this.handleChange} value={this.state.email} />

                    <input type='submit' value='Done'/>
                </form>
            </div>
        )
    }

}


export default EditForm