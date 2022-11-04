import React, { useState } from "react";
import { arrayOf, object, string } from "prop-types";
import classes from "./Table.module.scss";
import Icon from "~components/Icon";

const Table = ({ columns, rows, rowKey }) => {
  const [sortBy, setSortyBy] = useState(rowKey);
  const [ascending, setAscending] = useState(true);

  const handleSort = (key) => {
    if (key === sortBy) {
      setAscending(!ascending);
    } else {
      setSortyBy(key);
      setAscending(true);
    }
  };

  return (
    <div className={classes.table}>
      <div className={classes.table_head}>
        <div className={classes.table_row}>
          {columns.map((column) => (
            <div
              key={column}
              className={
                classes[`table_cell${column === rowKey ? "__centered" : ""}`]
              }
            >
              <button
                className={classes.button}
                onClick={() => handleSort(column)}
              >
                {column}
                {column === sortBy && (
                  <Icon
                    icon={ascending ? "angleDown" : "angleUp"}
                    size="fa-xs"
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.table_body}>
        {rows
          .sort((a, b) => {
            if (typeof a[sortBy] === "string") {
              return (ascending ? a : b)[sortBy].localeCompare(
                (ascending ? b : a)[sortBy]
              );
            }
            return (ascending ? b : a)[sortBy] - (ascending ? a : b)[sortBy];
          })
          .map((row) => (
            <div key={`row-${row[rowKey]}`} className={classes.table_row}>
              {columns.map((column) => (
                <div
                  key={`row-${row[0]}-${column}`}
                  className={
                    classes[
                      `table_cell${column === rowKey ? "__centered" : ""}`
                    ]
                  }
                >
                  {row[column]}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: arrayOf(string).isRequired,
  rows: arrayOf(object).isRequired,
  rowKey: string.isRequired,
};

export default Table;
