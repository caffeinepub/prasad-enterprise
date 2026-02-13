import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/data/catalog';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container py-8 md:py-16">
      {/* Hero Section */}
      <section className="text-center mb-16 md:mb-24">
        <h1 className="text-3d text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
          Prasad Enterprise
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Building Foundations, Delivering Excellence
        </p>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
          Our Product Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="card-3d cursor-pointer group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300"
                onClick={() => navigate({ to: '/category/$categoryId', params: { categoryId: category.id } })}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl">{category.name}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to explore products
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 md:mt-24 text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl">
              Need Help Finding the Right Materials?
            </CardTitle>
            <CardDescription className="text-lg mt-4">
              Our team is ready to assist you with your building material needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button
              onClick={() => navigate({ to: '/contact' })}
              className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-base"
            >
              Contact Us Today
            </button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
