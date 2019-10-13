// React
import React, { useContext } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Layouts
import General from "layouts/General";

import Auth from "layouts/Auth";

// Context
import { AuthContext } from "./AuthProvider";

// Styles
import "assets/vendor/nucleo/css/nucleo.css";

import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";

import "assets/scss/argon-dashboard-react.scss";

const checkTokenExpiration = (authentication) => {
  if (!authentication.data)
    return null
  
  const expireAt = new Date(authentication.data.expireAt)

  const now = new Date()

  if(now >= expireAt)
    return (
      <Redirect to={{
          pathname: '/auth/login',
          state: { message: 'Token expired', expireAt: expireAt.toDateString()}
        }}
      />
    )

  return null
}

const App = () => {
  const [authentication] = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={props => <Auth {...props} />} />

        { checkTokenExpiration(authentication) }

        {!authentication.data && <Redirect to="/auth/login" />}

        {authentication.data && (
          <Route path="/general" render={props => <General {...props} />} />
        )}

        {authentication.data && <Redirect to="/general/dashboard" />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
