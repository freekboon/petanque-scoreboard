import React from "react";
import classes from "./Header.module.scss";
import Icon from "~components/Icon";
import Logo from "~public/logo.svg";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div style={{ width: "1.5rem" }}>
          <Logo />
        </div>
        {data && (
          <div>
            <button onClick={() => signOut()}>
              <Icon icon="user" size="xl" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
