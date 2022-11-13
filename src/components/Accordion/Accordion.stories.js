import React from "react";
import AccordionComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Accordion",
  component: AccordionComponent,
  args: {
    items: [
      { title: "first", body: <div>body first</div> },
      { title: "second", body: <div>body second</div> },
      { title: "third", body: <div>body third</div> },
    ],
  },
  argTypes: {
    ...disableControls("items"),
  },
};

export const Accordion = (args) => (
  <div style={{ width: "250px" }}>
    <AccordionComponent {...args} />
  </div>
);
