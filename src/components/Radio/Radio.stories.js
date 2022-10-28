import React, { useState } from "react";
import RadioComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Radio",
  component: RadioComponent,
  args: {
    color: "primary",
  },
  argTypes: {
    ...disableControls("value", "onChange", "checked", "label"),
  },
};

export const Radio = (args) => {
  const [value, setValue] = useState(null);
  return (
    <>
      {["yeay", "boeh", "yeet"].map((option) => (
        <RadioComponent
          key={option}
          {...args}
          value={option}
          onChange={() => setValue(option)}
          label={option}
          checked={value === option}
        />
      ))}
    </>
  );
};
