import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  price: number;
  category: string;
  numReviews: number;
  countInStock: number;
  rating: number;
  isFeatured: boolean;
  dateCreated: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  richDescription: { type: String, default: "" },
  image: { type: String, default: "" },
  images: { type: String },
  brand: { type: String, default: "" },
  price: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  countInStock: { type: Number, required: true, min: 0, max: 255 },
  rating: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  dateCreated: { type: Date, default: false },
});

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
