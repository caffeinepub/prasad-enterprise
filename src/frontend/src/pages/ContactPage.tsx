import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Clock, MapPin, Navigation } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact';

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3d text-3xl md:text-5xl font-bold mb-4 text-foreground">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get in touch with Prasad Enterprise for all your building material needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Phone Contact */}
        <Card className="card-3d">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Call Us</CardTitle>
            </div>
            <CardDescription>
              Speak directly with our team for immediate assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-base h-auto py-3"
            >
              <a href={`tel:${CONTACT_INFO.phones[0].number}`}>
                <Phone className="mr-3 h-5 w-5" />
                {CONTACT_INFO.phones[0].display}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-base h-auto py-3"
            >
              <a href={`tel:${CONTACT_INFO.phones[1].number}`}>
                <Phone className="mr-3 h-5 w-5" />
                {CONTACT_INFO.phones[1].display}
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Email Contact */}
        <Card className="card-3d">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Email Us</CardTitle>
            </div>
            <CardDescription>
              Send us an email and we'll respond within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-base h-auto py-3"
            >
              <a href={`mailto:${CONTACT_INFO.email}`}>
                <Mail className="mr-3 h-5 w-5" />
                {CONTACT_INFO.email}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Business Hours */}
      <Card className="card-3d mb-8">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Operational Hours</CardTitle>
          </div>
          <CardDescription>
            Visit us during our business hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-base">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="font-medium">Monday – Friday</span>
              <span className="text-muted-foreground">7:00 AM – 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="font-medium">Saturday</span>
              <span className="text-muted-foreground">8:00 AM – 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">Sunday</span>
              <span className="text-muted-foreground">10:00 AM – 3:00 PM (Occasionally)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location with Map */}
      <Card className="card-3d bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Visit Our Store</CardTitle>
          </div>
          <CardDescription>
            Come see our full range of building materials in person
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-base font-medium text-foreground mb-2">Our Address:</p>
            <address className="text-base text-muted-foreground not-italic">
              {CONTACT_INFO.address}
            </address>
          </div>

          {/* Google Maps Embed */}
          <div className="mb-4 rounded-lg overflow-hidden border border-border">
            <iframe
              src={CONTACT_INFO.mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prasad Enterprises Location"
            />
          </div>

          {/* Get Directions Button */}
          <Button asChild size="lg" className="w-full md:w-auto">
            <a
              href={CONTACT_INFO.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="mr-2 h-5 w-5" />
              Get Directions
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
