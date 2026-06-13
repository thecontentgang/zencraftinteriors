import { ModalProvider } from './components/ModalContext'; 
import PremiumNavbar from './components/Navbar'; 
import ConsultationModal from './components/ConsultationModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          <PremiumNavbar />
          
          <main>{children}</main>
          
          {/* Render the modal at the root level so it layers over everything */}
          <ConsultationModal />
        </ModalProvider>
      </body>
    </html>
  );
}