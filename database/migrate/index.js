const mongoose = require("mongoose");
const connectDB = require("../helpers/connectDB");

const teams = async () => {
  const Game = await mongoose.model("Game", {
    teams: {
      type: [[String]],
      required: true,
    },
    homeTeam: {
      type: [String],
      required: true,
    },
    guestTeam: {
      type: [String],
      required: true,
    },
  });

  const games = await Game.find({});

  return Promise.all(
    games.map((game) =>
      Game.findByIdAndUpdate(game._id, {
        homeTeam: game.teams[0],
        guestTeam: game.teams[1],
      })
    )
  ).then(() => Game.updateMany({}, { $unset: { teams: true } }));
};

const migrate = connectDB()
  .then(teams)
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Closing database connection.");
    mongoose.connection.close();
  });

module.exports = migrate;
