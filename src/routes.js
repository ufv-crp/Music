// Dashboard
import Dashboard from "pages/Dashboard";

// User
import Login from "pages/Login";

import Profile from "pages/Profile";

import ForgotPassword from "pages/ForgotPassword";

import EditUser from "pages/EditUser";

import Users from "pages/Users";

let routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/general",
    scope: ""
  },
  {
    path: "/profile",
    name: "Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/general",
    scope: ""
  },
  {
    path: "/user/edit",
    name: "Edit User",
    icon: "ni ni-bullet-list-67 text-success",
    component: EditUser,
    layout: "/general",
    scope: "updateUser"
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
    layout: "/general",
    scope: ""
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/forgot",
    name: "Forgot Password",
    icon: "ni ni-key-25 text-info",
    component: ForgotPassword,
    layout: "/auth",
    scope: ""
  }
];

export default routes;
