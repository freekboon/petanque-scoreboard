import React from "react";
import { node } from "prop-types";

const Layout = ({ children }) => (
  <>
    <h1>With a layout!</h1>
    {children}
  </>
);

Layout.propTypes = {
  children: node,
};

export default Layout;
