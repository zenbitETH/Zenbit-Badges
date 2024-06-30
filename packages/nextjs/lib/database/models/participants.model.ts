import { Schema, model, models } from "mongoose";

export const ParticipantsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  organization: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "events",
      unique: [true, "Event already added"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Participants = models.participants || model("participants", ParticipantsSchema);

export default Participants;
