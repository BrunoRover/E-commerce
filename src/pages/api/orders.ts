import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import { Order } from "../../models/order.model";
import { OrderItem } from "@/models/order-item.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { id, totalSale, count, userOrder } = req.query;

        if (id) {
          const order = await Order.findById(id)
            .populate("user", "name")
            .populate({
              path: "orderItems",
              populate: { path: "product", populate: "category" },
            });
          if (!order) {
            return res.status(404).json({ error: "Order not found" });
          }
          return res.status(200).json(order);
        }

        if (totalSale) {
          const totalSales = await Order.aggregate([
            { $group: { _id: null, totalSale: { $sum: "$totalPrice" } } },
          ]);

          if (!totalSales.length) {
            return res
              .status(400)
              .json({ error: "The order sales cannot be generated." });
          }

          return res.status(200).json({ totalSale: totalSales[0].totalSale });
        }
        if (count) {
          try {
            const orderCount = await Order.countDocuments();
            return res.status(200).json({ count: orderCount });
          } catch (error) {
            console.error("Error counting Orders:", error);
            return res.status(500).json({ error: "Failed to count Orders" });
          }
        }
        if (userOrder) {
          const { userId } = req.query;

          if (!userId) {
            return res
              .status(400)
              .json({ error: "Missing userId in query parameters." });
          }

          try {
            const userOrderList = await Order.find({ user: userId })
              .populate({
                path: "orderItems",
                populate: { path: "product", populate: "category" },
              })
              .sort({ dateOrdered: -1 });

            return res.status(200).json(userOrderList);
          } catch (error) {
            console.error("Error fetching user orders:", error);
            return res
              .status(500)
              .json({ error: "Failed to fetch user orders." });
          }
        }

        const odersList = await Order.find()
          .populate("user", "name")
          .sort({ dateOrdered: -1 });
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

    case "PUT":
      try {
        const { id } = req.query;

        const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { status: req.body.status },
          { new: true }
        );

        if (!updatedOrder) {
          return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(updatedOrder);
      } catch (error) {
        console.error("Error updating Order:", error);
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        const order = await Order.findById(id);
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }

        await Promise.all(
          order.orderItems.map(async (orderItem) => {
            await OrderItem.findByIdAndDelete(orderItem);
          })
        );

        await Order.findByIdAndDelete(id);

        res.status(200).json({ message: "Order deleted successfully" });
      } catch (error) {
        console.error("Error deleting order:", error);
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
