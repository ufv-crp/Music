import React, { createContext, useReducer, useEffect } from "react";

import Cryptr from "cryptr";

const cryptr = new Cryptr('Secret!');

const initialState = { token: null }

const reducer = (previousState, newState) => {
  if (newState === null) {
    localStorage.removeItem("authentication");

    return initialState;
  }

  return { ...previousState, ...newState };
};

const localState = localStorage.getItem("authentication");

const AuthContext = createContext();

const AuthProvider = props => {
  const [authentication, setAuthentication] = useReducer(reducer, localState ? JSON.parse(cryptr.decrypt(localState)) : initialState);
  
  useEffect(() => {
    localStorage.setItem("authentication", cryptr.encrypt(JSON.stringify(authentication)));
  }, [authentication]);

  return (
    <AuthContext.Provider value={[authentication, setAuthentication]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }