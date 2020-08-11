import React, { Component } from 'react'
import NewContact from './modals/NewContact'
import EditForm from './modals/EditForm'


const baseURL = 'http://localhost:3003'

class ContactList extends Component {
    state = {
        contacts: [],
        show: false,
        baseURL: baseURL,
        contactBeingEdited: null,
        idOfContactToEdit: -1
    }

    getContacts = () => {
        fetch(baseURL + '/api/contacts/')
        .then(
            data => {
                return data.json()
            })
        .then(data => {
            this.setState({
                contacts: data,
            })
        })
    }

    showNewContactForm = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    handleAddContact = (contact) => {
        const copyContacts = [...this.state.contacts]
        copyContacts.unshift(contact)
        
        this.setState({
            contacts: copyContacts,
            show: false
        })
    }

    editContact = (contact) => {
        console.log('console.log for contact is', contact)
        console.log('contact id is', contact.id)
        fetch(baseURL+ '/api/contacts/' + contact.id + '/edit', {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            res.json()
        })
        .then(data => {
            console.log(data)
            this.setState({
                contactBeingEdited: data.data,
                idOfContactToEdit: data.data.id
            })
        })
    }

    updateContact = (event, contact) => {
        event.preventDefault()
        console.log('updated contact,', contact)
        fetch(baseURL + '/api/contacts/' + contact.id, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(()=>{
            this.getContacts()
            this.setState({
                idOfContactToEdit: -1
            })
        }).catch((err) => {console.log(err)})
    }


    deleteContact = (id) => {
        console.log(baseURL)
        console.log(id)
        fetch(baseURL + '/api/contacts/' + id, {
            crossDomain: true,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            console.log(res)
            const findIndex = this.state.contacts.findIndex(contact => contact.id === id)
            const copyContacts = [...this.state.contacts]
            copyContacts.splice(findIndex, 1)
            this.setState({contacts: copyContacts})
        })
    }

    componentDidMount(){
        this.getContacts()
      }

    render () {
        return (
            <div>
                <h2>Contacts</h2>
                <div onClick={ () => {
                    this.showNewContactForm()
                }}>+</div>
                {this.state.show ? <NewContact baseURL={this.state.baseURL} handleAddContact={this.handleAddContact} /> : 
                <div>
                    {this.state.contacts.map(contact => {
                        return (
                            <div key={contact.id}>
                                <div>{contact.firstName}</div>
                                <div>{contact.lastName}</div>
                                <div>{contact.phoneNumber}</div>
                                <div>{contact.email}</div>
                                <div onClick={()=>this.editContact(contact)}>EDIT</div>
                                <div onClick={()=>this.deleteContact(contact.id)}>X</div>
                            </div>
                                
                        )
                    })}
                </div>

///// end of ternery statement //////
                } 
{/* ////end of ternery statement//// */}
                
              {this.state.idOfContactToEdit !== -1 ? <EditForm updateContact={this.updateContact} editContact={this.editContact} idOfContactToEdit={this.state.idOfContactToEdit} contactBeingEdited={this.state.contactBeingEdited} /> : null }
            </div>
        )
    }
}

export default ContactList