import { CreateQuiz, EventId, MyObject } from "../../types/quiz";
import { connectToDatabase } from "../database";
import Quiz from "../database/models/quiz.model";
import { handleError } from "../utils";

export async function createEvent(body: CreateQuiz) {
  try {
    await connectToDatabase();

    const result = await Quiz.create(body);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventQuestionByAdmin(body: EventId) {
  try {
    await connectToDatabase();

    const result = await Quiz.find({ eventId: body.eventId, isActive: true }, {}, { sort: { createdAt: -1 } });

    return result;
  } catch (error) {
    handleError(error);
  }
}

export async function getEventQuestion(body: EventId) {
  try {
    await connectToDatabase();

    const result = await Quiz.find(
      { eventId: body.eventId, isActive: true },
      { answer: 0 },
      { sort: { createdAt: -1 } },
    );

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function updateQuestion(body: CreateQuiz, id: string) {
  try {
    await connectToDatabase();

    const result = await Quiz.findOneAndUpdate({ _id: id, eventId: body.eventId, isActive: true }, body, { new: true });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function deletedQuestion(id: string) {
  try {
    await connectToDatabase();

    await Quiz.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true });

    return true;
  } catch (error) {
    handleError(error);
  }
}

export async function checkAnswer(body: MyObject) {
  try {
    await connectToDatabase();

    const getAllQuestions = await Quiz.find({
      eventId: body.eventId,
      isActive: true,
    }).lean();

    const values: Record<string, string> = body.value;
    let count = 0;
    getAllQuestions.map(q => {
      if (q.answer == values[q._id as string]) {
        count++;
      }
    });

    if (count > 0 && count == getAllQuestions.length) {
      return JSON.parse(JSON.stringify(true));
    }
    return JSON.parse(JSON.stringify(false));
  } catch (error) {
    handleError(error);
  }
}

export async function checkLiveEventAnswer(body: MyObject) {
  try {
    await connectToDatabase();

    const quizData = await Quiz.findOne({
      eventId: body.eventId,
      isActive: true,
    });

    if (quizData.answer === body.value) {
      return JSON.parse(JSON.stringify(true));
    }
    return JSON.parse(JSON.stringify(false));
  } catch (error) {
    handleError(error);
  }
}
