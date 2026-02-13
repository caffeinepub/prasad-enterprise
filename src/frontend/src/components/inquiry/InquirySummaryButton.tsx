import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { useInquiry } from '@/hooks/useInquiry';

export default function InquirySummaryButton() {
  const navigate = useNavigate();
  const { items, getTotalCount } = useInquiry();
  const totalCount = getTotalCount();

  return (
    <Button
      variant="default"
      onClick={() => navigate({ to: '/inquiry' })}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Inquiry List</span>
      {totalCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {totalCount}
        </Badge>
      )}
    </Button>
  );
}
