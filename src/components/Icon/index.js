import React from "react";
// import classes from "./Icon.module.scss";

import Check from "../../../public/icons/check.svg";
import { oneOf } from "prop-types";

const icons = {
  check: Check,
};

const Icon = ({ type }) => {
  const Component = icons[type];
  return <Component />;
};

Icon.propTypes = {
  type: oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
