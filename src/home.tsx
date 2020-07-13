import React from 'react';
import graphql from 'graphqlFix/string';
import logo from 'logo.svg';
import { ReactComponent as Logo } from 'logo.svg';
import gql from 'graphql-tag';
import injectSheet from 'react-jss';

const styles = {
  paragraph: {
    color: '#09d3ac',
  },
};

const QUERY = gql`
  query do {
    me {
      name
    }
  }
`;

const Home = ({ classes }: { classes: { paragraph: string } }) => (
  <>
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.tsx</code> and save to reload!
    </p>
    <p className={classes.paragraph}>
      {/* eslint-disable-next-line no-restricted-globals */}
      {QUERY.loc?.source.name ?? 'undefined'}
      {graphql}
    </p>
    <Logo className="App-logo" />
  </>
);

export default injectSheet(styles)(Home);
