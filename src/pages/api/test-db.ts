import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Conecte-se ao banco de dados
    await connectToDatabase();

    res
      .status(200)
      .json({ message: "Conexão bem-sucedida com o banco de dados!" });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    res.status(500).json({ error: "Falha ao conectar ao banco de dados." });
  }
}
