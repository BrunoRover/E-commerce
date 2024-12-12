import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">EnduraFit</h2>
          <p className="text-sm">
            EnduraFit é dedicada a oferecer produtos e serviços de alta
            qualidade para atender às suas necessidades. Siga-nos nas redes
            sociais para saber mais!
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Links Rápidos
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-white">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                Perguntas Frequentes
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
          <p className="text-sm">Endereço: Rua Felipe Schmidet, 270, Centro</p>
          <p className="text-sm">Telefone: (48) 99839-4525</p>
          <p className="text-sm">Email: enduraFit@gmail.com</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BrunoRover. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
