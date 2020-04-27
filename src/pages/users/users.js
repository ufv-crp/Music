import React, { useContext, useEffect, useState } from "react"

import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core"

import { TextField } from "formik-material-ui"

import useStyles from "./styles"

import { useSnackbar } from "notistack"

import { Field, Form, Formik } from "formik"

import * as Yup from "yup"

import MaterialTable from "material-table"

import {
  createUser,
  listAddressById,
  listAllUsers,
  listContactById
} from "../account/api"

import { createAuthenticatedClient } from "../../authentication"

import icons from "../../components/materialTable/icons"

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

import {
  ArrowBack as ArrowBackIcon,
  ContactPhone as ContactIcon,
  LocationOn as LocationIcon
} from "@material-ui/icons"

import { AuthenticationContext } from "../../states"

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

const _listContactsById = ({
  client,
  query,
  setContacts,
  userId,
  enqueueSnackbar
}) => {
  client
    .request(query, { userId })
    .then((response) => {
      setContacts(response.listContacts)
    })
    .catch((error) => {
      // console.log(error.response);

      enqueueSnackbar("No contacts found!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      })

      setContacts([])
    })
}

const _listAddressesById = ({
  client,
  query,
  setAddresses,
  userId,
  enqueueSnackbar
}) => {
  client
    .request(query, { userId })
    .then((response) => {
      setAddresses(response.listAddresses)
    })
    .catch((error) => {
      // console.log(error.response);

      enqueueSnackbar("No addresses found!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      })

      setAddresses([])
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
            aria-label="add"
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

          <Typography className={classes.backItemText}>Create User</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} direction="column">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              matriculation: "",
              cpf: "",
              firstName: "",
              secondName: ""
            }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true)

              let responseUser = {}

              try {
                responseUser = await client.request(createUser, {
                  params: {
                    ...values,
                    creator: authentication.userId
                  }
                })

                enqueueSnackbar("User created", {
                  variant: "success",
                  autoHideDuration: 5000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })

                actions.resetForm()
              } catch (error) {
                enqueueSnackbar("Error on user create", {
                  variant: "error",
                  autoHideDuration: 8000,
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                  }
                })

                console.log("error", error.response)
              }

              // TO DO: ASSOCIATE USER TO SCOPE

              actions.setSubmitting(false)
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required("Email is required"),
              password: Yup.string()
                .min(6, "At least 6 characteres are required")
                .required("Password is required"),
              matriculation: Yup.string()
                .max(5, "Maximum 5 characters")
                .required("Matriculation is required"),
              cpf: Yup.string()
                .min(11, "At least 11 characters are required")
                .max(11, "Maximum 11 characters")
                .required("CPF is required"),
              firstName: Yup.string().required("First Name is required")
            })}>
            {(formik) => (
              <Form>
                <Grid container spacing={4} direction="column">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="createUserEmail"
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="createUserPassword"
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="matriculation"
                      type="text"
                      label="Matriculation"
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

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="firstname"
                      type="text"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      component={TextField}
                      name="secondname"
                      type="text"
                      label="Second Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  {formik.isSubmitting && (
                    <LinearProgress className={classes.linearProgress} />
                  )}

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Button variant="outlined" color="primary" type="submit">
                      Submit
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

