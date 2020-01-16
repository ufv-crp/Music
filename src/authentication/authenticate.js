import React from "react";

import { Redirect } from "react-router-dom";

import { request } from "graphql-request";

import { routes, createRoutesComponents, filterRoutes } from "./routes";

import { getLocalStorageItem, initialState } from "../states";

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

const stateAuthentication = () => {
  return getLocalStorageItem({
    key: "authentication",
    initialState
  }).data;
};

const checkTokenExpiration = ({ expireAt }) => {
  const dateTimeNow = new Date();

  const dateTimeTokenExpire = new Date(expireAt);

  const tokenState = {
    dateTimeNow,
    dateTimeTokenExpire,
    expired: dateTimeNow >= dateTimeTokenExpire
  };

  return tokenState;
};

const checkTokenExpirationWrapper = () => {
  const localStateAuthentication = stateAuthentication();

  return checkTokenExpiration({ expireAt: localStateAuthentication.expireAt });
};

const authenticationMiddleware = () => {
  const localStateAuthentication = stateAuthentication();

  if (
    Object.entries(localStateAuthentication).length &&
    localStateAuthentication.hasOwnProperty("scopes") &&
    localStateAuthentication.hasOwnProperty("expireAt")
  ) {
    const filteredRoutesPublicPrivate = filterRoutes({
      routes,
      scopes: localStateAuthentication.scopes
    });

    return createRoutesComponents({
      routes: filteredRoutesPublicPrivate
    });
  } else {
    const filteredRoutesPublic = filterRoutes({ routes, scopes: [] });

    return createRoutesComponents({
      routes: filteredRoutesPublic
    });
  }
};

const redirectWrapper = ({ expired, pathname, state }) => {
  if (expired) return <Redirect to={{ pathname: pathname, state: state }} />;

  return null;
};

export {
  authenticate,
  authenticationMiddleware,
  checkTokenExpiration,
  checkTokenExpirationWrapper,
  redirectWrapper
};
