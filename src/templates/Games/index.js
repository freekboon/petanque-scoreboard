import React from "react";
import classes from "./Games.module.scss";
import { array, number, string } from "prop-types";
import Card from "~components/Card";
import Button from "~components/Button";
import displayTeamNames from "~utils/displayTeamNames";

const Games = ({ page, count, games }) => {
  const totalPages = Math.floor(count / 16);

  return (
    <div className={classes.container}>
      <Card title="Games history">
        {games.map((game) => (
          <div key={game.id} className={classes.game}>
            <div>{displayTeamNames(game.homeTeam.players)}</div>
            <div>
              {game.score.homeTeam} - {game.score.guestTeam}
            </div>
            <div>{displayTeamNames(game.guestTeam.players)}</div>
          </div>
        ))}
      </Card>
      <div className={classes.buttons}>
        {page > 1 && (
          <Button variant="text" href={`/games?page=${parseInt(page) - 1}`}>
            prev
          </Button>
        )}
        <div className={classes.body}>
          {page} / {totalPages}
        </div>
        {page < totalPages && (
          <Button variant="text" href={`/games?page=${parseInt(page) + 1}`}>
            next
          </Button>
        )}
      </div>
    </div>
  );
};

Games.propTypes = {
  page: string,
  count: number,
  games: array,
};

export default Games;
