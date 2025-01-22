export interface OrderItem {
  quantity: number;
  product: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress1: string;
  shippingAddress2?: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice: number;
  user: {
    _id: string;
    name: string;
  };
  dateOrdered: string;
}
