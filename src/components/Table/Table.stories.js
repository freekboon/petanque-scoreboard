import React from "react";
import TableComponent from "./index";
import disableControls from "~utils/storybook/disableControls";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "components/Table",
  component: TableComponent,
  argTypes: {
    ...disableControls("rows", "columns", "rowKey"),
  },
  args: {
    columns: ["name", "played", "wins", "losses", "ratio"],
    rows: [
      {
        name: "Lala",
        played: 1,
        wins: 1,
        losses: 0,
        ratio: 1,
      },
      {
        name: "Po",
        played: 1,
        wins: 0,
        losses: 1,
        ratio: 0,
      },
      {
        name: "Dipsy",
        played: 2,
        wins: 1,
        losses: 1,
        ratio: 0.5,
      },
      {
        name: "Tinky",
        played: 2,
        wins: 2,
        losses: 0,
        ratio: 2,
      },
    ],
    rowKey: "name",
  },
};

export const Table = (args) => <TableComponent {...args} />;
