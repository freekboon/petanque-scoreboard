import React from "react";
import classes from "./Stats.module.scss";
import Table from "~components/Table";
import Card from "~components/Card";
import { arrayOf, number, object, shape, string } from "prop-types";
import Radio from "~components/Radio";
import { useRouter } from "next/router";
import formatDuration from "~utils/formatDuration";

const Stats = ({ year, players, teams, season, seasons }) => {
  const router = useRouter();
  const handleChange = (event) => {
    router.push(`/stats/${event.target.value}`);
  };

  return (
    <div className={classes.container}>
      <Card title="Seasons" className={classes.card}>
        <div className={classes.flex__spaced}>
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
        <div className={classes.flex}>
          <div className={classes.caption}>
            {season.numberOfGamesPlayed} games
          </div>
          <div className={classes.caption}>
            {formatDuration(season.totalDuration)} playtime
          </div>
        </div>
      </Card>
      <Card title="players" className={classes.card}>
        <Table
          columns={["name", "played", "win", "loss", "ratio"]}
          rows={players}
          rowKey="name"
          defaultSort="ratio"
          showNumbers
        />
      </Card>
      <Card title="teams" className={classes.card}>
        <Table
          columns={["name", "played", "win", "loss", "ratio"]}
          rows={teams}
          rowKey="name"
          defaultSort="ratio"
          showNumbers
        />
      </Card>
    </div>
  );
};

Stats.propTypes = {
  year: string,
  season: shape({}),
  players: arrayOf(object),
  teams: arrayOf(object),
  seasons: arrayOf(number),
};

export default Stats;
