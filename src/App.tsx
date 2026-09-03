import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layout and Pages
import Layout from './components/Layout';
import Home from './HomePage/HomePage';
import About from './AboutPage/AboutPage'; // Fixed potential typo here
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ServiceDetail from './pages/ServiceDetail';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetails';
import BlogsPage from './pages/BlogPage';
// import DesignsPage from './pages/DesignPage';
import ScrollToTop from './components/ScrollToTop';
// import BlogDetail from './pages/BlogDetail'; 

// Import your Modal tools
import { ModalProvider } from './components/ModalContext';
import ConsultationModal from './components/ConsultationModal';

const App = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ConsultationModal />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetail />} />

            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetail />} />

            <Route path="blogs" element={<BlogsPage />} />
            {/* <Route path="blogs/:id" element={<BlogDetail />} />  */}

            {/* <Route path="designs" element={<DesignsPage />} /> */}
            <Route path="contact" element={<ContactPage />} />

            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  );
};

export default App;