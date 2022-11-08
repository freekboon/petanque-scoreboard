import React from "react";
import classes from "./Stats.module.scss";
import Table from "~components/Table";
import Card from "~components/Card";
import { arrayOf, object, string } from "prop-types";
import Radio from "~components/Radio";
import { useRouter } from "next/router";
import formatDuration from "~utils/formatDuration";

const Stats = ({ year, players, teams, season }) => {
  const router = useRouter();
  const handleChange = (event) => {
    router.push(`/stats/${event.target.value}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.flex__spaced}>
        {["2020", "2021", "2022", "2023"].map((_year) => (
          <Radio
            key={_year}
            onChange={handleChange}
            checked={year === _year}
            value={_year}
            label={_year}
          />
        ))}
      </div>
      <Card title={`${year} season`} className={classes.card}>
        <div className={classes.flex}>
          <div className={classes.body}>{season.numberOfGamesPlayed} games</div>
          <div className={classes.body}>
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
  season: arrayOf(object),
  players: arrayOf(object),
  teams: arrayOf(object),
};

export default Stats;
