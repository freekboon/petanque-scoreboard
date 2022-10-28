import React from "react";
import icons from "./icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { oneOf } from "prop-types";

const Icon = ({ icon, ...props }) => {
  return <FontAwesomeIcon icon={icons[icon]} {...props} />;
};

Icon.propTypes = {
  icon: oneOf(Object.keys(icons)).isRequired,
};

export default Icon;
