const displayTeamNames = (players) =>
  players.map((player) => player.name).join(" & ");

export default displayTeamNames;
