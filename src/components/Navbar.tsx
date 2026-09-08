'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext';

export default function PremiumNavbar() {
  const { openModal } = useModal();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      const currentScrollY = window.scrollY;

      setIsScrolledPastHero(currentScrollY > 40);

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
        className={`fixed left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between pointer-events-none transition-all duration-500 ease-in-out ${isScrolledPastHero && !isOpen ? 'top-0' : 'top-4 md:top-6'
          }`}
      >
        {/* DYNAMIC NAVBAR BACKGROUND WITH IMAGE (No Blur) */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-500 ease-in-out pointer-events-none ${isScrollingDown && !isOpen ? '-translate-y-full' : 'translate-y-0'
            } ${isScrolledPastHero && !isOpen
              ? 'shadow-[0_8px_30px_rgba(60,50,35,0.08)] border-b border-[#B58A3A]/20'
              : 'border-transparent'
            }`}
        >
          {/* <img
            src="/navbar-bg.png"
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isScrolledPastHero && !isOpen ? 'opacity-100' : 'opacity-0'
              }`}
          /> */}

          {/* Light overlay for the scrolling navbar to keep the dark logo readable */}
          <div
            className={`absolute inset-0 bg-[#F8F5EE]/80 transition-opacity duration-500 ease-in-out ${isScrolledPastHero && !isOpen ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </div>

        {/* LEFT: MENU BUTTON */}
        <div className={`relative z-50 pointer-events-auto transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center gap-2 sm:gap-3 font-body font-medium tracking-[0.2em] text-[10px] sm:text-xs uppercase focus:outline-none group cursor-pointer"
          >
            {/* Hamburger */}
            <div className="w-5 sm:w-6 h-3.5 flex flex-col justify-between relative overflow-hidden">
              <span className={`h-[1.5px] transition-all duration-300 ${isOpen ? 'w-full rotate-45 translate-y-[6px] bg-[#E9DFCE]' : 'w-full bg-[#39342D]'}`} />
              <span className={`h-[1.5px] transition-all duration-300 ${isOpen ? 'w-3/4 opacity-0 translate-x-4 bg-[#E9DFCE]' : 'w-3/4 group-hover:w-full bg-[#39342D]'}`} />
              <span className={`h-[1.5px] transition-all duration-300 ${isOpen ? 'w-full -rotate-45 -translate-y-[6px] bg-[#E9DFCE]' : 'w-1/2 group-hover:w-full bg-[#39342D]'}`} />
            </div>

            {/* MENU / CLOSE TEXT */}
            <span className="overflow-hidden h-4 hidden xs:block">
              <span className={`block transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:-translate-y-full ${isOpen ? 'text-[#E9DFCE]' : 'text-[#39342D]'}`}>
                {isOpen ? 'CLOSE' : 'MENU'}
              </span>
              <span className={`block transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:-translate-y-full ${isOpen ? 'text-[#E9DFCE]' : 'text-[#39342D]'}`}>
                {isOpen ? 'CLOSE' : 'OPEN'}
              </span>
            </span>
          </button>
        </div>

        {/* CENTER: LOGO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 flex justify-center items-center pointer-events-auto z-50">
          <div className={`transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
            <a href="/" onClick={() => setIsOpen(false)} className="block py-1">
              <img
                src="/logo.png"
                alt="The Zencraft Logo"
                className={`w-auto object-contain transition-all duration-500 ease-out hover:scale-105 active:scale-95 ${isScrolledPastHero && !isOpen ? 'h-24 sm:h-26 md:h-28' : 'h-26 sm:h-32 md:h-36'
                  }`}
              />
            </a>
          </div>
        </div>

        {/* RIGHT: CONSULTATION BUTTON */}
        <div className={`flex items-center relative z-50 pointer-events-auto transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={openModal}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border px-3 py-2 sm:px-5 sm:py-2.5 font-body text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all duration-500 ease-out active:scale-95 ${isOpen
              ? 'border-[#E9DFCE] text-[#E9DFCE] hover:bg-[#E9DFCE] hover:text-[#39342D]'
              : 'border-[#39342D] bg-[#F8F5EE]/60 text-[#39342D] hover:bg-[#39342D] hover:text-[#F8F5EE]'
              }`}
          >
            {/* SHIMMER EFFECT */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

            {/* SLIDING TEXT */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em]">
              <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">CONSULTATION</span>
              <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 font-bold leading-none">GET STARTED</span>
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
            // 100dvh ensures it covers the full viewport without gaps on mobile browsers
            className="fixed inset-0 w-full h-[100dvh] z-40 flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-8 select-none overflow-hidden"
          >
            {/* MENU BACKGROUND IMAGE */}
            <div className="absolute inset-0 w-full h-full z-0 bg-[#39342D]">
              <img
  src="/navbar-bg.png"
  alt="Navigation Background"
  className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 transition-transform duration-1000 ease-out"
/>
              {/* Dark overlay & slight blur to ensure Ivory text is perfectly visible against the image */}
              <div className="absolute inset-0 bg-[#39342D]/20 backdrop-blur-sm" />
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="relative z-10 flex flex-col items-center justify-center flex-grow space-y-4 sm:space-y-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden py-1"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    // Restored Ivory color (#F8F5EE) for high contrast and visibility
                    className="block text-2xl sm:text-3xl md:text-4xl font-karlen font-normal tracking-[0.18em] uppercase text-center text-[#F8F5EE] drop-shadow-md transition-all duration-500 ease-out hover:text-[#B58A3A] hover:tracking-[0.24em]"
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
              transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-4xl mx-auto border-t border-[#E9DFCE]/30 pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center font-body text-[10px] sm:text-xs tracking-widest"
            >
              <div className="group">
                <p className="text-[#B58A3A] mb-1 uppercase font-bold text-[9px] sm:text-[10px] drop-shadow-sm">PHONE</p>
                <a href="tel:+919109627282" className="text-[#E9DFCE] hover:text-[#B58A3A] transition-colors duration-300 block drop-shadow-md">
                  +91 91096 27282
                </a>
              </div>
              <div className="group">
                <p className="text-[#B58A3A] mb-1 uppercase font-bold text-[9px] sm:text-[10px] drop-shadow-sm">E-MAIL</p>
                <a href="mailto:hello@thezencraft.com" className="text-[#E9DFCE] hover:text-[#B58A3A] transition-colors duration-300 block drop-shadow-md">
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