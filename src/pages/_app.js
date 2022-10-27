import React from "react";
import "~styles/globals.scss";
import { any, func } from "prop-types";
import { PlayerProvider } from "~contexts/PlayerContext";

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { players, ...restPageProps } = pageProps;

  return (
    <PlayerProvider players={players}>
      {getLayout(<Component {...restPageProps} />)}
    </PlayerProvider>
  );
};

App.propTypes = {
  Component: func,
  pageProps: any,
};

export default App;
