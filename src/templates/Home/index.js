import React from "react";
import classes from "./Home.module.scss";
import { arrayOf, shape, string } from "prop-types";
import Link from "next/link";

const Home = () => (
  <div className={classes.container}>
    <h1 className={classes.h1}>Home</h1>
    <Link href={"/games/635cb1572de6b9a4fb76992e"}>temp</Link>
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
