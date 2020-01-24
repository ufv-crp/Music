import React from "react";

import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

import { Avatar, Typography } from "@material-ui/core";

const Profile = ({ className, userInfo, ...rest }) => {
  const { firstName, secondName, email, matriculation } = userInfo;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        to="/users"
      >
        {!!firstName && firstName[0]}
      </Avatar>

      <Typography className={classes.name} variant="h5">
        {!!firstName && firstName}
        {!!secondName && secondName}
      </Typography>

      <Typography variant="body2">{!!email && email}</Typography>
      <Typography variant="body2">
        {!!matriculation && matriculation}
      </Typography>
    </div>
  );
};

export default Profile;
