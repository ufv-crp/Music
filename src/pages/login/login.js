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

const Login = () => {
  const [authentication, setAuthentication] = useContext(AuthenticationContext);

  let history = useHistory();

  if (authentication.token) history.replace("/dashboard");

  const [forgotPassword, setForgotPassword] = useState(true);

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
          onSubmit={(values, { setSubmitting }) => {
            authenticate({ email: values.email, password: values.password })
              .then(response => {
                setAuthentication({ ...response.login });

                history.replace("/dashboard");
              })
              .catch(error => {
                console.log(error);
              });
            
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
              {forgotPassword && (
                <Field
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  component={TextField}
                />
              )}
              {forgotPassword && (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              )}
              {props.isSubmitting && <LinearProgress />}
              {forgotPassword && (
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
              )}
              {!forgotPassword && (
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
              )}
              <Grid container>
                <Grid item xs>
                  <Button onClick={() => setForgotPassword(!forgotPassword)}>
                    {forgotPassword ? "Forgot Password?" : "Back to Login"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
