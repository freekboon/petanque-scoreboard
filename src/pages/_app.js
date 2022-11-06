import React from "react";
import "~styles/globals.scss";
import { any, func } from "prop-types";
import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";

config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { session, ...restPageProps } = pageProps;

  return (
    <SessionProvider session={session}>
      <Head>
        <title>WAT DAN!?</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {getLayout(<Component {...restPageProps} />)}
    </SessionProvider>
  );
};

App.propTypes = {
  Component: func,
  pageProps: any,
};

export default App;
