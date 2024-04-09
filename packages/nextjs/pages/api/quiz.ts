// pages/api/exportQuiz.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent, getEventQuestionByAdmin } from "~~/lib/actions/quiz.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    const result = await createEvent(req.body);

    res.status(200).json({ data: result, message: "Question created successfully" });
  } else if (req.method === "GET") {
    try {
      const id = req.query.id as string; // Access the eventId query parameter
      const result = await getEventQuestionByAdmin({ eventId: id });
      res.status(200).json({ data: result, message: "Get all questions successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
