import React from "react";

import { Redirect } from "react-router-dom";

import { request } from "graphql-request";

import { routes, createRoutesComponents, filterRoutes } from "./routes";

const authenticate = async ({ email, password }) => {
  const query = `
		query Login($email: String!, $password: String!) {
			login(email: $email, password: $password){
				userId
        token
        issuedAt
        expireAt
        tokenExpiration
        scopes
        firstName
			}
	  }
	`;

  try {
    return await request(process.env.REACT_APP_GRAPHQL_URL, query, {
      email,
      password
    });
  } catch (error) {
    return error;
  }
};

const checkTokenExpiration = ({ expireAt }) => {
  if (expireAt === undefined) return { invalid: true };

  const dateTimeNow = new Date();

  const dateTimeTokenExpire = new Date(expireAt);

  return { expired: dateTimeNow >= dateTimeTokenExpire };
};

const authenticationMiddleware = ({ authentication }) => {
  const filteredRoutes = filterRoutes({
    routes,
    scopes: authentication.scopes
  });

  return createRoutesComponents({
    routes: filteredRoutes
  });
};

const redirectWrapperNotLogged = ({ expired, invalid, pathname, state }) => {
  if (expired || invalid)
    return <Redirect to={{ pathname: pathname, state: state }} />;

  return null;
};

const redirectWrapperNotFound = ({ pathname, state }) => {
  return <Redirect to={{ pathname: pathname, state: state }} />;
};

export {
  authenticate,
  authenticationMiddleware,
  checkTokenExpiration,
  redirectWrapperNotLogged,
  redirectWrapperNotFound
};
