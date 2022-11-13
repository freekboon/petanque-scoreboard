import React, { useEffect, useState } from "react";
import classes from "./Accordion.module.scss";
import { arrayOf, node, shape, string } from "prop-types";
import Bellow from "./Bellow";
import Icon from "~components/Icon";
import { useRouter } from "next/router";

const Accordion = ({ items }) => {
  const [active, setActive] = useState(null);
  const router = useRouter();

  const toggle = (value) => {
    if (active === value) {
      return setActive(null);
    }
    setActive(value);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => setActive(null));

    return () => {
      router.events.off("routeChangeStart", () => setActive(null));
    };
  }, [router.events]);

  return (
    <>
      {items.map(({ title, body, itemKey }, index) => (
        <div key={`${itemKey}-${index}`} className={classes.bellow}>
          <div onClick={() => toggle(index)} className={classes.bellow_header}>
            <div>{title}</div>
            <div>
              <Icon icon={active === index ? "angleUp" : "angleDown"} />
            </div>
          </div>
          <Bellow open={active === index} className={classes.bellow_content}>
            {body}
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
