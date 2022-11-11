import React, { useMemo, useState } from "react";
import Radio from "~components/Radio";
import classes from "./RoundInput.module.scss";
import { arrayOf, func, number, object, shape, string } from "prop-types";
import Button from "~components/Button";
import { useRouter } from "next/router";
import displayTeamNames from "~utils/displayTeamNames";

const RoundInput = ({ teams, gameId, round, callback }) => {
  const [points, setPoints] = useState(round?.points || 0);
  const [team, setTeam] = useState(round?.team || "");
  const edit = useMemo(() => !!round, [round]);
  const router = useRouter();

  const clear = () => {
    setPoints(0);
    setTeam("");
    if (edit) {
      callback();
    }
  };

  const addRound = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/round`, {
      method: "POST",
      body: JSON.stringify({
        gameId,
        team,
        points,
      }),
    });
  };

  const updateRound = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/round/${round.id}`, {
      method: "PUT",
      body: JSON.stringify({
        gameId,
        team,
        newPoints: points,
        oldPoints: round.points,
      }),
    });
  };

  const handleConfirm = () =>
    Promise.resolve(edit ? updateRound() : addRound()).then(() => {
      router.reload();
      clear();
    });

  return (
    <>
      <div className={classes.grid}>
        {[1, 2, 3, 4, 5, 6].map((point) => (
          <div key={point.toString()} className={classes[`cell_${point}`]}>
            <Radio
              value={point}
              onChange={(event) => setPoints(parseInt(event.target.value))}
              checked={points === point}
              label={point.toString()}
            />
          </div>
        ))}
      </div>
      <div className={classes.flex}>
        {teams.map(({ id, players }) => (
          <Radio
            key={id}
            value={id}
            onChange={() => setTeam(id)}
            checked={id.every((playerId) => team.includes(playerId))}
            label={displayTeamNames(players)}
          />
        ))}
      </div>
      <div className={classes.flex}>
        <Button variant="outline" onClick={clear}>
          cancel
        </Button>
        <Button onClick={handleConfirm} disabled={!points || !team}>
          confirm
        </Button>
      </div>
    </>
  );
};

RoundInput.propTypes = {
  gameId: string.isRequired,
  teams: arrayOf(object).isRequired,
  round: shape({
    team: arrayOf(string),
    points: number,
  }),
  callback: func,
};

export default RoundInput;
