import React, { useState } from "react";
import classes from "./InputField.module.scss";
import { func, oneOf, string } from "prop-types";
import classnames from "~utils/classnames";

const InputField = ({
  name,
  value,
  onChange,
  label,
  color,
  size,
  placeholder,
}) => {
  const [focus, setFocus] = useState(false);

  const inputClass = classnames(
    classes[`input_${color}`],
    classes[`input_${size}`]
  );

  return (
    <span>
      <label
        htmlFor={name}
        className={classes[`input_label_${color}${focus ? "__focussed" : ""}`]}
      >
        {label}
      </label>
      <input
        name={name}
        className={inputClass}
        type="text"
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        placeholder={placeholder}
      />
    </span>
  );
};

InputField.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  label: string,
  color: oneOf(["primary", "secondary"]).isRequired,
  size: oneOf(["small", "medium"]).isRequired,
  placeholder: string,
};

InputField.defaultProps = {
  color: "primary",
  size: "medium",
};

export default InputField;
