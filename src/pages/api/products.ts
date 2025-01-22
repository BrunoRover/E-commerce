import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { Product } from "../../models/product.model";
import { authOptions } from "./auth/[...nextauth]";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  switch (req.method) {
    case "GET":
      try {
        const { id, count, featured, category } = req.query;

        if (id) {
          const product = await Product.findById(id).populate("category");
          if (!product) {
            return res.status(404).json({ error: "Product not found" });
          }
          return res.status(200).json(product);
        }

        if (count === "true") {
          try {
            const productCount = await Product.countDocuments();
            return res.status(200).json({ count: productCount });
          } catch (error) {
            console.error("Error counting products:", error);
            return res.status(500).json({ error: "Failed to count products" });
          }
        }

        if (featured === "true") {
          try {
            const limit = req.query.limit ? Number(req.query.limit) : 0;

            if (isNaN(limit) || limit < 0) {
              return res.status(400).json({ error: "Invalid limit parameter" });
            }

            const featuredProducts = await Product.find({
              isFeatured: true,
            }).limit(limit);

            if (!featuredProducts || featuredProducts.length === 0) {
              return res
                .status(404)
                .json({ error: "No featured products found" });
            }

            return res.status(200).json({
              products: featuredProducts,
              count: featuredProducts.length,
            });
          } catch (error) {
            console.error("Error fetching featured products:", error);
            return res
              .status(500)
              .json({ error: "Failed to fetch featured products" });
          }
        }
        let filter = {};
        if (category) {
          try {
            let categoriesArray: string[] = [];

            if (typeof category === "string") {
              // Divide a string em um array de IDs
              categoriesArray = category.split(",");
            } else if (Array.isArray(category)) {
              // Caso venha como um array diretamente
              categoriesArray = category;
            }

            // Converte cada item do array para um ObjectId válido
            const objectIdArray = categoriesArray.map((id) => {
              if (mongoose.Types.ObjectId.isValid(id)) {
                return new mongoose.Types.ObjectId(id);
              } else {
                throw new Error(`Invalid ObjectId: ${id}`);
              }
            });

            // Configura o filtro para usar o operador $in
            filter = { category: { $in: objectIdArray } };
            console.log("Filter applied:", filter);
          } catch (error) {
            console.error("Error processing categories:", error.message);
            return res.status(400).json({ error: "Invalid category format" });
          }
        }

        const products = await Product.find();
        return res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Failed to fetch products" });
      }

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
