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
  quantity: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(savedCart);
    setCart(savedCart);
    const totalPrice = savedCart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  const placeOrder = async () => {
    const orderData = {
      orderItems: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress1: "Endereço de entrega",
      city: "Cidade",
      zip: "CEP",
      country: "País",
      phone: "Telefone",
      user: "ID do usuário",
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (data) {
      localStorage.removeItem("cart"); // Limpa o carrinho após a compra
      router.push("/order-success"); // Redireciona para a página de sucesso
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Resumo do Pedido</h2>
        <ul className="space-y-6">
          {cart.map((item) => (
            <li key={item.product._id} className="flex items-center space-x-6">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl">{item.product.name}</h3>
                <p className="text-gray-600">Quantidade: {item.quantity}</p>
                <p className="text-gray-600">Preço: ${item.product.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-6">Total: ${total}</h3>
        <button
          onClick={placeOrder}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
