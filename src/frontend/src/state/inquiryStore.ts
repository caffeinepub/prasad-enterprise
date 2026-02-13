import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InquiryItem {
  productId: string;
  productName: string;
  quantity: number;
}

interface InquiryStore {
  items: InquiryItem[];
  addItem: (productId: string, productName: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearInquiry: () => void;
}

export const useInquiryStore = create<InquiryStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, productName) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === productId);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { productId, productName, quantity: 1 }],
          };
        }),
      incrementItem: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decrementItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearInquiry: () => set({ items: [] }),
    }),
    {
      name: 'prasad-inquiry-storage',
    }
  )
);
