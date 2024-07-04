import type { NextApiRequest, NextApiResponse } from "next";
import { getAllEvents } from "~~/lib/actions/events.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    try {
      const result = await getAllEvents();
      res.status(200).json({ data: result, message: "Get events data successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
