'use client';

import { create } from 'zustand';

export interface CartItem {
  name: string;
  category: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (name: string, category: string) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (name: string, category: string) => {
    const { items } = get();
    const existing = items.find((i) => i.name === name);
    if (existing) {
      set({
        items: items.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { name, category, quantity: 1 }] });
    }
  },

  removeItem: (name: string) => {
    set({ items: get().items.filter((i) => i.name !== name) });
  },

  updateQuantity: (name: string, quantity: number) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((i) => i.name !== name) });
    } else {
      set({
        items: get().items.map((i) =>
          i.name === name ? { ...i, quantity } : i
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

export function buildWhatsAppMessage(items: CartItem[], lang: string): string {
  const labels: Record<string, string> = {
    fr: '🍽️ *Commande Chez Gaby*',
    en: '🍽️ *Chez Gaby Order*',
    pt: '🍽️ *Pedido Chez Gaby*',
  };

  const header = labels[lang] || labels.fr;
  const lines = items.map(
    (i) => `• ${i.quantity}x ${i.name}`
  );
  const total = items.reduce((sum, i) => sum + i.quantity, 0);
  const footer =
    lang === 'en'
      ? `\n📋 Total: ${total} item(s)`
      : lang === 'pt'
        ? `\n📋 Total: ${total} item(ns)`
        : `\n📋 Total : ${total} article(s)`;

  return `${header}\n\n${lines.join('\n')}${footer}`;
}
