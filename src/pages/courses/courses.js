import React, { useContext, useState, useEffect } from "react";

import clsx from "clsx";

import {
  Grid,
  Box,
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Collapse
} from "@material-ui/core";

import {
  EventAvailable,
  EventBusy,
  RemoveCircleOutline,
  Update,
  ExpandMore
} from "@material-ui/icons";

import { createAuthenticatedClient } from "../../authentication";

import { AuthenticationContext } from "../../states";

import moment from "moment";

import { styled } from "@material-ui/core/styles";

import {
  listAllCourses,
  updateCourseById,
  removeCourseById,
  createCourse
} from "./api";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 125
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  icon: {
    display: "inline-block",
    marginBottom: "-7px"
  },
  cardContent: {
    "& *": {
      paddingTop: "5px",
      paddingBottom: "5px"
    }
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const Courses = () => {
  const { authentication } = useContext(AuthenticationContext);

  const client = createAuthenticatedClient({ token: authentication.token });

  const classes = useStyles();

  const [courses, setCourses] = useState({ courses: [] }); // Status and errors from GraphQL

  const [listPrivateCourses, setListPrivateCourses] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    client
      .request(listAllCourses, { private: true })
      .then(response => {
        setCourses({ ...courses, courses: response.listCourses });
      })
      .catch(error => {
        setCourses({ courses: [], ...error.response });
      });
  }, []);

  return (
    <Box p={5}>
      <Grid container spacing={4}>
        {courses.courses.length &&
          courses.courses
            .filter(course => {
              if (course.private && !listPrivateCourses) return null;

              return course;
            })
            .map(course => {
              return (
                <Grid
                  item
                  lg={3}
                  md={4}
                  s={5}
                  xs={12}
                  key={course.id}
                  display="flex"
                >
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {course.title}
                      </Typography>

                      <Typography variant="h5" component="h2">
                        {course.description}
                      </Typography>

                      <Typography
                        className={(classes.pos, classes.p)}
                        color="textSecondary"
                      >
                        <EventAvailable className={classes.icon} />
                        {moment(course.start).format("MMMM Do YYYY")}
                        <EventBusy className={classes.icon} />
                        {moment(course.end).format("MMMM Do YYYY")}
                      </Typography>

                      <Typography variant="body2" component="p">
                        {(course.private && "Private") || "Public"}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMore />
                      </IconButton>

                      <IconButton style={{ color: "#dc5a5a" }}>
                        <RemoveCircleOutline />
                      </IconButton>

                      <IconButton style={{ color: "#5adc7b" }}>
                        <Update />
                      </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Method:</Typography>

                        <Typography paragraph>
                          Heat 1/2 cup of the broth in a pot until simmering,
                          add saffron and set aside for 10 minutes.
                        </Typography>

                        <Typography paragraph>
                          Heat oil in a (14- to 16-inch) paella pan or a large,
                          deep skillet over medium-high heat. Add chicken,
                          shrimp and chorizo, and cook, stirring occasionally
                          until lightly browned, 6 to 8 minutes. Transfer shrimp
                          to a large plate and set aside, leaving chicken and
                          chorizo in the pan. Add pimentón, bay leaves, garlic,
                          tomatoes, onion, salt and pepper, and cook, stirring
                          often until thickened and fragrant, about 10 minutes.
                          Add saffron broth and remaining 4 1/2 cups chicken
                          broth; bring to a boil.
                        </Typography>

                        <Typography paragraph>
                          Add rice and stir very gently to distribute. Top with
                          artichokes and peppers, and cook without stirring,
                          until most of the liquid is absorbed, 15 to 18
                          minutes. Reduce heat to medium-low, add reserved
                          shrimp and mussels, tucking them down into the rice,
                          and cook again without stirring, until mussels have
                          opened and rice is just tender, 5 to 7 minutes more.
                          (Discard any mussels that don’t open.)
                        </Typography>

                        <Typography>
                          Set aside off of the heat to let rest for 10 minutes,
                          and then serve.
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};

export default Courses;
