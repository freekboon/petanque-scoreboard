const mongoose = require("mongoose");
const oldGames = require("./data/games.json");
const getNewTeamId = require("./helpers/getNewTeamId");

const createGames = async () => {
  return Promise.all(
    oldGames.map(async (oldGame) => {
      await mongoose.models.Game.create({
        teams: await Promise.all(
          oldGame.teams.map((oldTeam) => getNewTeamId(oldTeam.$oid))
        ),
        maxPoints: oldGame.maxScore,
        start: oldGame.startTime,
        end: oldGame.endTime,
        legacyId: oldGame._id.$oid,
        winner: await getNewTeamId(oldGame.winner),
      });
    })
  ).then(async () => {
    const count = await mongoose.models.Game.count();
    console.log(`Created ${count} new games.`);
  });
};

module.exports = createGames;
