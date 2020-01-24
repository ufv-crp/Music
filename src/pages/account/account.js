import React, { useContext } from "react";

import useStyles from "./styles";

import { Grid } from "@material-ui/core";

import { AccountDetails, AccountProfile } from "../../components";

import { UserContext } from "../../states";

const Account = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile user={user} />
        </Grid>

        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
