import connectDB from "~lib/mongoose";
import Round from "~models/Round";
import Game from "~models/Game";

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
        const rounds = await Round.find({
          gameId: JSON.parse(req.body).gameId,
        });
        const game = await Game.findById(JSON.parse(req.body).gameId);

        const currentTeamScore = await rounds
          .filter((round) =>
            JSON.parse(req.body).team.every((playerId) =>
              round.team.includes(playerId)
            )
          )
          .reduce((acc, round) => acc + round.points, 0);

        const gameIsFinished =
          currentTeamScore + JSON.parse(req.body).points >= game.maxPoints;

        if (gameIsFinished) {
          await Game.findByIdAndUpdate(game.id, {
            end: new Date().toISOString(),
            winner: JSON.parse(req.body).team,
          });
        }

        const round = await Round.create({
          gameId: JSON.parse(req.body).gameId,
          team: JSON.parse(req.body).team,
          points: gameIsFinished
            ? game.maxPoints - currentTeamScore
            : JSON.parse(req.body).points,
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
