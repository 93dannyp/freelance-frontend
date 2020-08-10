import React, { Component } from 'react'
import NewContact from './modals/NewContact'


const baseURL = 'http://localhost:3003'



class ContactList extends Component {
    state = {
        contacts: [],
        show: false,
        baseURL: baseURL,
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
        const copyContacts = [... this.state.contacts]
        copyContacts.unshift(contact)
        this.setState({
            contacts: copyContacts,
            show: false
        })
    }

    componentDidMount = () => {
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
                                <div>EDIT</div>
                                <div>X</div>
                            </div>
                                
                        )
                    })}
                </div>

///// end of ternery statement //////
                } 
{/* ////end of ternery statement//// */}

            </div>
        )
    }
}

export default ContactList