import connectDB from "~lib/mongoose";
import Game from "~models/Game";
import { differenceInMinutes } from "date-fns";

const gameDuration = (start, end) =>
  differenceInMinutes(new Date(end), new Date(start));

const handler = async (req, res) => {
  const { year } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const games = await Game.find({
          start: { $gt: new Date(year).toISOString() },
          end: { $lt: new Date(`${parseInt(year) + 1}`).toISOString() },
        });

        const totalDuration = games.reduce(
          (acc, game) => acc + gameDuration(game.start, game.end),
          0
        );

        res.status(200).json({
          success: true,
          body: { numberOfGamesPlayed: games.length, totalDuration },
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
