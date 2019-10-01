import React, { createContext, useReducer, useEffect } from "react";

const initialState = { token: undefined }

const reducer = (previousState, newState) => {
  if (newState === null) {
    localStorage.removeItem("authentication");

    return initialState;
  }

  return { ...previousState, ...newState };
};

const localState = JSON.parse(localStorage.getItem("authentication"));

const AuthContext = createContext();

const AuthProvider = props => {
  const [authentication, setAuthentication] = useReducer(reducer, localState || initialState);
  
  useEffect(() => {
    localStorage.setItem("authentication", JSON.stringify(authentication));
  }, [authentication]);

  return (
    <AuthContext.Provider value={[authentication, setAuthentication]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }