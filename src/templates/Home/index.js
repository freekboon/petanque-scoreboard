import React from "react";
import classes from "./Home.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import Scoreboard from "~components/Scoreboard";
import Button from "~components/Button";
import Icon from "~components/Icon";

const Home = ({ current, rounds }) => {
  return (
    <div className={classes.container}>
      {current ? (
        <Card
          className={classes.card}
          chip="live"
          footer={
            <Button variant="text" href={`/games/${current.id}`} size="small">
              Check it out <Icon icon="arrowRight" />
            </Button>
          }
        >
          <Scoreboard game={current} rounds={rounds} />
        </Card>
      ) : (
        <Button href="/games/new" size="large" wide>
          Start a new game
        </Button>
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
