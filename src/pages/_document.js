import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+Pro:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="theme-color" content="#fff" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
