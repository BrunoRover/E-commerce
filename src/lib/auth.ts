import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export const isAdminMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const secret = process.env.JWT_SECRET!;
    const token = await getToken({ req, secret });

    if (!token || !token.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
