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

const App = () => {
  const [authentication] = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        {!authentication.token && (
          <Route path="/auth" render={props => <Auth {...props} />} />
        )}

        {authentication.token && (
          <Route path="/general" render={props => <General {...props} />} />
        )}

        {!authentication.token && <Redirect to="/auth/login" />}

        {authentication.token && <Redirect to="/general/dashboard" />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
