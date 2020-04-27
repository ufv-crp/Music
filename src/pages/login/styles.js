import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
