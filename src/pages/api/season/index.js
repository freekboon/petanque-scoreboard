import connectDB from "~lib/mongoose";
import Game from "~models/Game";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const games = await Game.find(
          { end: { $exists: true } },
          { start: 1 }
        ).lean();

        const seasons = [
          ...new Set(
            games.map((season) => new Date(season.start).getFullYear())
          ),
        ];

        res.status(200).json({ success: true, body: seasons });
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
