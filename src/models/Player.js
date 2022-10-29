import { Schema, models, model } from "mongoose";

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Player = models.Player || model("Player", playerSchema);

export default Player;
