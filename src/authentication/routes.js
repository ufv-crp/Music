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
    path: "/login",
    render: () => <Login />,
    scopes: null,
    sidebar: false,
    icon: null
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    render: () => <General />,
    scopes: ["dashboard"],
    sidebar: true,
    icon: <DashboardIcon />
  },
  {
    title: "Users",
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

const createRoutesSidebarLinks = ({ routes }) => {
  return routes.map((route, index) => {
    if (route.sidebar)
      return (
        <Link
          href={route.path}
          color="textPrimary"
          underline="none"
          key={index}
        >
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
  createRoutesSidebarLinks
};
