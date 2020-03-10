import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import useStyles from "./styles";

import { Grid } from "@material-ui/core";

import { createAuthenticatedClient } from "../../authentication";

import { AccountDetails, UserAddress, UserContact } from "../../components";

const Account = () => {
  const classes = useStyles();

  const location = useLocation();

  const client = createAuthenticatedClient();

  useEffect(() => {
    console.log(location.state.action);
  }, [location]);

  return (
    <Grid container className={classes.accountContainer}>
      {/*<Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
        <AccountProfile />
  </Grid>*/}

      <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
        <AccountDetails client={client} />
      </Grid>

      <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
        <UserAddress client={client} />
      </Grid>

      <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
        <UserContact client={client} />
      </Grid>
    </Grid>
  );
};

export default Account;
