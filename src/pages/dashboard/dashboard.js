import React, { useEffect, useState, useContext } from "react"

import {
  Grid,
  Box,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core"

import {
  People as PeopleIcon,
  SortByAlpha as SortByAlphaIcon,
  School as SchoolIcon,
  LabelImportant as LabelImportantIcon
} from "@material-ui/icons"

import { createAuthenticatedClient } from "../../authentication"

import { AuthenticationContext } from "../../states"

import {
  listUsersCounter,
  listCoursesCounter,
  listClassesCounter,
  listCoursesUsers,
  searchCourse,
  listClassUsers,
  classSearch,
  searchClassInstructor,
  listCoursesCalendar
} from "./api"

import moment from "moment"

import CalendarHeatmap from "react-calendar-heatmap"

import "./dashboard.css"

const useStyles = makeStyles((theme) => ({
  containerCounters: {
    padding: `${theme.spacing(2)} 0`,
    marginBottom: theme.spacing(2)
  },
  itemCounter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.white,
    border: `1px solid ${theme.palette.divider}`,
    padding: "15px 0px",
    "& > *": {
      margin: "10px"
    },
    "& > *:first-child": {
      margin: "20px"
    }
  },
  itemCounterIconSpan: {
    borderRadius: "50%",
    textAlign: "center",
    verticalAlign: "middle",
    background: theme.palette.primary.main
  },
  itemCounterIcon: {
    fontSize: "1.8em",
    margin: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    color: theme.palette.white
  },
  itemCounterIconSpanMiddle: {
    background: theme.palette.white,
    border: `1px solid ${theme.palette.primary.main}`,
    "& > *": {
      color: theme.palette.primary.main
    }
  },
  itemCounterNumber: {
    fontFamily: "Oswald, Roboto, sans-serif",
    fontSize: "2.1em",
    color: "#272831"
  },
  containerList: {
    minHeight: "300px",
    maxHeight: "300px",
    background: theme.palette.white,
    border: `1px solid ${theme.palette.divider}`,
    position: "relative",
    overflow: "scroll",
    marginBottom: theme.spacing(3),
    "&::-webkit-scrollbar-thumb": {
      background: "transparent"
    }
  },
  containerListTitle: {
    fontFamily: "Impact, Charcoal, sans-serif",
    fontWeight: "600",
    fontSize: "1.2em",
    lineHeight: "55px",
    textAlign: "start",
    paddingLeft: "20px",
    color: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      textAlign: "start"
    }
  },
  icon: {
    color: theme.palette.icon
  },
  heatmapBox: {
    marginBottom: theme.spacing(2),
    position: "relative",
    width: "100%",
    padding: theme.spacing(2),
    background: theme.palette.white,
    border: `1px solid ${theme.palette.divider}`,
    height: "340px"
  }
}))

const Counters = ({ client }) => {
  const classes = useStyles()

  const [usersState, setUsersState] = useState(0)

  const [coursesState, setCoursesState] = useState(0)

  const [classesState, setClassesState] = useState(0)

  useEffect(() => {
    client
      .request(listUsersCounter, { all: true })
      .then((response) => {
        setUsersState(response.listUsers.length)
      })
      .catch((error) => {
        setUsersState(0)

        console.log(error)
      })

    client
      .request(listCoursesCounter, { private: true })
      .then((response) => {
        setCoursesState(response.listCourses.length)
      })
      .catch((error) => {
        setCoursesState(0)

        console.log(error)
      })

    client
      .request(listClassesCounter, { params: {} })
      .then((response) => {
        setClassesState(response.listClasses.length)
      })
      .catch((error) => {
        setClassesState(0)

        console.log(error)
      })

    // eslint-disable-next-line
  }, [])

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      className={classes.containerCounters}>
      <Grid item xs={12} sm={3} md={3} lg={3} className={classes.itemCounter}>
        <span className={classes.itemCounterIconSpan}>
          <PeopleIcon className={classes.itemCounterIcon} />
        </span>

        <Typography className={classes.itemCounterNumber}>
          {usersState}
        </Typography>

        <Typography>Users</Typography>
      </Grid>

      <Grid item xs={12} sm={3} md={3} lg={3} className={classes.itemCounter}>
        <span
          className={`${classes.itemCounterIconSpan} ${classes.itemCounterIconSpanMiddle}`}>
          <SortByAlphaIcon className={classes.itemCounterIcon} />
        </span>

        <Typography className={classes.itemCounterNumber}>
          {coursesState}
        </Typography>

        <Typography>Courses</Typography>
      </Grid>

      <Grid item xs={12} sm={3} md={3} lg={3} className={classes.itemCounter}>
        <span className={classes.itemCounterIconSpan}>
          <SchoolIcon className={classes.itemCounterIcon} />
        </span>

        <Typography className={classes.itemCounterNumber}>
          {classesState}
        </Typography>

        <Typography>Classes</Typography>
      </Grid>
    </Grid>
  )
}

