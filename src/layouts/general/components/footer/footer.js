import React from "react";

import clsx from "clsx";

import useStyles from "./styles";

import { Typography, Link } from "@material-ui/core";

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy; Copyright{" "}
        <Link component="a" href="https://github.com/iguit0" target="_blank">
          @iguit0
        </Link>{" "}
        &{" "}
        <Link component="a" href="https://github.com/Sphinxs" target="_blank">
          @Sphinxs
        </Link>{" "}
        --- {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption">
        Created with love for the environment. By designers and developers who
        love to work together in offices!
      </Typography>
    </div>
  );
};

export default Footer;
