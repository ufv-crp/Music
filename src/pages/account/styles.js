import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  accountContainer: {
    "& > *": {
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2)
      },
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2)
      }
    }
  }
}));
