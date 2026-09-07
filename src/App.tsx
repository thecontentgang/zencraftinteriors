import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Synchronous imports for critical above-the-fold content
import Layout from './components/Layout';
import Home from './HomePage/HomePage';
import ScrollToTop from './components/ScrollToTop';

// Import your Modal tools
import { ModalProvider } from './components/ModalContext';
import ConsultationModal from './components/ConsultationModal';

// Lazy loaded pages for optimal bundle splitting
const About = lazy(() => import('./AboutPage/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetails'));
const BlogsPage = lazy(() => import('./pages/BlogPage'));

// A lightweight, non-intrusive loading fallback matching the existing design aesthetic
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-surface w-full">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ConsultationModal />

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="blogs" element={<BlogsPage />} />
              <Route path="contact" element={<ContactPage />} />
              {/* Catch-all route for 404 Not Found */}
              <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ModalProvider>
  );
};

export default App;