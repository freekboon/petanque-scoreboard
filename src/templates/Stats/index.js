import React from "react";
import classes from "./Stats.module.scss";
import Table from "~components/Table";
import Card from "~components/Card";
import { arrayOf, object, string } from "prop-types";
import Radio from "~components/Radio";
import { useRouter } from "next/router";

const Stats = ({ year, players, teams }) => {
  const router = useRouter();
  const handleChange = (event) => {
    router.push(`/stats/${event.target.value}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
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
      <Card title="season" className={classes.card}>
        <p className={classes.body}>Coming soon-ish</p>
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
  players: arrayOf(object),
  teams: arrayOf(object),
};

export default Stats;
