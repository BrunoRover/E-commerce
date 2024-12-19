import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";

await dbConnect();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "GET") {
    try {
      const data = { message: "Hello, world!" };
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const middleware =
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await dbConnect();
    cors()(req, res, () => handler(req, res));
  };

export default middleware(handler);
