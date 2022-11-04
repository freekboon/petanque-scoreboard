const mongoose = require("mongoose");

const createCollections = async () => {
  const Player = await mongoose.model("Player", {
    name: "",
    legacyId: "",
  });

  const Game = await mongoose.model("Game", {
    teams: {
      type: [[String]],
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
    },
    legacyId: {
      type: String,
    },
    winner: {
      type: [String],
    },
  });

  const Round = await mongoose.model("Round", {
    gameId: {
      type: String,
      required: true,
    },
    team: {
      type: [String],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  });

  await Player.deleteMany({});
  await Game.deleteMany({});
  await Round.deleteMany({});
};

module.exports = createCollections;
