import React, { Component } from 'react';
import './App.css';
import ContactList from './components/ContactList'
import ProjectList from './components/ProjectList'
import SideBar from './components/Sidebar'
import Header from './components/Header'



let baseURL = 'http://localhost:3003'

// TODO make sure this logic works with connecting baseURL
//  if (process.env.NODE_ENV === 'development') {
//    baseURL = 'http://localhost:3003'
//  } else {
//    baseURL = 'deployment backend here'
//  }
// console.log('Current base URL:', baseURL)


class App extends Component {
  state = {
    contacts: [],
    projects: []
  }
  // Fetching contact data from back end
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
    // adding contact data to contacts array
    // setting state to new array that contains contact data
    handleAddContact = (contact) => {
      const copyContacts = [...this.state.contacts]
      copyContacts.unshift(contact)
      this.setState({
          contacts: copyContacts,
          show: false
      })
  }

    // fetching project data from back end
    getProjects = () => {
      fetch(baseURL + '/api/projects/')
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

    componentDidMount(){
      this.getContacts()
      this.getProjects()
    }

  render () {
    return (
    
      <div className="App">
        
        <div className='container'>
        
        <SideBar className='grid-sidebar'/>
            
        {/* <Header className='header'/> */}
      <div className='header'>
        <h2>freelance CRM</h2>
        </div>
               <div className='contact-list'>
        <ContactList  handleAddContact={this.handleAddContacts} getContacts={this.getContacts} contacts={this.state.contacts} />
        </div>
        <div className='project-list'>
        <ProjectList  contacts={this.state.contacts} projects={this.state.projects}/>
        </div>
      
        </div>
      </div>
    )
  }
}

export default App;
