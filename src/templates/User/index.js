import React from "react";
import classes from "./User.module.scss";
import { signOut, useSession } from "next-auth/react";
import Avatar from "~components/Avatar";
import Button from "~components/Button";
import packageData from "../../../package.json";

const User = () => {
  const { data } = useSession();
  return (
    <div className={classes.container}>
      <Avatar user={data?.user} />
      <hr />
      <Button variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
      <hr />
      <p className={classes.overline}>Version: {packageData.version}</p>
    </div>
  );
};

User.propTypes = {};

export default User;
