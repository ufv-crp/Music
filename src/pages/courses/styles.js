import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  toolbarItem: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      "&": {
        justifyContent: "flex-start"
      }
    }
  },
  addIconFab: {
    width: "45px",
    height: "45px"
  },
  notFoundCourses: {
    padding: "15px"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      padding: "5px 0 5px 0"
    }
  },
  centerIconText: {
    display: "flex",
    alignItems: "center",
    alignContent: "center"
  },
  date: {
    "& > svg": {
      marginRight: "10px"
    },
    "& > svg:nth-child(2)": {
      marginLeft: "10px"
    }
  },
  marginSvgIcon: {
    "& > svg": {
      marginRight: "10px"
    }
  },
  deleteIcon: {
    color: theme.palette.error.main
  },
  updateIcon: {
    color: theme.palette.text.primary
  },
  removeCourseDisagree: {
    color: theme.palette.error.main
  },
  removeCourseAgree: {
    color: theme.palette.success.main
  },
  boxCreateCourse: {
    maxWidth: "600px",
    [theme.breakpoints.down("xs")]: {
      "&": {
        width: "100%"
      }
    }
  },
  checkedBox: {
    display: "flex",
    flexDirection: "column"
  },
  checkedError: {
    fontSize: "0.75rem",
    marginTop: "3px",
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: "1.66",
    letterSpacing: "0.03333em",
    color: theme.palette.errorLight
  },
  linearProgress: {
    margin: "16px"
  },
  backItem: {
    display: "inline-flex",
    alignItems: "center"
  },
  backItemText: {
    fontSize: "1.1rem",
    fontWeight: "500"
  },
  alignLeft: {
    display: "flex",
    justifyContent: "flex-end"
  },
  iconColor: {
    color: theme.palette.icon
  }
}))

export default useStyles
