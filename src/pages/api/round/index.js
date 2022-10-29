import connectDB from "~lib/mongoose";
import Round from "~models/Round";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const rounds = await Round.find({ gameId: req.query.gameId });
        res.status(200).json({ success: true, body: rounds });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const round = await Round.create({
          gameId: JSON.parse(req.body).gameId,
          team: JSON.parse(req.body).team,
          points: JSON.parse(req.body).points,
        });
        res.status(200).json({ success: true, body: round });
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
