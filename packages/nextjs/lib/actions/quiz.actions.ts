import { CreateQuiz } from "../../types/quiz";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";

export async function createEvent(body: CreateQuiz) {
  try {
    await connectToDatabase();

    // const organizer = await User.findById(userId);
    // if (!organizer) throw new Error("Organizer not found");

    // const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId });
    // revalidatePath(path);

    return JSON.parse(JSON.stringify(body));
  } catch (error) {
    handleError(error);
  }
}
