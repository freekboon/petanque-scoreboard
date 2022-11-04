import React from "react";
import classes from "./Stats.module.scss";
import Table from "~components/Table";
import Card from "~components/Card";
import { arrayOf, object, string } from "prop-types";
import Radio from "~components/Radio";
import { useRouter } from "next/router";

const Stats = ({ year, stats }) => {
  const router = useRouter();
  const handleChange = (event) => {
    router.push(`/stats/${event.target.value}`);
  };

  //****************************************************************
  // Get season stats and get team stats
  //****************************************************************

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
        <Table
          columns={["name", "played", "win", "loss", "ratio"]}
          rows={stats}
          rowKey="name"
          defaultSort="ratio"
          showNumbers
        />
      </Card>
      <Card title="players" className={classes.card}>
        <Table
          columns={["name", "played", "win", "loss", "ratio"]}
          rows={stats}
          rowKey="name"
          defaultSort="ratio"
          showNumbers
        />
      </Card>
      <Card title="teams" className={classes.card}>
        <Table
          columns={["name", "played", "win", "loss", "ratio"]}
          rows={stats}
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
  stats: arrayOf(object),
};

export default Stats;
