import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import InquiryPage from './pages/InquiryPage';
import LeadFormPage from './pages/LeadFormPage';
import LeadSuccessPage from './pages/LeadSuccessPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import BlogAdminPage from './pages/BlogAdminPage';
import BlogAdminEditPage from './pages/BlogAdminEditPage';
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

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryPage,
});

const blogListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogListPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$postId',
  component: BlogPostPage,
});

const blogAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/blog',
  component: BlogAdminPage,
});

const blogAdminEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/blog/$postId',
  component: BlogAdminEditPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  inquiryRoute,
  leadFormRoute,
  leadSuccessRoute,
  contactRoute,
  galleryRoute,
  blogListRoute,
  blogPostRoute,
  blogAdminRoute,
  blogAdminEditRoute,
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
