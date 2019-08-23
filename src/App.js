// React
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Layouts
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";

// Styles
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/auth/login" />;
        }
      }}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <ProtectedRoute path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
