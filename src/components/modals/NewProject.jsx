import React from 'react'

// for development
// const baseURL = 'http://localhost:3003' 

// for production
// const baseURL = 'https://freelance-backend.herokuapp.com'

let baseURL
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://freelance-backend.herokuapp.com'
}
console.log('Current base URL:', baseURL)

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

    handleSubmit = () => {
        fetch(baseURL + '/api/projects/', {
            crossDomain: true,
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            console.log(res)
            res.json()
        })
        .then(resJson => {
            this.props.handleAddProject(resJson)
            this.setState({
                projectTitle: '',
                projectDescription: '',
                projectDueDate: '',
            })
        })
        .then(data => {
            this.props.getProjects()
        })
        .catch(error => {
            console.error(error)
        })
    }

    render () {
        const options = this.props.contacts.map((contact, index) => {
            return (
                <option 
                    value={contact.id}  
                    key={index}> 
                    {contact.firstName} {contact.lastName}
                </option>
            )
        })
        
        return (
            <div>
               <h2>New Project</h2> 
                <form 
                    onSubmit={this.handleSubmit}>
                    <label 
                        htmlFor='contactId'>
                    </label>
                    <select 
                        as='select' 
                        id='contactId' 
                        name='contactId' 
                        onChange={this.handleChange} 
                        value={this.state.contactId} 
                        placeholder='Contact'>
                    <option>Choose a contact</option>
                       {options}
                    </select>
                    <br/>
                    <label 
                        htmlFor='projectTitle'>
                    </label>
                    <input 
                        type='text' 
                        id='projectTitle' 
                        name='projectTitle' 
                        onChange={this.handleChange} 
                        value={this.state.projectTitle} 
                        placeholder='Title'/>
                    <br/>
                    <label 
                    htmlFor='projectDescription'>
                    </label>
                    <input 
                        type='textarea' 
                        rows='3' 
                        id='projectDescription' 
                        name='projectDescription' 
                        onChange={this.handleChange} 
                        value={this.state.projectDescription} 
                        placeholder='Description'/>
                    <br/>
                    <label 
                    htmlFor='projectDueDate'>
                    </label>
                    <input 
                        type='text' 
                        id='projectDueDate' 
                        name='projectDueDate' 
                        onChange={this.handleChange} 
                        value={this.state.projectDueDate} 
                        placeholder='Due Date'/>
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

export default NewProject