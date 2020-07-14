import fs from 'fs';
import React from 'react';
import fetch from 'node-fetch';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { renderToStringWithData } from '@apollo/react-ssr';
// import { renderToString } from 'react-dom/server';
import App from 'App';

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

  const body = await renderToStringWithData(<EnhancedApp />);

  let template = fs.readFileSync(process.env.HTML_TEMPLATE_PATH, 'utf8');
  let html = template;
  html = html.replace(PLACEHOLDER.CONTENT, body);
  html = html.replace(PLACEHOLDER.STYLES, sheets.toString());
  html = html.replace(PLACEHOLDER.APOLLO, JSON.stringify(client.extract()));
  response.send(html);
};

export default renderer;
