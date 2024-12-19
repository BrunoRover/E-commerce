import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb"; // Função de conexão com o MongoDB
import { Product } from "../../models/product.model";

// Função de tratamento da API
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Garantir conexão com o banco

  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
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
