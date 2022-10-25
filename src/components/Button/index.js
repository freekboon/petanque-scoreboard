import React from "react";
import classes from "./Button.module.scss";
import { bool, func, node, oneOf } from "prop-types";
import classnames from "~utils/classnames";

const Button = ({ variant, color, size, onClick, children, disabled }) => {
  const buttonClass = classnames(
    classes[`button_${size}`],
    classes[`button_${variant}_${color}`],
    disabled && classes.button_disabled
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: oneOf(["solid", "outline", "text"]).isRequired,
  color: oneOf(["primary", "secondary"]).isRequired,
  size: oneOf(["small", "medium", "large"]).isRequired,
  onClick: func.isRequired,
  children: node.isRequired,
  disabled: bool,
};

Button.defaultProps = {
  variant: "solid",
  color: "primary",
  size: "medium",
};

export default Button;
