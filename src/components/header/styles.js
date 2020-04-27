import { makeStyles } from "@material-ui/core"

export default makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    background: theme.palette.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  signOutButton: {},
  iconTheme: {
    color: theme.palette.primary.main
  },
  toolBar: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoLink: {
    margin: "0px",
    padding: "0px"
  },
  logo: {
    marginLeft: "60px",
    width: "80px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0"
    }
  }
}))
