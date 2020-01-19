import React from "react";

import { Route } from "react-router-dom";

import { Dashboard, Login } from "../pages";

import { Dashboard as DashboardIcon } from "@material-ui/icons";

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
    description: "Page used to show general information about users",
    path: "/dashboard",
    render: () => <Dashboard />,
    scopes: ["dashboard"],
    sidebar: true,
    icon: <DashboardIcon />
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
        <ListItem key={index} button>
          {route.icon && <ListItemIcon>{route.icon}</ListItemIcon>}
          <Link href={route.path} color="textPrimary" underline="none">
            <ListItemText primary={route.title} />
          </Link>
        </ListItem>
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
