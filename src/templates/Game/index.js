import React, { useContext } from "react";
import classes from "./Game.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import PlayerContext from "~contexts/PlayerContext";
import RoundInput from "~modules/RoundInput";
import Scoreboard from "~components/Scoreboard";

const Game = ({ game }) => {
  const { getTeamName } = useContext(PlayerContext);

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Scoreboard game={game} rounds={game.rounds} />
      </Card>
      {!game.end && (
        <Card className={classes.card}>
          <RoundInput teams={game.teams} gameId={game.id} />
        </Card>
      )}
      {game.rounds.length > 0 && (
        <Card className={classes.card}>
          {game.rounds.map((round) => (
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
  game: shape({
    id: string,
    maxPoints: number,
    start: string,
    teams: arrayOf(arrayOf(string)),
    rounds: arrayOf(
      shape({
        id: string.isRequired,
        team: arrayOf(string).isRequired,
        points: number.isRequired,
      })
    ),
  }),
};

export default Game;
