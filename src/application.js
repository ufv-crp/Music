import React, { useContext } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthenticationContext } from "./states";

import {
  authenticationMiddleware,
  checkTokenExpiration,
  redirectWrapper
} from "./authentication";

const Application = () => {
  const [authentication] = useContext(AuthenticationContext);

  const localStateTokenExpiration = checkTokenExpiration({
    expireAt: authentication.expireAt
  });

  return (
    <Router>
      <Switch>
        {authenticationMiddleware({ authentication })}

        {redirectWrapper({
          invalid: localStateTokenExpiration.invalid,
          expired: localStateTokenExpiration.expired,
          pathname: "/login",
          state: {
            expired: localStateTokenExpiration.expired,
            invalid: localStateTokenExpiration.invalid
          }
        })}

        <Route render={() => <p>404 Page not found</p>} />
      </Switch>
    </Router>
  );
};

export default Application;
