const mongoose = require("mongoose");
const oldGames = require("./data/games.json");
const getNewTeamId = require("./helpers/getNewTeamId");

const createRounds = async () => {
  const games = await mongoose.models.Game.find({});

  const createRoundsForGame = async (game) => {
    const oldGame = oldGames.find(({ _id }) => _id.$oid === game.legacyId);
    await Promise.all(
      oldGame.rounds.map(async (round) => {
        await mongoose.models.Round.create({
          gameId: game._id.toString(),
          team: await getNewTeamId(round.winner),
          points: round.score,
        });
      })
    );
  };

  return Promise.all(games.map((game) => createRoundsForGame(game))).then(
    async () => {
      const count = await mongoose.models.Round.count();
      console.log(`Created ${count} rounds.`);
    }
  );
};

module.exports = createRounds;
