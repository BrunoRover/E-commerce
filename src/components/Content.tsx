import Image from "next/image";
import React from "react";
import img from "../../public/whey.png";

function Content() {
  return (
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
  );
}

export default Content;
