import connectDB from "~lib/mongoose";
import Game from "~models/Game";
import Player from "~models/Player";

const handler = async (req, res) => {
  const { year } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const games = await Game.find({
          start: { $gte: new Date(year).toISOString() },
          end: { $exists: true },
        });
        const allTeams = games.reduce(
          (acc, game) => acc.concat([game.homeTeam, game.guestTeam]),
          []
        );
        const teams = allTeams.reduce((acc, team) => {
          const existingTeam = acc.find((teamId) =>
            teamId.every((playerId) => team.includes(playerId))
          );

          return existingTeam ? acc : acc.concat([team]);
        }, []);

        const getTeamStats = async (teamId) => {
          const teamGames = await Game.find({
            start: { $gt: new Date(year).toISOString() },
            end: { $lt: new Date(`${parseInt(year) + 1}`).toISOString() },
            winner: { $exists: true },
            $or: [{ homeTeam: teamId }, { guestTeam: teamId }],
          }).lean();

          const total = teamGames.length;

          const win = await teamGames.filter(({ winner }) =>
            winner.every((playerId) => teamId.includes(playerId))
          ).length;

          const loss = teamGames.length - win;

          const teamName = (
            await Promise.all(
              teamId.map(async (playerId) => {
                const player = await Player.findById(playerId);
                return player.name;
              })
            )
          ).join(" & ");

          return {
            name: teamName,
            played: total,
            win,
            loss,
            ratio: parseFloat((win / total).toFixed(2)),
          };
        };

        res.status(200).json({
          success: true,
          body: await Promise.all(teams.map((teamId) => getTeamStats(teamId))),
        });
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
