import React, { createContext } from "react";
import { arrayOf, node, shape, string } from "prop-types";

const PlayerContext = createContext({});

export const PlayerProvider = ({ children, players }) => {
  const getTeamName = (playerIds) =>
    `${players.find(({ id }) => id === playerIds[0]).name} & ${
      players.find(({ id }) => id === playerIds[1]).name
    }`;

  return (
    <PlayerContext.Provider value={{ players, getTeamName }}>
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: node.isRequired,
  players: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
    })
  ),
};

export default PlayerContext;
