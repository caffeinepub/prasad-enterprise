import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInquiry } from '@/hooks/useInquiry';
import { ArrowLeft, ArrowRight, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export default function InquiryPage() {
  const navigate = useNavigate();
  const { items, incrementItem, decrementItem, removeItem, getTotalCount } = useInquiry();

  const totalCount = getTotalCount();

  const handleContinue = () => {
    if (totalCount === 0) {
      toast.error('Please add at least one product to continue');
      return;
    }
    navigate({ to: '/lead-form' });
  };

  return (
    <div className="container py-8 md:py-12 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/' })}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="mb-8">
        <h1 className="text-3d text-3xl md:text-5xl font-bold mb-4 text-foreground">
          Your Inquiry List
        </h1>
        <p className="text-lg text-muted-foreground">
          Review your selected products and continue to submit your inquiry
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="text-center py-16">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Your inquiry list is empty</CardTitle>
            <CardDescription className="text-base mt-2">
              Browse our categories and add products to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/' })} size="lg">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <Card key={item.productId} className="card-3d">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{item.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrementItem(item.productId)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold px-3 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => incrementItem(item.productId)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          removeItem(item.productId);
                          toast.success('Item removed');
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Submit?</CardTitle>
              <CardDescription className="text-base">
                You have {totalCount} item{totalCount !== 1 ? 's' : ''} in your inquiry list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleContinue} size="lg" className="w-full md:w-auto">
                Continue to Inquiry Form
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
