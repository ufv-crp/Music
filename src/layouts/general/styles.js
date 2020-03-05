import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64
    }
  },
  containerTheme: {
    background: theme.palette.background.default
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: "100%",
    padding: theme.spacing(2),
    paddingTop: "0"
  }
}));
