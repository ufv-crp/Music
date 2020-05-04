import React from "react"

import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress
} from "@material-ui/core"

import { Formik, Form as FormikForm, Field } from "formik"

import * as Yup from "yup"

import { TextField } from "formik-material-ui"

import {
  updateAddressById,
  updateContactById,
  updateUserById
} from "../../../pages/account/api"

const ProfileSchema = Yup.object().shape({
  matriculation: Yup.string()
    .min(4, "Digite uma matrícula válida")
    .max(5, "Máximo 5 dígitos")
    .required("Matrícula é obrigatório"),
  firstName: Yup.string().required(),
  secondName: Yup.string(),
  cpf: Yup.string().matches(/(^[0-9]+$)/, "Apenas dígitos"),
  address: Yup.object().shape({
    zipCode: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    number: Yup.number().positive("Número não pode ser nulo ou negativo"),
    complement: Yup.string()
  }),
  contact: Yup.object().shape({
    email: Yup.string().email("Digite um e-mail válido"),
    phone: Yup.string()
  })
})

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
      initialValues={{ ...user, confirmPassword: "123456" }}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        const {
          id,
          password,
          cpf,
          matriculation,
          firstName,
          secondName
        } = values

        const { address } = values

        const {
          contact: { userId, ...rest }
        } = values

        console.log(rest)

        if (String(values.confirmPassword) === String(user.password)) {
          client
            .request(updateUserById, {
              params: {
                id,
                password,
                cpf,
                matriculation,
                firstName,
                secondName
              }
            })
            .then((response) => setUser({ ...response.updateUser }))
            .catch(() => {})

          client
            .request(updateAddressById, {
              params: { ...address }
            })
            .then((response) => setUser({ address: response.updateAddress }))
            .catch(() => {})

          client
            .request(updateContactById, {
              params: { ...rest }
            })
            .then((response) => setUser({ contact: response.updateContact }))
            .catch(() => {})

          enqueueSnackbar("Perfil Atualizado", {
            variant: "success",
            autoHideDuration: 4500,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        } else {
          enqueueSnackbar("Senha Inválida", {
            variant: "error",
            autoHideDuration: 4500,
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
      {({ dirty, isValid, isSubmitting, submitForm, resetForm }) => (
        <FormikForm className={classes.form}>
          <Grid container spacing={2}>
            <Grid item>
              <Field
                name="firstName"
                label="Nome"
                variant="outlined"
                margin="normal"
                component={TextField}
                required
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
                component={TextField}
                required
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
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.street"
                  label="Endereço"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.number"
                  label="Número"
                  variant="outlined"
                  margin="normal"
                  type="number"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.complement"
                  label="Complemento"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.city"
                  label="Cidade"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  name="address.state"
                  label="Estado"
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                />
              </Grid>
              <Grid item>
                <Field
                  name="contact.email"
                  variant="outlined"
                  margin="normal"
                  label="E-mail Alternativo"
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
              variant="contained"
              color="primary"
              disabled={!dirty || !isValid || isSubmitting}
              onClick={() => setOpen(true)}>
              {isSubmitting ? "Enviando..." : "Salvar Alterações"}
            </Button>
          </CardActions>
          {open && (
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle id="form-dialog-title">
                Salvar Alterações
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Para salvar as alterações, por favor digite sua senha
                </DialogContentText>
                <Field
                  name="confirmPassword"
                  type="password"
                  label="Senha"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  component={TextField}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpen(false)
                    resetForm()
                  }}
                  color="primary">
                  Cancelar
                </Button>
                <div className={classes.divider}></div>
                <Button
                  variant="contained"
                  onClick={submitForm}
                  color="primary">
                  Atualizar
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </FormikForm>
      )}
    </Formik>
  )
}

export default ProfileForm
