import React, { Component } from 'react'
import NewContact from './modals/NewContact'
import EditForm from './modals/EditForm'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'


const baseURL = 'http://localhost:3003'

class ContactList extends Component {
    state = {
        contacts: this.props.contacts,
        show: false,
        baseURL: baseURL,
        contactBeingEdited: null,
        idOfContactToEdit: -1
    }

    // getContacts = () => {
    //     fetch(baseURL + '/api/contacts/')
    //     .then(
    //         data => {
    //             return data.json()
    //         })
    //     .then(data => {
    //         this.setState({
    //             contacts: data,
    //         })
    //     })
    // }

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
        console.log(contact)
        this.setState({
            contactBeingEdited: contact,
            idOfContactToEdit: contact.id
        })
    }

    updateContact = (event, contact) => {
        console.log(contact)
        console.log('updated contact,', contact)
        fetch(baseURL + '/api/contacts/' + contact.id, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data)=>{
            console.log(data.dataValues)
            return data.json()
        }).then(data => {
            this.handleAddContact(data)
            this.setState({
                idOfContactToEdit: -1,
                contacts: data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }


    // fetch(baseURL + '/api/contacts/')
    //     .then(
    //         data => {
    //             return data.json()
    //         })
    //     .then(data => {
    //         this.setState({
    //             contacts: data,
    //         })
    //     })

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

    

    render () {
        return (
            <div>
                {/* <Jumbotron> */}
                    <h2>Contacts</h2>
                {/* </Jumbotron> */}

                {this.state.idOfContactToEdit !== -1 ? <EditForm updateContact={this.updateContact} editContact={this.editContact} idOfContactToEdit={this.state.idOfContactToEdit} contactBeingEdited={this.state.contactBeingEdited} /> : null }

                <Button onClick={ () => {
                    this.showNewContactForm()
                }}> + </Button>

                {this.state.show ? <NewContact baseURL={this.state.baseURL} handleAddContact={this.handleAddContact} /> : 
                <div>
                    {this.state.contacts.map(contact => {
                        return (
                            <ListGroup>
                            <div key={contact.id}>
                                <ListGroupItem>{contact.firstName}</ListGroupItem>
                                <ListGroupItem>{contact.lastName}</ListGroupItem>
                                <ListGroupItem>{contact.phoneNumber}</ListGroupItem>
                                <ListGroupItem>{contact.email}</ListGroupItem>
                                <ButtonToolbar>
                                    <>
                                    <Button onClick={()=>this.editContact(contact)}>Edit</Button>
                                    </>
                                    <>
                                    <Button onClick={()=>this.deleteContact(contact.id)}>X</Button>
                                    </>
                                </ButtonToolbar>
                            </div>
                            </ListGroup>   
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