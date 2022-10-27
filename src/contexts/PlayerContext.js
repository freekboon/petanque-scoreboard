import React, { createContext } from "react";

const PlayerContext = createContext({});

// eslint-disable-next-line react/prop-types
export const PlayerProvider = ({ children, players }) => (
  <PlayerContext.Provider value={{ players }}>
    {children}
  </PlayerContext.Provider>
);

export default PlayerContext;
