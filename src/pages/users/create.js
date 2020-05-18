import React from "react"

import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Typography
} from "@material-ui/core"

import { TextField } from "formik-material-ui"

import { ArrowBack as ArrowBackIcon } from "@material-ui/icons"

import { useSnackbar } from "notistack"

import { Field, Form, Formik } from "formik"

import * as Yup from "yup"

import { createUser, listAllUsers } from "../account/api"

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("Nome é obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
  matriculation: Yup.string()
    .min(4, "Digite uma matrícula válida")
    .max(5, "Máximo 5 dígitos")
    .required("Matrícula é obrigatório"),
  cpf: Yup.string().matches(/(^[0-9]+$)/, "Apenas dígitos")
})

const _listAllUsers = ({ client, query, setUsers }) => {
  client
    .request(query)
    .then((response) => {
      setUsers(response.listUsers)
    })
    .catch((error) => {
      console.log(error.response)

      setUsers([])
    })
}

const CreateUser = ({
  classes,
  client,
  setUsers,
  createUserState,
  setCreateUserState,
  authentication
}) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Box p={5} bgcolor="white" className={classes.boxCreateUser}>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.backItem}>
          <IconButton
            onClick={() => {
              _listAllUsers({
                client,
                setUsers: setUsers,
                query: listAllUsers
              })
              setCreateUserState(!createUserState)
            }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography className={classes.backItemText}>Novo Usuário</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} direction="column">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Formik
            initialValues={{
              email: "",
              matriculation: "",
              cpf: "",
              firstName: "",
              secondName: ""
            }}
            validationSchema={UserSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true)

              const {
                cpf,
                email,
                firstName,
                secondName,
                matriculation
              } = values

              const creator = authentication.userId

              console.log("values => ", {
                cpf,
                email,
                firstName,
                secondName,
                matriculation,
                creator
              })

              await client
                .request(createUser, {
                  params: {
                    cpf,
                    email,
                    firstName,
                    secondName,
                    matriculation,
                    creator
                  }
                })
                .then((response) => console.log(response))
                .catch(() => {})

              enqueueSnackbar("Usuário cadastrado", {
                variant: "success",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right"
                }
              })

              /*let responseUser = {}

              try {
                responseUser = await client.request(createUser, {
                  params: {
                    ...values,
                    creator: authentication.userId
                  }
                })

                enqueueSnackbar("Usuário cadastrado", {
                  variant: "success",
                  autoHideDuration: 5000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })

                resetForm()
              } catch {
                enqueueSnackbar("Erro ao criar usuário", {
                  variant: "error",
                  autoHideDuration: 8000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })
              }*/

              // TO DO: ASSOCIATE USER TO SCOPE

              resetForm()

              setSubmitting(false)
            }}>
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={4} direction="column">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="email"
                      type="email"
                      label="E-mail"
                      variant="outlined"
                      component={TextField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="firstName"
                      type="text"
                      label="Nome"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="secondName"
                      type="text"
                      label="Sobrenome"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="matriculation"
                      type="text"
                      label="Matrícula"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="cpf"
                      type="text"
                      label="CPF"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  {isSubmitting && (
                    <LinearProgress className={classes.linearProgress} />
                  )}

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Cadastrar"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateUser
