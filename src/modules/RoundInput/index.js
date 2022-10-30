import React, { useContext, useState } from "react";
import Radio from "~components/Radio";
import classes from "./RoundInput.module.scss";
import { arrayOf, string } from "prop-types";
import Button from "~components/Button";
import PlayerContext from "~contexts/PlayerContext";
import { useRouter } from "next/router";

const RoundInput = ({ teams, gameId }) => {
  const { getTeamName } = useContext(PlayerContext);
  const [points, setPoints] = useState(0);
  const [team, setTeam] = useState("");
  const router = useRouter();

  const clear = () => {
    setPoints(0);
    setTeam("");
  };

  const addRound = () =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/round`, {
      method: "POST",
      body: JSON.stringify({
        gameId,
        team,
        points,
      }),
    });

  const handleAddRound = () =>
    addRound().then(() => {
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
        {teams.map((playerIds) => (
          <Radio
            key={playerIds}
            value={playerIds}
            onChange={() => setTeam(playerIds)}
            checked={team === playerIds}
            label={getTeamName(playerIds)}
          />
        ))}
      </div>
      <div className={classes.flex}>
        <Button variant="outline" onClick={clear}>
          cancel
        </Button>
        <Button onClick={handleAddRound} disabled={!points || !team}>
          confirm
        </Button>
      </div>
    </>
  );
};

RoundInput.propTypes = {
  gameId: string.isRequired,
  teams: arrayOf(arrayOf(string)).isRequired,
};

export default RoundInput;
