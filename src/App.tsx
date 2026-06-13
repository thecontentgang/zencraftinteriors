import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layout and Pages
import Layout from './components/Layout';
import Home from './HomePage/HomePage';
import About from './AboutPage.tsx/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ServiceDetail from './pages/ServiceDetail';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetails';
import BlogsPage from './pages/BlogPage';
// Assuming you have a BlogDetail component, if not, change this back to BlogsPage
// import BlogDetail from './pages/BlogDetail'; 
import DesignsPage from './pages/DesignPage';

// Import your Modal tools
import { ModalProvider } from './components/ModalContext';
import ConsultationModal from './components/ConsultationModal';

const App = () => {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:id" element={<ServiceDetail />} />

            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetail />} />

            <Route path="blogs" element={<BlogsPage />} />
            {/* FIXED: Added the colon ':' before id to make it a dynamic parameter */}
            {/* <Route path="blogs/:id" element={<BlogDetail />} />  */}

            <Route path="designs" element={<DesignsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      {/* Global Modal rendered outside the router so it can pop up anywhere */}
      <ConsultationModal />
    </ModalProvider>
  );
};

export default App;