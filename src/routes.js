// Dashboard
import Dashboard from "pages/Dashboard";

// Authentication
import Login from "pages/Login";

import ForgotPassword from "pages/ForgotPassword";

// User
import Profile from "pages/Profile";

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
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    icon: "ni ni-key-25 text-info",
    component: ForgotPassword,
    layout: "/auth"
  },

  {
    path: "/user/profile",
    name: "User Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/general",
    scope: ""
  },
  {
    path: "/user/edit",
    name: "User Edit",
    icon: "ni ni-bullet-list-67 text-success",
    component: EditUser,
    layout: "/general",
    scope: "updateUser"
  },
  {
    path: "/user/list",
    name: "List Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
    layout: "/general",
    scope: ""
  }
];

export default routes;
