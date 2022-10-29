import React, { useContext } from "react";
import classes from "./Game.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import PlayerContext from "~contexts/PlayerContext";
import RoundInput from "~modules/RoundInput";
import Scoreboard from "~components/Scoreboard";

const Game = ({ game, rounds }) => {
  const { getTeamName } = useContext(PlayerContext);

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Scoreboard game={game} rounds={rounds} />
      </Card>
      <Card className={classes.card}>
        <RoundInput teams={game.teams} gameId={game.id} />
      </Card>
      {rounds.length > 0 && (
        <Card className={classes.card}>
          {rounds.map((round) => (
            <div key={round.id} className={classes.round}>
              <div>{getTeamName(round.team)}</div>
              <div>{round.points}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

Game.propTypes = {
  rounds: arrayOf(
    shape({
      id: string.isRequired,
      team: arrayOf(string).isRequired,
      points: number.isRequired,
    })
  ),
  game: shape({
    id: string,
    maxPoints: number,
    start: string,
    teams: arrayOf(arrayOf(string)),
  }),
};

export default Game;
