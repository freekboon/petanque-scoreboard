import connectDB from "~lib/mongoose";
import Game from "~models/Game";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const games = await Game.find({ end: { $exists: true } })
          .sort({ start: -1 })
          .limit(req.query.limit || 20)
          .skip(req.query.skip || 0);
        res.status(200).json({ success: true, body: games });
      } catch (error) {
        res.status(400).json({ success: false, body: error });
      }
      break;
    case "POST":
      try {
        const game = await Game.create({
          teams: JSON.parse(req.body).teams,
          maxPoints: JSON.parse(req.body).maxPoints,
          start: new Date().toISOString(),
        });

        res.status(200).json({ success: true, body: game.id });
      } catch (error) {
        res.status(400).json({ success: false, body: error });
      }
      break;
    default:
      res.status(405).json({ success: false, error: "Method not allowed." });
      break;
  }
};

export default connectDB(handler);
