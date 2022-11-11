import React from "react";
import classes from "./Game.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import RoundInput from "~modules/RoundInput";
import Scoreboard from "~components/Scoreboard";
import Round from "./components/Round";

const Game = ({ game }) => {
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Scoreboard game={game} />
      </Card>
      {!game.end && (
        <Card className={classes.card}>
          <RoundInput
            teams={[game.homeTeam, game.guestTeam]}
            gameId={game.id}
          />
        </Card>
      )}
      {game.rounds.length > 0 && (
        <Card className={classes.card}>
          {game.rounds.map((round, index) => (
            <Round
              key={round.id}
              round={round}
              teams={[game.homeTeam, game.guestTeam]}
              editAvailable={index === game.rounds.length - 1 && !game.end}
              gameId={game.id}
            />
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
    teams: arrayOf(arrayOf(shape({ id: string }))),
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
