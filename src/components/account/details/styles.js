import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  cardUser: {
    borderRadius: "12px",
    boxShadow: "0 6px 10px -4px rgba(0,0,0,.15)",
    backgroundColor: "#fff",
    color: "#252422",
    marginBottom: "20px",
    position: "relative",
    border: 0,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    wordWrap: "break-word",
  },
  cardUserBackground: {
    overflow: "hidden",
    height: "134px",
    position: "relative",
    background: `linear-gradient(60deg, ${theme.palette.error.light}, ${theme.palette.warning.main})`,
  },
  cardPerson: {
    textAlign: "center",
    textTransform: "none",
    marginTop: "-77px",
  },
  cardPersonAvatar: {
    marginBottom: theme.spacing(3),
    width: "120px",
    height: "120px",
    position: "relative",
    margin: "auto",
    textDecoration: "none",
    color: theme.palette.white,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
  cardPersonTitle: {
    fontSize: "1.57em",
    fontWeight: 700,
    lineHeight: "1.4em",
    marginBottom: "15px",
  },
  cardPersonDescription: {
    marginTop: theme.spacing(4),
    textAlign: "center",
    fontSize: "1.14em",
    color: "#9a9a9a",
    fontWeight: 300,
  },
  submit: {
    marginTop: "10px",
  },
}));
