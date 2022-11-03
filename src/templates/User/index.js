import React from "react";
import classes from "./User.module.scss";
import { signOut, useSession } from "next-auth/react";
import Avatar from "~components/Avatar";
import Button from "~components/Button";

const User = () => {
  const { data } = useSession();
  return (
    <div className={classes.container}>
      <Avatar user={data?.user} />
      <hr />
      <Button variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
};

User.propTypes = {};

export default User;
