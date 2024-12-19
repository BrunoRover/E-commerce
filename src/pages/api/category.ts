import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb"; // Função de conexão com o MongoDB
import { Category } from "../../models/category.model";

// Função de tratamento da API
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Garantir conexão com o banco

  switch (req.method) {
    case "GET":
      try {
        const category = await Category.find();
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
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
