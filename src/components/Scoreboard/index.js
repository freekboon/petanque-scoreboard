import React, { useContext } from "react";
import classes from "./Scoreboard.module.scss";
import { arrayOf, shape } from "prop-types";
import PlayerContext from "~contexts/PlayerContext";
import { formatDistance } from "date-fns";

const Scoreboard = ({ game, rounds }) => {
  const { getTeamName } = useContext(PlayerContext);

  const getTeamScore = (team) =>
    rounds
      .filter((round) =>
        round.team.every((playerId) => team.includes(playerId))
      )
      .map(({ points }) => points)
      .reduce((acc, point) => acc + point, 0);

  return (
    <>
      <div className={classes.scoreboard}>
        <div className={classes.scoreboard_team}>
          {getTeamName(game.teams[0])}
        </div>
        <div className={classes.scoreboard_score}>
          {getTeamScore(game.teams[0])} : {getTeamScore(game.teams[1])}
        </div>
        <div className={classes.scoreboard_team} style={{ textAlign: "right" }}>
          {getTeamName(game.teams[1])}
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.caption}>out of {game.maxPoints}</div>
        <div className={classes.caption}>
          {formatDistance(
            new Date(game.start),
            game.end ? new Date(game.end) : new Date()
          )}
        </div>
        <div className={classes.caption}>{rounds.length} rounds</div>
      </div>
    </>
  );
};

Scoreboard.propTypes = {
  rounds: arrayOf(shape({})),
  game: shape({}),
};

export default Scoreboard;
