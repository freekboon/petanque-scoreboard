import { Schema, models, model } from "mongoose";

const roundSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    team: {
      type: [String],
      required: true,
    },
    points: {
      type: Number,
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

const Round = models.Round || model("Round", roundSchema);

export default Round;
