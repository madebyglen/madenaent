import { create } from 'zustand';
import { CartItem, Category } from './types';

interface AppState {
  cart: CartItem[];
  selectedCategory: Category;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  setCategory: (cat: Category) => void;
}

export const useStore = create<AppState>((set, get) => ({
  cart: [],
  selectedCategory: 'all',
  addToCart: (item) => {
    const { cart } = get();
    const existing = cart.find((c) => c.product.id === item.product.id);
    if (existing) {
      set({
        cart: cart.map((c) =>
          c.product.id === item.product.id
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        ),
      });
    } else {
      set({ cart: [...cart, item] });
    }
  },
  removeFromCart: (productId) =>
    set({ cart: get().cart.filter((c) => c.product.id !== productId) }),
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map((c) =>
        c.product.id === productId ? { ...c, quantity } : c
      ),
    });
  },
  clearCart: () => set({ cart: [] }),
  cartTotal: () =>
    get().cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0),
  setCategory: (cat) => set({ selectedCategory: cat }),
}));
