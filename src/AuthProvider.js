import React, { createContext, useReducer, useEffect } from "react";

import Cryptr from "cryptr";

const cryptr = new Cryptr('Secret!');

const initialState = { data: null }

const reducer = (previousState, newState) => {
  if (newState === null) {
    localStorage.removeItem("authentication");

    return initialState;
  }

  return { ...previousState, ...newState };
};

const getLocalAuthentication = () => {
  const localState = localStorage.getItem("authentication");

  return localState ? JSON.parse(cryptr.decrypt(localState)) : initialState
}

const setLocalAuthentication = (data) => {
  localStorage.setItem("authentication", cryptr.encrypt(JSON.stringify(data)));
}

const AuthContext = createContext();

const AuthProvider = props => {
  const [authentication, setAuthentication] = useReducer(reducer, getLocalAuthentication());
  
  // Process each time the render is done
  useEffect(() => {
    setLocalAuthentication(authentication)
  }, [authentication]);

  return (
    <AuthContext.Provider value={[authentication, setAuthentication]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, getLocalAuthentication, setLocalAuthentication, initialState }