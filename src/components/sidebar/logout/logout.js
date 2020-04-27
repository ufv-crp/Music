import React, { forwardRef, useState } from "react"

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
  ListItemText,
  makeStyles
} from "@material-ui/core"

import { ExitToApp } from "@material-ui/icons"

import { logout } from "./utils"

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.icon
  }
}))

const Logout = () => {
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon className={classes.icon}>
          <ExitToApp />
        </ListItemIcon>

        <ListItemText primary="Sair" />
      </ListItem>

      {open && (
        <Dialog
          fullWidth
          TransitionComponent={Transition}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Sair"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você tem certeza que deseja encerrar sessão?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancelar
            </Button>

            <Button
              onClick={() => {
                logout()
                setOpen(false)
              }}
              color="secondary"
              autoFocus>
              Sair
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default Logout
