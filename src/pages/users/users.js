import React, { useState, useContext, useEffect } from "react";

import {
  Box,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Card,
  CardHeader,
  Avatar,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

import useStyles from "./styles";

import { useSnackbar } from "notistack";

import MaterialTable from "material-table";

import { listAllUsers, listAddressById, listContactById } from "../account/api";

import { createAuthenticatedClient } from "../../authentication";

import icons from "../../components/materialTable/icons";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { LocationOn as LocationIcon } from "@material-ui/icons";

import { ContactPhone as ContactIcon } from "@material-ui/icons";

import { AuthenticationContext } from "../../states";

const _listAllUsers = ({ client, query, setUsers }) => {
  client
    .request(query)
    .then(response => {
      setUsers(response.listUsers);
    })
    .catch(error => {
      console.log(error.response);

      setUsers([]);
    });
};

const _listContactsById = ({
  client,
  query,
  setContacts,
  userId,
  enqueueSnackbar
}) => {
  client
    .request(query, { userId })
    .then(response => {
      setContacts(response.listContacts);
    })
    .catch(error => {
      // console.log(error.response);

      enqueueSnackbar("No contacts found!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      });

      setContacts([]);
    });
};

const _listAddressesById = ({
  client,
  query,
  setAddresses,
  userId,
  enqueueSnackbar
}) => {
  client
    .request(query, { userId })
    .then(response => {
      setAddresses(response.listAddresses);
    })
    .catch(error => {
      // console.log(error.response);

      enqueueSnackbar("No addresses found!", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }
      });

      setAddresses([]);
    });
};

const ListUserDetails = ({ client, rowUserData, enqueueSnackbar }) => {
  const [expanded, setExpanded] = useState(false);

  const [addresses, setAddresses] = useState([]);

  const [contacts, setContacts] = useState([]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    _listAddressesById({
      client,
      query: listAddressById,
      setAddresses,
      userId: rowUserData.id,
      enqueueSnackbar
    });

    _listContactsById({
      client,
      query: listContactById,
      setContacts,
      userId: rowUserData.id,
      enqueueSnackbar
    });
    return () => {};
  }, [client, enqueueSnackbar, rowUserData.id]);

  return (
    <>
      {/* Address Panel */}
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Card>
            <CardHeader
              title="Address"
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
              subheaderTypographyProps={{
                align: "left",
                variant: "body1",
                display: "block",
                color: "textSecondary"
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
                  {addresses.map(address => (
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
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Card>
            <CardHeader
              title="Contact"
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
              subheaderTypographyProps={{
                align: "left",
                variant: "body1",
                display: "block",
                color: "textSecondary"
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
                  {contacts.map(contact => (
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
  );
};

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
  const { enqueueSnackbar } = useSnackbar();

  const actions = [
    {
      icon: icons.Edit,
      tooltip: "Edit User",
      onClick: (event, rowData) =>
        alert("You want do edit " + rowData.firstName)
    },
    rowData => ({
      icon: icons.Delete,
      tooltip: "Delete User",
      onClick: (event, rowData) =>
        alert("You want to delete " + rowData.firstName)
    }),
    {
      icon: icons.Add,
      tooltip: "Add User",
      isFreeAction: true,
      onClick: event => {
        alert("teste");
      }
    }
  ];

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
          detailPanel={rowData => {
            return (
              <ListUserDetails
                client={client}
                rowUserData={rowData}
                enqueueSnackbar={enqueueSnackbar}
              />
            );
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </Grid>
    </Grid>
  );
};

const Users = () => {
  const classes = useStyles();

  const { authentication } = useContext(AuthenticationContext);

  const client = createAuthenticatedClient();

  const [users, setUsers] = useState([]);

  const [createUserState, setCreateUserState] = useState(false);

  const [updateUserState, setUpdateUserState] = useState({
    state: false,
    user: {}
  });

  useEffect(() => {
    _listAllUsers({
      client,
      setUsers,
      query: listAllUsers
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </Box>
  );
};

export default Users;
