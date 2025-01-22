import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Order } from "../pages/types/api";
import { useSession, signIn } from "next-auth/react";

const OrdersPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders();
    } else if (status === "unauthenticated") {
      signIn(); // Redireciona para login
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await api.get<Order[]>("/orders", {
        headers: {
          Authorization: `Bearer ${session?.user?.id}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              User: {order.user.name} - Total: ${order.totalPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
