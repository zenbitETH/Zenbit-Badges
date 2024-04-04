// pages/api/exportQuiz.ts
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

// Define a type for the response data
type ResponseData = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  console.log("req.method", req.method);
  if (req.method === "POST") {
    // Assuming the body of the request contains your quiz data
    const quizData = req.body;
    const filePath = path.resolve("./quiz", "quizzes.json");
    const dataToSave = JSON.stringify(quizData, null, 2);

    fs.writeFile(filePath, dataToSave, err => {
      if (err) {
        console.error("Error writing the file", err);
        res.status(500).json({ message: "Error writing the file" });
        return;
      }
      res.status(200).json({ message: "File written successfully" });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
