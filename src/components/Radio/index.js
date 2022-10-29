import React from "react";
import classes from "./Radio.module.scss";
import {
  array,
  bool,
  func,
  number,
  oneOf,
  oneOfType,
  string,
} from "prop-types";

const Radio = ({ value, onChange, checked, label, color }) => (
  <label className={classes.radio_label}>
    <input
      type="radio"
      value={value}
      onChange={onChange}
      checked={checked}
      className={classes.radio_input}
    />
    <div className={classes[`radio_${color}${checked ? "__checked" : ""}`]}>
      <div className={classes.radio_dot} />
    </div>
    {label}
  </label>
);

Radio.propTypes = {
  value: oneOfType([string, number, array]).isRequired,
  onChange: func.isRequired,
  checked: bool.isRequired,
  label: string.isRequired,
  color: oneOf(["primary", "secondary"]).isRequired,
};

Radio.defaultProps = {
  color: "primary",
};

export default Radio;
