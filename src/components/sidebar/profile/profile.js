import React, { useContext} from "react";

import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

import { Avatar, Typography } from "@material-ui/core";

import { UserContext } from "../../../states";

const Profile = ({ className, ...rest }) => {
  const { user } = useContext(UserContext);

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        to="/account"
      >
        {!!user.firstName && user.firstName[0]}
      </Avatar>

      <Typography className={classes.name} variant="h5">
        {!!user.firstName && user.firstName}{" "}

        {!!user.secondName && user.secondName}
      </Typography>

      <Typography variant="body2">{!!user.email && user.email}</Typography>

      <Typography variant="body2">
        {!!user.matriculation && user.matriculation}
      </Typography>
    </div>
  );
};

export default Profile;
