import fs from 'fs';
import React from 'react';
import fetch from 'node-fetch';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { /*renderToStringWithData,*/ getDataFromTree } from '@apollo/react-ssr';
import { renderToString } from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks';
import App from 'App';
import clientStats from './stats.json';

const PLACEHOLDER = {
  CONTENT: '%RENDERED_CONTENT%',
  STYLES: '/*%STYLES%*/',
  APOLLO: "'%APOLLO_STATE%'",
};

const renderer = async (request, response) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://api.react-finland.fi/graphql',
      fetch: fetch,
    }),
    cache: new InMemoryCache({ resultCaching: false }),
  });

  const sheets = new SheetsRegistry();
  const EnhancedApp = () => (
    <ApolloProvider client={client}>
      <JssProvider registry={sheets}>
        <App />
      </JssProvider>
    </ApolloProvider>
  );

  getDataFromTree(<EnhancedApp />).then(() => {
    const apolloState = client.extract();

    clearChunks();
    const body = renderToString(<EnhancedApp />);
    const chunkNames = flushChunkNames();
    // TODO: grab chunks to inject to HTML
    flushChunks(clientStats, { chunkNames });

    let template = fs.readFileSync(process.env.HTML_TEMPLATE_PATH, 'utf8');
    let html = template;
    html = html.replace(PLACEHOLDER.CONTENT, body);
    html = html.replace(PLACEHOLDER.STYLES, sheets.toString());
    html = html.replace(PLACEHOLDER.APOLLO, JSON.stringify(apolloState));
    response.send(html);
  });
  // const body = await renderToStringWithData(<EnhancedApp />);
};

export default renderer;
