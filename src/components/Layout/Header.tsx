import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-around p-10 bg-white shadow-md mb-4">
        <h1 className="text-4xl">EnduraFit</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/product" className="text-xl">
              Top 10
            </Link>
          </li>
          <li>
            <Link href="/product" className="text-xl">
              Lançamentos
            </Link>
          </li>
          <li>
            <Link href="/product" className="text-xl">
              Whey Protein
            </Link>
          </li>
          <li>
            <Link href="/product" className="text-xl">
              Objetivos
            </Link>
          </li>
          <li>
            <Link
              href="/product"
              className="text-xl bg-foreground text-background py-2 px-4 rounded-full"
            >
              Entrar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
