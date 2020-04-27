import React, { useContext } from "react"

import {
  routes,
  filterRoutes,
  CreateRoutesSidebarLinks
} from "../../../authentication"

import { AuthenticationContext } from "../../../states"

const SidebarRoutes = () => {
  const { authentication } = useContext(AuthenticationContext)

  return (
    <div>
      {CreateRoutesSidebarLinks({
        routes: filterRoutes({ routes, scopes: authentication.scopes })
      })}
    </div>
  )
}

export default SidebarRoutes
