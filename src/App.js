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
            data.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0))
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
      copyContacts.sort()
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

deleteProject = (id) => {
  console.log(baseURL)
  console.log(id)
  fetch(baseURL + '/api/projects/' + id, {
      crossDomain: true,
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
  }).then(res => {
      console.log(res)
      const findIndex = this.state.projects.findIndex(project => project.id === id)
      const copyProjects = [...this.state.projects]
      copyProjects.splice(findIndex, 1)
      this.setState({projects: copyProjects})
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
        <ContactList deleteContact={this.deleteContact} handleAddContact={this.handleAddContacts} getContacts={this.getContacts} contacts={this.state.contacts} />
        </div>
        <div className='project-list'>
        <ProjectList  deleteProject={this.deleteProject}contacts={this.state.contacts} projects={this.state.projects}/>
        </div>
      
        </div>
      </div>
    )
  }
}

export default App;
