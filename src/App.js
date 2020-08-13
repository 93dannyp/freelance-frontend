import React, { Component } from 'react';
import './App.css';
import ContactList from './components/ContactList'
import ProjectList from './components/ProjectList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'


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
    contacts: []
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

    componentDidMount(){
      this.getContacts()
    }
    
  render () {
  return (
   
    <div className="App">
      
      <Jumbotron>
        <h1 className='header'>freelance crm</h1>
      </Jumbotron>
      <Container className='p-3'>
        <Row>
          <Col>
            <Media>
              <Media.Body>
                <ContactList getContacts={this.getContacts} contacts={this.state.contacts}/>
              </Media.Body>
            </Media>
          </Col>
          <Col>
            <Media>
              <Media.Body>
                <ProjectList />
              </Media.Body>
            </Media>
          </Col>
        </Row>
      </Container>
    </div>
  
  )
  }
}

export default App;
