import React from "react";

import clsx from "clsx";

import { Route } from "react-router-dom";

import useStyles from "./styles";

import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper
} from "@material-ui/core";

import { Menu, ChevronLeft, ExitToApp } from "@material-ui/icons";

import {Sidebar} from '../../components/Sidebar'

export default function Dashboard({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function logout() {
    localStorage.clear();
    history.replace("/");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Music
          </Typography>
          <IconButton color="inherit" onClick={logout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>{Sidebar}</List>

        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* Dashboard */}
          <Route
            exact
            path="/dashboard"
            render={props => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>example</Paper>
                  </Grid>
                  {/* division */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>example</Paper>
                  </Grid>
                  {/* division */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>example</Paper>
                  </Grid>
                </Grid>
              );
            }}
          />
          {/*  dashboard categories */}
          <Route
            exact
            path="/dashboard/categorie"
            render={props => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>list</Paper>
                  </Grid>
                </Grid>
              );
            }}
          />
          {/* create edit categories */}
          <Route
            path="/dashboard/edit/categorie/:id"
            render={props => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>list</Paper>
                  </Grid>
                </Grid>
              );
            }}
          />
          {/* dashboard create categories */}
          <Route
            path="/dashboard/create/categorie"
            render={props => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>list</Paper>
                  </Grid>
                </Grid>
              );
            }}
          />
          {/* dashboard create product */}
          <Route
            path="/dashboard/create/product/:id"
            render={props => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>list</Paper>
                  </Grid>
                </Grid>
              );
            }}
          />
          {/* dashboard edit product */}

          <Route
            path="/dashboard/edit/product/:id"
            render={props => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>list</Paper>
                  </Grid>
                </Grid>
              );
            }}
          />
        </Container>
        {/* <MadeWithLove /> */}
      </main>
    </div>
  );
}
