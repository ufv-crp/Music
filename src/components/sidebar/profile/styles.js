import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 60,
    height: 60,
    textDecoration: "none"
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));
