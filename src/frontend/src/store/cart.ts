import { create } from "zustand";
import type { CartItem, MenuItem, PaymentMethod } from "../types";

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string;
  paymentMethod: PaymentMethod;
  notes: string;
  addItem: (menuItem: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNotes: (notes: string) => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurantId: null,
  restaurantName: "",
  paymentMethod: "cash",
  notes: "",

  addItem: (menuItem: MenuItem) => {
    const { items, restaurantId } = get();
    // Clear cart if adding from a different restaurant
    if (restaurantId && restaurantId !== menuItem.restaurantId) {
      set({
        items: [{ menuItem, quantity: 1 }],
        restaurantId: menuItem.restaurantId,
      });
      return;
    }
    const existing = items.find((i) => i.menuItem.id === menuItem.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      });
    } else {
      set({
        items: [...items, { menuItem, quantity: 1 }],
        restaurantId: menuItem.restaurantId,
      });
    }
  },

  removeItem: (menuItemId: string) => {
    const items = get().items.filter((i) => i.menuItem.id !== menuItemId);
    set({
      items,
      restaurantId: items.length === 0 ? null : get().restaurantId,
    });
  },

  updateQuantity: (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(menuItemId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.menuItem.id === menuItemId ? { ...i, quantity } : i,
      ),
    });
  },

  clearCart: () =>
    set({ items: [], restaurantId: null, notes: "", paymentMethod: "cash" }),

  setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod }),

  setNotes: (notes: string) => set({ notes }),

  total: () =>
    get().items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    ),

  itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
