import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "../../lib/mongodb";
import { User } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwk from "jsonwebtoken";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  // Rota de login (não exige permissão de administrador)
  if (req.method === "POST" && req.query.login) {
    try {
      const { email, passwordHash } = req.body;

      if (!email || !passwordHash) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }

      const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
      if (isMatch) {
        const token = jwk.sign(
          {
            userID: user.id,
            name: user.name,
          },
          "secret"
        );
        return res.status(200).send({ user: user.email, token: token });
      } else {
        return res.status(400).json({ error: "Invalid password." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // O acesso à lista de usuários exige permissão de administrador
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    if (!session.user || !session.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    switch (req.method) {
      case "GET":
        try {
          const { id } = req.query;
          if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(400).json({ error: "Invalid user ID" });
            }

            const user = await User.findById(id).select("-passwordHash");
            if (!user) {
              return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json(user);
          }

          const users = await User.find().select("-passwordHash");
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch users" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default handler;
