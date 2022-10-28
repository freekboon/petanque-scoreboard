import React from "react";
import classes from "./Card.module.scss";
import { node, string } from "prop-types";

const Card = ({ title, children }) => (
  <div className={classes.card}>
    {title && (
      <div className={classes.card_header}>
        <h5 className={classes.card_title}>{title}</h5>
      </div>
    )}
    <div className={classes.card_content}>{children}</div>
  </div>
);

Card.propTypes = {
  title: string,
  children: node,
};

export default Card;
