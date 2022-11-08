import connectDB from "~lib/mongoose";
import Game from "~models/Game";
import Player from "~models/Player";

const handler = async (req, res) => {
  const { year } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const players = await Player.find({}, { __v: 0, legacyId: 0 });

        const getPlayerStats = async (player) => {
          const playerGames = await Game.find({
            start: { $gt: new Date(year).toISOString() },
            end: { $lt: new Date(`${parseInt(year) + 1}`).toISOString() },
            winner: { $exists: true },
            $or: [{ homeTeam: player.id }, { guestTeam: player.id }],
          }).lean();

          const total = playerGames.length;

          const win = await playerGames.filter(({ winner }) =>
            winner.includes(player.id)
          ).length;

          const loss = playerGames.length - win;

          return {
            name: player.name,
            played: total,
            win,
            loss,
            ratio: parseFloat((win / total).toFixed(2)),
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
