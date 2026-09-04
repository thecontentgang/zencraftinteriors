'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext';

export default function PremiumNavbar() {
  const { openModal } = useModal();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  // Track previous scroll position without causing re-renders
  const lastScrollY = useRef(0);

  // --------------------------------------------------
  // SCROLL LOGIC
  // --------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const currentScrollY = window.scrollY;

      // Detect when navbar has moved past hero
      setIsScrolledPastHero(currentScrollY > 40);

      // Detect scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsScrollingDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --------------------------------------------------
  // LOCK BACKGROUND SCROLL WHEN MENU IS OPEN
  // --------------------------------------------------
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // --------------------------------------------------
  // NAVIGATION LINKS
  // --------------------------------------------------
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'SERVICES', href: '/services' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      {/* HEADER NAVIGATION */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        // Added dynamic top margin: attaches fully to top (top-0) on scroll, keeps gap at hero
        className={`fixed left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between pointer-events-none transition-all duration-500 ease-in-out ${
          isScrolledPastHero && !isOpen ? 'top-0' : 'top-4 md:top-6'
        }`}
      >
        {/* DYNAMIC NAVBAR BACKGROUND */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out pointer-events-none ${
            isScrollingDown && !isOpen ? '-translate-y-full' : 'translate-y-0'
          } ${
            isScrolledPastHero && !isOpen
              ? 'bg-[#F8F5EE]/95 backdrop-blur-xl border-b border-[#CDBF9F]/60 shadow-[0_8px_30px_rgba(60,50,35,0.08)]'
              : 'bg-transparent border-transparent'
          }`}
        />

        {/* LEFT: MENU BUTTON */}
        <div className={`relative z-50 pointer-events-auto transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center gap-2 sm:gap-3 text-[#2A2824] font-body font-medium tracking-[0.2em] text-[10px] sm:text-xs uppercase focus:outline-none group cursor-pointer"
          >
            {/* Hamburger */}
            <div className="w-5 sm:w-6 h-3.5 flex flex-col justify-between relative overflow-hidden">
              <span className={`h-[1.5px] bg-[#B58A3A] transition-all duration-300 ${isOpen ? 'w-full rotate-45 translate-y-[6px]' : 'w-full'}`} />
              <span className={`h-[1.5px] bg-[#B58A3A] transition-all duration-300 ${isOpen ? 'w-3/4 opacity-0 translate-x-4' : 'w-3/4 group-hover:w-full'}`} />
              <span className={`h-[1.5px] bg-[#B58A3A] transition-all duration-300 ${isOpen ? 'w-full -rotate-45 -translate-y-[6px]' : 'w-1/2 group-hover:w-full'}`} />
            </div>

            {/* MENU / CLOSE TEXT */}
            <span className="overflow-hidden h-4 hidden xs:block">
              <span className="block transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:-translate-y-full">
                {isOpen ? 'CLOSE' : 'MENU'}
              </span>
              <span className="block transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:-translate-y-full text-[#8A8378]">
                {isOpen ? 'CLOSE' : 'OPEN'}
              </span>
            </span>
          </button>
        </div>

        {/* CENTER: LOGO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 flex justify-center items-center pointer-events-auto z-50">
          <a href="/" onClick={() => setIsOpen(false)} className="block py-1">
            <img
              src="/logo.png"
              alt="Zencraft Logo"
              // Increased the logo sizes significantly for both initial state and scrolled state
              className={`w-auto object-contain transition-all duration-500 ease-out hover:scale-105 active:scale-95 ${
                isScrolledPastHero && !isOpen ? 'h-16 sm:h-20 md:h-24' : 'h-24 sm:h-32 md:h-40'
              }`}
            />
          </a>
        </div>

        {/* RIGHT: CONSULTATION BUTTON */}
        <div className={`flex items-center relative z-50 pointer-events-auto transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={openModal}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#B58A3A] bg-[#F8F5EE]/60 px-3 py-2 sm:px-5 sm:py-2.5 font-body text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[#4A4032] transition-all duration-500 ease-out hover:border-[#B58A3A] hover:bg-[#B58A3A] hover:text-white hover:shadow-[0_0_25px_rgba(181,138,58,0.5)] active:scale-95"
          >
            {/* SHIMMER EFFECT */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

            {/* SLIDING TEXT */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em]">
              <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">CONSULTATION</span>
              <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 text-white font-bold leading-none">GET STARTED</span>
            </div>
          </button>
        </div>
      </motion.header>

      {/* FULL SCREEN NAVIGATION MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-8 text-[#292723] select-none overflow-hidden"
          >
            {/* MENU BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0">
              <img src="/navbar-bg.webp" alt="Navigation Background" className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-[#F8F5EE]/88 backdrop-blur-[10px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5EE]/95 via-[#F8F5EE]/80 to-[#E9DFCE]/90" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B58A3A]/[0.04] blur-[100px]" />
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="relative z-10 flex flex-col items-center justify-center flex-grow space-y-3 sm:space-y-4 my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.02, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden py-1"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl sm:text-3xl md:text-4xl font-karlen font-normal tracking-[0.18em] uppercase text-center text-[#39342D] transition-all duration-500 ease-out hover:text-[#B58A3A] hover:tracking-[0.24em]"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* FOOTER INFORMATION */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-3xl mx-auto border-t border-[#B58A3A]/30 pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center font-body text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-widest"
            >
              <div className="group">
                <p className="text-[#8A8175] mb-0.5 uppercase font-semibold text-[8px] sm:text-[9px]">PHONE</p>
                <a href="tel:+919573287143" className="text-[#4D473F] hover:text-[#B58A3A] transition-colors duration-300 block">
                  +91 95732 87143
                </a>
              </div>
              <div className="group">
                <p className="text-[#8A8175] mb-0.5 uppercase font-semibold text-[8px] sm:text-[9px]">E-MAIL</p>
                <a href="mailto:hello@thezencraft.com" className="text-[#4D473F] hover:text-[#B58A3A] transition-colors duration-300 block">
                  Enquiry@thezencraftinteriors.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}