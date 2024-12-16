import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import product1 from "../../../public/img/creatina.webp";
import product2 from "../../../public/img/whey.png";
import product3 from "../../../public/img/haze.webp";
import product4 from "../../../public/img/arginine.webp";
import product5 from "../../../public/img/creatina2.webp";
import product6 from "../../../public/img/whey2.webp";
import product7 from "../../../public/img/insanity.webp";
import product8 from "../../../public/img/multivitaminico.webp";
import product9 from "../../../public/img/albumina.png";
import product10 from "../../../public/img/hot-termogenico.webp";

const TopProducts = () => {
  const products = [
    { id: 1, name: "Creatina 300g", image: product1, price: "R$ 45,00" },
    { id: 2, name: "Whey Max 900g", image: product2, price: "R$ 60,00" },
    { id: 3, name: "Haze 150g", image: product3, price: "R$ 80,00" },
    { id: 4, name: "Power Arginine", image: product4, price: "R$ 45,00" },
    { id: 5, name: "Creatina 150g", image: product5, price: "R$ 60,00" },
    { id: 6, name: "Whey 1kg", image: product6, price: "R$ 80,00" },
    { id: 7, name: "Insanity 300g", image: product7, price: "R$ 45,00" },
    { id: 8, name: "Multivitaminico", image: product8, price: "R$ 60,00" },
    { id: 9, name: "Albumina 1kg", image: product9, price: "R$ 80,00" },
    { id: 10, name: "Hot-Termogenico", image: product10, price: "R$ 80,00" },
  ];

  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-zinc-800 mb-8">
        Top 10 Produtos
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-11/12 mx-auto"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="h-64 w-full flex items-center justify-center  rounded-lg mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-auto h-full"
                  width={400}
                  height={400}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-500 font-semibold">{product.price}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600">
                Comprar
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopProducts;
