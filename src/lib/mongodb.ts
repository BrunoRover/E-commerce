import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "http://localhost:3000/";

if (!MONGODB_URI) {
  throw new Error("A variável de ambiente MONGODB_URI não foi definida.");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
