import React from "react";
import "~styles/globals.scss";
import { any, func } from "prop-types";

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

App.propTypes = {
  Component: func,
  pageProps: any,
};

export default App;
