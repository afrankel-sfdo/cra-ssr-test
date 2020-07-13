import React from 'react';
import logo from 'logo.svg';
import { ReactComponent as Logo } from 'logo.svg';
import injectSheet from 'react-jss';

const styles = {
  paragraph: {
    color: '#09d3ac',
  },
};

const Home = ({ classes }: { classes: { paragraph: string } }) => {

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload!
      </p>
      <p className={classes.paragraph}>
        {/* eslint-disable-next-line no-restricted-globals */}

      </p>
      <Logo className="App-logo" />
    </>
  );
};

export default injectSheet(styles)(Home);
