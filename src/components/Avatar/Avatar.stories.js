import React from "react";
import AvatarComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

const mockUser = {
  name: "Freek Boon",
  email: "freekboon@gmail.com",
  image: "/avatar.png",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Avatar",
  component: AvatarComponent,
  args: {
    size: "medium",
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    ...disableControls("user"),
  },
};

export const Image = (args) => <AvatarComponent {...args} user={mockUser} />;

const emptyUser = {
  name: mockUser.name,
  email: mockUser.email,
  image: "",
};

export const Letters = (args) => <AvatarComponent {...args} user={emptyUser} />;

export const Anonymous = (args) => <AvatarComponent {...args} user={null} />;
