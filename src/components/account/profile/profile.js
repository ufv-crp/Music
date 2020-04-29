import React, { useContext, useState, useEffect } from "react"

import useStyles from "./styles"

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
  Typography
} from "@material-ui/core"

import { useSnackbar } from "notistack"

import { AccountCircle as AccountCircleIcon } from "@material-ui/icons"

import { UserContext } from "../../../states"

import ProfileForm from "./form"

const AccountProfile = ({ client }) => {
  const classes = useStyles()

  const { user, setUser } = useContext(UserContext)

  const [open, setOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  return (
    <Card className={classes.cardProfile}>
      <CardHeader
        className={classes.backgroundCard}
        title={
          <Typography variant="h4" className={classes.cardHeaderText}>
            Informações da Conta
          </Typography>
        }
        avatar={
          <Avatar className={classes.cardAvatar}>
            <AccountCircleIcon />
          </Avatar>
        }
      />
      <Divider />
      {ProfileForm({
        classes,
        client,
        user,
        setUser,
        open,
        setOpen,
        enqueueSnackbar
      })}
    </Card>
  )
}

export default AccountProfile
