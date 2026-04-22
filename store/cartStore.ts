"use client";

import { create } from "zustand";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  justAddedId: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  justAddedId: null,
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
          justAddedId: product.id,
        };
      }
      return {
        items: [...state.items, { product, quantity }],
        justAddedId: product.id,
      };
    });
    // Clear the "just added" flash after a moment
    setTimeout(() => set({ justAddedId: null }), 1500);
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.product.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
        )
        .filter((i) => i.quantity > 0),
    })),
  clear: () => set({ items: [] }),
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  toggleDrawer: () => set((s) => ({ isOpen: !s.isOpen })),
  itemCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),
  subtotal: () =>
    get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ),
}));
