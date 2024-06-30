import { RegisterParticipantBody } from "../../types/participants";
import { connectToDatabase } from "../database";
import Events from "../database/models/events.model";
import Participants from "../database/models/participants.model";
import { handleError } from "../utils";

export async function registerNewParticipant(body: RegisterParticipantBody) {
  try {
    await connectToDatabase();

    const { eventDBId, ...restBody } = body;

    // register new participant
    const newParticipant = await Participants.create(restBody);
    // add event to the participant document
    newParticipant.events.push(eventDBId);
    // save document
    await newParticipant.save();

    // find event by id (id from database)
    const event = await Events.findById({ _id: eventDBId });
    // add participant to the event document
    event.participants.push(newParticipant);
    // save document
    await event.save();

    return JSON.parse(JSON.stringify(newParticipant));
  } catch (error) {
    handleError(error);
  }
}

export async function registerParticipantToEvent(participant: any, eventId: string) {
  try {
    await connectToDatabase();

    // find event by id (id from database)
    const event = await Events.findById({ _id: eventId });
    // add participant to the event document
    event.participants.push(participant);
    // save document
    await event.save();

    const participantDocument = await Participants.findById({ _id: participant._id });

    // add event to the participant document
    participantDocument.events.push(event);
    // save document
    await participantDocument.save();

    return JSON.parse(JSON.stringify(participantDocument));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventByEventID(id: string) {
  try {
    await connectToDatabase();

    const result = await Participants.findOne({ eventId: id });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function checkIfParticipantExistsByEmail(email: string) {
  try {
    await connectToDatabase();

    const result = await Participants.findOne({ email });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function checkIfParticipantIsAlreadyRegisteredInEvent(participant: any, eventId: string) {
  console.log("events model : ", Events);
  console.log("participant prop : ", participant);
  try {
    await connectToDatabase();

    const event = await Events.findOne({
      _id: eventId,
    })
      .populate("participants")
      .exec();

    console.log({ event });

    let exists = false;
    event.participants.forEach((entry: any) => {
      console.log({ entry });
      if (entry._id == participant._id) {
        exists = true;
        return;
      }
    });

    return JSON.parse(JSON.stringify(exists));
  } catch (error) {
    handleError(error);
  }
}
