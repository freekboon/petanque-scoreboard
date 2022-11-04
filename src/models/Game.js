import { Schema, models, model } from "mongoose";

const gameSchema = new Schema(
  {
    teams: {
      type: [[String]],
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
    },
    winner: {
      rtpe: [String],
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

const Game = models.Game || model("Game", gameSchema);

export default Game;
