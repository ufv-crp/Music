import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
  cardProfile: {
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
    wordWrap: "break-word"
  },
  backgroundCard: {
    background: theme.palette.boxShadow
  },
  cardAvatar: {
    color: theme.palette.white,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
  },
  cardHeaderText: {
    color: theme.palette.primary.main
  },
  spacer: {
    margin: theme.spacing(1)
  }
}))
