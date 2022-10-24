import React from "react";
import { node } from "prop-types";

const Layout = ({ children }) => <>{children}</>;

Layout.propTypes = {
  children: node,
};

export default Layout;
