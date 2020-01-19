import React from "react";

import { Route } from "react-router-dom";

import {
  Dashboard,
  Login,
  Users,
  Scopes,
  Courses,
  Classes,
  Progresses
} from "../pages";

import General from "../layouts/general/general";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LockOpen as LockOpenIcon,
  SortByAlpha as SortByAlphaIcon,
  School as SchoolIcon,
  DonutLarge as DonutLargeIcon
} from "@material-ui/icons";

import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";

const routes = [
  {
    title: "Login",
    path: "/login",
    component: <Login />,
    scopes: null,
    sidebar: false,
    icon: null
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    component: <Dashboard />,
    scopes: ["dashboard"],
    sidebar: true,
    icon: <DashboardIcon />,
    layout: General
  },
  {
    title: "Users",
    path: "/users",
    component: <Users />,
    scopes: [
      "searchUser",
      "createUser",
      "removeUser",
      "updateUser",
      "listUsers",
      "listContacts",
      "createContact",
      "removeContact",
      "updateContact",
      "listAddresses",
      "createAddress",
      "removeAddress",
      "updateAddress"
    ],
    sidebar: true,
    icon: <PeopleIcon />,
    layout: General
  },
  {
    title: "Scopes",
    path: "/scopes",
    component: <Scopes />,
    scopes: [
      "searchScope",
      "createScope",
      "removeScope",
      "updateScope",
      "listScopes",
      "createUserScope",
      "createUserScopeBulk",
      "removeUserScope",
      "listUserScopes"
    ],
    sidebar: true,
    icon: <LockOpenIcon />,
    layout: General
  },
  {
    title: "Courses",
    path: "/courses",
    component: <Courses />,
    scopes: [
      "searchCourses",
      "listCourses",
      "createCourse",
      "removeCourse",
      "updateCourse",
      "listCourseUsers",
      "createCourseUser",
      "removeCourseUser"
    ],
    sidebar: true,
    icon: <SortByAlphaIcon />,
    layout: General
  },
  {
    title: "Classes",
    path: "/classes",
    component: <Classes />,
    scopes: [
      "createClass",
      "removeClass",
      "updateClass",
      "listClasses",
      "listClassUsers",
      "createClassUser",
      "removeClassUser"
    ],
    sidebar: true,
    icon: <SchoolIcon />,
    layout: General
  },
  {
    title: "Progresses",
    path: "/progresses",
    component: <Progresses />,
    scopes: [
      "listProgresses",
      "createProgress",
      "removeProgress",
      "updateProgress"
    ],
    sidebar: true,
    icon: <DonutLargeIcon />,
    layout: General
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
    return (
      <Route
        path={route.path}
        render={() => {
          if (route.layout)
            return <route.layout>{route.component}</route.layout>;
          else return route.component;
        }}
        key={index}
      />
    );
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
