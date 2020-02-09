import React, { useContext } from "react";

import clsx from "clsx";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Avatar,
  LinearProgress
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import { LocationOn as LocationIcon } from "@material-ui/icons";

import { Formik, Field } from "formik";

import { TextField } from "formik-material-ui";

import { UserContext } from "../../../states";

import { createAuthenticatedClient } from "../../../authentication";

import { updateAddressById } from "../../../pages/account/api";

const useStyles = makeStyles(theme => ({
  root: {},
  submit: {
    marginTop: "10px"
  }
}));

const UserAddressForm = ({ classes, address, setUser }) => (
  <Formik
    enableReinitialize
    initialValues={{ ...address }}
    onSubmit={async (values, { setSubmitting }) => {
      setSubmitting(true);

      const client = createAuthenticatedClient();

      const updatedAddress = ({ userId, createdAt, updatedAt, ...rest }) =>
        rest;

      try {
        const response = await client.request(updateAddressById, {
          params: updatedAddress(values)
        });

        setUser({ address: { ...response.updateAddress } });
      } catch (error) {
        console.log(error);
      }

      setSubmitting(false);
    }}
  >
    {({ isSubmitting, submitForm, touched }) => (
      <>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Field
              name="street"
              label="Street"
              variant="outlined"
              margin="normal"
              fullWidth
              component={TextField}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              name="number"
              label="Number"
              variant="outlined"
              margin="normal"
              type="number"
              fullWidth
              component={TextField}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              name="city"
              label="City"
              variant="outlined"
              margin="normal"
              fullWidth
              component={TextField}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              name="state"
              label="State"
              variant="outlined"
              margin="normal"
              fullWidth
              component={TextField}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              name="zipCode"
              label="Zip Code"
              variant="outlined"
              margin="normal"
              fullWidth
              component={TextField}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              name="complement"
              label="Complement"
              variant="outlined"
              margin="normal"
              fullWidth
              component={TextField}
            />
          </Grid>

          {isSubmitting && <LinearProgress />}

          <br />

          <Divider />
        </Grid>

        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            disabled={isSubmitting || !Object.keys(touched).length}
            onClick={submitForm}
          >
            Update
          </Button>
        </CardActions>
      </>
    )}
  </Formik>
);

const UserAddress = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);

  const address = user.address;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader="Some information can be edited"
        title="Address"
        titleTypographyProps={{
          align: "left",
          variant: "h5",
          display: "block"
        }}
        subheaderTypographyProps={{
          align: "left",
          variant: "body1",
          display: "block",
          color: "textSecondary"
        }}
        avatar={
          <Avatar aria-label="contact" variant="rounded">
            <LocationIcon />
          </Avatar>
        }
      />
      <Divider />
      <CardContent>
        {UserAddressForm({ classes, address, setUser })}
      </CardContent>
    </Card>
  );
};

export default UserAddress;
