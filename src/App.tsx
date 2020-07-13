import React from 'react';
import universal from 'react-universal-component';
import 'App.css';

const UniversalComponent = universal((props: {page: string}) => import(`./${props.page}`))

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <UniversalComponent page="home" />
      </header>
    </div>
  );
}

export default App;
