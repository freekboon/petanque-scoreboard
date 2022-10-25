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

  const playerIsUnavailable = (playerId, team) => {
    if (team === "home") {
      return (
        teams.guest.includes(playerId) ||
        (!teams.home.includes(playerId) && teams.home.length === 2)
      );
    }
    if (team === "guest") {
      return (
        teams.home.includes(playerId) ||
        (!teams.guest.includes(playerId) && teams.guest.length === 2)
      );
    }
  };

  const gameIsValid = teams.home.length === 2 && teams.guest.length === 2;

  return (
    <>
      <div className={classes.container_flex}>
        <div className={classes.team}>
          <div className={classes.body}>Home team</div>
          <div className={classes.players}>
            {players
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((player) => (
                <Checkbox
                  key={`home-${player.id}`}
                  onChange={handleChangeTeams("home")}
                  checked={teams.home.includes(player.id)}
                  label={player.name}
                  value={player.id}
                  disabled={playerIsUnavailable(player.id, "home")}
                />
              ))}
          </div>
        </div>
        <div className={classes.team}>
          <div className={classes.body}>Guest team</div>
          <div className={classes.players}>
            {players
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((player) => (
                <Checkbox
                  key={`guest-${player.id}`}
                  onChange={handleChangeTeams("guest")}
                  checked={teams.guest.includes(player.id)}
                  label={player.name}
                  value={player.id}
                  disabled={playerIsUnavailable(player.id, "guest")}
                  color="secondary"
                />
              ))}
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.body}>Rounds</div>
        <div className={classes.rounds}>
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
        </div>
      </div>
      <div className={classes.container}>
        <Button onClick={start} disabled={!gameIsValid}>
          Start game
        </Button>
      </div>
    </>
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
