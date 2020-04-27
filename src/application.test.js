import React from "react"

import { render } from "@testing-library/react"

import Application from "./application"

import { AuthenticationProvider } from "./states"

test("renders application", () => {
  render(
    <AuthenticationProvider>
      <Application />
    </AuthenticationProvider>
  )
})
