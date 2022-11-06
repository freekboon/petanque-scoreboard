const mongoose = require("mongoose");
const oldUsers = require("./data/users.json");

const getPlayerId = async (legacyId) => {
  const player = await mongoose.models.Player.findOne({
    legacyId: legacyId,
  });
  return player._id;
};

const createUsers = async () => {
  return Promise.all(
    oldUsers.map(async (oldUser) => {
      const playerId = await getPlayerId(oldUser.playerId);
      return mongoose.models.User.create({
        email: oldUser.email,
        playerId,
      });
    })
  ).then(async () => {
    const count = await mongoose.models.User.count();
    console.log(`Created ${count} new users.`);
  });
};

module.exports = createUsers;
