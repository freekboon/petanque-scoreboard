import React, { useState } from "react";
import classes from "./NewGame.module.scss";
import { arrayOf, shape, string } from "prop-types";
import Checkbox from "~components/Checkbox";

const NewGame = ({ players }) => {
  const [teams, setTeams] = useState({ home: [], guest: [] });

  const handleChange = (team) => (event) => {
    const playerId = event.target.value;

    console.log(team);

    setTeams((prevState) => ({
      ...prevState,
      [team]: teams[team].includes(playerId)
        ? prevState[team].filter((player) => player !== playerId)
        : prevState[team].concat([playerId]),
    }));
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
              onChange={handleChange("home")}
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
              onChange={handleChange("guest")}
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
