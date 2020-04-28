import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col} from 'reactstrap';

import Header from './components/Header';
import Graph from './components/Graph';

function App() {
  return (
    <>
    <Header />
    <Container className='mt-3'>
      <Row>
        <Col></Col>
        <Col md="auto"><Graph /></Col>
        <Col></Col>
      </Row>
    </Container>    
    {/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/}
    </>
  );
}

export default App;
