import React, { useContext } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  routes,
  createRoutesComponents,
  authenticate,
  filterRoutes
} from "./authentication";

import { AuthenticationContext, getLocalStorageItem, initialState } from "./states";

const Application = () => {
  const [authentication, setAuthentication] = useContext(AuthenticationContext);

  const localStateAuthentication = getLocalStorageItem("authentication", initialState);

  console.log('Local state authentication', localStateAuthentication)
  return (
    <Router>
      <Link to="/dashboard">Dashboard</Link>

      <Link to="login">Login</Link>

      <Switch>
        {Object.entries(localStateAuthentication.data).length && localStateAuthentication.data.hasOwnProperty('scopes')
          ? createRoutesComponents({
              routes: filterRoutes({
                routes,
                scopes: localStateAuthentication.data.scopes
              })
            })
          : createRoutesComponents({
              routes: filterRoutes({ routes, scopes: [] })
            })}

        <Route render={() => <p>404 Page not found</p>} />
      </Switch>
    </Router>
  );
};

export default Application;
