import React from 'react'

class Editform extends React.Component {
    state = {
        id: this.props.contactBeingEdited.id,
        firstName: this.props.contactBeingEdited.firstName,
        lastName: this.props.contactBeingEdited.lastName,
        phoneNumber: this.props.contactBeingEdited.phoneNumber,
        email: this.props.contactBeingEdited.email,
        img: this.props.contactBeingEdited.img,
    }

    handleChange = (event) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    render () {
        return (
            <div>
               <h2>Edit Contact</h2> 
                <form 
                onSubmit={()=>{this.props.updateContact(this.state)}}>
                    <label 
                    htmlFor='img'>
                    </label>
                    <input 
                    type='text' 
                    id='img' 
                    name='img' 
                    onChange={this.handleChange} 
                    value={this.state.img} />
                    <br/>
                    <label 
                    htmlFor='firstName'>
                    </label>
                    <input 
                    type='text' 
                    id='firstName' 
                    name='firstName' 
                    onChange={this.handleChange} 
                    value={this.state.firstName} />
                    <br/>
                    <label 
                    htmlFor='lastName'>
                    </label>
                    <input 
                    type='text' 
                    id='lastName' 
                    name='lastName' 
                    onChange={this.handleChange} 
                    value={this.state.lastName} />
                    <br/>
                    <label 
                    htmlFor='phoneNumber'>
                    </label>
                    <input 
                    type='tel' 
                    id='phoneNumber' 
                    name='phoneNumber' 
                    onChange={this.handleChange} 
                    value={this.state.phoneNumber} />
                    <br/>
                    <label 
                    htmlFor='email'>
                    </label>
                    <input 
                    type='email' 
                    id='email' 
                    name='email' 
                    onChange={this.handleChange} 
                    value={this.state.email} />
                    <br/>
                    <button 
                    type='submit' 
                    value='Done'>
                        Done
                    </button>
                </form>
            </div>
        )
    }
}

export default Editform