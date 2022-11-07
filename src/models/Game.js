import { Schema, models, model } from "mongoose";

const gameSchema = new Schema(
  {
    homeTeam: {
      type: [String],
      required: true,
    },
    guestTeam: {
      type: [String],
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
      type: [String],
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
