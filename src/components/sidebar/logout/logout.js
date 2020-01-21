import React, { useContext, forwardRef, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  ListItemIcon,
  ListItem,
  ListItemText
} from "@material-ui/core";

import { ExitToApp } from "@material-ui/icons";

import { createHashHistory } from "history";

import { AuthenticationContext } from "../../../states";

const Logout = () => {
  const { setAuthentication } = useContext(AuthenticationContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function logout() {
    setAuthentication(null);

    const history = createHashHistory();

    history.push("/login");
  }

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        
        <ListItemText primary="Logout" />
      </ListItem>
      
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
            
            <Button onClick={logout} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Logout;
