import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "../../lib/mongodb";
import { User } from "../../models/user.model";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { name, email, passwordHash, phone, isAdmin, street, apartment, zip, city, country } = req.body;

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
        isAdmin: isAdmin || false,
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
  } else {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    switch (req.method) {
      case "GET":
        try {
          const user = await User.findOne({ email: session.user.email }).select("-passwordHash");
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch user" });
        }
        break;

      case "PUT":
        try {
          const { id } = req.query;
          if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
          }

          const { name, email, passwordHash, phone, isAdmin, street, apartment, zip, city, country } = req.body;

          const updateData: any = {
            name,
            email,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country,
          };

          if (passwordHash) {
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(passwordHash, salt);
          }

          const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-passwordHash");

          if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
          }

          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
};

export default handler;