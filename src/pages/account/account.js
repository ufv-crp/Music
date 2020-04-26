import React from "react";

import useStyles from "./styles";

import { Grid } from "@material-ui/core";

import { createAuthenticatedClient } from "../../authentication";

import { AccountDetails, AccountProfile } from "../../components";

const Account = () => {
  const classes = useStyles();

  const client = createAuthenticatedClient();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountProfile client={client} />
        </Grid>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
