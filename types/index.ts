export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  isAdmin: boolean;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
}

export interface Order {
  id: string;
  customer: CheckoutData;
  items: CartItem[];
  total: number;
  date: string;
}
