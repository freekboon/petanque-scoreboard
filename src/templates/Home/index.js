import React from "react";
import classes from "./Home.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import Scoreboard from "~components/Scoreboard";
import Button from "~components/Button";
import Icon from "~components/Icon";

const formatDuration = (total) => {
  const minutes = total % 60;
  const hours = (total - minutes) / 60;

  return `${hours}:${minutes} hours`;
};

const Home = ({ season, game }) => {
  return (
    <div className={classes.container}>
      {game && (
        <Card
          className={classes.card}
          chip="live"
          footer={
            <Button variant="text" href={`/games/${game.id}`} size="small">
              Check it out <Icon icon="arrowRight" />
            </Button>
          }
        >
          <Scoreboard game={game} />
        </Card>
      )}
      <Card
        className={classes.card}
        title={`${season.year} season`}
        footer={
          !game && (
            <Button variant="text" href="/games/new">
              Start a new game <Icon icon="arrowRight" />
            </Button>
          )
        }
      >
        <div className={classes.season_stats}>
          <div className={classes.caption}>
            {season.numberOfGamesPlayed} games
          </div>
          <div className={classes.caption}>
            {formatDuration(season.totalDuration)}
          </div>
        </div>
        <div className={classes.season_leaderboards}>
          <div>
            <div className={classes.overline}>Best player:</div>
            <div>Coming soon-ish</div>
          </div>
          <div>
            <div className={classes.overline}>Best team:</div>
            <div>Coming soon-ish</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

Home.propTypes = {
  season: shape({
    year: number,
    numberOfGamesPlayed: number,
    totalDuration: number,
  }),
  game: shape({
    id: string.isRequired,
    teams: arrayOf(arrayOf(string)).isRequired,
    maxPoints: number.isRequired,
    start: string.isRequired,
    rounds: arrayOf(
      shape({
        id: string,
        team: arrayOf(string),
        points: number,
      })
    ),
  }),
};

export default Home;
