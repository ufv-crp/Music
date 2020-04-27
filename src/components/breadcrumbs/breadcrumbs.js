import React from "react"

import { makeStyles } from "@material-ui/core/styles"

import { Box, Link, Typography, Breadcrumbs } from "@material-ui/core"

import NavigateNextIcon from "@material-ui/icons/NavigateNext"

import { Route, Link as RouterLink } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  link: {
    color: theme.palette.primary.main
  }
}))

const LinkRouter = (props) => <Link {...props} component={RouterLink} />

export default function RouterBreadcrumbs() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split("/").filter((x) => x)

          return (
            <Box display="inline" p={2} m={1}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb">
                <RouterLink className={classes.link} color="inherit" to="/">
                  Dashboard
                </RouterLink>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`

                  // Split value so the string can be transformed and parsed later.
                  const path = value.split("-")
                  // Convert first char of string to uppercase.
                  path.forEach((item, i) => {
                    // Only capitalize starting from the second element.
                    if (i >= 0) {
                      path[i] =
                        path[i].charAt(0).toUpperCase() + path[i].slice(1)
                    }
                  })

                  // "Dashboard" route is the "Home" of application, so let's ignore it
                  // This is necessary to not have duplicate breadcrumbs
                  if (value === "dashboard") {
                    return null
                  }

                  return last ? (
                    <Typography variant="h5" color="textPrimary" key={to}>
                      {path}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {path}
                    </LinkRouter>
                  )
                })}
              </Breadcrumbs>
            </Box>
          )
        }}
      </Route>
    </div>
  )
}
