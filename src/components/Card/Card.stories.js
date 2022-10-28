import React from "react";
import CardComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Card",
  component: CardComponent,
  args: {
    title: "A title for the card",
  },
  argTypes: {
    ...disableControls("children"),
  },
};

export const Card = (args) => (
  <div style={{ width: "350px" }}>
    <CardComponent {...args}>Joehoe</CardComponent>
  </div>
);
