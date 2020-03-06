import React, { useContext } from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/styles";

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  LinearProgress,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { useSnackbar } from "notistack";

import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";

import { Formik, Field } from "formik";

import { TextField } from "formik-material-ui";

import { UserContext } from "../../../states";

import { createAuthenticatedClient } from "../../../authentication";

import { updateUserById } from "../../../pages/account/api";

const useStyles = makeStyles(theme => ({
  root: {},
  submit: {
    marginTop: "10px"
  }
}));

const AccountForm = ({
  classes,
  user,
  setUser,
  open,
  setOpen,
  enqueueSnackbar
}) => (
  <Formik
    enableReinitialize
    initialValues={{ ...user, confirmPassword: "" }}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      const client = createAuthenticatedClient();

      const updatedUser = ({
        email,
        password,
        confirmPassword,
        address,
        contact,
        createdAt,
        updatedAt,
        creator,
        ...rest
      }) => rest;

      if (values.confirmPassword === user.password) {
        try {
          const response = await client.request(updateUserById, {
            params: updatedUser(values)
          });

          setUser({ ...response.updateUser });

          enqueueSnackbar("Account updated", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          });

          resetForm();
        } catch (error) {
          console.log(error);
        }
      } else {
        enqueueSnackbar("Password is wrong", {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
        });

        resetForm();
      }

      setSubmitting(false);

      setOpen(false);
    }}
  >
    {({ isSubmitting, submitForm, touched }) => (
      <>
        <Grid container spacing={1}>
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
            onClick={() => setOpen(true)}
          >
            Update
          </Button>
        </CardActions>
        {open && (
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle id="form-dialog-title">Confirm Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To update your account, please enter your current password below
              </DialogContentText>
              <Field
                name="confirmPassword"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                component={TextField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={submitForm} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    )}
  </Formik>
);

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="Account"
        subheader="Some information can be edited"
        avatar={
          <Avatar aria-label="account" variant="rounded">
            <AccountCircleIcon />
          </Avatar>
        }
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
      />
      <Divider />
      <CardContent>
        {AccountForm({
          classes,
          user,
          setUser,
          open,
          setOpen,
          enqueueSnackbar
        })}
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
