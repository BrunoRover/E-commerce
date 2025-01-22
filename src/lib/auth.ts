import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export const isAdminMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  try {
    const secret = process.env.NEXTAUTH_SECRET!;
    const token = await getToken({ req, secret });

    if (!token || !token.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    await handler(req, res);
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
