import Image from "next/image";
import React from "react";
import img from "../../public/img/whey.png";
import creatina from "../../public/img/creatina.webp";
import bcaa from "../../public/img/BCAA.png";
import {
  FaDumbbell,
  FaHeartbeat,
  FaLeaf,
  FaBalanceScale,
  FaRunning,
  FaSeedling,
  FaBone,
  FaRedo,
  FaSmile,
} from "react-icons/fa";
import TopProducts from "./TopProducts";

function Content() {
  const benefits = [
    {
      text: "Alta concentração de proteínas de alto valor biológico.",
      icon: <FaDumbbell className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Fornece nutrientes ao sistema imunológico.",
      icon: <FaHeartbeat className="text-gray-500 text-2xl" />,
    },
    {
      text: "Aumento da massa magra.",
      icon: <FaLeaf className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Pode auxiliar no emagrecimento.",
      icon: <FaBalanceScale className="text-gray-500 text-2xl" />,
    },
    {
      text: "Aumento no aporte proteico na dieta.",
      icon: <FaRunning className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Rápida reposição de aminoácidos ao tecido muscular.",
      icon: <FaSeedling className="text-gray-500 text-2xl" />,
    },
    {
      text: "Melhora a saúde óssea.",
      icon: <FaBone className="text-indigo-500 text-2xl" />,
    },
    {
      text: "Melhora da recuperação do tecido muscular.",
      icon: <FaRedo className="text-gray-500 text-2xl" />,
    },
    {
      icon: <FaSmile className="text-indigo-500 text-2xl" />,
      text: "Contribui para a saúde geral e bem-estar.",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-around h-90 py-10 pl-10 bg-gray-300">
        <div className="w-1/2 space-y-6 pl-20">
          <h3 className="text-lg font-semibold text-gray-500">HR Stream</h3>
          <h1 className="text-5xl font-bold text-gray-800">SMART Chair</h1>
          <p className="text-gray-60">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus amet
            non enim eveniet nesciunt eos. Ex quasi ab sint dolore tempora!
            Officiis voluptatum animi tenetur maiores placeat, facilis
            voluptatibus dignissimos.
          </p>
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700">
            Adicionar ao carrinho
          </button>
        </div>
        <div>
          <Image src={img} alt="" width={400} height={400}></Image>
        </div>
      </div>
      <div className="flex justify-center p-10 bg-zinc-800">
        <h1 className="text-5xl font-bold text-white">Mais Vendidos!</h1>
      </div>
      <div className="flex items-center justify-center gap-6 p-5 bg-zinc-800">
        {[
          { src: creatina, title: "Creatina", price: "R$ 45,00" },
          { src: img, title: "Whey Protein", price: "R$ 35,00" },
          { src: bcaa, title: "BCAA", price: "R$ 70,00" },
        ].map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-500 rounded-xl w-72"
          >
            <div className="w-full h-72 overflow-hidden rounded-t-xl">
              <Image
                src={product.src}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center justify-between w-full p-3 bg-white rounded-b-xl">
              <strong className="text-zinc-800">{product.title}</strong>
              <button className="bg-red-500 rounded-lg px-3 py-1 text-white">
                {product.price}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-10 bg-gray-50 pl-10">
        <h1 className="text-center text-zinc-800 text-3xl font-bold mb-8">
          Benefícios dos Suplementos Proteicos
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10 leading-relaxed">
          De modo geral, estes suplementos proteicos auxiliam com diferentes
          benefícios, tanto para sua saúde como para seu desempenho. São eles:
        </p>
        <div className="px-8 md:px-20 lg:px-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 text-gray-800 text-left font-medium hover:shadow-xl transition-shadow duration-300"
              >
                {benefit.icon}
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TopProducts />
    </div>
  );
}

export default Content;
