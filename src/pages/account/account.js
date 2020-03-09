import React from "react";

import useStyles from "./styles";

import { Grid } from "@material-ui/core";

import {
  AccountDetails,
  AccountProfile,
  UserAddress,
  UserContact
} from "../../components";

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid
          item
          lg={4}
          md={6}
          xl={8}
          xs={12}
          component={AccountProfile}
          className={classes.card}
        />

        <Grid item lg={6} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>

        {/*<Grid item lg={6} md={6} xl={8} xs={12}>
          <UserAddress />
        </Grid>

        <Grid item lg={12} md={6} xl={4} xs={12}>
          <UserContact />
  </Grid>*/}
      </Grid>
    </div>
  );
};

export default Account;
