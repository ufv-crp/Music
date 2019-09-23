import React, { createContext, useState } from "react";

const AuthContext = createContext();

// By default the token must be null
const AuthProvider = props => {
  const [authentication, setAuthentication] = useState({
    token: false
  });

  return (
    <AuthContext.Provider value={[authentication, setAuthentication]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
