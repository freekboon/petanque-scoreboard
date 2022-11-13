import React, { useEffect, useRef, useState } from "react";
import { bool, node, string } from "prop-types";

const Bellow = ({ children, className, open }) => {
  const contentRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(contentRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <div className={className} style={{ height: open ? `${height}px` : 0 }}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

Bellow.propTypes = {
  children: node,
  className: string,
  open: bool,
};

export default Bellow;
