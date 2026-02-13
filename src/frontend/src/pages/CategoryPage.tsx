import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/catalog';
import { inventory } from '@/data/inventory';
import { useInquiry } from '@/hooks/useInquiry';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CategoryPage() {
  const { categoryId } = useParams({ from: '/category/$categoryId' });
  const navigate = useNavigate();
  const { items, addItem, incrementItem, decrementItem, removeItem } = useInquiry();

  const category = categories.find((c) => c.id === categoryId);
  const products = inventory.filter((p) => p.categoryId === categoryId);

  if (!category) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <Button onClick={() => navigate({ to: '/' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const handleAddToInquiry = (productId: string, productName: string) => {
    addItem(productId, productName);
    toast.success(`${productName} added to inquiry list`);
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
        <h1 className="text-3d text-3xl md:text-5xl font-bold mb-4 text-foreground">
          {category.name}
        </h1>
        <p className="text-lg text-muted-foreground">{category.description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const itemInList = items.find((item) => item.productId === product.id);
          const quantity = itemInList?.quantity || 0;

          return (
            <Card
              key={product.id}
              className="card-3d overflow-hidden border-2 hover:border-primary/30 transition-all"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                    {product.brand && (
                      <Badge variant="secondary" className="mb-2">
                        {product.brand}
                      </Badge>
                    )}
                    <CardDescription>{product.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {quantity === 0 ? (
                  <Button
                    onClick={() => handleAddToInquiry(product.id, product.name)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to List
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => decrementItem(product.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold px-4">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => incrementItem(product.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        removeItem(product.id);
                        toast.success('Removed from inquiry list');
                      }}
                      className="w-full"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No products available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
