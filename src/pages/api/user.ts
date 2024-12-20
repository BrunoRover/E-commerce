import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { User } from "../../models/user.model";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const user = await User.find();
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
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
