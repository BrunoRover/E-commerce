import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb"; // Função de conexão com o MongoDB
import { User } from "../../models/user.model";

// Função de tratamento da API
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Garantir conexão com o banco

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
        const user = new User(req.body);
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
