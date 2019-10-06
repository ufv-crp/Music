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
import { AuthProvider } from "./AuthProvider";

// Manage network layer
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInNjb3BlcyI6WyJzZWFyY2hVc2VyIiwiY3JlYXRlVXNlciIsInJlbW92ZVVzZXIiLCJ1cGRhdGVVc2VyIiwibGlzdFVzZXJzIiwicmVzZXRVc2VyUGFzc3dvcmQiLCJzZWFyY2hTY29wZSIsImNyZWF0ZVNjb3BlIiwicmVtb3ZlU2NvcGUiLCJ1cGRhdGVTY29wZSIsImxpc3RTY29wZXMiLCJsaXN0Q29udGFjdHMiLCJjcmVhdGVDb250YWN0IiwicmVtb3ZlQ29udGFjdCIsInVwZGF0ZUNvbnRhY3QiLCJsaXN0QWRkcmVzc2VzIiwiY3JlYXRlQWRkcmVzcyIsInJlbW92ZUFkZHJlc3MiLCJ1cGRhdGVBZGRyZXNzIiwic2VhcmNoQ291cnNlcyIsImxpc3RDb3Vyc2VzIiwiY3JlYXRlQ291cnNlIiwicmVtb3ZlQ291cnNlIiwidXBkYXRlQ291cnNlIiwibGlzdFVzZXJTY29wZXMiLCJjcmVhdGVVc2VyU2NvcGUiLCJjcmVhdGVVc2VyU2NvcGVCdWxrIiwicmVtb3ZlVXNlclNjb3BlIiwibGlzdENvdXJzZVVzZXJzIiwiY3JlYXRlQ291cnNlVXNlciIsInJlbW92ZUNvdXJzZVVzZXIiLCJjcmVhdGVDbGFzcyIsInJlbW92ZUNsYXNzIiwidXBkYXRlQ2xhc3MiLCJsaXN0Q2xhc3NlcyIsImxpc3RDbGFzc1VzZXJzIiwiY3JlYXRlQ2xhc3NVc2VyIiwicmVtb3ZlQ2xhc3NVc2VyIiwibGlzdFByb2dyZXNzZXMiLCJjcmVhdGVQcm9ncmVzcyIsInJlbW92ZVByb2dyZXNzIiwidXBkYXRlUHJvZ3Jlc3MiLCJkYXNoYm9hcmQiXSwiaWF0IjoxNTcwMzIxMDc2LCJleHAiOjE1NzA0OTM4NzZ9.a7-5J5x2T4vy3oCGGf1tlythuzghfUJozmCu23yibX4`
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
