import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import Product from "../../models/Products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar produtos", error });
      }
      break;
    }
    case "POST": {
      try {
        const { name, description, price, starReviews, imageUrl } = req.body;
        const product = await Product.create({
          name,
          description,
          price,
          starReviews,
          imageUrl,
        });
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json({ message: "Erro ao criar produto", error });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Método ${method} não permitido`);
  }
}
