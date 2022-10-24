import React, { useState } from "react";
import classes from "./NewGame.module.scss";
import { arrayOf, shape, string } from "prop-types";
import Checkbox from "~components/Checkbox";
import Radio from "~components/Radio";
import Button from "~components/Button";

const NewGame = ({ players }) => {
  const [teams, setTeams] = useState({ home: [], guest: [] });
  const [rounds, setRounds] = useState(11);

  const handleChangeTeams = (team) => (event) => {
    const playerId = event.target.value;

    setTeams((prevState) => ({
      ...prevState,
      [team]: teams[team].includes(playerId)
        ? prevState[team].filter((player) => player !== playerId)
        : prevState[team].concat([playerId]),
    }));
  };

  const handleChangeRounds = (event) => {
    setRounds(parseInt(event.target.value));
  };

  const start = async () => {
    try {
      const response = await fetch("/api/games", { method: "POST" });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Une erreur!", error);
    }
  };

  return (
    <div className={classes.container}>
      <div>Home team</div>
      <div>
        {players
          .filter((player) => !teams.guest.includes(player.id))
          .map((player) => (
            <Checkbox
              key={`home-${player.id}`}
              onChange={handleChangeTeams("home")}
              checked={teams.home.includes(player.id)}
              label={player.name}
              value={player.id}
              disabled={
                teams.home.length === 2 && !teams.home.includes(player.id)
              }
            />
          ))}
      </div>
      <hr />
      <div>Guest team</div>
      <div>
        {players
          .filter((player) => !teams.home.includes(player.id))
          .map((player) => (
            <Checkbox
              key={`guest-${player.id}`}
              onChange={handleChangeTeams("guest")}
              checked={teams.guest.includes(player.id)}
              label={player.name}
              value={player.id}
              disabled={
                teams.guest.length === 2 && !teams.guest.includes(player.id)
              }
              color="secondary"
            />
          ))}
      </div>
      <hr />
      <div>Rounds</div>
      {[9, 11, 13].map((number) => (
        <Radio
          key={number.toString()}
          onChange={handleChangeRounds}
          name="rounds"
          checked={number === rounds}
          label={number.toString()}
          value={number}
        />
      ))}
      <hr />
      <Button onClick={start}>Start game</Button>
    </div>
  );
};

NewGame.propTypes = {
  players: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
    })
  ),
};

export default NewGame;
