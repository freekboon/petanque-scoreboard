const mongoose = require("mongoose");
const oldPlayers = require("./data/players.json");

const createPlayers = async () => {
  return Promise.all(
    oldPlayers.map((oldPlayer) =>
      mongoose.models.Player.create({
        name: oldPlayer.name,
        legacyId: oldPlayer._id.$oid,
      })
    )
  ).then(async () => {
    const count = await mongoose.models.Player.count();
    console.log(`Created ${count} new players.`);
  });
};

module.exports = createPlayers;
