import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import img1 from "../../public/img/whey.png"; // Substitua com suas imagens
import img2 from "../../public/img/creatina.webp";
import img3 from "../../public/img/bcaa.png";

const offers = [
  {
    title: "Proteína Whey",
    subtitle: "Max Titanium",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus amet non enim eveniet nesciunt eos. Ex quasi ab sint dolore tempora! Officiis voluptatum animi tenetur maiores placeat, facilis voluptatibus dignissimos.",
    img: img1,
  },
  {
    title: "Creatina",
    subtitle: "Muscle Max",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus amet non enim eveniet nesciunt eos. Ex quasi ab sint dolore tempora! Officiis voluptatum animi tenetur maiores placeat, facilis voluptatibus dignissimos.",
    img: img2,
  },
  {
    title: "BCAA",
    subtitle: "Energy Boost",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus amet non enim eveniet nesciunt eos. Ex quasi ab sint dolore tempora! Officiis voluptatum animi tenetur maiores placeat, facilis voluptatibus dignissimos.",
    img: img3,
  },
];

function OfferCarousel() {
  return (
    <div className="bg-gray-300 px-10">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        className="w-full h-full"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-around h-90 py-10 pl-10">
              <div className="w-1/2 space-y-6 pl-20">
                <h3 className="text-lg font-semibold text-gray-500">
                  {offer.subtitle}
                </h3>
                <h1 className="text-5xl font-bold text-gray-800">
                  {offer.title}
                </h1>
                <p className="text-gray-600">{offer.description}</p>
                <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                  Adicionar ao carrinho
                </button>
              </div>
              <div>
                <Image
                  src={offer.img}
                  alt={offer.title}
                  width={400}
                  height={400}
                  className="rounded-md"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OfferCarousel;
