import React from "react";

import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

import { Avatar, Typography } from "@material-ui/core";

const Profile = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        to="/users"
      >
        {user.firstName[0]}
      </Avatar>

      <Typography className={classes.name} variant="h5">
        {user.firstName} {user.secondName}
      </Typography>
      
      <Typography variant="body2">{user.email}</Typography>
      <Typography variant="body2">{user.matriculation}</Typography>
    </div>
  );
};

export default Profile;
