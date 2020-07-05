import React, { useContext, useEffect } from "react"

import { ThemeProvider } from "@material-ui/core/styles"

import theme from "./theme"

import "./assets/index.scss"

import { BrowserRouter as Router, Switch } from "react-router-dom"

import { AuthenticationContext } from "./states"

import { SnackbarProvider } from "notistack"

import {
  authenticationMiddleware,
  checkTokenExpiration,
  redirectWrapperNotLogged,
  redirectWrapperNotFound
} from "./authentication"

const Application = () => {
  const { authentication, setAuthentication } = useContext(
    AuthenticationContext
  )

  const tokenExpiration = checkTokenExpiration({
    expireAt: authentication.expireAt
  })

  useEffect(() => {
    if (tokenExpiration.expired || tokenExpiration.invalid)
    setAuthentication({ scopes: [], token: "" })
  }, [setAuthentication, tokenExpiration.expired, tokenExpiration.invalid])

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Switch>
            {authenticationMiddleware({ authentication })}
            {redirectWrapperNotLogged({
              invalid: tokenExpiration.invalid,
              expired: tokenExpiration.expired,
              pathname: "/login",
              state: {
                expired: tokenExpiration.expired,
                invalid: tokenExpiration.invalid
              }
            })}
            {redirectWrapperNotFound({
              pathname: "/dashboard",
              state: {}
            })}
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Application
