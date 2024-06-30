import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkIfParticipantExistsByEmail,
  checkIfParticipantIsAlreadyRegisteredInEvent,
  registerNewParticipant,
  registerParticipantToEvent,
} from "~~/lib/actions/participants.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    // if participant is not already registered in the event, then register new participant, if not send error msg

    const participantExists = await checkIfParticipantExistsByEmail(req.body.email);
    if (participantExists) {
      // check if participant is not registered in event

      const isRegisteredInEvent = await checkIfParticipantIsAlreadyRegisteredInEvent(
        participantExists,
        req.body.eventDBId,
      );
      if (!isRegisteredInEvent) {
        const existingParticipantRegisteredToEvent = await registerParticipantToEvent(
          participantExists,
          req.body.eventDBId,
        );
        res.status(200).json({
          data: existingParticipantRegisteredToEvent,
          message: "Participant registered to event successfully",
        });
      } else {
        res.status(202).json({
          data: participantExists,
          message: "Participant already registered in event",
        });
      }
    } else {
      const result = await registerNewParticipant(req.body);
      res.status(200).json({ data: result, message: "Participant registered to event successfully" });
    }

    // }
    // else if (req.method === "GET") {
    //   try {
    //     const id = req.query.id as string; // Access the eventId query parameter
    //     const result = await getEventQuestionByAdmin({ eventId: id });
    //     res.status(200).json({ data: result, message: "Get all questions successfully" });
    //   } catch (error) {
    //     console.error("Error:", error);
    //     res.status(500).json({ message: "Internal Server Error" });
    //   }
    // } else if (req.method === "PUT") {
    //   try {
    //     const id = req.query.id as string; // Access the eventId query parameter

    //     const result = await updateQuestion(req.body, id);

    //     res.status(200).json({ data: result, message: "Get all questions successfully" });
    //   } catch (error) {
    //     console.error("Error:", error);
    //     res.status(500).json({ message: "Internal Server Error" });
    //   }
    // } else if (req.method === "DELETE") {
    //   try {
    //     const id = req.query.id as string; // Access the eventId query parameter

    //     const result = await deletedQuestion(id);

    //     res.status(200).json({ data: result, message: "Delete question successfully" });
    //   } catch (error) {
    //     console.error("Error:", error);
    //     res.status(500).json({ message: "Internal Server Error" });
    //   }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
