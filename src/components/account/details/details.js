import React, { useContext } from "react";

import useStyles from "./styles";

import { Card, CardContent, Avatar } from "@material-ui/core";

import { UserContext } from "../../../states";

const AccountDetails = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  return (
    <Card className={classes.cardUser}>
      <div className={classes.cardUserBackground}></div>
      <CardContent>
        <div className={classes.cardPerson}>
          <Avatar className={classes.cardPersonAvatar}>
            {!!user.firstName && user.firstName[0]}
          </Avatar>
          {/*<img
            alt="..."
            src="https://demos.creative-tim.com/paper-dashboard-react/static/media/mike.aab414f7.jpg"
          />*/}
          <h5 className={classes.cardPersonTitle}>{user.firstName}</h5>
          <p className={classes.cardPersonDescription}>
            @{user.firstName.toLowerCase()}
          </p>
        </div>
        <p className={classes.cardPersonDescription}>{user.matriculation}</p>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
