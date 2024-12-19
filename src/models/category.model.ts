import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  color: string;
  icon: string;
  image: string;
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  image: { type: String },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);
