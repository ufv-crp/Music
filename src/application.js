import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  authenticationMiddleware,
  checkTokenExpirationWrapper,
  redirectWrapper
} from "./authentication";

const Application = () => {
  const localStateTokenExpiration = checkTokenExpirationWrapper();

  return (
    <Router>
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/login">Login</Link>

      <Switch>
        {authenticationMiddleware()}

        {redirectWrapper({
          expired: localStateTokenExpiration.expired,
          pathname: "/login",
          state: { expired: localStateTokenExpiration.expired }
        })}

        <Route render={() => <p>404 Page not found</p>} />
      </Switch>
    </Router>
  );
};

export default Application;
