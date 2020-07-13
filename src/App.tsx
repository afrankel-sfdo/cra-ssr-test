import React from 'react';
import universal from 'react-universal-component';
import injectSheet from 'react-jss';
import 'App.css';

const UniversalComponent = universal((props: { page: string }) =>
  import(`./${props.page}`)
);

const styles = {
  wrapper: {
    border: '4px solid red',
  },
};

const App = ({ classes }: { classes: { wrapper: string } }) => (
  <div className={classes.wrapper}>
    <div className="App">
      <header className="App-header">
        <UniversalComponent page="home" />
      </header>
    </div>
  </div>
);

export default injectSheet(styles)(App);
