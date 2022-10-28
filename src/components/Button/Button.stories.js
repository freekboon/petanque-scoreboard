import React from "react";
import Button from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Button",
  component: Button,
  args: {
    color: "primary",
    size: "medium",
    disabled: false,
  },
  argTypes: {
    ...disableControls("variant", "chidlren", "onClick"),
  },
};

export const Solid = (args) => (
  <Button {...args} variant="solid">
    Solid
  </Button>
);

export const Outline = (args) => (
  <Button {...args} variant="outline">
    Outline
  </Button>
);

export const Text = (args) => (
  <Button {...args} variant="text">
    Text
  </Button>
);
