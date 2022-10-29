import React from "react";
import classes from "./Card.module.scss";
import { node, string } from "prop-types";
import classnames from "~utils/classnames";

const Card = ({ title, children, className, chip }) => {
  const cardClass = classnames(
    classes.card,
    chip && classes.card_chip,
    className
  );

  return (
    <div className={cardClass}>
      {chip && <div className={classes.chip}>{chip}</div>}
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
  chip: string,
};

export default Card;
