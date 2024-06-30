import { Schema, model, models } from "mongoose";

export const EventsSchema = new Schema({
  eventId: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Number,
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "participants",
      unique: [true, "Participant already added"],
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

const Events = models.events || model("events", EventsSchema);

export default Events;
