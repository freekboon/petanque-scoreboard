import React from "react";
import { node } from "prop-types";
import classes from "./layout.module.scss";
import Link from "next/link";
import Icon from "~components/Icon";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { asPath } = useRouter();
  return (
    <div className={classes.root}>
      {children}
      <nav className={classes.navigation}>
        <Link href="/">
          <a
            className={
              classes[`navigation_item${asPath === "/" ? "__active" : ""}`]
            }
          >
            <Icon type="home" />
            <div>Home</div>
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
            <Icon type="ball" />
            <div>Games</div>
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
            <Icon type="stats" />
            <div>Stats</div>
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
