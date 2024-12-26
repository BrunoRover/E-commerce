import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { Order } from "../../models/order.model";
import { OrderItem } from "@/models/order-item.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const odersList = await Order.find();
        res.status(200).json(odersList);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const {
          orderItems,
          shippingAddress1,
          city,
          zip,
          country,
          phone,
          user,
        } = req.body;

        if (!shippingAddress1 || !city || !zip || !country || !phone) {
          return res
            .status(400)
            .json({ error: "All address fields and phone are required." });
        }

        const orderItemsId = await Promise.all(
          orderItems.map(async (orderItem) => {
            const newOrderItem = new OrderItem({
              quantity: orderItem.quantity,
              product: orderItem.product,
            });
            const savedOrderItem = await newOrderItem.save();
            return savedOrderItem._id;
          })
        );

        const populatedOrderItems = await OrderItem.find({
          _id: { $in: orderItemsId },
        }).populate("product");
        const totalPrice = populatedOrderItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );

        const order = new Order({
          orderItems: orderItemsId,
          shippingAddress1,
          shippingAddress2: req.body.shippingAddress2 || "",
          city,
          zip,
          country,
          phone,
          status: req.body.status || "Pending",
          totalPrice,
          user,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
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
