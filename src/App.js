import React from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';

const QUERY = gql`query do{ me { name }}`;

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload!
        </p> 
        <p>
        {QUERY.loc?.source.name ?? 'undefined'}
        </p>
      </header>
    </div>
  );
}

export default App;
