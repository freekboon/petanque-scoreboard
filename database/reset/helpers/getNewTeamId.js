const oldTeams = require("../data/teams.json");
const mongoose = require("mongoose");

const getNewTeamId = async (oldTeamId) => {
  const oldPlayerIds = oldTeams.find(
    ({ _id }) => _id.$oid === oldTeamId
  ).playerIds;

  return Promise.all(
    oldPlayerIds.map(async (id) => {
      const newPlayer = await mongoose.models.Player.findOne({
        legacyId: id,
      }).lean();

      return newPlayer._id.toString();
    })
  );
};

module.exports = getNewTeamId;
