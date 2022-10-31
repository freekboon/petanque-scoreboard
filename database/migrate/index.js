const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const createPlayers = require("./createPlayers");
const createGames = require("./createGames");
const createCollections = require("./createCollections");
const createRounds = require("./createRounds");

const connectDB = async () => {
  console.log("Connecting database.");

  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

const run = connectDB()
  .then(createCollections)
  .then(createPlayers)
  .then(createGames)
  .then(createRounds)
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Closing database connection.");
    mongoose.connection.close();
  });

module.exports = run;
