import React, { useState } from "react";
import classes from "./Round.module.scss";
import { arrayOf, bool, number, shape, string } from "prop-types";
import RoundInput from "~modules/RoundInput";

const Round = ({ gameId, round, teams, editAvailable }) => {
  const [edit, setEdit] = useState(false);

  const getTeamName = (teamId) =>
    teams
      .find((team) => team.id.every((playerId) => teamId.includes(playerId)))
      .players.map((player) => player.name)
      .join(" & ");

  return (
    <div key={round.id} className={classes.round}>
      <div className={classes.flex}>
        <div>{getTeamName(round.team)}</div>
        {editAvailable && (
          <button onClick={() => setEdit(!edit)} disabled={edit}>
            edit
          </button>
        )}
        <div>{round.points}</div>
      </div>
      {edit && (
        <RoundInput
          gameId={gameId}
          teams={teams}
          round={round}
          callback={() => setEdit(false)}
        />
      )}
    </div>
  );
};

Round.propTypes = {
  gameId: string,
  round: shape({
    team: arrayOf(string),
    points: number,
  }),
  teams: arrayOf(shape({})),
  editAvailable: bool,
};

export default Round;
