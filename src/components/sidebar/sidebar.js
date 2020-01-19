import React from "react";

import clsx from "clsx";

import { Divider, Drawer } from "@material-ui/core";

import { Profile, SidebarRoutes, Logout } from "./index";

import useStyles from "./styles";

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

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
        <Profile />

        <Divider className={classes.divider} />

        <SidebarRoutes className={classes.nav} />

        <Divider className={classes.divider} />

        <Logout />
      </div>
    </Drawer>
  );
};

export default Sidebar;
