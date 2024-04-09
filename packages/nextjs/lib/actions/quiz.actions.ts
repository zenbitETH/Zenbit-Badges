import { CreateQuiz, EventId } from "../../types/quiz";
import { connectToDatabase } from "../database";
import Quiz from "../database/models/quiz.model";
import { handleError } from "../utils";

export async function createEvent(body: CreateQuiz[]) {
  try {
    await connectToDatabase();

    // const result = await Quiz.create(body);

    const result = await Quiz.insertMany(body);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventQuestionByAdmin(body: EventId) {
  try {
    await connectToDatabase();

    const result = await Quiz.find({ eventId: body.eventId }, {}, { sort: { createdAt: -1 } });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventQuestion(body: EventId) {
  try {
    await connectToDatabase();

    const result = await Quiz.find({ eventId: body.eventId }, { answer: 0 }, { sort: { createdAt: -1 } });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function updateQuestion(body: EventId, id: string) {
  try {
    await connectToDatabase();

    const result = await Quiz.findOneAndUpdate({ _id: id, eventId: body.eventId }, body, { new: true });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}
