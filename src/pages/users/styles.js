import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  backItemText: {
    fontSize: "1.1rem",
    fontWeight: "500"
  },
  backItem: {
    display: "inline-flex",
    alignItems: "center"
  },
  boxCreateUser: {
    maxWidth: "600px",
    [theme.breakpoints.down("xs")]: {
      "&": {
        width: "100%"
      }
    }
  },
  linearProgress: {
    margin: "16px"
  }
}));

export default useStyles;
