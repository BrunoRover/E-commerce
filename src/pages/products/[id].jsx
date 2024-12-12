import { useRouter } from "next/router";
import Image from "next/image";
import Header from "@/components/Header";

import img from "../../../public/img/whey.png";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Simulando dados de produto
  const product = {
    id,
    name: "Whey Protein Max Titanium",
    description:
      "Whey Protein Max Titanium é ideal para suplementar a sua dieta.",
    price: "R$ 99,90",
    image: img,
    shipping: "Grátis",
    ratings: 4.5,
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-300">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg">
            {/* Imagem do Produto */}
            <div className="md:w-1/2 p-6">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-16">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 font-semibold mr-2">
                  ⭐ {product.ratings} ({product.ratings} Avaliações)
                </span>
              </div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="text-3xl font-semibold text-gray-800">
                {product.price}
              </span>

              <div className="my-6">
                <span className="text-sm text-gray-600">Frete:</span>
                <span className="font-semibold text-green-600">
                  {product.shipping}
                </span>
              </div>

              <button className="w-full bg-gray-700 text-white py-3 rounded-lg mt-4 hover:bg-gray-800">
                Adicionar ao Carrinho
              </button>

              <div className="mt-4 text-gray-700">
                <button className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 w-full">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Descrição do Produto
            </h2>
            <p className="text-gray-700 mt-4">{product.description}</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Avaliações
            </h2>
            <div className="mt-4">
              <div className="flex space-x-4">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-700">
                  ({product.ratings} de 5 estrelas)
                </span>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Deixe sua Avaliação
                </h3>
                <textarea
                  className="w-full mt-2 p-4 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Escreva sua avaliação aqui..."
                />
                <button className="bg-blue-500 text-white py-2 px-6 mt-4 rounded-lg hover:bg-blue-600">
                  Enviar Avaliação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
