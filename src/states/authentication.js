import React, { createContext, useReducer, useEffect } from "react";

import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem
} from "./utils";

const localStorageAuthenticationKey = "authentication";

const initialState = { data: {a:1} };

const reducer = (previousState, newState) => {
  if (newState === null) {
    removeLocalStorageItem(localStorageAuthenticationKey);

    return initialState;
  }

  return { ...previousState, ...newState };
};

const AuthenticationContext = createContext();

const AuthenticationProvider = properties => {
  const [authentication, setAuthentication] = useReducer(
    reducer,
    getLocalStorageItem(localStorageAuthenticationKey, initialState)
  );
  
  useEffect(() => {
    setLocalStorageItem(localStorageAuthenticationKey, authentication);
  }, [authentication]);

  return (
    <AuthenticationContext.Provider value={[authentication, setAuthentication]}>
      {properties.children}
    </AuthenticationContext.Provider>
  );
};

export {
  AuthenticationContext,
  AuthenticationProvider,
  initialState
};
