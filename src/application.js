import React, { useContext } from "react";

import { ThemeProvider } from "@material-ui/styles";

import theme from "./theme";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthenticationContext } from "./states";

import {
  authenticationMiddleware,
  checkTokenExpiration,
  redirectWrapperNotLogged,
  redirectWrapperNotFound
} from "./authentication";

const Application = () => {
  const [authentication] = useContext(AuthenticationContext);

  const localStateTokenExpiration = checkTokenExpiration({
    expireAt: authentication.expireAt
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {authenticationMiddleware({ authentication })}
          {redirectWrapperNotLogged({
            invalid: localStateTokenExpiration.invalid,
            expired: localStateTokenExpiration.expired,
            pathname: "/login",
            state: {
              expired: localStateTokenExpiration.expired,
              invalid: localStateTokenExpiration.invalid
            }
          })}
          {redirectWrapperNotFound({
            pathname: "/dashboard",
            state: {}
          })}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Application;
