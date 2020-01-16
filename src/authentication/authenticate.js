import { request } from "graphql-request";

import { routes, createRoutesComponents, filterRoutes } from "./routes";

import { getLocalStorageItem, initialState } from "../states";

const authenticate = async ({ email, password }) => {
  const query = `
		query Login($email: String!, $password: String!) {
			login(email: $email, password: $password){
				userId
				token
				tokenExpiration
				scopes
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

const authenticationMiddleware = () => {
  const localStateAuthentication = getLocalStorageItem({
    key: "authentication",
    initialState
  }).data;

  if (
    Object.entries(localStateAuthentication).length &&
    localStateAuthentication.hasOwnProperty("scopes")
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

export { authenticate, authenticationMiddleware };
