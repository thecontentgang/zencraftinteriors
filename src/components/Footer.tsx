'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from './ModalContext'; // 1. Import the Modal Context

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { openModal } = useModal(); // 2. Extract the openModal function

  const footerRef = useRef<HTMLElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const footerLinksRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: 'Facebook',
      url: '#',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: '#',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: '#',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'X',
      url: '#',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    },
    
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Compact, smooth fade-up animations
      if (ctaContentRef.current) {
        gsap.fromTo(
          ctaContentRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 80%" }
          }
        );
      }

      if (footerLinksRef.current) {
        gsap.fromTo(
          footerLinksRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: footerLinksRef.current, start: "top 90%" }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full bg-[var(--color-primary)] pt-32 pb-8 px-4 md:px-8 overflow-hidden"
    >
      {/* THE RESPONSIVE HOUSE CONTAINER 
        Uses overlapping CSS layers to guarantee perfect scaling without distortion 
      */}
      <div className="relative w-full max-w-[1200px] mx-auto bg-[var(--color-secondary)] rounded-[2rem] md:rounded-[3rem] px-6 sm:px-10 pt-6 pb-8 flex flex-col items-center z-10 shadow-2xl text-[var(--color-primary)]">
        
        {/* --- THE ROOF PEAK --- */}
        {/* This perfectly rotated square forms the peak. It never distorts. */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] md:w-[200px] aspect-square bg-[var(--color-secondary)] rounded-[1.5rem] md:rounded-[2rem] rotate-45 -z-10" />

        {/* --- CTA CONTENT --- */}
        <div ref={ctaContentRef} className="flex flex-col items-center text-center w-full">
          
          {/* Logo Container (Pulled up into the roof peak using negative margin) */}
          <div className="w-16 h-16 md:w-30 md:h-32 -mt-16 md:-mt-24 mb-6 md:mb-8 flex items-center justify-center">
            <img 
              src="/logo.png" // Replace with your actual logo path
              alt="Zencraft Interiors Logo" 
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-karlen tracking-tighter leading-tight mb-6 md:mb-8 max-w-2xl">
            Begin your <span className="text-[var(--color-primary)]/70">Journey</span> with us by your side
          </h2>

          {/* Button - Connected to the Modal Context */}
          <button 
            type="button"
            onClick={openModal} 
            className="bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 font-bold px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-sm tracking-widest uppercase mb-8 shadow-lg cursor-pointer"
          >
            Start Your Project
          </button>
          
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[var(--color-primary)]/10 mb-8 md:mb-10" />

        {/* --- COMPACT FOOTER LINKS GRID --- */}
        <div 
          ref={footerLinksRef} 
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-sm"
        >
          {/* Column 1: Brand & Socials (Takes up 2 columns on tablet/desktop) */}
          <div className="sm:col-span-2 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10">
            <p className="text-[var(--color-primary)]/80 font-medium leading-relaxed mb-6">
              Zencraft Interiors offers end-to-end design services - from architectural planning to setting up your dream sanctuary.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold tracking-widest uppercase mb-4 opacity-90">Explore</h4>
            <div className="flex flex-col gap-3 font-medium opacity-70">
              <a href="#home" className="hover:opacity-100 transition-opacity duration-200">Home</a>
              <a href="#portfolio" className="hover:opacity-100 transition-opacity duration-200">Our Portfolio</a>
              <a href="#services" className="hover:opacity-100 transition-opacity duration-200">Services</a>
              <a href="#process" className="hover:opacity-100 transition-opacity duration-200">Our Process</a>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold tracking-widest uppercase mb-4 opacity-90">Company</h4>
            <div className="flex flex-col gap-3 font-medium opacity-70">
              <a href="#about" className="hover:opacity-100 transition-opacity duration-200">About Us</a>
              <a href="#careers" className="hover:opacity-100 transition-opacity duration-200">Careers</a>
              <a href="#contact" className="hover:opacity-100 transition-opacity duration-200">Contact Us</a>
              <a href="#privacy" className="hover:opacity-100 transition-opacity duration-200">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 mt-10 md:mt-12 text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-50">
          <span>© {new Date().getFullYear()} Zencraft Interiors. All rights reserved.</span>
          <span>Designed in Hyderabad.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;