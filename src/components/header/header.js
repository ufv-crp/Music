import React, { useState, useContext, forwardRef } from "react";

import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from "@material-ui/icons";

import { logout } from "../sidebar/logout";

const Header = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <>
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar>
          <RouterLink to="/">
            <img alt="Logo" src="/images/logos/logo.header.png" width="125px" />
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
              onClick={handleClickOpen}
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

      {open && (
        <Dialog
          fullWidth
          TransitionComponent={Transition}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>

            <Button onClick={() => { logout(); setOpen(false); }} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Header;
