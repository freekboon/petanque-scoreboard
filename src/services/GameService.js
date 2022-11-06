import Game from "~models/Game";
import Round from "~models/Round";
import Player from "~models/Player";

const mapGameData = async (game, rounds) => ({
  id: game._id,
  teams: await Promise.all(
    game.teams.map(async (team) => ({
      id: team,
      players: await Promise.all(
        team.map((playerId) => Player.findById(playerId))
      ),
    }))
  ),
  maxPoints: game.maxPoints,
  start: game.start,
  end: game.end,
  winner: game.winner,
  rounds: rounds,
});

const getById = async (gameId) => {
  const game = await Game.findById(gameId);
  const rounds = await Round.find({ gameId });

  return await mapGameData(game, rounds);
};

const getCurrent = async () => {
  const game = await Game.findOne({ end: { $exists: false } });
  const rounds = await Round.find({ gameId: game.id });

  return await mapGameData(game, rounds);
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
