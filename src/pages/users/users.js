import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";

import useStyles from "./styles";

import MaterialTable from "material-table";

import { listAllUsers } from "../account/api";

import { createAuthenticatedClient } from "../../authentication";

import { title, columns, tableIcons, options } from "./tableData";

import { useHistory } from "react-router-dom";

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

const ListUsers = ({ users, history }) => {
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
      onClick: event => {
        history.push({
          pathname: "/account",
          state: { action: "add" }
        });
      }
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

const Users = () => {
  const [users, setUsers] = useState([]);

  const [createUserState, setCreateUserState] = useState(false);

  const client = createAuthenticatedClient();

  const classes = useStyles();

  const history = useHistory();

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
      <ListUsers users={users} history={history} />
    </Box>
  );
};

export default Users;
