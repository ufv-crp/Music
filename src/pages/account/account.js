import React from "react"

import useStyles from "./styles"

import { Grid } from "@material-ui/core"

import { createAuthenticatedClient } from "../../authentication"

import { AccountDetails, AccountProfile } from "../../components"

const Account = () => {
  const classes = useStyles()

  const client = createAuthenticatedClient()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8} xl={8}>
          <AccountProfile client={client} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={4}>
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  )
}

export default Account
