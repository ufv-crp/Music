import React, { createContext, useReducer, useEffect } from "react";

import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem
} from "./utils";

const localStorageAuthenticationKey = "authentication";

const initialState = { scopes: [], token: "" };

const reducer = (previousState, newState) => {
  if (newState === null) {
    removeLocalStorageItem({ key: localStorageAuthenticationKey });

    return initialState;
  }

  return { ...previousState, ...newState };
};

const AuthenticationContext = createContext(initialState);

const AuthenticationProvider = ({ children }) => {
  const [authentication, setAuthentication] = useReducer(
    reducer,
    getLocalStorageItem({ key: localStorageAuthenticationKey, initialState })
  );

  useEffect(() => {
    setLocalStorageItem({
      key: localStorageAuthenticationKey,
      data: authentication
    });
  }, [authentication]);

  return (
    <AuthenticationContext.Provider
      value={{ authentication, setAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider, initialState };
