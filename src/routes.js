import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Icons from "views/examples/Icons.jsx";
import ForgotPassword from "./views/examples/ForgotPassword";
import Users from "views/examples/Users.jsx";
import EditUser from "./views/examples/EditUser";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
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
    path: "/register",
    name: "Registro",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
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
