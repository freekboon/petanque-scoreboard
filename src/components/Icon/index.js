import React from "react";
import { oneOf } from "prop-types";
import classes from "./Icon.module.scss";

import Check from "~public/icons/check.svg";
import Home from "~public/icons/home.svg";
import Ball from "~public/icons/ball.svg";
import Stats from "~public/icons/stats.svg";

const icons = {
  check: Check,
  home: Home,
  ball: Ball,
  stats: Stats,
};

const Icon = ({ type }) => {
  const Component = icons[type];
  return (
    <span className={classes.icon}>
      <Component />
    </span>
  );
};

Icon.propTypes = {
  type: oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
