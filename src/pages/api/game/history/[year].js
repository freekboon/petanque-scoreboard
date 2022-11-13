import connectDB from "~lib/mongoose";
import Game from "~models/Game";
import GameService from "~services/GameService";

const handler = async (req, res) => {
  const { year } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const gameIds = await Game.find(
          {
            start: { $gt: new Date(year).toISOString() },
            end: { $lt: new Date(`${parseInt(year) + 1}`).toISOString() },
          },
          { id: 1 }
        );

        const games = await Promise.all(
          gameIds.map(async ({ _id }) => await GameService.getById(_id))
        );

        res.status(200).json({ body: games });
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
