import React, { forwardRef } from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  makeStyles,
  useMediaQuery,
  useTheme,
  Divider,
  Typography
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  divider: {
    flexGrow: 1
  }
}))

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const LogoutDialog = ({
  dialogTitle,
  dialogContentText,
  cancelButton,
  actionButton,
  open,
  handleClose,
  handleAction
}) => {
  const classes = useStyles()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Dialog
      fullWidth
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {dialogTitle}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText>
          <Typography variant="subtitle1" gutterBottom>
            {dialogContentText}
          </Typography>
        </DialogContentText>
      </DialogContent>

      <DialogActions classes={classes.spacing}>
        <Button onClick={handleClose} color="secondary">
          {cancelButton}
        </Button>
        <Divider light className={classes.divider} />
        <Button onClick={handleAction} variant="contained" color="primary">
          {actionButton}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutDialog
