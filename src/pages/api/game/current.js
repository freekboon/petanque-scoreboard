import connectDB from "~lib/mongoose";
import GameService from "~services/GameService";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const data = await GameService.getCurrent();

        res.status(200).json({ success: true, body: data });
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
