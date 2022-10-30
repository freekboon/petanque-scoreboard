import connectDB from "~lib/mongoose";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      res.status(200).json({ success: true, body: "yeay" });
      break;
    default:
      res.status(405).json({ success: false, error: "Method not allowed." });
      break;
  }
};

export default connectDB(handler);
