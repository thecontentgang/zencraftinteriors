'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext'; // Adjust path based on your folder structure

export default function PremiumNavbar() {
  const { openModal } = useModal(); // Triggers the global Consultation Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  // Simplified Navbar Scroll Logic: Only track if we are past the top
  // to apply the background blur/shadow, but NEVER hide the navbar.
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolledPastHero(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'SERVICES', href: '/services' },
    { name: 'DESIGNS', href: '/designs' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      {/* HEADER NAVIGATION CONTAINER */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }} // Force y to 0 so it stays permanently fixed
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          isScrolledPastHero && !isOpen
            ? 'bg-primary/95 backdrop-blur-md border-b border-sand/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-primary/80 backdrop-blur-sm'
        }`}
      >
        {/* Left Action: Interactive Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 sm:gap-3 text-sand font-body font-medium tracking-[0.2em] text-[10px] sm:text-xs uppercase focus:outline-none group relative z-50 cursor-pointer pointer-events-auto"
        >
          <div className="w-5 sm:w-6 h-3.5 flex flex-col justify-between relative overflow-hidden">
            <span className={`w-full h-[1.5px] bg-sand transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`w-3/4 h-[1.5px] bg-sand transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
            <span className={`w-full h-[1.5px] bg-sand transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </div>
          <span className="overflow-hidden h-4 hidden xs:block">
            <span className="block transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:-translate-y-full">
              {isOpen ? 'CLOSE' : 'MENU'}
            </span>
            <span className="block transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:-translate-y-full text-sand/60">
              {isOpen ? 'CLOSE' : 'OPEN'}
            </span>
          </span>
        </button>

        {/* Center: Scaled Logo Presentation (MADE BIGGER) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/7 flex justify-center items-center pointer-events-auto z-50">
          <a href="/" onClick={() => setIsOpen(false)} className="block">
            <img
              src="/logo.png"
              alt="Zencraft Logo"
              // Increased height values across all breakpoints
              className={`w-auto object-contain transition-all duration-500 ease-out hover:scale-105 active:scale-95 ${
                isScrolledPastHero && !isOpen 
                  ? 'h-20 sm:h-24 md:h-28' // Scrolled state size
                  : 'h-28 sm:h-32 md:h-36' // Initial "top" state size (Much bigger)
              }`}
            />
          </a>
        </div>

        {/* Right Action: Enhanced High-Contrast Button Layout (Mobile Optimized) */}
        <div className="flex items-center relative z-50 pointer-events-auto">
          <button
            onClick={openModal} // Connected to the global modal context
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-sand bg-primary/40 px-3 py-2 sm:px-6 sm:py-3 font-body text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-sand transition-all duration-500 ease-out hover:rounded-none hover:border-sand hover:bg-sand hover:text-primary hover:shadow-[0_0_25px_rgba(220,200,163,0.5)] active:scale-95"
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]"></span>
            
            {/* Sliding Text Effect */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em]">
              <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">
                CONSULTATION
              </span>
              <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 text-primary font-bold leading-none">
                GET STARTED
              </span>
            </div>
          </button>
        </div>
      </motion.header>

      {/* OVERLAY NAVIGATION MENU - DARK */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 bg-primary z-40 flex flex-col justify-between pt-32 sm:pt-36 pb-8 sm:pb-12 px-6 sm:px-8 text-sand select-none"
          >
            {/* Visual Balance Markers */}
            <div className="absolute bottom-0 left-8 opacity-20 pointer-events-none hidden lg:block">
              <span className="text-[10px] tracking-widest block transform rotate-90 origin-left mb-4 text-sand">||||||||||||||</span>
            </div>
            <div className="absolute bottom-0 right-8 opacity-20 pointer-events-none hidden lg:block">
              <span className="text-[10px] tracking-widest block transform -rotate-90 origin-right mb-4 text-sand">||||||||||||||</span>
            </div>

            {/* Central Navigation Links */}
            <nav className="flex flex-col items-center justify-center flex-grow space-y-2 sm:space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl sm:text-4xl md:text-5xl font-karlen font-normal tracking-[0.18em] uppercase text-center transition-all duration-500 ease-out text-sand/70 hover:text-sand hover:tracking-[0.24em]"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Responsive Footer Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-4xl mx-auto border-t border-sand/20 pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center font-body text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-widest"
            >
              <div className="group">
                <p className="text-sand/50 mb-0.5 sm:mb-1 uppercase font-semibold text-[9px] sm:text-[10px]">PHONE</p>
                <a href="tel:+919876543210" className="text-sand/70 hover:text-sand transition-colors duration-300 block py-1">
                  +91 98765 43210
                </a>
              </div>
              <div className="group">
                <p className="text-sand/50 mb-0.5 sm:mb-1 uppercase font-semibold text-[9px] sm:text-[10px]">E-MAIL</p>
                <a href="mailto:hello@thezencraft.com" className="text-sand/70 hover:text-sand transition-colors duration-300 block py-1">
                  HELLO@THEZENCRAFT.COM
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}