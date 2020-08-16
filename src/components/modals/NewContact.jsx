import React from 'react'
import styled from 'styled-components'
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react';

let widget

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

showWidget = () => {
    console.log(widget)
    widget.open()
}

checkImageUpload = (result) => {
    if (result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info)
        // push photo into contacts array here and set state to new array
      }
}

// toggleLead = (lead) => {
//     if (checkBox === 'on') {
//         lead = true
//     } else {

//     }
// }



    render () {
        widget = window.cloudinary.createUploadWidget({
            cloudName: 'dwjdyrkww', 
            uploadPreset: 'nj5pg9gg'}, (error, result) => { this.checkImageUpload(result)
            }
          )
        return (
            <div>
               <h2>New Contact</h2> 
                    <button id="upload_widget" className="cloudinary-button" onClick={this.showWidget}>Upload files</button>
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

                    <label htmlFor='lead'></label>
                    <input type='checkbox' id='lead' name='lead' onChange={this.handleChange}/>

                    <button type='submit' value='Done'>Done </button>
                </form>
            </div>
        )
    }
}

export default NewContact