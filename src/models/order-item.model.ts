import mongoose, { Schema, Document } from "mongoose";

interface IOrderItem extends Document {
  quantity: number;
  product: string;
}

const orderItemSchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

export const OrderItem =
  mongoose.models.OrderItem ||
  mongoose.model<IOrderItem>("OrderItem", orderItemSchema);
