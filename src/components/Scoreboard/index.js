import React from "react";
import classes from "./Scoreboard.module.scss";
import { shape } from "prop-types";
import { formatDistance } from "date-fns";
import displayTeamNames from "~utils/displayTeamNames";

const Scoreboard = ({ game }) => (
  <>
    <div className={classes.scoreboard}>
      <div className={classes.scoreboard_team}>
        {displayTeamNames(game.teams[0].players)}
      </div>
      <div className={classes.scoreboard_score}>
        {game.teams[0].score} : {game.teams[1].score}
      </div>
      <div className={classes.scoreboard_team} style={{ textAlign: "right" }}>
        {displayTeamNames(game.teams[1].players)}
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
      <div className={classes.caption}>{game.rounds.length} rounds</div>
    </div>
  </>
);

Scoreboard.propTypes = {
  game: shape({}),
};

export default Scoreboard;
