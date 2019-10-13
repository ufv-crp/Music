// React
import React from "react";

import App from "./App";

// Apollo
import { HttpLink } from "apollo-link-http";

import { onError } from "apollo-link-error";

import { ApolloLink } from "apollo-link";

import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloClient } from "apollo-client";

import { ApolloProvider } from "react-apollo";

// Authentication
import { AuthProvider, getLocalAuthentication } from "./AuthProvider";

const getTokenData = () => {
  const localState = getLocalAuthentication()

  if(localState && localState.data)
    return localState.data.token
  
  return ""
}

// Manage network layer
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: {
    authorization: `Bearer ${getTokenData()}`
  }
});

// Handle error
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Network request middleware
const link = ApolloLink.from([errorLink, httpLink]);

// Data cache
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default (
  <AuthProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AuthProvider>
);
