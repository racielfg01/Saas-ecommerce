export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
}
