// pages/api/exportQuiz.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Define a type for the response data
type ResponseData = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    // Assuming the body of the request contains your quiz data
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
