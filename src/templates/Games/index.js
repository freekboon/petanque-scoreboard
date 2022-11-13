import React from "react";
import classes from "./Games.module.scss";
import { arrayOf, number, shape, string } from "prop-types";
import Card from "~components/Card";
import Radio from "~components/Radio";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Accordion from "~components/Accordion";
import displayTeamNames from "~utils/displayTeamNames";

const Games = ({ year, seasons, games }) => {
  const router = useRouter();

  const handleChange = (event) => {
    router.push(`/games/history/${event.target.value}`);
  };

  const months = [
    ...new Set(games.map(({ start }) => format(new Date(start), "MMMM"))),
  ];

  const accordionItems = months.map((month) => {
    const _games = games.filter(
      ({ start }) => format(new Date(start), "MMMM") === month
    );
    return {
      itemKey: `${year}-${month}`,
      title: `${month} (${_games.length})`,
      body: _games.map((game) => (
        <div key={game.id} className={classes.game}>
          <div>{displayTeamNames(game.homeTeam.players)}</div>
          <div>
            {game.score.homeTeam} - {game.score.guestTeam}
          </div>
          <div>{displayTeamNames(game.guestTeam.players)}</div>
        </div>
      )),
    };
  });

  return (
    <div className={classes.container}>
      <Card title="Seasons" className={classes.card}>
        <div className={classes.flex}>
          {seasons.map((_year) => (
            <Radio
              key={_year}
              onChange={handleChange}
              checked={year === _year.toString()}
              value={_year}
              label={_year.toString()}
            />
          ))}
        </div>
      </Card>
      <Card title={`${year} games`} noPadding>
        <Accordion items={accordionItems} />
      </Card>
    </div>
  );
};

Games.propTypes = {
  year: string,
  seasons: arrayOf(number),
  games: arrayOf(shape({})),
};

export default Games;
