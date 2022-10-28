import React, { useState } from "react";
import CheckboxComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Checkbox",
  component: CheckboxComponent,
  args: {
    label: "Click me!",
    disabled: false,
    color: "primary",
  },
  argTypes: {
    ...disableControls("value", "checked", "onChange"),
  },
};

export const Checkbox = (args) => {
  const [value, setValue] = useState(false);
  return (
    <CheckboxComponent
      {...args}
      checked={value}
      onChange={() => setValue(!value)}
    />
  );
};
