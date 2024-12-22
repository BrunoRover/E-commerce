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

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
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

    case "POST":
      try {
        const { login } = req.query;
        if (login) {
          const { email, passwordHash } = req.body;

          if (!email || !passwordHash) {
            return res
              .status(400)
              .json({ error: "Email and password are required." });
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
              },
              "secret"
            );
            return res.status(200).send({ user: user.email, token: token });
          } else {
            return res.status(400).json({ error: "Invalid password." });
          }
        }

        const {
          name,
          email,
          passwordHash,
          phone,
          isAdmin,
          street,
          apartment,
          zip,
          city,
          country,
        } = req.body;

        if (!passwordHash) {
          return res.status(400).json({ error: "Password is required." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordHash, salt);

        const user = new User({
          name,
          email,
          passwordHash: hashedPassword,
          phone,
          isAdmin,
          street,
          apartment,
          zip,
          city,
          country,
        });

        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
