import React, { useContext } from "react";
import classes from "./Games.module.scss";
import { arrayOf, shape } from "prop-types";
import PlayerContext from "~contexts/PlayerContext";
import Card from "~components/Card";

const Games = ({ games }) => {
  const { getTeamName } = useContext(PlayerContext);
  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Games</h1>
      {games.map((game) => (
        <Card key={game.id} className={classes.card}>
          <span>{getTeamName(game.teams[0])}</span>
          <span>vs</span>
          <span>{getTeamName(game.teams[1])}</span>
        </Card>
      ))}
    </div>
  );
};

Games.propTypes = {
  games: arrayOf(shape({})),
};

export default Games;
