import React, { useState } from "react";
import InputFieldComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/InputField",
  component: InputFieldComponent,
  args: {
    label: "Type something",
    color: "primary",
    name: "test",
    size: "medium",
    placeholder: "here",
  },
  argTypes: {
    ...disableControls("onChange", "value", "name"),
  },
};

export const InputField = (args) => {
  const [value, setValue] = useState("");
  return (
    <InputFieldComponent
      {...args}
      value={value}
      type="text"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
