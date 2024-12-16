import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import mulher from "../../../public/img/mulher.avif";
import mulher2 from "../../../public/img/mulher2.jpg";
import homem from "../../../public/img/homem.avif";

const testimonials = [
  {
    name: "Ana Silva",
    feedback:
      "O atendimento foi incrível e os produtos superaram minhas expectativas! Recomendo a todos.",
    image: mulher,
  },
  {
    name: "Carlos Santos",
    feedback:
      "A qualidade dos produtos é excepcional e a entrega foi muito rápida.",
    image: homem,
  },
  {
    name: "Mariana Oliveira",
    feedback:
      "Minha experiência de compra foi excelente. Com certeza voltarei a comprar aqui!",
    image: mulher2,
  },
];

const Testimonials = () => {
  return (
    <div className="p-14 bg-zinc-800">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Depoimentos de Clientes
      </h2>
      <div className="flex flex-wrap justify-center gap-8 px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-8 shadow-lg rounded-lg max-w-sm"
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
              width={96}
              height={96}
            />
            <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
            <h3 className="text-lg font-semibold text-gray-800">
              {testimonial.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
