import React, { useState } from "react";

import clsx from "clsx";

import useStyles from "./styles";

import { useTheme } from "@material-ui/styles";

import { useMediaQuery } from "@material-ui/core";

import { Header, Sidebar, Footer } from "../../components";


const General = props => {
  const { children } = props;

  const classes = useStyles();

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Header onSidebarOpen={handleSidebarOpen} />

      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />

      <main className={classes.content}>{children}</main>

      <Footer />
    </div>
  );
};

export default General;
