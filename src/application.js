import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { authenticationMiddleware } from "./authentication";

const Application = () => {
  return (
    <Router>
      <Link to="/dashboard">Dashboard</Link>

      <Link to="login">Login</Link>

      <Switch>
        {authenticationMiddleware()}

        <Route render={() => <p>404 Page not found</p>} />
      </Switch>
    </Router>
  );
};

export default Application;
