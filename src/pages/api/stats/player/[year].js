import connectDB from "~lib/mongoose";
import Game from "~models/Game";
import Player from "~models/Player";

const handler = async (req, res) => {
  const { year } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const games = await Game.find({
          start: { $gt: new Date(year).toISOString() },
          end: { $lt: new Date(`${parseInt(year) + 1}`).toISOString() },
        }).lean();

        const players = await Player.find({}, { __v: 0, legacyId: 0 });

        const getPlayerStats = async (player) => {
          const playerGames = await games.filter(({ teams }) =>
            teams.some((team) => team.includes(player.id))
          );

          const win = await playerGames.filter(({ winner }) =>
            winner.includes(player.id)
          ).length;

          const loss = playerGames.length - win;

          return {
            name: player.name,
            played: playerGames.length,
            win,
            loss,
            ratio: parseFloat((win / loss).toFixed(1)),
          };
        };

        res.status(200).json({
          success: true,
          body: await Promise.all(
            players.map((player) => getPlayerStats(player))
          ),
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(405).json({ success: false, error: "Method not allowed." });
      break;
  }
};
export default connectDB(handler);