const MyCourses = ({ client }) => {
  const classes = useStyles()

  const { authentication } = useContext(AuthenticationContext)

  const [courses, setCourses] = useState([])

  useEffect(() => {
    client
      .request(listCoursesUsers, { userId: authentication.userId })
      .then((response) => {
        const coursesPromises = response.listCourseUsers.map((userCourse) => {
          return client
            .request(searchCourse, {
              params: { id: userCourse.courseId }
            })
            .then((response) => {
              return response.searchCourses[0]
            })
            .catch((error) => {
              console.log(error)
            })
        })

        Promise.all(coursesPromises).then((response) => {
          setCourses(response)
        })
      })
      .catch((error) => {
        console.log(error)
      })

    // eslint-disable-next-line
  }, [])

  return (
    <Box className={classes.containerList}>
      <Typography className={classes.containerListTitle}>My courses</Typography>

      {courses.length ? (
        <List>
          {courses.map((course) => (
            <ListItem key={course.id}>
              <ListItemIcon className={classes.icon}>
                <LabelImportantIcon />
              </ListItemIcon>

              <ListItemText primary={`${course.title.substring(0, 8)}...`} />

              <ListItemText primary={course.private ? "Private" : "Public"} />

              <ListItemText primary={moment(course.start).format("L h:mm a")} />

              <ListItemText primary={moment(course.end).format("L h:mm a")} />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemText primary="No course (s) found" />
          </ListItem>
        </List>
      )}
    </Box>
  )
}

const MyClasses = ({ client }) => {
  const classes = useStyles()

  const { authentication } = useContext(AuthenticationContext)

  const [classesState, setClassesState] = useState([])

  useEffect(() => {
    client
      .request(listClassUsers, { userId: authentication.userId })
      .then((response) => {
        const classesPromisses = response.listClassUsers.map((classUser) => {
          return client
            .request(classSearch, {
              params: { id: classUser.classId }
            })
            .then((response) => {
              return response.listClasses[0]
            })
            .catch((error) => {
              console.log(error)
            })
        })

        Promise.all(classesPromisses).then((response) => {
          return response.map((classUser) => {
            return client
              .request(searchClassInstructor, { id: classUser.instructor })
              .then((response) => {
                setClassesState((oldArray) => [
                  ...oldArray,
                  Object.assign({}, classUser, response.searchUser)
                ])
              })
              .catch((error) => {
                console.log(error)
              })
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })

    // eslint-disable-next-line
  }, [])

  return (
    <Box className={classes.containerList}>
      <Typography className={classes.containerListTitle}>My classes</Typography>

      {classesState.length ? (
        <List>
          {classesState.map((classUser) => (
            <ListItem key={classUser.id}>
              <ListItemIcon className={classes.icon}>
                <LabelImportantIcon />
              </ListItemIcon>

              <ListItemText primary={classUser.shift} />

              <ListItemText primary={`Vacancies ${classUser.vacancies}`} />

              <ListItemText primary={classUser.room} />

              <ListItemText
                primary={`Instrocutor ${classUser.firstName} ${classUser.secondName}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemText primary="No class (es) found" />
          </ListItem>
        </List>
      )}
    </Box>
  )
}

const UsersRegistered = ({ client }) => {
  const classes = useStyles()

  const [datesState, setDatesState] = useState([])

  const startDate = moment().subtract(365, "days").calendar()

  useEffect(() => {
    client
      .request(listCoursesCalendar, { start: startDate })
      .then((response) => {
        let datesFormated = {}

        for (let date of response.listUsers) {
          const dateExtracted = moment(date.createdAt).format("L")

          if (dateExtracted in datesFormated) {
            if (datesFormated[dateExtracted] >= 4) {
              continue
            } else {
              datesFormated[dateExtracted] += 1
            }
          } else {
            datesFormated[dateExtracted] = 0
          }
        }

        setDatesState(
          Object.entries(datesFormated).map(([date, count]) => ({
            date,
            count
          }))
        )
      })

    // eslint-disable-next-line
  }, [])

  return (
    <Box className={classes.heatmapBox}>
      <Typography className={classes.containerListTitle}>
        Users registered
      </Typography>

      <CalendarHeatmap
        startDate={new Date(startDate)}
        values={datesState}
        classForValue={(value) => {
          if (!value) {
            return "color-empty"
          }
          return `color-scale-${value.count}`
        }}
      />
    </Box>
  )
}

const Dashboard = () => {
  const client = createAuthenticatedClient()

  return (
    <Grid container spacing={1}>
      <Grid item md={12} xs={12}>
        <Counters client={client} />
      </Grid>

      <Grid item md={6} xs={12}>
        <MyCourses client={client} />
      </Grid>

      <Grid item md={6} xs={12}>
        <MyClasses client={client} />
      </Grid>

      <Grid item md={12} xs={12}>
        <UsersRegistered client={client} />
      </Grid>
    </Grid>
  )
}

export default Dashboard
