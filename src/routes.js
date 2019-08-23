import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";
import EditUser from "pages/EditUser";
import Users from "pages/Users";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/usuario/editar",
    name: "Editar Usuário",
    icon: "ni ni-bullet-list-67 text-success",
    component: EditUser,
    layout: "/admin"
  },
  {
    path: "/usuarios",
    name: "Usuários",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
    layout: "/admin"
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
    name: "ForgotPassword",
    icon: "ni ni-key-25 text-info",
    component: ForgotPassword,
    layout: "/auth"
  }
];
export default routes;
