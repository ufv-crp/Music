import React from "react"

import ReactDOM from "react-dom"

import Application from "./application"

import { AuthenticationProvider, UserProvider } from "./states"

import * as serviceWorker from "./serviceWorker"

import dotenv from "dotenv"

import "./index.css"

import ReactGA from "react-ga"

dotenv.config()

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)

ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <AuthenticationProvider>
    <UserProvider>
      <Application />
    </UserProvider>
  </AuthenticationProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
//
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