const ListUserDetails = ({ client, rowUserData, enqueueSnackbar }) => {
  const [expanded, setExpanded] = useState(false)

  const [addresses, setAddresses] = useState([])

  const [contacts, setContacts] = useState([])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    _listAddressesById({
      client,
      query: listAddressById,
      setAddresses,
      userId: rowUserData.id,
      enqueueSnackbar
    })

    _listContactsById({
      client,
      query: listContactById,
      setContacts,
      userId: rowUserData.id,
      enqueueSnackbar
    })
    return () => {}
  }, [client, enqueueSnackbar, rowUserData.id])

  return (
    <>
      {/* Address Panel */}
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Card>
            <CardHeader
              title={`Address (${addresses.length ? addresses.length : 0})`}
              avatar={
                <Avatar aria-label="address" variant="rounded">
                  <LocationIcon />
                </Avatar>
              }
              titleTypographyProps={{
                align: "left",
                variant: "h5",
                display: "block"
              }}
            />
          </Card>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {addresses.length ? (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="address">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">ZIP Code</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Street</TableCell>
                    <TableCell align="right">Number</TableCell>
                    <TableCell align="right">Complement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell component="th" scope="row" align="right">
                        {address.zipCode}
                      </TableCell>
                      <TableCell align="right">{address.city}</TableCell>
                      <TableCell align="right">{address.state}</TableCell>
                      <TableCell align="right">{address.street}</TableCell>
                      <TableCell align="right">{address.number}</TableCell>
                      {address.complement ? (
                        <TableCell align="right">
                          {address.complement}
                        </TableCell>
                      ) : (
                        "-"
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h5">No addresses found!</Typography>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* ./Address Panel */}

      {/* Contact Panel */}
      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}>
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <Card>
            <CardHeader
              title={`Contact (${contacts.length ? contacts.length : 0})`}
              avatar={
                <Avatar aria-label="contact" variant="rounded">
                  <ContactIcon />
                </Avatar>
              }
              titleTypographyProps={{
                align: "left",
                variant: "h5",
                display: "block"
              }}
            />
          </Card>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {contacts.length ? (
            <TableContainer component={Paper}>
              <Table aria-label="contacts">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell component="th" scope="row" align="center">
                        {contact.email}
                      </TableCell>
                      <TableCell align="center">{contact.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h5">No contacts found!</Typography>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* ./Contact Panel */}
    </>
  )
}

const ListUsers = ({
  classes,
  client,
  users,
  setUsers,
  createUserState,
  setCreateUserState,
  updateUserState,
  setUpdateUserState
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const actions = [
    {
      icon: icons.Edit,
      tooltip: "Edit User",
      onClick: (event, rowData) =>
        alert("You want do edit " + rowData.firstName)
    },
    (rowData) => ({
      icon: icons.Delete,
      tooltip: "Delete User",
      onClick: (event, rowData) =>
        alert("You want to delete " + rowData.firstName)
    }),
    {
      icon: icons.Add,
      tooltip: "Add User",
      isFreeAction: true,
      onClick: () => setCreateUserState(!createUserState)
    }
  ]

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MaterialTable
          title="Users"
          icons={icons}
          data={users}
          actions={actions}
          options={{
            actionsColumnIndex: -1,
            selection: false,
            search: false,
            exportButton: true,
            grouping: false,
            paging: false,
            filtering: true,
            debounceInterval: 50,
            detailPanelColumnAlignment: "left"
          }}
          columns={[
            { title: "Name", field: "firstName" },
            { title: "Surname", field: "secondName" },
            { title: "CPF", field: "cpf" },
            {
              title: "Matriculation",
              field: "matriculation"
            }
          ]}
          detailPanel={(rowData) => {
            return (
              <ListUserDetails
                client={client}
                rowUserData={rowData}
                enqueueSnackbar={enqueueSnackbar}
              />
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </Grid>
    </Grid>
  )
}

const Users = () => {
  const classes = useStyles()

  const { authentication } = useContext(AuthenticationContext)

  const client = createAuthenticatedClient()

  const [users, setUsers] = useState([])

  const [createUserState, setCreateUserState] = useState(false)

  const [updateUserState, setUpdateUserState] = useState({
    state: false,
    user: {}
  })

  useEffect(() => {
    _listAllUsers({
      client,
      setUsers,
      query: listAllUsers
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {!createUserState && !updateUserState.state && (
        <ListUsers
          classes={classes}
          client={client}
          users={users}
          setUsers={setUsers}
          createUserState={createUserState}
          setCreateUserState={setCreateUserState}
          updateUserState={updateUserState}
          setUpdateUserState={setUpdateUserState}
        />
      )}

      {createUserState && (
        <CreateUser
          classes={classes}
          client={client}
          setUsers={setUsers}
          createUserState={createUserState}
          setCreateUserState={setCreateUserState}
          authentication={authentication}
        />
      )}
    </Box>
  )
}

export default Users
