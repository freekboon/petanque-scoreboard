import React, { useState } from "react";
import classes from "./NewGame.module.scss";
import Checkbox from "~components/Checkbox";
import Radio from "~components/Radio";
import Button from "~components/Button";
import Card from "~components/Card";
import { useRouter } from "next/router";
import { arrayOf, shape } from "prop-types";

const initialState = { homeTeam: [], guestTeam: [] };

const NewGame = ({ players }) => {
  const [teams, setTeams] = useState(initialState);
  const [maxPoints, setMaxPoints] = useState(9);
  const router = useRouter();

  const handleChangeTeams = (team) => (event) => {
    const playerId = event.target.value;

    setTeams((prevState) => ({
      ...prevState,
      [team]: [team].includes(playerId)
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
          homeTeam: teams.homeTeam,
          guestTeam: teams.guestTeam,
          maxPoints,
        }),
      });
      const result = await response.json();

      return router.push(`/games/${result.body}`);
    } catch (error) {
      console.error("Une erreur!", error);
    }
  };

  const cancel = () => {
    setTeams(initialState);
    setMaxPoints(9);
    router.back();
  };

  const playerIsUnavailable = (playerId, team) => {
    if (team === "home") {
      return (
        teams.guestTeam.includes(playerId) ||
        (!teams.homeTeam.includes(playerId) && teams.homeTeam.length === 2)
      );
    }
    if (team === "guest") {
      return (
        teams.home.includes(playerId) ||
        (!teams.guestTeam.includes(playerId) && teams.guestTeam.length === 2)
      );
    }
  };

  const gameIsValid =
    teams.homeTeam.length === 2 && teams.guestTeam.length === 2;

  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.section}>
          <h5 className={classes.h5}>Teams</h5>
          <div className={classes.flex}>
            <div className={classes.team}>
              <div className={classes.overline}>Home team</div>
              <div className={classes.players}>
                {players
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((player) => (
                    <Checkbox
                      key={`home-${player.id}`}
                      onChange={handleChangeTeams("homeTeam")}
                      checked={teams.homeTeam.includes(player.id)}
                      label={player.name}
                      value={player.id}
                      disabled={playerIsUnavailable(player.id, "homeTeam")}
                    />
                  ))}
              </div>
            </div>
            <div className={classes.team}>
              <div className={classes.overline}>Guest team</div>
              <div className={classes.players}>
                {players
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((player) => (
                    <Checkbox
                      key={`guest-${player.id}`}
                      onChange={handleChangeTeams("guestTeam")}
                      checked={teams.guestTeam.includes(player.id)}
                      label={player.name}
                      value={player.id}
                      disabled={playerIsUnavailable(player.id, "guestTeam")}
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
          <Button onClick={cancel} variant="outline">
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

NewGame.propTypes = {
  players: arrayOf(shape({})),
};

export default NewGame;
