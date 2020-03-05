import React, { useState, forwardRef } from "react";

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
  Hidden,
  IconButton
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Input as InputIcon
} from "@material-ui/icons";

import { logout } from "../sidebar/logout";

import logo from "../../assets/images/logo2.png";

const Header = props => {
  const { className, openSidebar, onSidebarOpen, ...rest } = props;

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

  return (
    <>
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar className={classes.toolBar}>
          <RouterLink to="/" className={classes.logoLink}>
            <img alt="Logo" src={logo} className={classes.logo} />
          </RouterLink>

          <Hidden mdDown>
            <IconButton
              color="inherit"
              onClick={handleClickOpen}
              className={`${classes.signOutButton} ${classes.iconTheme}`}
            >
              <InputIcon />
            </IconButton>
          </Hidden>

          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={onSidebarOpen}
              className={classes.iconTheme}
            >
              {openSidebar ? <CloseIcon /> : <MenuIcon />}
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

            <Button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Header;
