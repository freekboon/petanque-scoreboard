import React from "react";
import classes from "./Home.module.scss";
import { arrayOf, shape, string } from "prop-types";

const Home = () => (
  <div className={classes.container}>
    <h1 className={classes.h1}>Home</h1>
  </div>
);

Home.propTypes = {
  players: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
    })
  ),
};

export default Home;
