import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  starReviews: number;
  imageUrl: string;
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    starReviews: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default ProductModel;
