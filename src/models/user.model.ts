import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  street: { type: String, default: "" },
  apartment: { type: String, default: "" },
  zip: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
});

userSchema.virtual("id").get(function () {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
