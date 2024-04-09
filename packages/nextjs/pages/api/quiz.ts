// pages/api/exportQuiz.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent } from "~~/lib/actions/quiz.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    console.log(req.body);
    const result = await createEvent(req.body);
    console.log(result);
    res.status(200).json({ data: result, message: "Question created successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
