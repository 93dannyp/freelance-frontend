import React from 'react'



const baseURL = 'http://localhost:3003'

class Editform extends React.Component {
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
                <form onSubmit={(event) => {this.props.updateContact(event, this.state)}}>
                    <label htmlFor='img'></label>
                    <input type='text' id='img' name='img' onChange={this.handleChange} value={this.state.img} />

                    <label htmlFor='firstName'></label>
                    <input type='text' id='firstName' name='firstName' onChange={this.handleChange} value={this.state.firstName} />

                    <label htmlFor='lastName'></label>
                    <input type='text' id='lastName' name='lastName' onChange={this.handleChange} value={this.state.lastName} />

                    <label htmlFor='phoneNumber'></label>
                    <input type='tel' id='phoneNumber' name='phoneNumber' onChange={this.handleChange} value={this.state.phoneNumber} />

                    <label htmlFor='email'></label>
                    <input type='email' id='email' name='email' onChange={this.handleChange} value={this.state.email} />

                    <button type='submit' value='Done'>Done</button>
                </form>
            </div>
        )
    }

}


export default Editform