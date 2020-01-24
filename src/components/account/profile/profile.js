import React from "react";

import clsx from "clsx";

import moment from "moment";

import useStyles from "./styles";

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from "@material-ui/core";

const AccountProfile = props => {
  const { className, user, ...rest } = props;

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
              {moment(user.createdAt).format('hh:mm A MMMM Do YYYY')}
            </Typography>
          </div>

          <Avatar className={classes.avatar}>
            {!!user.firstName && user.firstName[0]}
          </Avatar>
        </div>

        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>

          <LinearProgress value={70} variant="determinate" />
        </div>
      </CardContent>

      <Divider />

      <CardActions>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Upload picture
        </Button>

        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
