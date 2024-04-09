import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  eventId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
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

const Quiz = models.quiz || model("quiz", CategorySchema);

export default Quiz;
