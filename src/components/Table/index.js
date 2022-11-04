import React, { useState } from "react";
import { arrayOf, bool, object, string } from "prop-types";
import classes from "./Table.module.scss";
import Icon from "~components/Icon";

const Table = ({ columns, rows, rowKey, defaultSort, showNumbers }) => {
  const [sortBy, setSortyBy] = useState(defaultSort || columns[0]);
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
          {showNumbers && <div className={classes.table_cell} />}
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
                  <Icon icon={ascending ? "angleDown" : "angleUp"} size="xs" />
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
              {showNumbers && (
                <div className={classes.table_cell}>
                  {rows.indexOf(row) + 1}
                </div>
              )}
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
  defaultSort: string,
  showNumbers: bool,
};

Table.defaultProps = {
  showNumbers: false,
};

export default Table;
