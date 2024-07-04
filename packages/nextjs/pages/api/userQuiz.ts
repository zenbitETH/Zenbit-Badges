// pages/api/exportQuiz.ts
import authMiddleware from "./middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { getEventByEventID } from "~~/lib/actions/events.actions";
import { checkAnswer, checkLiveEventAnswer, getEventQuestion } from "~~/lib/actions/quiz.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  authMiddleware(req, res, async () => {
    if (req.method === "GET") {
      try {
        const id = req.query.id as string; // Access the eventId query parameter
        const result = await getEventQuestion({ eventId: id });
        res.status(200).json({ data: result, message: "Get all questions successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (req.method === "POST") {
      try {
        console.log(req.body);

        const eventData = await getEventByEventID(req.body.eventId);
        console.log({ eventData });
        if (req.body.eventType !== "4") {
          const result = await checkAnswer(req.body);

          res.status(200).json({ data: result, message: "Quiz answer checked successfully" });
        } else {
          // check correct secret word for event type LIVE EVENT

          const result = await checkLiveEventAnswer(req.body);

          res.status(200).json({ data: result, message: "Quiz answer checked successfully" });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
