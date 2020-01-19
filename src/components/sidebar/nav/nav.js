import React, { useContext } from "react";

import {
  routes,
  filterRoutes,
  createRoutesSidebarLinks
} from "../../../authentication";

import { AuthenticationContext } from "../../../states";

const SidebarRoutes = () => {
  const { authentication } = useContext(AuthenticationContext);

  return (
    <div>
      {createRoutesSidebarLinks({
        routes: filterRoutes({ routes, scopes: authentication.scopes })
      })}
    </div>
  );
};

export default SidebarRoutes;
