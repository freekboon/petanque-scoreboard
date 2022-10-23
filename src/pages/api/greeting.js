const greeting = (req, res) => {
  res.status(200).json({ body: "Hellow World!" });
};

export default greeting;
