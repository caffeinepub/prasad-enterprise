import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import InquiryPage from './pages/InquiryPage';
import LeadFormPage from './pages/LeadFormPage';
import LeadSuccessPage from './pages/LeadSuccessPage';
import ContactPage from './pages/ContactPage';
import SiteLayout from './components/site/SiteLayout';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categoryId',
  component: CategoryPage,
});

const inquiryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inquiry',
  component: InquiryPage,
});

const leadFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lead-form',
  component: LeadFormPage,
});

const leadSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/success',
  component: LeadSuccessPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  inquiryRoute,
  leadFormRoute,
  leadSuccessRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
