import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';
import PageTransition from './PageTransition';

export default function SiteLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <InteractiveBackground />
      <Header />
      <main className="flex-1 relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
