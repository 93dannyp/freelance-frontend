import React from 'react';
import './App.css';
import ContactList from './components/ContactList'
import Container from 'react-bootstrap/Container'
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

function App() {


  return (
   
    <div className="App">
      
      <Jumbotron>
        <h1 className='header'>freelance crm</h1>
      </Jumbotron>
      <Container className='p-3'>
        <Media>
        <ContactList />
        </Media>
        
      </Container>
    </div>
  
  );
}

export default App;
