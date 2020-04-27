import React, { useContext, useState } from "react"

import useStyles from "./styles"

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

const FormikForgotPassword = ({ classes, enqueueSnackbar }) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors = {}

        if (!values.email) {
          errors.email = "E-mail é obrigatório"
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "E-mail inválido"
        }

        return errors
      }}
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
        } catch (error) {
          console.log(error)

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
  props
}) => (
  <Formik
    initialValues={{
      email: "admin@gmail.com",
      password: "123456"
    }}
    validate={(values) => {
      const errors = {}

      if (!values.email) {
        errors.email = "E-mail é obrigatório"
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "E-mail inválido"
      }

      if (!values.password) {
        errors.password = "Senha é obrigatório"
      }

      return errors
    }}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)

      let authenticationResponse = {}

      try {
        const response = await authenticate({
          email: values.email,
          password: values.password
        })

        authenticationResponse = response.login

        setAuthentication({ ...response.login })

        resetForm()
      } catch (error) {
        console.log(error)

        enqueueSnackbar("E-mail ou senha incorretos", {
          variant: "error",
          autoHideDuration: 8000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          }
        })
      }

      const client = createAuthenticatedClient()

      try {
        const userResponse = await client.request(searchUser, {
          id: authenticationResponse.userId
        })

        setUser({ ...userResponse.searchUser })

        const responseAddress = await client.request(listAddressById, {
          userId: authenticationResponse.userId
        })

        setUser({ address: { ...responseAddress.listAddresses[0] } })

        const responseContact = await client.request(listContactById, {
          userId: authenticationResponse.userId
        })

        setUser({ contact: { ...responseContact.listContacts[0] } })
      } catch (error) {
        console.log(error)
      }

      props.history.push("/dashboard")
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

  const { setUser } = useContext(UserContext)

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
              props
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
