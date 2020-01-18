import React from "react";

import { Route } from "react-router-dom";

import { Dashboard, Login } from "../pages";

const routes = [
  {
    title: "Login",
    description: "Page used to login users",
    path: "/login",
    render: () => <Login />,
    scopes: null
  },
  {
    title: "Dashboard",
    description: "Page used to show general information about users",
    path: "/dashboard",
    render: () => <Dashboard />,
    scopes: ["dashboard"]
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

export { routes, filterRoutes, createRoutesComponents };
