import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

interface Category {
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category?: Category;
  image?: string;
}

export default function ProductList() {
  const { data: session } = useSession(); // Verifica a sessão do usuário
  const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [cart, setCart] = useState<Product[]>([]); // Estado para o carrinho

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    if (!session) {
      alert("Você precisa estar logado para adicionar ao carrinho!");
      return;
    }

    // Adiciona o produto ao carrinho local (poderia ser um estado global)
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleCheckout = async () => {
    if (!session) {
      alert("Você precisa estar logado para finalizar a compra!");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.map((product) => ({
            productId: product._id,
            quantity: 1,
          })),
        }), // Envia os produtos para o backend
      });
      const data = await response.json();
      if (response.ok) {
        alert("Pedido realizado com sucesso!");
        setCart([]); // Limpa o carrinho após finalizar a compra
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error("Error finalizing order:", error);
      alert("Erro ao finalizar o pedido.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-md shadow-md hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500">
              {product.category?.name || "No category"}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
          >
            Finalizar Compra
          </button>
        </div>
      )}
      <Footer/>
    </div>
  );
}
