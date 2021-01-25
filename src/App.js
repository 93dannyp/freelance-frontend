import React, { Component } from 'react';
import './App.css';
import ContactList from './components/ContactList'
import ProjectList from './components/ProjectList'
import BusinessLeadsList from './components/BusinessLeadsList';
import TweetList from './components/TweetList'
import SideBar from './components/Sidebar'

let baseURL
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://freelance-backend.herokuapp.com'
}
console.log('Current base URL:', baseURL)

class App extends Component {
  state = {
    contacts: [],
    projects: [],
    baseURL: baseURL
  }

  // fetching contact data from back end
  getContacts = () => {
    fetch(this.state.baseURL + '/api/contacts/')
      .then(
        data => {
          return data.json()
        })
      .then(data => {
          data.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))
          this.setState({
              contacts: data,
        })
      })
    }

  // fetching project data from back end
  getProjects = () => {
  fetch(this.state.baseURL + '/api/projects/')
  .then(
      data => {
          return data.json()
      })
  .then(data => {
      this.setState({
          projects: data,
      })
    })
  }
    
    // adding contact data to contacts array
    // setting state to new array that contains contact data
  handleAddContact = (contact) => {
    const copyContacts = [...this.state.contacts]
    copyContacts.unshift(contact)
    copyContacts.sort()
    this.setState({
        contacts: copyContacts,
        // show: false
    })
  }

    // adding project data to projects array
    // setting state to new array that contains project data
  handleAddProject = (project) => {
    const copyProjects = [...this.state.projects]
    copyProjects.unshift(project)
    this.setState({
        projects: copyProjects,
        show: false
    })
  }

  deleteContact = (id) => {
    fetch(this.state.baseURL + '/api/contacts/' + id, {
        crossDomain: true,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        const findIndex = this.state.contacts.findIndex(contact => contact.id === id)
        const copyContacts = [...this.state.contacts]
        copyContacts.splice(findIndex, 1)
        this.setState({contacts: copyContacts})
    })
  }

  deleteProject = (id) => {
    fetch(this.state.baseURL + '/api/projects/' + id, {
        crossDomain: true,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        const findIndex = this.state.projects.findIndex(project => project.id === id)
        const copyProjects = [...this.state.projects]
        copyProjects.splice(findIndex, 1)
        this.setState({
          projects: copyProjects
        })
    })
  }

    componentDidMount(){
      this.getContacts()
      this.getProjects()
    }

  render () {
    return (
      <div className="App">
        <div className='container column'>
          <SideBar id='left'/>
            <div className='header' id='section1'>
              <h3>freelance CRM</h3>
            </div>
            <div className='widget-container main'>
              <div className='widget hide-scrollbar contacts-color'>
                <ContactList 
                baseURL={this.state.baseURL}
                deleteContact={this.deleteContact} 
                handleAddContact={this.handleAddContact} 
                getContacts={this.getContacts} 
                contacts={this.state.contacts} />
              </div>
              <div className='widget hide-scrollbar projects-color'>
                <ProjectList
                  baseURL={this.state.baseURL}
                  deleteProject={this.deleteProject}
                  handleAddProject={this.handleAddProject}
                  getProjects={this.getProjects} 
                  contacts={this.state.contacts} 
                  projects={this.state.projects}/>
              </div>
              <div className='widget hide-scrollbar leads-color'>
                <BusinessLeadsList 
                contacts={this.state.contacts} 
                deleteContact={this.deleteContact}/>
              </div>
              <div className='widget hide-scrollbar social-color'>
                <TweetList/>  
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default App;
