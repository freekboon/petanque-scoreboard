import React from "react";
import classes from "./Game.module.scss";
import { arrayOf, number, shape, string } from "prop-types";

const Game = ({ game }) => {
  console.log(game);
  return <div className={classes.game}>Game</div>;
};

Game.propTypes = {
  game: shape({
    id: string,
    maxPoints: number,
    start: string,
    teams: arrayOf(arrayOf(string)),
  }),
};

export default Game;
