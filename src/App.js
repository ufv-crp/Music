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
        {!authentication && !authentication.data && <Redirect to="/auth/login" />}
        
        <Route path="/auth" render={props => <Auth {...props} />} />

        {authentication.data && (
          <Route path="/general" render={props => <General {...props} />} />
        )}

        {authentication && authentication.data && <Redirect to="/general/dashboard" />}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
