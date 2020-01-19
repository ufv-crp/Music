import React, { useState, useContext } from "react";

import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";

import { AuthenticationContext } from "../../states";

import { createHashHistory } from 'history'

import {
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from "@material-ui/icons";

const Header = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const { setAuthentication } = useContext(AuthenticationContext);

  const classes = useStyles();

  const [notifications] = useState([]);

  function logout() {
    setAuthentication(null);

    const history = createHashHistory()

    history.push("/login");
  }

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo.header.png" width="150px" />
        </RouterLink>

        <div className={classes.flexGrow} />

        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={logout}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
