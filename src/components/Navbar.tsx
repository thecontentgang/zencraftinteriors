'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './ModalContext'; // Adjust path based on your folder structure

export default function PremiumNavbar() {
  const { openModal } = useModal(); // Triggers the global Consultation Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  
  // Use a ref to track the last scroll position without causing re-renders
  const lastScrollY = useRef(0);

  // Enhanced Scroll Logic: Track position AND direction
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // 1. Track if we passed the hero
        setIsScrolledPastHero(currentScrollY > 40);

        // 2. Track scroll direction to hide/show elements
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down
          setIsScrollingDown(true);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setIsScrollingDown(false);
        }
        
        lastScrollY.current = currentScrollY;
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
    // { name: 'DESIGNS', href: '/designs' },
    // { name: 'BLOGS', href: '/blogs' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      {/* HEADER NAVIGATION CONTAINER 
          Note: Added pointer-events-none so when the background slides up, 
          the empty space doesn't block clicks on the page behind it.
      */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between pointer-events-none"
      >
        {/* --- DYNAMIC BACKGROUND LAYER --- 
            Slides up when scrolling down, comes back when scrolling up 
        */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out pointer-events-none ${
            isScrollingDown && !isOpen ? '-translate-y-full' : 'translate-y-0'
          } ${
            isScrolledPastHero && !isOpen
              ? 'bg-primary/95 backdrop-blur-md border-b border-sand/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
              : 'bg-primary/75 backdrop-blur-sm'
          }`}
        />

        {/* Left Action: Interactive Hamburger Menu Toggle */}
        <div className={`relative z-50 pointer-events-auto transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 sm:gap-3 text-sand font-body font-medium tracking-[0.2em] text-[10px] sm:text-xs uppercase focus:outline-none group cursor-pointer"
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
        </div>

        {/* Center: Correctly Fitted Logo Scale 
            (Behavior untouched: Does not slide up with the rest of the navbar) 
        */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 flex justify-center items-center pointer-events-auto z-50">
          <a href="/" onClick={() => setIsOpen(false)} className="block py-1">
            <img
              src="/logo.png"
              alt="Zencraft Logo"
              className={`w-auto object-contain transition-all duration-500 ease-out hover:scale-105 active:scale-95 ${
                isScrolledPastHero && !isOpen 
                  ? 'h-14 sm:h-18 md:h-20' 
                  : 'h-18 sm:h-24 md:h-32' 
              }`}
            />
          </a>
        </div>

        {/* Right Action: Enhanced High-Contrast Button Layout */}
        <div className={`flex items-center relative z-50 pointer-events-auto transition-transform duration-500 ease-in-out ${isScrollingDown && !isOpen ? '-translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={openModal} 
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-sand bg-primary/40 px-3 py-2 sm:px-5 sm:py-2.5 font-body text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-sand transition-all duration-500 ease-out hover:rounded-none hover:border-sand hover:bg-sand hover:text-primary hover:shadow-[0_0_25px_rgba(220,200,163,0.5)] active:scale-95"
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

      {/* OVERLAY NAVIGATION MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-8 text-sand select-none overflow-hidden"
          >
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/navbar-bg.webp" 
                alt="Navigation Background"
                className="w-full h-full object-cover scale-105"
              />
              {/* <div className="absolute inset-0 bg-primary/92 backdrop-blur-md" /> */}
            </div>

            {/* Central Navigation Links */}
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
                    className="block text-xl sm:text-3xl md:text-4xl font-karlen font-normal tracking-[0.18em] uppercase text-center transition-all duration-500 ease-out text-sand/70 hover:text-sand hover:tracking-[0.24em]"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Responsive Footer Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-3xl mx-auto border-t border-sand/20 pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center font-body text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-widest"
            >
              <div className="group">
                <p className="text-sand/50 mb-0.5 uppercase font-semibold text-[8px] sm:text-[9px]">PHONE</p>
                <a href="tel:+91 9573287143" className="text-sand/80 hover:text-sand transition-colors duration-300 block">
                  +91  95732 87143
                </a>
              </div>
              <div className="group">
                <p className="text-sand/50 mb-0.5 uppercase font-semibold text-[8px] sm:text-[9px]">E-MAIL</p>
                <a href="mailto:hello@thezencraft.com" className="text-sand/80 hover:text-sand transition-colors duration-300 block">
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