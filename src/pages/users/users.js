import React, { useState, useEffect } from "react";

import { Box, Grid, IconButton, Typography } from "@material-ui/core";

import useStyles from "./styles";

import MaterialTable from "material-table";

import { listAllUsers } from "../account/api";

import { createAuthenticatedClient } from "../../authentication";

import { title, columns, tableIcons, options } from "./tableData";

import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

import Wizard from "../../components/wizard/wizard";

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

const ListUsers = ({ users, createUserState, setCreateUserState }) => {
  const actions = [
    {
      icon: tableIcons.Edit,
      tooltip: "Edit User",
      onClick: (event, rowData) =>
        alert("You want do edit " + rowData.firstName)
    },
    rowData => ({
      icon: tableIcons.Delete,
      tooltip: "Delete User",
      onClick: (event, rowData) =>
        alert("You want to delete " + rowData.firstName)
    }),
    {
      icon: tableIcons.Add,
      tooltip: "Add User",
      isFreeAction: true,
      onClick: event => setCreateUserState(!createUserState)
    }
  ];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <MaterialTable
          title={title}
          icons={tableIcons}
          data={users}
          columns={columns}
          actions={actions}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

const CreateUser = ({
  classes,
  setUsers,
  createUserState,
  setCreateUserState
}) => {
  return (
    <Box p={2} bgcolor="white">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.backItem}>
          <IconButton onClick={() => setCreateUserState(!createUserState)}>
            <ArrowBackIcon />
          </IconButton>

          <Typography className={classes.backItemText}>Create User</Typography>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Wizard />
        </Grid>
      </Grid>
    </Box>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  const [createUserState, setCreateUserState] = useState(false);

  const client = createAuthenticatedClient();

  const classes = useStyles();

  useEffect(() => {
    _listAllUsers({
      client,
      setUsers,
      query: listAllUsers
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box m={5}>
      {!createUserState && (
        <ListUsers
          users={users}
          createUserState={createUserState}
          setCreateUserState={setCreateUserState}
        />
      )}{" "}
      {createUserState && (
        <CreateUser
          classes={classes}
          setUsers={setUsers}
          createUserState={createUserState}
          setCreateUserState={setCreateUserState}
        />
      )}
    </Box>
  );
};

export default Users;
