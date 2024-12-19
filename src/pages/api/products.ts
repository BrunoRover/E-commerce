import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { Product } from "../../models/product.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        if (id) {
          const product = await Product.findById(id).populate("category");

          if (!product) {
            return res.status(404).json({ error: "Product not found" });
          }

          res.status(200).json(product);
        } else {
          const products = await Product.find();
          res.status(200).json(products);
        }
      } catch (error) {
        console.error("Error fetching producties:", error);
        res.status(500).json({ error: "Failed to fetch producties" });
      }
      break;

    case "POST":
      try {
        console.log("Request body:", req.body);

        const product = new Product(req.body);

        await product.save();

        console.log("Product saved:", product);

        res.status(201).json(product);
      } catch (error) {
        console.error("Error saving Product:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(updatedProduct);
      } catch (error) {
        console.error("Error updating Product:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query; //api/category?id=123
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        console.error("Error deleting Product:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
