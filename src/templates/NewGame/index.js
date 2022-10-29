import React, { useContext, useState } from "react";
import classes from "./NewGame.module.scss";
import Checkbox from "~components/Checkbox";
import Radio from "~components/Radio";
import Button from "~components/Button";
import playerContext from "~contexts/PlayerContext";
import Card from "~components/Card";
import { useRouter } from "next/router";

const initialState = { home: [], guest: [] };

const NewGame = () => {
  const [teams, setTeams] = useState(initialState);
  const [maxPoints, setMaxPoints] = useState(9);
  const { players } = useContext(playerContext);
  const router = useRouter();

  const handleChangeTeams = (team) => (event) => {
    const playerId = event.target.value;

    setTeams((prevState) => ({
      ...prevState,
      [team]: teams[team].includes(playerId)
        ? prevState[team].filter((player) => player !== playerId)
        : prevState[team].concat([playerId]),
    }));
  };

  const handleChangePoints = (event) => {
    setMaxPoints(parseInt(event.target.value));
  };

  const start = async () => {
    try {
      const response = await fetch("/api/game", {
        method: "POST",
        body: JSON.stringify({
          teams: [teams.home, teams.guest],
          maxPoints,
        }),
      });
      const result = await response.json();

      return router.push(`/games/${result.body}`);
    } catch (error) {
      console.error("Une erreur!", error);
    }
  };

  const clear = () => {
    setTeams(initialState);
    setMaxPoints(9);
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
    <div className={classes.container}>
      <Card>
        <div className={classes.section}>
          <h5 className={classes.h5}>Select team</h5>
          <div className={classes.flex}>
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
        </div>
        <div className={classes.section}>
          <h5 className={classes.h5}>Points</h5>
          <div className={classes.flex}>
            {[9, 11, 13].map((number) => (
              <Radio
                key={number.toString()}
                onChange={handleChangePoints}
                name="points"
                checked={number === maxPoints}
                label={number.toString()}
                value={number}
              />
            ))}
          </div>
        </div>
        <div className={classes.flex__spaced}>
          <Button onClick={clear} variant="outline">
            cancel
          </Button>
          <Button onClick={start} disabled={!gameIsValid}>
            Start game
          </Button>
        </div>
      </Card>
    </div>
  );
};

NewGame.propTypes = {};

export default NewGame;
