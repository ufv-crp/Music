import React from "react";

import clsx from "clsx";

import { Divider, Drawer } from "@material-ui/core";

import { Profile, SidebarRoutes, Logout } from "./index";

import useStyles from "./styles";

const Sidebar = ({ open, variant, onClose, user, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile user={user} />

        <Divider className={classes.divider} />

        <SidebarRoutes className={classes.nav} />

        <Divider className={classes.divider} />

        <Logout />
      </div>
    </Drawer>
  );
};

export default Sidebar;
