import React from "react";
import classes from "./Game.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import RoundInput from "~modules/RoundInput";
import Scoreboard from "~components/Scoreboard";

const Game = ({ game }) => {
  const getTeamName = (teamId) =>
    [game.homeTeam, game.guestTeam]
      .find((team) => team.id.every((playerId) => teamId.includes(playerId)))
      .players.map((player) => player.name)
      .join(" & ");

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
