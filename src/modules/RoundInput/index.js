import React, { useState } from "react";
import Radio from "~components/Radio";
import classes from "./RoundInput.module.scss";
import { arrayOf, object, string } from "prop-types";
import Button from "~components/Button";
import { useRouter } from "next/router";
import displayTeamNames from "~utils/displayTeamNames";

const RoundInput = ({ teams, gameId }) => {
  const [points, setPoints] = useState(0);
  const [team, setTeam] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setPoints(0);
    setTeam("");
  };

  const addRound = () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/round`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
      body: JSON.stringify({
        gameId,
        team,
        points,
      }),
    });
  };

  const handleAddRound = () => {
    setLoading(true);
    addRound().then(() => {
      router.reload();
      clear();
    });
  };

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
            checked={team === id}
            label={displayTeamNames(players)}
          />
        ))}
      </div>
      <div className={classes.flex}>
        <Button variant="outline" onClick={clear}>
          cancel
        </Button>
        <Button onClick={handleAddRound} disabled={!points || !team || loading}>
          confirm
        </Button>
      </div>
    </>
  );
};

RoundInput.propTypes = {
  gameId: string.isRequired,
  teams: arrayOf(object).isRequired,
};

export default RoundInput;
