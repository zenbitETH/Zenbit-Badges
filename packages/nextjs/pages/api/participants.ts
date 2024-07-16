import type { NextApiRequest, NextApiResponse } from "next";
import { getParticipantsByEventID } from "~~/lib/actions/participants.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string;
      const result = await getParticipantsByEventID(id);
      res.status(200).json({ data: result, message: "Get event data successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
