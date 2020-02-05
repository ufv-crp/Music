import React, { useContext } from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/styles";

import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  LinearProgress,
  CardActions
} from "@material-ui/core";

import { Formik, Field } from "formik";

import { TextField } from "formik-material-ui";

import { UserContext, AuthenticationContext } from "../../../states";

import { createAuthenticatedClient } from "../../../authentication";

import { updateUserById } from "../../../pages/account/api";

const useStyles = makeStyles(theme => ({
  root: {},
  submit: {
    marginTop: "10px"
  }
}));

const FormikAccount = ({ classes, user, authentication, props }) => (
  <Formik
    enableReinitialize={true}
    initialValues={{ ...user, password: "" }}
    validate={values => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    }}
    onSubmit={async (values, { setSubmitting, setUser }) => {
      const client = createAuthenticatedClient({ token: authentication.token });

      setSubmitting(true);

      try {
        const response = await client.request(updateUserById, {
          params: {
            id: values.id,
            password: values.password,
            cpf: values.cpf,
            matriculation: values.matriculation,
            firstName: values.firstName,
            secondName: values.secondName
          }
        });

        setUser({ ...response.updateUser });
      } catch (error) {
        console.log(error);
      }
    }}
  >
    {props => (
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Field
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            component={TextField}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Field
            disabled
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            component={TextField}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Field
            name="firstName"
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            component={TextField}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Field
            name="secondName"
            label="Second Name"
            variant="outlined"
            margin="normal"
            fullWidth
            component={TextField}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Field
            name="matriculation"
            label="Matriculation"
            variant="outlined"
            margin="normal"
            fullWidth
            component={TextField}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Field
            name="cpf"
            label="CPF"
            variant="outlined"
            margin="normal"
            fullWidth
            component={TextField}
          />
        </Grid>

        {props.isSubmitting && <LinearProgress />}

        <br />

        <Divider />

        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            disabled={props.isSubmitting}
            onClick={props.submitForm}
          >
            Update
          </Button>
        </CardActions>
      </Grid>
    )}
  </Formik>
);

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { authentication } = useContext(AuthenticationContext);

  const { user, setUser } = useContext(UserContext);

  console.log(user);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader subheader="Some information can be edited" title="Account" />
      <Divider />
      <CardContent>
        {FormikAccount({ classes, user, setUser, authentication })}
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
