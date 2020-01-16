import * as React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRouter from "./components/PrivateRouter";

import Dashboard from "./pages/Dashboard/Dashboard";

import Login from "./pages/Login/Login";

const router = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRouter path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default router;
