import React from "react";
import classes from "./Games.module.scss";
import { arrayOf, shape } from "prop-types";
import Card from "~components/Card";

const Games = () => {
  return (
    <div className={classes.container}>
      <Card title="Games">
        <p className={classes.body}>Coming soon-ish</p>
      </Card>
    </div>
  );
};

Games.propTypes = {
  games: arrayOf(shape({})),
};

export default Games;
