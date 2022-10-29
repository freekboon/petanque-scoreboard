import React, { useContext } from "react";
import classes from "./Game.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import PlayerContext from "~contexts/PlayerContext";
import RoundInput from "~modules/RoundInput";

const Game = ({ game, rounds }) => {
  const { getTeamName } = useContext(PlayerContext);

  const getTeamScore = (team) =>
    rounds
      .filter((round) =>
        round.team.every((playerId) => team.includes(playerId))
      )
      .map(({ points }) => points)
      .reduce((acc, point) => acc + point, 0);

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.scoreboard}>
          <div className={classes.scoreboard_team}>
            {getTeamName(game.teams[0])}
          </div>
          <div className={classes.scoreboard_score}>
            {getTeamScore(game.teams[0])} : {getTeamScore(game.teams[1])}
          </div>
          <div className={classes.scoreboard_team}>
            {getTeamName(game.teams[1])}
          </div>
        </div>
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
