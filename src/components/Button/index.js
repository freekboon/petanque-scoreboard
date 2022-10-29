import React from "react";
import classes from "./Button.module.scss";
import { bool, func, node, oneOf, string } from "prop-types";
import classnames from "~utils/classnames";
import Link from "next/link";

const Button = ({
  variant,
  color,
  size,
  onClick,
  children,
  disabled,
  href,
}) => {
  const buttonClass = classnames(
    classes[`button_${size}`],
    classes[`button_${variant}_${color}`],
    disabled && classes.button_disabled,
    href && classes.button_link
  );

  return href ? (
    <Link href={href}>
      <a className={buttonClass}>{children}</a>
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: oneOf(["solid", "outline", "text"]).isRequired,
  color: oneOf(["primary", "secondary"]).isRequired,
  size: oneOf(["small", "medium", "large"]).isRequired,
  onClick: func,
  href: string,
  children: node.isRequired,
  disabled: bool,
};

Button.defaultProps = {
  variant: "solid",
  color: "primary",
  size: "medium",
};

export default Button;
