import { Schema, model, models } from "mongoose";

export const EventsSchema = new Schema({
  eventId: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Number,
    required: false, // TODO: DEV_NOTE: This should be a required field for the register-participant-to-event feature
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "participants",
      // unique: [true, "Participant already added"],
    },
  ],
  eventType: {
    type: String,
    required: false,
  },
  eventURL: {
    type: String,
    required: false,
  },
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
