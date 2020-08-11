import React from 'react';
import './App.css';
import ContactList from './components/ContactList'

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
      <h1>freelance crm</h1>
      <ContactList />
    </div>
  );
}

export default App;
