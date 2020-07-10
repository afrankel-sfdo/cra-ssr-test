import React from 'react';
import logo from 'logo.svg';
import { ReactComponent as Logo } from 'logo.svg';
import 'App.css';
import gql from 'graphql-tag';
import graphql from 'graphql/string'

const QUERY = gql`query do{ me { name }}`;

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!
        </p> 
        <p>
        {/* eslint-disable-next-line no-restricted-globals */}
        {QUERY.loc?.source.name ?? 'undefined'}
        {graphql}
        </p>
        <Logo className="App-logo" />
      </header>
    </div>
  );
}

export default App;
