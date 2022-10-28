import React from "react";
import Button from "./index";

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
    variant: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
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
