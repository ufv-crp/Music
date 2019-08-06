import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Loadable from "react-loadable";
import loading from "components/Loading/Loading.js";

const AdminLayout = Loadable({
  loader: () => import("layouts/Admin.jsx"),
  loading
});

const AuthLayout = Loadable({
  loader: () => import("layouts/Auth.jsx"),
  loading
});

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading()}>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />

            <Redirect from="/" to="/admin/index" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
