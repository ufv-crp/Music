import React, { useState } from "react"

import clsx from "clsx"

import { Link as RouterLink } from "react-router-dom"

import useStyles from "./styles"

import { AppBar, Toolbar, Hidden, IconButton } from "@material-ui/core"

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Input as InputIcon
} from "@material-ui/icons"

import { logout } from "../sidebar/logout"

// Font Made Evolve Sans
import logo from "../../assets/images/logo-azul-1.png"

import LogoutDialog from "../dialogs/logout"

const Header = (props) => {
  const { className, openSidebar, onSidebarOpen, ...rest } = props

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()

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
              className={`${classes.signOutButton} ${classes.iconTheme}`}>
              <InputIcon />
            </IconButton>
          </Hidden>

          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={onSidebarOpen}
              className={classes.iconTheme}>
              {openSidebar ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

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

export default Header
