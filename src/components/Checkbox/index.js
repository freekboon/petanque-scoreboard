import React from "react";
import classes from "./Checkbox.module.scss";
import { bool, func, oneOf, string } from "prop-types";
import Icon from "~components/Icon";

const Checkbox = ({ value, checked, disabled, onChange, label, color }) => (
  <label className={classes[`checkbox_label${disabled ? "__disabled" : ""}`]}>
    <div className={classes[`checkbox_${color}${checked ? "__checked" : ""}`]}>
      <Icon type="check" />
    </div>
    <input
      className={classes.checkbox_input}
      type="checkbox"
      value={value}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
    />
    {label}
  </label>
);

Checkbox.propTypes = {
  value: string.isRequired,
  checked: bool.isRequired,
  disabled: bool,
  onChange: func.isRequired,
  label: string.isRequired,
  color: oneOf(["primary", "secondary"]),
};

Checkbox.defaultProps = {
  color: "primary",
};

export default Checkbox;
