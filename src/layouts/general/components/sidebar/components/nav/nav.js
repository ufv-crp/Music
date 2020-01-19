import React, { useContext } from "react";

import {
  routes,
  filterRoutes,
  createRoutesComponentsSidebar
} from "../../../../../../authentication/routes";

import { AuthenticationContext } from "../../../../../../states";

const SidebarRoutes = () => {
  const [authentication] = useContext(AuthenticationContext);

  return (
    <div>
      {createRoutesComponentsSidebar({
        routes: filterRoutes({ routes, scopes: authentication.scopes })
      })}
    </div>
  );
};

export default SidebarRoutes;
