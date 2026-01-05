import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User } from '@/types';
import { initialProducts } from '@/lib/mock-data';

interface StoreState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      products: initialProducts,
      cart: [],

      login: (email: string, password: string) => {
        if (email === 'admin@email.com' && password === 'password123') {
          set({ user: { email, name: 'Admin', isAdmin: true } });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null });
      },

      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            if (existingItem.quantity < product.stock) {
              return {
                cart: state.cart.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              };
            }
            return state;
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        }));
      },

      updateCartQuantity: (productId: string, quantity: number) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      addProduct: (product: Omit<Product, 'id'>) => {
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Date.now().toString() },
          ],
        }));
      },

      updateProduct: (id: string, updates: Partial<Product>) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
      },

      deleteProduct: (id: string) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          cart: state.cart.filter((item) => item.product.id !== id),
        }));
      },
    }),
    {
      name: 'ecommerce-storage',
    }
  )
);
