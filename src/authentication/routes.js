import React from "react";

import { Route } from "react-router-dom";

const routes = [
  {
    path: "/login",
    render: () => <p>Login</p>,
    scopes: null
  },
  {
    path: "/dashboard",
    render: () => <p>Dashboard</p>,
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

const createRoutesComponents = ({ routes, scopes }) => {
  return routes.map((route, index) => {
    return <Route path={route.path} render={route.render} key={index} />;
  });
};

export { routes, createRoutesComponents, filterRoutes };
