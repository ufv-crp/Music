import React, { useContext, useState } from "react";

import useStyles from "./styles";

import { Formik, Field, Form } from "formik";

import { TextField } from "formik-material-ui";

import {
  Avatar,
  CssBaseline,
  Button,
  LinearProgress,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
  Grid
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { useHistory } from "react-router-dom";

import { authenticate } from "../../authentication";

import { AuthenticationContext } from "../../states";

import { request } from "graphql-request";

const Login = () => {
  const [authentication, setAuthentication] = useContext(AuthenticationContext);

  let history = useHistory();

  if (authentication.token) history.replace("/dashboard");

  const [forgotPassword, setForgotPassword] = useState(false);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {forgotPassword ? "Login" : "Recover your account"}
        </Typography>

        {forgotPassword && (
          <Formik
            initialValues={{ email: "" }}
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(false);

              const query = `
                mutation ResetUserPassword($email: String!) {
                  resetUserPassword(email: $email)
                }
              `;

              try {
                await request(
                  process.env.REACT_APP_GRAPHQL_URL,
                  query,
                  {
                    email: values.email
                  }
                );

                resetForm();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {props => (
              <Form className={classes.form}>
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  component={TextField}
                />

                <br />

                {props.isSubmitting && <LinearProgress />}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={props.isSubmitting}
                  onClick={props.submitForm}
                >
                  Send Password
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {forgotPassword === false && (
          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false
            }}
            validate={values => {
              const errors = {};

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              }

              return errors;
            }}
            onSubmit={async (
              values,
              { setSubmitting, setStatus, resetForm }
            ) => {
              try {
                const response = await authenticate({
                  email: values.email,
                  password: values.password
                });

                setAuthentication({ ...response.login });

                history.replace("/dashboard");

                resetForm();
              } catch (error) {
                console.log(error);
              }

              setSubmitting(false);
            }}
          >
            {props => (
              <Form className={classes.form}>
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  component={TextField}
                />

                <br />

                <Field
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  component={TextField}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                {props.isSubmitting && <LinearProgress />}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={props.isSubmitting}
                  onClick={props.submitForm}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        )}

        <Grid container>
          <Grid item xs>
            <Button onClick={() => setForgotPassword(!forgotPassword)}>
              {forgotPassword ? "Back to Login" : "Forgot Password?"}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
