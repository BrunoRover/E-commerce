import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  // Carregar o carrinho do localStorage
  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  };

  // Atualizar a quantidade do produto no carrinho
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Atualiza no localStorage
  };

  // Remover item do carrinho
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Atualiza no localStorage
  };

  // Redirecionar para a página de checkout
  const proceedToCheckout = () => {
    router.push("/checkout");
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Calcular o total do carrinho
  const calculateTotal = () => {
    return cart
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.product._id}
                className="flex items-center space-x-6"
              >
                <div className="flex flex-col space-y-2">
                  {item ? (
                    <>
                      <h3 className="text-xl">{item.name}</h3>{" "}
                      {/* Acessando diretamente item.name */}
                      <p className="text-gray-600">Preço: ${item.price}</p>{" "}
                      {/* Acessando diretamente item.price */}
                    </>
                  ) : (
                    <p>Produto não disponível</p>
                  )}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Quantidade:</label>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value, 10))
                      }
                      className="w-16 p-2 border rounded-md"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">
              Total: ${calculateTotal()}
            </h3>
            <button
              onClick={proceedToCheckout}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
