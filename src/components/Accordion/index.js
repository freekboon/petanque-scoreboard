import React, { useState } from "react";
import classes from "./Accordion.module.scss";
import { arrayOf, node, shape, string } from "prop-types";
import Bellow from "./Bellow";
import Icon from "~components/Icon";

const Accordion = ({ items }) => {
  const [active, setActive] = useState(null);

  const toggle = (value) => {
    if (active === value) {
      return setActive(null);
    }
    setActive(value);
  };

  return (
    <>
      {items.map(({ title, body }, index) => (
        <div key={`accordion-item-${index}`} className={classes.bellow}>
          <div onClick={() => toggle(index)} className={classes.bellow_header}>
            <div>{title}</div>
            <div>
              <Icon icon={active === index ? "angleUp" : "angleDown"} />
            </div>
          </div>
          <Bellow open={active === index} className={classes.bellow_content}>
            <div className={classes.bellow_content_inner}>{body}</div>
          </Bellow>
        </div>
      ))}
    </>
  );
};

Accordion.propTypes = {
  items: arrayOf(shape({ title: string, body: node })),
};

export default Accordion;
