import React, { Component } from 'react'
import styled from 'styled-components'

let leads;

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
const Utilities = styled.div`
    display: flex;
    justify-content: space-between;
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
        contactBeingEdited: null,
        idOfContactToEdit: -1
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
 
    render () {
        if (this.props.contacts) {
         leads = this.props.contacts.map((contact, index) => {
            return (
                <div value={contact.id} key={index}>{this.props.contacts[this.props.contacts.length -1] ?  
                <div>
                    <StyledContactList>
                        <div>
                        </div>
                        {contact.lead ?
                        <div>
                            <Utilities>
                                <h4>{contact.firstName} {contact.lastName}</h4>
                                <div>
                                    <button 
                                        onClick={()=>this.props.deleteContact(contact.id)}>
                                        X
                                    </button>
                                </div>
                            </Utilities>
                            <p>{contact.company}</p>
                            <p>{contact.phoneNumber}</p>
                            <p>{contact.email}</p>
                            <p>{contact.notes}</p>
                            <p>{contact.createdAt} since you last contacted this lead!</p>
                        </div>
                        : null }
                    </StyledContactList>
                </div>
            : null }
            </div>
            )
        })
    }
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