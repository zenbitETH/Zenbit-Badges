import { CreateEvent } from "../../types/events";
import { connectToDatabase } from "../database";
import Events from "../database/models/events.model";
import { handleError } from "../utils";

export async function createEvent(body: CreateEvent) {
  try {
    await connectToDatabase();

    const result = await Events.create(body);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventByEventID(id: string) {
  try {
    await connectToDatabase();

    const result = await Events.findOne({ eventId: id });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function updateEVent(body: CreateEvent, id: string) {
  try {
    await connectToDatabase();

    const result = await Events.findOneAndUpdate({ _id: id, eventId: body.eventId, isActive: true }, body, {
      new: true,
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function deletedQuestion(id: string) {
  try {
    await connectToDatabase();

    await Events.findOneAndUpdate({ _id: id }, { isActive: false }, { new: true });

    return true;
  } catch (error) {
    handleError(error);
  }
}

export async function getAllEvents() {
  try {
    await connectToDatabase();

    const result = await Events.find();

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}
