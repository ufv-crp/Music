import React, { createContext, useReducer, useEffect } from "react";

import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem
} from "./utils";

const localStorageAuthenticationKey = "authentication";

const initialStateAuthentication = { scopes: [], token: "" };

const reducer = (previousState, newState) => {
  if (newState === null) {
    removeLocalStorageItem({ key: localStorageAuthenticationKey });

    return initialStateAuthentication;
  }

  return { ...previousState, ...newState };
};

const AuthenticationContext = createContext(initialStateAuthentication);

const AuthenticationProvider = ({ children }) => {
  const [authentication, setAuthentication] = useReducer(
    reducer,
    getLocalStorageItem({ key: localStorageAuthenticationKey, initialState: initialStateAuthentication })
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

export { AuthenticationContext, AuthenticationProvider, initialStateAuthentication };
