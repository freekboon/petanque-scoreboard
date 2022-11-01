import React from "react";
import { node } from "prop-types";
import classes from "./layout.module.scss";
import Link from "next/link";
import Icon from "~components/Icon";
import { useRouter } from "next/router";
import Header from "./Header";

const Layout = ({ children }) => {
  const { asPath } = useRouter();
  return (
    <div className={classes.root}>
      <Header />
      {children}
      <nav className={classes.navigation}>
        <Link href="/">
          <a
            className={
              classes[`navigation_item${asPath === "/" ? "__active" : ""}`]
            }
          >
            <Icon icon="home" size="lg" />
            <div className={classes.navigation_label}>Home</div>
          </a>
        </Link>
        <Link href="/games">
          <a
            className={
              classes[
                `navigation_item${asPath.includes("/games") ? "__active" : ""}`
              ]
            }
          >
            <Icon icon="ball" size="lg" />
            <div className={classes.navigation_label}>Games</div>
          </a>
        </Link>
        <Link href="/stats">
          <a
            className={
              classes[
                `navigation_item${asPath.includes("/stats") ? "__active" : ""}`
              ]
            }
          >
            <Icon icon="stats" size="lg" />
            <div className={classes.navigation_label}>Stats</div>
          </a>
        </Link>
      </nav>
    </div>
  );
};

Layout.propTypes = {
  children: node,
};

export default Layout;
