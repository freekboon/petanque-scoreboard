import connectDB from "~lib/mongoose";
import Game from "~models/Game";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const game = await Game.findById(req.query.id);
        res.status(200).json({ success: true, body: game });
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
