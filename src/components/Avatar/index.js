import React from "react";
import classes from "./Avatar.module.scss";
import { oneOf, shape, string } from "prop-types";
import Image from "next/image";
import Icon from "~components/Icon";

const avatarSizes = {
  small: 1.5 * 16,
  medium: 2.5 * 16,
  large: 3.5 * 16,
};

const Avatar = ({ user, size }) => {
  const letters = user?.name
    .split(" ")
    .map((_name) => _name[0])
    .join("");

  return (
    <div
      className={classes.avatar}
      style={{
        width: `${avatarSizes[size]}px`,
        height: `${avatarSizes[size]}px`,
        fontSize: `${avatarSizes[size] / 2}px`,
      }}
    >
      {!user && <Icon icon="user" />}
      {!user?.image && <div className={classes.avatar_letters}>{letters}</div>}
      {user?.image && (
        <Image
          alt={`Image of ${user?.name}`}
          src={user.image}
          width={avatarSizes[size]}
          height={avatarSizes[size]}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  user: shape({
    name: string.isRequired,
    email: string.isRequired,
    image: string.isRequired,
  }),
  size: oneOf(["small", "medium", "large"]),
};

Avatar.defaultProps = {
  size: "medium",
};

export default Avatar;
