import React from "react";
import classes from "./Card.module.scss";
import { node, string } from "prop-types";
import classnames from "~utils/classnames";

const Card = ({ title, children, className }) => {
  const cardClass = classnames(classes.card, className);

  return (
    <div className={cardClass}>
      {title && (
        <div className={classes.card_header}>
          <h5 className={classes.card_title}>{title}</h5>
        </div>
      )}
      <div className={classes.card_content}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: string,
  children: node,
  className: string,
};

export default Card;
