import React, { useContext } from "react";

import clsx from "clsx";

import moment from "moment";

import useStyles from "./styles";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider
} from "@material-ui/core";

import { UserContext } from "../../../states";

const AccountProfile = props => {
  const { className, ...rest } = props;

  const { user } = useContext(UserContext);

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {user.firstName} {user.secondName}
            </Typography>

            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.email}
            </Typography>

            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.cpf}
            </Typography>

            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.matriculation}
            </Typography>

            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment(user.createdAt).format("hh:mm A MMMM Do YYYY")}
            </Typography>
          </div>

          <Avatar className={classes.avatar}>
            {!!user.firstName && user.firstName[0]}
          </Avatar>
        </div>
      </CardContent>

      <Divider />
    </Card>
  );
};

export default AccountProfile;
