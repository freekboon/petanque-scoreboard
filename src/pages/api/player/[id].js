import Player from "~models/Player";
import connectDB from "~lib/mongoose";

const handler = async (req, res) => {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const players = await Player.find({ id: id });
        res.status(200).json({ succcess: true, body: players });
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
