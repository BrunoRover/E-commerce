import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor, defina a variável MONGODB_URI no arquivo .env.local"
  );
}

let isConnected = false;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log("Já conectado ao MongoDB.");
    return mongoose;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    } as ConnectOptions);

    isConnected = true;
    console.log("Conectado ao MongoDB!");
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw new Error("Falha na conexão com o MongoDB.");
  }
}
