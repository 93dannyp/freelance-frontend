import React, { Component } from 'react'
import styled from 'styled-components'


class NewProject extends React.Component {
    state = {
        projectTitle: '',
        projectDescription: '',
        projectDueDate: '',
        contactId: ''
    }

handleChange = (event) => {
    
    this.setState({
        [event.currentTarget.id]: event.currentTarget.value
    })
}

handleSubmit = (event) => {
    event.preventDefault()
    fetch(this.props.baseURL + '/api/projects/', {
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
        this.props.handleAddProject(resJson)
        this.setState({
            projectTitle: '',
            projectDescription: '',
            projectDueDate: '',
        })
    }).catch(error => console.error({'Error': error}))
}

    render () {

        const options = this.props.contacts.map((contact, index)=>{
            return (
                <option value={contact.id}  key={index}> {contact.firstName} {contact.lastName}</option>
            )
        })
        return (
            <div>
               <h2>New Project</h2> 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='contactId'></label>
                    <select as='select' id='contactId' name='contactId' onChange={this.handleChange} value={this.state.contactId} placeholder='Contact'>
                    <option value=''>Choose a contact</option>
                       {options}
                    </select><br/>

                    <label htmlFor='projectTitle'></label>
                    <input type='text' id='projectTitle' name='projectTitle' onChange={this.handleChange} value={this.state.projectTitle} placeholder='Title'/><br/>

                    <label htmlFor='projectDescription'></label>
                    <input type='textarea' rows='3' id='projectDescription' name='projectDescription' onChange={this.handleChange} value={this.state.projectDescription} placeholder='Description'/><br/>

                    <label htmlFor='projectDueDate'></label>
                    <input type='text' id='projectDueDate' name='projectDueDate' onChange={this.handleChange} value={this.state.projectDueDate} placeholder='Due Date'/><br/>

                    <button type='submit' value='Done'>Done</button>
                </form>
            </div>
        )
    }
}

export default NewProject