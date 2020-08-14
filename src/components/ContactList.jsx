import React, { Component } from 'react'
import NewContact from './modals/NewContact'
import EditForm from './modals/EditForm'
import styled from 'styled-components'


const baseURL = 'http://localhost:3003'


const StyledContactList = styled.ul`
    width: 90%;
    margin: 50px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: rgba(240,240,240, .5);
    color: rgb(56,56,56);
    margin: 5px auto;
    border-radius: 10px;
`
const StyledContactListItems = styled.li`
    display: flex;
    padding: 10px 20px;
    color: rgb(56,56,56);
    margin: 5px 0;
    transition: 0.3s
`
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Utilities = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

const Header = styled.header`
    display: flex:
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    align: items: baseline;
    margin 5px 0;
    padding: 10px 20px;
    color: #fff;
    font-weight: 500;
`
const Title = styled.p`
    width: 100px;
    padding: 5px;
    box-sizing: border-box;
    margin: 0;
`

class ContactList extends Component {
    state = {
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

    // handleAddContact = (contact) => {
    //     const copyContacts = [...this.state.contacts]
    //     copyContacts.unshift(contact)
    //     this.setState({
    //         contacts: copyContacts,
    //         show: false
    //     })
    // }

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
            const findIndex = this.props.contacts.findIndex(contact => contact.id === id)
            const copyContacts = [...this.props.contacts]
            copyContacts.splice(findIndex, 1)
            this.setState({contacts: copyContacts})
        })
    }

    

    render () {
        return (
            <div>
        

                {this.state.idOfContactToEdit !== -1 ? <EditForm updateContact={this.updateContact} editContact={this.editContact} idOfContactToEdit={this.state.idOfContactToEdit} contactBeingEdited={this.state.contactBeingEdited} /> : null }

                

                {this.state.show ? <NewContact baseURL={this.state.baseURL} handleAddContact={this.props.handleAddContact} /> : 
            <div >
                <Header>
                <Title>Contacts</Title>
                <button onClick={ () => {
                    this.showNewContactForm()
                }}> + </button>
                </Header>
                    {this.props.contacts.map(contact => {
                        return (
                        
                          
                            <StyledContactList key={contact.id}>
                                <Content>
                                <StyledContactListItems>{contact.firstName} {contact.lastName}</StyledContactListItems>
                                <StyledContactListItems>{contact.phoneNumber}</StyledContactListItems>
                                <StyledContactListItems>{contact.email}</StyledContactListItems>
                                </Content>
                                <Utilities>
                                    <button onClick={()=>this.editContact(contact)}>Edit</button>
                                    <button onClick={()=>this.deleteContact(contact.id)}>X</button>
                                </Utilities>
                            </StyledContactList>
                            
                        
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