import React from "react";

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

export default function Login({ history }) {
  const [forgotPass, setForgotPass] = React.useState(true);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {forgotPass ? "Login" : "Recover your account"}
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
            localStorage.setItem("login", true);
            history.push("/dashboard");
            // GraphQL LOGIN query goes here
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
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
                required
                fullWidth
                component={TextField}
              />

              <br />
              {forgotPass && (
                <Field
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  component={TextField}
                />
              )}
              {forgotPass && (
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              )}
              {props.isSubmitting && <LinearProgress />}
              {forgotPass && (
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
              {!forgotPass && (
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
                  <Button onClick={() => setForgotPass(!forgotPass)}>
                    {forgotPass ? "Forgot Password?" : "Back to Login"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
