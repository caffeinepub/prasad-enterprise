import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { galleryItems, getGalleryCategories } from '@/data/gallery';
import { Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = getGalleryCategories();

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container py-8 md:py-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-3d text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
          Product Gallery
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of building materials and construction products
        </p>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-all"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              No items found in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="card-3d overflow-hidden group border-2 hover:border-primary/50 transition-all duration-300"
              >
                <CardHeader className="p-0">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-1">
                    {item.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    (this is a sample image)
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="mt-16 text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              Looking for Specific Products?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Contact us for detailed information about any product in our gallery
            </p>
            <Button
              onClick={() => window.location.href = '/contact'}
              size="lg"
              className="text-base"
            >
              Get in Touch
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
