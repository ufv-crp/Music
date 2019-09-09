// React
import React, { useContext } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

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

        <Route
          path="*"
          component={() => (
            <h1>404 - Page not found or you don't have access</h1>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
