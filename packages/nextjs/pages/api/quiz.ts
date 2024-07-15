// pages/api/exportQuiz.ts
import authMiddleware from "./middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { getEventByEventID } from "~~/lib/actions/events.actions";
import { createEventQuiz, deletedQuestion, getEventQuestionByAdmin, updateQuestion } from "~~/lib/actions/quiz.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  authMiddleware(req, res, async () => {
    if (req.method === "POST") {
      const result = await createEventQuiz(req.body);

      res.status(200).json({ data: result, message: "Event quiz created successfully" });
    } else if (req.method === "GET") {
      try {
        const id = req.query.id as string; // Access the eventId query parameter
        const quizData = await getEventQuestionByAdmin({ eventId: id });
        const eventData = await getEventByEventID(id);

        res.status(200).json({
          data: {
            quizData,
            eventData,
          },
          message: "Get all questions successfully",
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (req.method === "PUT") {
      try {
        const id = req.query.id as string; // Access the eventId query parameter

        const result = await updateQuestion(req.body, id);

        res.status(200).json({ data: result, message: "Event quiz updated successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else if (req.method === "DELETE") {
      try {
        const id = req.query.id as string; // Access the eventId query parameter

        const result = await deletedQuestion(id);

        res.status(200).json({ data: result, message: "Delete question successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
