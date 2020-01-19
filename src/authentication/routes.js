import React from "react";

import { Route } from "react-router-dom";

import { Login, Users } from "../pages";

import General from "../layouts/general/general";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon
} from "@material-ui/icons";

import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";

const routes = [
  {
    title: "Login",
    description: "Page used to login users",
    path: "/login",
    render: () => <Login />,
    scopes: null,
    sidebar: false,
    icon: null
  },
  {
    title: "Dashboard",
    description:
      "Artificial scope created in front-end to grant access to the dashboard",
    path: "/dashboard",
    render: () => <General />,
    scopes: ["dashboard"],
    sidebar: true,
    icon: <DashboardIcon />
  },
  {
    title: "Users",
    description: "Page used to show general information about users",
    path: "/users",
    render: () => <Users />,
    scopes: ["searchUser"], // TO DO: include all scopes to manage users (and scopes)
    sidebar: true,
    icon: <PeopleIcon />
  }
];

const filterRoutes = ({ routes, scopes }) => {
  return routes.filter(route => {
    if (route.scopes)
      for (let scope of route.scopes) if (!scopes.includes(scope)) return null;

    return route;
  });
};

const createRoutesComponents = ({ routes }) => {
  return routes.map((route, index) => {
    return <Route path={route.path} render={route.render} key={index} />;
  });
};

const createRoutesComponentsSidebar = ({ routes }) => {
  return routes.map((route, index) => {
    if (route.sidebar)
      return (
        <Link href={route.path} color="textPrimary" underline="none" key={index}>
          <ListItem button>
            {route.icon && <ListItemIcon>{route.icon}</ListItemIcon>}

            <ListItemText primary={route.title} />
          </ListItem>
        </Link>
      );

    return null;
  });
};

export {
  routes,
  filterRoutes,
  createRoutesComponents,
  createRoutesComponentsSidebar
};
