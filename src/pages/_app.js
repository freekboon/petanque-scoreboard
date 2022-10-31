import React from "react";
import "~styles/globals.scss";
import { any, func } from "prop-types";
import { PlayerProvider } from "~contexts/PlayerContext";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { players, ...restPageProps } = pageProps;

  return (
    <>
      <Head>
        <title>WAT DAN!?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PlayerProvider players={players}>
        {getLayout(<Component {...restPageProps} />)}
      </PlayerProvider>
    </>
  );
};

App.propTypes = {
  Component: func,
  pageProps: any,
};

export default App;
