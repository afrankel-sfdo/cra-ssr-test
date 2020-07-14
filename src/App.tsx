import 'cross-fetch/polyfill';
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import querySeries from 'graphqlFix/series';
import { createUseStyles } from 'react-jss';

import 'App.css';

declare const require: any;


const client = new ApolloClient({
  uri: 'https://api.react-finland.fi/graphql',
});

const useStyles = createUseStyles({
  wrapper: {
    border: '4px solid black',
  },
});

const App = () => {
  const { loading, data } = useQuery(querySeries);
  const { wrapper } = useStyles();

  return (
    <div className={wrapper}>
      <div className="App">
        <header className="App-header">
          {loading
            ? 'graphql loading'
            : data.allSeries.map((series: any) => <div>{series.name}</div>)}
        </header>
      </div>
    </div>
  );
};

const Apollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Apollo;
