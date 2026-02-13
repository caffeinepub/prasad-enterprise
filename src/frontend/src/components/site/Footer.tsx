import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'prasad-enterprise';

  return (
    <footer className="relative z-10 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Prasad Enterprise</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Building Foundations, Delivering Excellence
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${CONTACT_INFO.phones[0].number}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {CONTACT_INFO.phones[0].display}
              </a>
              <a
                href={`tel:${CONTACT_INFO.phones[1].number}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {CONTACT_INFO.phones[1].display}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/inquiry" className="hover:text-foreground transition-colors">
                  Product Inquiry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Visit Us</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <address className="not-italic">
                {CONTACT_INFO.address}
              </address>
            </div>
            <h4 className="text-sm font-semibold mb-3 text-foreground">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Prasad Enterprise. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-orange-500 fill-orange-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
