import connectDB from "~lib/mongoose";
import Game from "~models/Game";
import Round from "~models/Round";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const current = await Game.findOne({ end: { $exists: false } });
        const rounds = await Round.find({ gameId: current.id });

        res.status(200).json({ success: true, body: { current, rounds } });
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
