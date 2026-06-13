// src/components/Layout.tsx

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="bg-primary min-h-screen w-full selection:bg-sand selection:text-primary overflow-x-hidden relative isolated flex flex-col">
      {/* Persistent Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* Page Content goes here (Home, About, etc.) */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default Layout;