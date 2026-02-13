import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, Phone, Mail, Image } from 'lucide-react';
import InquirySummaryButton from '../inquiry/InquirySummaryButton';
import { CONTACT_INFO } from '@/config/contact';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        {/* Top bar with contact info - hidden on mobile */}
        <div className="hidden lg:flex items-center justify-end gap-4 py-2 text-sm border-b border-border/20">
          <a
            href={`tel:${CONTACT_INFO.phones[0].number}`}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            {CONTACT_INFO.phones[0].display}
          </a>
          <span className="text-border">|</span>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            {CONTACT_INFO.email}
          </a>
        </div>

        {/* Main header */}
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <img
              src="/assets/Prasad Enterprise.png"
              alt="Prasad Enterprise Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Prasad Enterprise
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/' })}
              className="text-base"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/gallery' })}
              className="text-base"
            >
              <Image className="mr-2 h-4 w-4" />
              Gallery
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/contact' })}
              className="text-base"
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <InquirySummaryButton />
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <InquirySummaryButton />
          </div>
        </div>
      </div>
    </header>
  );
}
