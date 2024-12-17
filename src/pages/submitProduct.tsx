import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  starReviews: number;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      {products.map((product) => (
        <div
          key={product._id}
          style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}
        >
          <img src={product.imageUrl} alt={product.name} width="200" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Preço: R$ {product.price.toFixed(2)}</p>
          <p>⭐ Avaliação: {product.starReviews} / 5</p>
        </div>
      ))}
    </div>
  );
}
