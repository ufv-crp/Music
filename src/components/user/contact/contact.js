import React, { useContext } from "react"

import clsx from "clsx"

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Avatar,
  LinearProgress
} from "@material-ui/core"

import { ContactPhone as ContactIcon } from "@material-ui/icons"

import { makeStyles } from "@material-ui/styles"

import { Formik, Field } from "formik"

import { TextField } from "formik-material-ui"

import { UserContext } from "../../../states"

import { createAuthenticatedClient } from "../../../authentication"

import { updateContactById } from "../../../pages/account/api"

const useStyles = makeStyles((theme) => ({
  root: {},
  submit: {
    marginTop: "10px"
  }
}))

const UserContactForm = ({ classes, contact, setUser }) => (
  <Formik
    enableReinitialize
    initialValues={{ ...contact }}
    onSubmit={async (values, { setSubmitting }) => {
      setSubmitting(true)

      const client = createAuthenticatedClient()

      const updatedContact = ({ userId, createdAt, updatedAt, ...rest }) => rest

      try {
        const response = await client.request(updateContactById, {
          params: updatedContact(values)
        })

        setUser({ contact: { ...response.updateContact } })
      } catch (error) {
        console.log(error)
      }

      setSubmitting(false)
    }}>
    {({ isSubmitting, submitForm, touched }) => (
      <>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Field
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              fullWidth
              component={TextField}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Field
              name="phone"
              label="Phone"
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
            onClick={submitForm}>
            Update
          </Button>
        </CardActions>
      </>
    )}
  </Formik>
)

const UserContact = (props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  const { user, setUser } = useContext(UserContext)

  const contact = user.contact

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader="Some information can be edited"
        title="Contact"
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
        avatar={
          <Avatar aria-label="contact" variant="rounded">
            <ContactIcon />
          </Avatar>
        }
      />
      <Divider />
      <CardContent>
        {UserContactForm({ classes, contact, setUser })}
      </CardContent>
    </Card>
  )
}

export default UserContact
