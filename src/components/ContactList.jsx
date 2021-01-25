import React, { Component } from 'react'
import NewContact from './modals/NewContact'
import EditForm from './modals/EditForm'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

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
const NavList = styled.ul`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 auto;
    padding: 10px 20px;
`
const ListItem = styled.li`
    padding: 5px;
    box-sizing: border-box;
    color: #fff;
    font-size: 25px;
    font-weight: 500;
`

const AddButton = styled.div`
    padding: 4px 10px 8px 10px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.2);
    color: #fff;   
    font-sixe: small;
`

class ContactList extends Component {
    state = {
        show: false,
        contactBeingEdited: null,
        projectBeingEdited: null,
        idOfContactToEdit: -1,
    }

    showNewContactForm = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    editContact = (contact) => {
        this.setState({
            contactBeingEdited: contact,
            idOfContactToEdit: contact.id
        })
    }

    updateContact = (contact) => {
        fetch(this.props.baseURL + '/api/contacts/' + contact.id, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            return data.json()
        })
        .then(data => {
            this.props.handleAddContact(data)
            this.setState({
                idOfContactToEdit: -1,
                contacts: data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
 
    render () {
        return (
            <div id='section2'>
                <Content>
                    {this.state.idOfContactToEdit !== -1 ? 
                    <EditForm 
                        updateContact={this.updateContact} 
                        editContact={this.editContact} 
                        idOfContactToEdit={this.state.idOfContactToEdit} 
                        contactBeingEdited={this.state.contactBeingEdited} /> 
                        : null }
                </Content>
                { this.state.show ? 
                    <NewContact 
                        baseURL={this.props.baseURL} 
                        handleAddContact={this.props.handleAddContact} 
                        getContacts={this.props.getContacts} 
                        showNewContactForm={this.showNewContactForm} 
                        show={this.state.show}/> : 
                    <div>
                        <NavList>
                            <ListItem>Contacts</ListItem>
                            <ListItem 
                                onClick={()=>{this.showNewContactForm()}}> 
                                <AddButton> + </AddButton>
                            </ListItem>
                        </NavList>
                            { this.props.contacts.map(contact => {
                                return (
                                    <StyledContactList 
                                        key={contact.id}>
                                        <Content>
                                            <Image 
                                                cloudName="dwjdyrkww" 
                                                src={contact.img} 
                                                width="70" 
                                                crop="scale" />
                                            <StyledContactListItems>
                                                {contact.firstName} {contact.lastName}
                                            </StyledContactListItems>
                                            <StyledContactListItems>
                                                {contact.phoneNumber}
                                            </StyledContactListItems>
                                            <StyledContactListItems>
                                                {contact.email}
                                            </StyledContactListItems>
                                        </Content>
                                        <Utilities>
                                            <button 
                                            onClick={()=>this.editContact(contact)}>
                                                Edit
                                            </button>
                                            <button 
                                            onClick={()=>this.props.deleteContact(contact.id)}>
                                                X
                                            </button>
                                        </Utilities>
                                    </StyledContactList>
                                )}
                            )}
                    </div>
                }
            </div>
        )
    }
}

export default ContactList