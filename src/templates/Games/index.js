import React from "react";
import classes from "./Games.module.scss";
import { arrayOf, shape } from "prop-types";

const Games = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Games</h1>
      <p>Coming soon</p>
    </div>
  );
};

Games.propTypes = {
  games: arrayOf(shape({})),
};

export default Games;
