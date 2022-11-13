import Game from "~models/Game";
import Round from "~models/Round";
import Player from "~models/Player";

const setTeam = async (team, game, rounds) => ({
  id: game[team],
  players: await Promise.all(
    game[team].map((playerId) => Player.findById(playerId))
  ),
  score: rounds
    .filter((round) =>
      round.team.every((playerId) => game[team].includes(playerId))
    )
    .reduce((acc, round) => acc + round.points, 0),
});

const mapGameData = async (game, rounds) => ({
  id: game._id,
  homeTeam: await setTeam("homeTeam", game, rounds),
  guestTeam: await setTeam("guestTeam", game, rounds),
  maxPoints: game.maxPoints,
  start: game.start,
  end: game.end,
  winner: game.winner,
  rounds: rounds,
  score: {
    homeTeam:
      rounds
        .filter(({ team }) =>
          team.every((playerId) => game.homeTeam.includes(playerId))
        )
        .reduce((acc, round) => acc + round.points, 0) || 0,
    guestTeam:
      rounds
        .filter(({ team }) =>
          team.every((playerId) => game.guestTeam.includes(playerId))
        )
        .reduce((acc, round) => acc + round.points, 0) || 0,
  },
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
