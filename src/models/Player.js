import { Schema, models, model } from "mongoose";

const player = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Player = models.Player || model("Player", player);

export default Player;
