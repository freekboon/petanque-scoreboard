import Game from "~models/Game";
import Round from "~models/Round";

const mapGameData = (game, rounds) => ({
  id: game._id,
  teams: game.teams,
  maxPoints: game.maxPoints,
  start: game.start,
  end: game.end,
  winner: game.winner,
  rounds: rounds,
});

const getById = async (gameId) => {
  const game = await Game.findById(gameId);
  const rounds = await Round.find({ gameId });

  return mapGameData(game, rounds);
};

const getCurrent = async () => {
  const game = await Game.findOne({ end: { $exists: false } });
  const rounds = await Round.find({ gameId: game.id });

  return mapGameData(game, rounds);
};

const getFinished = async (skip, limit) => {
  const games = await Game.find({ end: { $exists: true } })
    .sort({ start: -1 })
    .limit(limit || 20)
    .skip(skip || 0);

  return games;
};

const GameService = {
  getById,
  getCurrent,
  getFinished,
};

export default GameService;
