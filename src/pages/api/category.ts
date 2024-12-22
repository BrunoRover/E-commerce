import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { Category } from "../../models/category.model";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        if (id) {
          const category = await Category.findById(id);

          if (!category) {
            return res.status(404).json({ error: "Category not found" });
          }

          res.status(200).json(category);
        } else {
          const categories = await Category.find();
          res.status(200).json(categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
      }
      break;

    case "POST":
      try {
        console.log("Request body:", req.body);

        const category = new Category(req.body);

        await category.save();

        console.log("Category saved:", category);

        res.status(201).json(category);
      } catch (error) {
        console.error("Error saving category:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const updatedCategory = await Category.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );

        if (!updatedCategory) {
          return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(updatedCategory);
      } catch (error) {
        console.error("Error updating category:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query; //api/category?id=123
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
          return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
      } catch (error) {
        console.error("Error deleting category:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
