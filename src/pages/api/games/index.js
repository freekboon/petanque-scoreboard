const games = async (req, res) => {
  switch (req.method) {
    case "POST":
      res.status(200).json({ body: "yeay" });
      break;
    default:
      res.status(405).json({ error: `Method ${req.method} is not allowed.` });
  }
};

export default games;
