import { create } from "zustand";

interface CartState {
  cart: number[];
  addToCart: (id: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (id) => set((state) => ({ cart: [...state.cart, id] })),
  removeFromCart: (index) =>
    set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),
  clearCart: () => set({ cart: [] }),
}));
