import React, { useContext, useState, useEffect } from "react"

import useStyles from "./styles"

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Typography
} from "@material-ui/core"

import { AccountCircle as AccountCircleIcon } from "@material-ui/icons"

import { UserContext } from "../../../states"

import { Field, Formik } from "formik"

import { TextField } from "formik-material-ui"

import { updateUserById } from "../../../pages/account/api"

import { useSnackbar } from "notistack"

const ProfileForm = ({
  classes,
  client,
  user,
  setUser,
  open,
  setOpen,
  enqueueSnackbar
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ ...user, confirmPassword: "" }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

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
        }) => rest

        if (values.confirmPassword === user.password) {
          try {
            const response = await client.request(updateUserById, {
              params: updatedUser(values)
            })

            setUser({ ...response.updateUser })

            enqueueSnackbar("Account updated", {
              variant: "success",
              autoHideDuration: 5000,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right"
              }
            })
          } catch (error) {
            console.log(error)
          }
        } else {
          enqueueSnackbar("Password is wrong", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        }

        resetForm()

        setSubmitting(false)

        setOpen(false)
      }}>
      {({ dirty, values, isSubmitting, submitForm }) => (
        <CardContent>
          <pre>{dirty}</pre>
          {/*<pre>{JSON.stringify(values, null, 4)}</pre>*/}
          <Grid container spacing={2}>
            <Grid item>
              <Field
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                component={TextField}
                disabled
              />
            </Grid>

            <Grid item>
              <Field
                name="firstName"
                label="Nome"
                variant="outlined"
                margin="normal"
                component={TextField}
              />
            </Grid>

            <Grid item>
              <Field
                name="secondName"
                label="Sobrenome"
                variant="outlined"
                margin="normal"
                component={TextField}
              />
            </Grid>

            <Grid item>
              <Field
                name="matriculation"
                label="Matrícula"
                variant="outlined"
                margin="normal"
                fullWidth
                component={TextField}
              />
            </Grid>

            <Grid item>
              <Field
                name="cpf"
                label="CPF"
                variant="outlined"
                margin="normal"
                fullWidth
                component={TextField}
              />
            </Grid>
          </Grid>

          <div>
            <Divider className={classes.spacer} />
            <Grid container spacing={2}>
              <Grid item>
                <Field
                  name="address.zipCode"
                  label="CEP"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  disabled
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.street"
                  label="Endereço"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  disabled
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.number"
                  label="Número"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  disabled
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.complement"
                  label="Complemento"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  disabled
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.city"
                  label="Cidade"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  disabled
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.state"
                  label="Estado"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  disabled
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Divider className={classes.spacer} />
            <Grid container spacing={2}>
              <Grid item>
                <Field
                  name="contact.email"
                  variant="outlined"
                  margin="normal"
                  label="E-mail"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  name="contact.phone"
                  label="Telefone"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                />
              </Grid>
            </Grid>
          </div>

          <Divider className={classes.spacer} />

          {isSubmitting && <LinearProgress />}

          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={() => setOpen(true)}>
              {isSubmitting ? "Enviando..." : "Salvar Alterações"}
            </Button>
          </CardActions>
          {open && (
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle id="form-dialog-title">Confirm Password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To update your account, please enter your current password
                  below
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
                  Cancelar
                </Button>
                <Button onClick={submitForm} color="primary">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </CardContent>
      )}
    </Formik>
  )
}

const AccountProfile = ({ client }) => {
  const classes = useStyles()

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const { user, setUser } = useContext(UserContext)

  const [open, setOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const [values, setValues] = useState({
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
    matriculation: user.matriculation,
    cpf: user.cpf
  })

  return (
    <Card className={classes.cardProfile}>
      <CardHeader
        className={classes.backgroundCard}
        title={
          <Typography variant="h4" className={classes.cardHeaderText}>
            Informações da Conta
          </Typography>
        }
        avatar={
          <Avatar className={classes.cardAvatar}>
            <AccountCircleIcon />
          </Avatar>
        }
      />
      <Divider />
      {ProfileForm({
        classes,
        client,
        user,
        setUser,
        open,
        setOpen,
        enqueueSnackbar
      })}
    </Card>
  )
}

export default AccountProfile
