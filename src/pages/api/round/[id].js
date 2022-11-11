import connectDB from "~lib/mongoose";
import Round from "~models/Round";
import Game from "~models/Game";

const handler = async (req, res) => {
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      try {
        const { oldPoints } = JSON.parse(req.body);

        const rounds = await Round.find({
          gameId: JSON.parse(req.body).gameId,
        });
        const game = await Game.findById(JSON.parse(req.body).gameId);

        const correctedTeamScore = await rounds
          .filter((round) =>
            JSON.parse(req.body).team.every((playerId) =>
              round.team.includes(playerId)
            )
          )
          .reduce((acc, round) => acc + round.points, -oldPoints);

        const gameIsFinished =
          correctedTeamScore + JSON.parse(req.body).newPoints >= game.maxPoints;

        if (gameIsFinished) {
          await Game.findByIdAndUpdate(game.id, {
            end: new Date().toISOString(),
            winner: JSON.parse(req.body).team,
          });
        }
        const round = await Round.updateOne(
          {
            _id: id,
          },
          {
            team: JSON.parse(req.body).team,
            points: gameIsFinished
              ? game.maxPoints - correctedTeamScore
              : JSON.parse(req.body).newPoints,
          }
        );

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
