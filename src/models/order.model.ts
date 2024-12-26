import mongoose, { Schema, Document } from "mongoose";

interface IOrders extends Document {
  orderItems: [];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice: number;
  user: [];
  dateOrdered: Date;
}

const ordersSchema: Schema = new Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: { type: String, required: true },
  shippingAddress2: { type: String },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  totalPrice: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateOrdered: { type: Date, default: Date.now },
});

ordersSchema.virtual("id").get(function () {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

ordersSchema.set("toJSON", {
  virtuals: true,
});

export const Order =
  mongoose.models.Order || mongoose.model<IOrders>("Order", ordersSchema);
