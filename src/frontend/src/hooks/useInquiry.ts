import { useInquiryStore } from '@/state/inquiryStore';

export function useInquiry() {
  const items = useInquiryStore((state) => state.items);
  const addItem = useInquiryStore((state) => state.addItem);
  const incrementItem = useInquiryStore((state) => state.incrementItem);
  const decrementItem = useInquiryStore((state) => state.decrementItem);
  const removeItem = useInquiryStore((state) => state.removeItem);
  const clearInquiry = useInquiryStore((state) => state.clearInquiry);

  const getTotalCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearInquiry,
    getTotalCount,
  };
}
