import React, { useContext, useEffect, useState } from "react"

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Card,
  CardHeader,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core"

import useStyles from "./styles"

import { Formik, Form, Field } from "formik"

import * as Yup from "yup"

import { useSnackbar } from "notistack"

import MaterialTable from "material-table"

import {
  listAddressById,
  listAllUsers,
  listContactById,
  updateUserById,
  removeUserById
} from "../account/api"

import { createAuthenticatedClient } from "../../authentication"

import icons from "../../components/materialTable/icons"

import {
  ContactPhone as ContactIcon,
  LocationOn as LocationIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons"

import { AuthenticationContext } from "../../states"

import CreateUser from "./create"

import { TextField } from "formik-material-ui"

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("Nome é obrigatório"),
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
      console.error(error.response)

      setUsers([])
    })
}

const _listContactsById = ({ client, query, setContacts, userId }) => {
  client
    .request(query, { userId })
    .then((response) => {
      setContacts(response.listContacts)
    })
    .catch(() => setContacts([]))
}

const _listAddressesById = ({ client, query, setAddresses, userId }) => {
  client
    .request(query, { userId })
    .then((response) => {
      setAddresses(response.listAddresses)
    })
    .catch(() => setAddresses([]))
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
      userId: rowUserData.id
    })

    _listContactsById({
      client,
      query: listContactById,
      setContacts,
      userId: rowUserData.id
    })
    return () => {}
  }, [client, enqueueSnackbar, rowUserData.id])

  return (
    <>
      {/* Address Panel */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Card>
            <CardHeader
              title={`Endereços (${addresses.length ? addresses.length : 0})`}
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
        </AccordionSummary>
        <AccordionDetails>
          {addresses.length ? (
            <TableContainer component={Paper}>
              <Table size="small" aria-label="address">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">CEP</TableCell>
                    <TableCell align="center">Endereço</TableCell>
                    <TableCell align="center">Número</TableCell>
                    <TableCell align="center">Complemento</TableCell>
                    <TableCell align="center">Cidade</TableCell>
                    <TableCell align="center">Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell align="center">{address.zipCode}</TableCell>
                      <TableCell align="center">{address.street}</TableCell>
                      <TableCell align="center">{address.number}</TableCell>
                      <TableCell align="center">
                        {address.complement ? (
                          <TableCell align="center">
                            {address.complement}
                          </TableCell>
                        ) : (
                          "Não possui"
                        )}
                      </TableCell>
                      <TableCell align="center">{address.city}</TableCell>
                      <TableCell align="center">{address.state}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h5">Nenhum endereço encontrado!</Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {/* ./Address Panel */}

      {/* Contact Panel */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header">
          <Card>
            <CardHeader
              title={`Contatos (${contacts.length ? contacts.length : 0})`}
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
        </AccordionSummary>
        <AccordionDetails>
          {contacts.length ? (
            <TableContainer component={Paper}>
              <Table aria-label="contacts">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">E-mail</TableCell>
                    <TableCell align="center">Telefone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell align="center">{contact.email}</TableCell>
                      <TableCell align="center">{contact.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h5">Nenhum contato encontrado!</Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {/* ./Contact Panel */}
    </>
  )
}

const UpdateUser = ({
  classes,
  client,
  setUsers,
  setUpdateUserState,
  updateUserState
}) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Box p={5} bgcolor="white">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.backItem}>
          <IconButton
            onClick={() => {
              _listAllUsers({
                client,
                setUsers: setUsers,
                query: listAllUsers
              })
              setUpdateUserState(!updateUserState)
            }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography className={classes.backItemText}>
            Atualizar Usuário
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} direction="column">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Formik
            enableReinitialize
            validationSchema={UserSchema}
            initialValues={{
              id: updateUserState.user.id,
              email: updateUserState.user.email,
              cpf: updateUserState.user.cpf,
              firstName: updateUserState.user.firstName,
              secondName: updateUserState.user.secondName,
              matriculation: updateUserState.user.matriculation
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true)

              await client
                .request(updateUserById, {
                  params: {
                    id: values.id,
                    cpf: values.cpf,
                    firstName: values.firstName,
                    secondName: values.secondName,
                    matriculation: values.matriculation
                  }
                })
                .then(() => {
                  _listAllUsers({
                    client,
                    setUsers: setUsers,
                    query: listAllUsers
                  })
                  setUpdateUserState(!updateUserState)
                  enqueueSnackbar("Usuário editado com sucesso", {
                    variant: "success",
                    autoHideDuration: 4500,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right"
                    }
                  })
                })
                .catch(() =>
                  enqueueSnackbar("Erro ao editar usuário", {
                    variant: "error",
                    autoHideDuration: 4500,
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right"
                    }
                  })
                )
            }}>
            {({ dirty, isValid, isSubmitting }) => (
              <Form>
                <Grid container spacing={4} direction="column">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="email"
                      label="Email"
                      variant="outlined"
                      component={TextField}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="firstName"
                      label="Nome"
                      variant="outlined"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="secondName"
                      label="Sobrenome"
                      variant="outlined"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="cpf"
                      label="CPF"
                      variant="outlined"
                      component={TextField}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="matriculation"
                      label="Matrícula"
                      variant="outlined"
                      component={TextField}
                    />
                  </Grid>

                  {isSubmitting && (
                    <LinearProgress className={classes.linearProgress} />
                  )}

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!dirty || !isValid || isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Atualizar"}
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

const _removeUserById = ({
  client,
  query,
  id,
  setUsers,
  listAllUsers,
  deleteUserState,
  setDeleteUserState,
  enqueueSnackbar
}) => {
  client
    .request(query, { id })
    .then(() => {
      enqueueSnackbar("Usuário Removido", {
        variant: "success",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      })

      _listAllUsers({
        client,
        query: listAllUsers,
        setUsers
      })
    })
    .catch(() => {
      enqueueSnackbar("Erro ao remover usuário", {
        variant: "error",
        autoHideDuration: 8000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      })
    })

  setDeleteUserState(!deleteUserState.state)
}

const RemoveUser = ({
  classes,
  client,
  setUsers,
  deleteUserState,
  setDeleteUserState
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleDialogClick = () => {
    setDeleteUserState(!deleteUserState.state)
  }

  return (
    <Dialog open={deleteUserState.state} onClose={handleDialogClick}>
      <DialogTitle>{`Remover Usuário`}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja remover este usuário?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          className={classes.removeUserDisagree}
          onClick={handleDialogClick}>
          Cancelar
        </Button>

        <Button
          className={classes.removeUserAgree}
          onClick={() => {
            _removeUserById({
              client,
              query: removeUserById,
              id: deleteUserState.user.id,
              setUsers,
              listAllUsers,
              deleteUserState,
              setDeleteUserState,
              enqueueSnackbar
            })
          }}
          autoFocus>
          Remover
        </Button>
      </DialogActions>
    </Dialog>
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
  setUpdateUserState,
  deleteUserState,
  setDeleteUserState,
  authentication
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const actions = [
    (rowData) => ({
      icon: icons.Edit,
      tooltip: "Editar",
      disabled: authentication.userId === rowData.id ? true : false,
      onClick: (event, rowData) =>
        setUpdateUserState({ state: !updateUserState.state, user: rowData })
    }),
    (rowData) => ({
      icon: icons.Delete,
      tooltip: "Excluir",
      disabled: authentication.userId === rowData.id ? true : false,
      onClick: (event, rowData) =>
        setDeleteUserState({ state: !deleteUserState.state, user: rowData })
    }),
    {
      icon: icons.Add,
      tooltip: "Adicionar",
      isFreeAction: true,
      onClick: () => setCreateUserState(!createUserState)
    }
  ]

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MaterialTable
          title="Usuários"
          icons={icons}
          data={users}
          actions={actions}
          localization={{
            body: {
              emptyDataSourceMessage: "Não há registros",
              filterRow: {
                filterTooltip: "Filtrar"
              }
            },
            header: {
              actions: "Ações",
              export: "Exportar"
            },
            toolbar: {
              exportTitle: "Exportar",
              exportName: "Exportar como CSV"
            }
          }}
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
            { title: "Nome", field: "firstName" },
            { title: "Sobrenome", field: "secondName" },
            { title: "CPF", field: "cpf" },
            {
              title: "Matrícula",
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

  const [deleteUserState, setDeleteUserState] = useState({
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
          deleteUserState={deleteUserState}
          setDeleteUserState={setDeleteUserState}
          authentication={authentication}
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

      {updateUserState.state && (
        <UpdateUser
          classes={classes}
          client={client}
          setUsers={setUsers}
          updateUserState={updateUserState}
          setUpdateUserState={setUpdateUserState}
        />
      )}

      {deleteUserState.state && (
        <RemoveUser
          classes={classes}
          client={client}
          setUsers={setUsers}
          deleteUserState={deleteUserState}
          setDeleteUserState={setDeleteUserState}
        />
      )}
    </Box>
  )
}

export default Users
