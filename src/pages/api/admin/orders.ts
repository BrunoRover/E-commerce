import { NextApiRequest, NextApiResponse } from "next";
import { isAdminMiddleware } from "../../../lib/auth";
import dbConnect from "../../../lib/mongodb";
import { Order } from "../../../models/order.model";

const ordersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await isAdminMiddleware(req, res, ordersHandler);
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const orders = await Order.find().populate("orderItems");
        res.status(200).json(orders); // Resposta enviada diretamente
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

export default ordersHandler;
