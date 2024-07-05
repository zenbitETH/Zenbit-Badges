import authMiddleware from "./middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent, getEventByEventID } from "~~/lib/actions/events.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string;
      const result = await getEventByEventID(id);
      res.status(200).json({ data: result, message: "Get event data successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    authMiddleware(req, res, async () => {
      if (req.method === "POST") {
        const result = await createEvent(req.body);

        res.status(200).json({ data: result, message: "Event created successfully" });
      } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    });
  }
}
