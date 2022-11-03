import React from "react";
import { node } from "prop-types";
import classes from "./layout.module.scss";
import Link from "next/link";
import Icon from "~components/Icon";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.assign("/login");
    },
  });

  if (status === "loading") {
    return (
      <div className={classes.loading}>
        <Icon icon="loading" className="fa-spin fa-4x" />
      </div>
    );
  }

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
        <Link href="/user">
          <a
            className={
              classes[
                `navigation_item${asPath.includes("/user") ? "__active" : ""}`
              ]
            }
          >
            <Icon icon="user" size="lg" />
            <div className={classes.navigation_label}>User</div>
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
