import React, { useContext } from "react";

import {
  routes,
  filterRoutes,
  createRoutesComponentsSidebar
} from "../authentication/routes.js";

import { AuthenticationContext } from "../states";

const Sidebar = () => {
  const { authentication } = useContext(AuthenticationContext);

  return (
    <div>
      {createRoutesComponentsSidebar({
        routes: filterRoutes({ routes, scopes: authentication.scopes })
      })}
    </div>
  );
};

export { Sidebar };
