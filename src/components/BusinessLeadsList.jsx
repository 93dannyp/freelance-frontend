import React, { Component } from 'react'
import NewContact from './modals/NewContact'
import EditForm from './modals/EditForm'
import styled from 'styled-components'

const baseURL = 'http://localhost:3003' || process.env.REACT_APP_baseURL


const StyledContactList = styled.ul`
    width: 90%;
    margin: 50px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: rgba(240,240,240, .5);
    color: #fff;
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
    align: items: baseline;
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


class BusinessLeadsList extends Component {
    state = {
        show: false,
        baseURL: baseURL,
        contactBeingEdited: null,
        idOfContactToEdit: -1
    }

    showNewContactForm = () => {
        this.setState({
            show: !this.state.show,
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
            this.props.handleAddContact(data)
            this.setState({
                idOfContactToEdit: -1,
                contacts: data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
 
    render () {
        const leads = this.props.contacts.map((contact, index)=>{
            return (
                <div value={contact.id}  key={index}>
                    <StyledContactList>
                        <div>
                            
                        </div>
                        {contact.lead ?
                        <div>
                            <Utilities>
                                    <button onClick={()=>this.editContact(contact)}>Edit</button>
                                    <button onClick={()=>this.props.deleteContact(contact.id)}>X</button>
                            </Utilities>
                            <h5>{contact.firstName} {contact.lastName}</h5>
                            <h5>{contact.company}</h5>
                            <h5>{contact.phoneNumber}</h5>
                            <h5>{contact.email}</h5>
                            <h5>{contact.notes}</h5>
                            <h5>{contact.createdAt} since you last contacted this lead!</h5>
                        </div> 
                        : null}
                    </StyledContactList>
                </div>
            )
        })

        return (
            <div id='section4'>
            <NavList>
                <ListItem>Business Leads</ListItem>
                
            </NavList>
            {leads}
            </div>
        )
    }
}

export default BusinessLeadsList