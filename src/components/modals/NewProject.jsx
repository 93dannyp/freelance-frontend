import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewProject extends React.Component {
    state = {
        projectTitle: '',
        projectDescription: '',
        projectDueDate: '',
        contacts: [
            {
            contactId: 1,
            firstName: 'daniel',
            lastName: 'perkins'}],
        contactId: ''
    }

handleChange = (event) => {
    this.setState({
        [event.currentTarget.id]: event.currentTarget.value
    })
}

handleSubmit = () => {
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

        const options = this.state.contacts.map((contact, index)=>{
            return (
                <option value={contact.contactId}  key={index}> {contact.firstName} {contact.lastName}</option>
            )
        })
        return (
            <div>
               <h2>New Project</h2> 
                <form onSubmit={this.handleSubmit}>
                    <Form.Label htmlFor='contactId'></Form.Label>
                    <Form.Control as='select' id='contactId' name='contactId' onChange={this.handleChange} value={this.state.contactId} placeholder='Contact'>
                    <option value=''>Choose a Contact</option>
                       {options}
                    </Form.Control>

                    <Form.Label htmlFor='projectTitle'></Form.Label>
                    <Form.Control type='text' id='projectTitle' name='projectTitle' onChange={this.handleChange} value={this.state.projectTitle} placeholder='Title'/>

                    <Form.Label htmlFor='projectDescription'></Form.Label>
                    <Form.Control type='textarea' id='projectDescription' name='projectDescription' onChange={this.handleChange} value={this.state.projectDescription} placeholder='Description'/>

                    <Form.Label htmlFor='projectDueDate'></Form.Label>
                    <Form.Control type='text' id='projectDueDate' name='projectDueDate' onChange={this.handleChange} value={this.state.projectDueDate} placeholder='Due Date'/>

                    <Button type='submit' value='Done'>Done</Button>
                </form>
            </div>
        )
    }
}

export default NewProject