import React from "react";
import classes from "./Home.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import Scoreboard from "~components/Scoreboard";
import Button from "~components/Button";

const Home = ({ current, rounds }) => {
  return (
    <div className={classes.container}>
      {current ? (
        <Card className={classes.card} chip="live">
          <Scoreboard game={current} rounds={rounds} />
          <Button variant="text" href={`/games/${current.id}`}>
            Check it out
          </Button>
        </Card>
      ) : (
        <div>No current game</div>
      )}
    </div>
  );
};

Home.propTypes = {
  rounds: arrayOf(
    shape({
      id: string,
      team: arrayOf(string),
      points: number,
    })
  ),
  current: shape({
    id: string.isRequired,
    teams: arrayOf(arrayOf(string)).isRequired,
    maxPoints: number.isRequired,
    start: string.isRequired,
  }),
};

export default Home;
