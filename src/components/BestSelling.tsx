import Image from "next/image";
import React from "react";
import img from "../../public/img/whey.png";
import creatina from "../../public/img/creatina.webp";
import bcaa from "../../public/img/BCAA.png";
export function BestSelling() {
  return (
    <div>
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
    </div>
  );
}
