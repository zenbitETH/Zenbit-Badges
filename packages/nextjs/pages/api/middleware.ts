import { NextApiRequest, NextApiResponse } from "next";

const authMiddleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  // Get the referring website URL from the request headers
  const referringWebsite = req.headers.referer;
  console.log(referringWebsite);
  // Define the allowed website URL
  const allowedWebsite = process.env.ALLOWED_WEBSITE || `https://${process.env.VERCEL_URL}`;
  const apiKey = req.headers["x-api-key"];

  // Check if the referring website matches the allowed website
  if (!referringWebsite?.includes(allowedWebsite || "")) {
    // If not, return a 403 Forbidden response
    return res.status(403).json({ message: "Access Forbidden" });
  }
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export default authMiddleware;
