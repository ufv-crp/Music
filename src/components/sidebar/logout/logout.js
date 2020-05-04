import React, { useState } from "react"

import {
  ListItemIcon,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core"

import { ExitToApp } from "@material-ui/icons"

import { logout } from "./utils"
import LogoutDialog from "../../dialogs/logout"

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

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon className={classes.icon}>
          <ExitToApp />
        </ListItemIcon>

        <ListItemText primary="Sair" />
      </ListItem>

      {open && (
        <LogoutDialog
          dialogTitle="Encerrar Sessão"
          dialogContentText="Você tem certeza que deseja encerrar sessão?"
          cancelButton="Cancelar"
          actionButton="Sair"
          open={open}
          handleClose={handleClose}
          handleAction={() => {
            logout()
            setOpen(false)
          }}
        />
      )}
    </>
  )
}

export default Logout
