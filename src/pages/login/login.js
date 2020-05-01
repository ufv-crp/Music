import React, { useContext, useState } from "react"

import useStyles from "./styles"

import * as Yup from "yup"

import { Formik, Field, Form } from "formik"

import { TextField } from "formik-material-ui"

import {
  Avatar,
  CssBaseline,
  Button,
  LinearProgress,
  Container,
  Typography,
  Grid,
  Box
} from "@material-ui/core"

import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

import MailOutlineIcon from "@material-ui/icons/MailOutline"

import { withRouter } from "react-router-dom"

import { authenticate, resetPassword } from "../../authentication"

import { createAuthenticatedClient } from "../../authentication"

import { AuthenticationContext, UserContext } from "../../states"

import { useSnackbar } from "notistack"

import {
  searchUser,
  listAddressById,
  listContactById
} from "../../pages/account/api"

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatório")
})

const forgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório")
})

const FormikForgotPassword = ({ classes, enqueueSnackbar }) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        try {
          await resetPassword({ email: values.email })

          enqueueSnackbar("Nova senha enviada para seu e-mail", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        } catch {
          enqueueSnackbar("Este e-mail não existe em nossa base de dados", {
            variant: "error",
            autoHideDuration: 8000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        }
      }}>
      {(props) => (
        <Form className={classes.form}>
          <Field
            name="email"
            type="email"
            label="E-mail"
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
            onClick={props.submitForm}>
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  )
}

const FormikSign = ({
  classes,
  setAuthentication,
  setUser,
  enqueueSnackbar,
  props,
  user
}) => (
  <Formik
    initialValues={{
      email: "admin@gmail.com",
      password: "123456"
    }}
    validationSchema={loginSchema}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)

      let authenticationId = undefined

      // Authenticate
      await authenticate({
        email: values.email,
        password: values.password
      })
        .then((response) => {
          setAuthentication({ ...response.login })

          authenticationId = response.login.userId
        })
        .catch(() => {
          enqueueSnackbar("E-mail ou senha incorretos", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        })
        .finally(() => {
          setSubmitting(false)
          resetForm()
        })

      const client = createAuthenticatedClient()

      let firstName = undefined

      // Retrieve user info
      await client
        .request(searchUser, {
          id: authenticationId
        })
        .then((response) => {
          firstName = response.searchUser.firstName

          setUser({ ...response.searchUser })
        })
        .catch(() => {
          enqueueSnackbar("Erro inesperado", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        })

      // Retrieve user address
      await client
        .request(listAddressById, {
          userId: authenticationId
        })
        .then((response) => {
          setUser({ address: { ...response.listAddresses[0] } })
        })
        .catch(() => {
          enqueueSnackbar("Erro inesperado", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        })

      // Retrieve user contact
      await client
        .request(listContactById, {
          userId: authenticationId
        })
        .then((response) => {
          setUser({ contact: { ...response.listContacts[0] } })

          enqueueSnackbar(`Bem Vindo(a), ${firstName}`, {
            variant: "info",
            autoHideDuration: 3500,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })

          props.history.push("/dashboard")
        })
        .catch(() => {
          enqueueSnackbar("Erro inesperado", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right"
            }
          })
        })
    }}>
    {(props) => (
      <Form className={classes.form}>
        <Field
          name="email"
          type="email"
          label="E-mail"
          variant="outlined"
          margin="normal"
          fullWidth
          component={TextField}
        />

        <br />

        <Field
          type="password"
          label="Senha"
          name="password"
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
          onClick={props.submitForm}>
          Entrar
        </Button>
      </Form>
    )}
  </Formik>
)

const Login = (props) => {
  const { setAuthentication } = useContext(AuthenticationContext)

  const { user, setUser } = useContext(UserContext)

  const [forgotPassword, setForgotPassword] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()

  return (
    <Box className={classes.boxContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {forgotPassword ? <MailOutlineIcon /> : <LockOutlinedIcon />}
          </Avatar>

          <Typography component="h1" variant="h5">
            {forgotPassword ? "Recuperar senha" : "Login"}
          </Typography>

          {forgotPassword && FormikForgotPassword({ classes, enqueueSnackbar })}

          {forgotPassword === false &&
            FormikSign({
              classes,
              setAuthentication,
              setUser,
              enqueueSnackbar,
              props,
              user
            })}

          <Grid container>
            <Grid item xs>
              <Button onClick={() => setForgotPassword(!forgotPassword)}>
                {forgotPassword ? "Voltar ao Login" : "Esqueci minha senha"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  )
}

export default withRouter(Login)
