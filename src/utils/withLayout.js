import React from "react";
import Layout from "~modules/Layout";

/**
 * HOC that applies the layout to a page.
 * @param {function} Component - Component to be wrapped.
 * @param {Object} [props] - Props passed to layout.
 * @param {function} [CustomLayout] - A React component to replace the default Layout.
 * @return {function}
 */
export const withLayout = (Component, props, CustomLayout) => {
  const AppliedLayout = CustomLayout || Layout;

  Component.getLayout = (page) => (
    <AppliedLayout {...props}>{page}</AppliedLayout>
  );
  return Component;
};

export default withLayout;
