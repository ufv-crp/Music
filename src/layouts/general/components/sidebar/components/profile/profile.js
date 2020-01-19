import React from "react";

import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

import { Avatar, Typography } from "@material-ui/core";

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "Walter Sphinxs",
    bio: "Senior Developer"
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        to="/account"
      >
        {user.name[0]}
      </Avatar>
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

export default Profile;
