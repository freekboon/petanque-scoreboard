import Player from "~models/Player";
import connectDB from "~lib/mongoose";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const players = await Player.find({}, { __v: 0 });
        res.status(200).json({ success: true, body: players });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const { name } = req.body;
        const player = await Player.create({ name });
        res.status(200).json({ success: true, body: player });
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
