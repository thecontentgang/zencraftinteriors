'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from './ModalContext'; 

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const { openModal } = useModal(); 
  
  // Local state for the Privacy Policy modal
  const [showPrivacy, setShowPrivacy] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const footerLinksRef = useRef<HTMLDivElement>(null);

  // Keep only Instagram
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/thezencraftinteriors', // Replace with actual link
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    }
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

  // Helper for links that are in progress
  const handleInProgressClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("This page is currently in progress and will be available soon.");
  };

  return (
    <>
      <footer 
        ref={footerRef} 
        className="relative w-full bg-[var(--color-primary)] pt-32 pb-8 px-2 md:px-6 overflow-hidden"
      >
        {/* THE RESPONSIVE HOUSE CONTAINER */}
        <div className="relative w-[98%] max-w-[1536px] mx-auto bg-[var(--color-secondary)] rounded-[2rem] md:rounded-[3rem] px-6 sm:px-10 pt-6 pb-8 flex flex-col items-center z-10 shadow-2xl text-[var(--color-primary)]">
          
          {/* --- THE ROOF PEAK --- */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] md:w-[200px] aspect-square bg-[var(--color-secondary)] rounded-[1.5rem] md:rounded-[2rem] rotate-45 -z-10" />

          {/* --- CTA CONTENT --- */}
          <div ref={ctaContentRef} className="flex flex-col items-center text-center w-full">
            
            {/* Logo Container */}
            <div className="w-16 h-16 md:w-30 md:h-32 -mt-16 md:-mt-24 mb-6 md:mb-8 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Zencraft Interiors Logo" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-karlen tracking-tighter leading-tight mb-6 md:mb-8 max-w-2xl">
  <span className="text-[var(--color-primary)]/70">Imagine</span> It. We’ll Build It.
</h2>

            {/* Button */}
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
            {/* Column 1: Brand & Socials */}
            <div className="sm:col-span-2 flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10">
              {/* Width reduced via max-w-xs and text updated to emphasize Instagram */}
              <p className="max-w-xs text-[var(--color-primary)]/80 font-medium leading-relaxed mb-6">
                Follow us on Instagram for our latest projects, daily design inspiration, and behind-the-scenes moments.
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-all duration-300"
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
                <Link to="/" className="hover:opacity-100 transition-opacity duration-200">Home</Link>
                <Link to="/projects" className="hover:opacity-100 transition-opacity duration-200">Projects</Link>
                <Link to="/services" className="hover:opacity-100 transition-opacity duration-200">Services</Link>
                
                {/* Design (In Progress) with Hover Tooltip */}
                <div className="relative group inline-block">
                  <Link 
                    to="#" 
                    onClick={handleInProgressClick} 
                    className="hover:opacity-100 transition-opacity duration-200 opacity-50"
                  >
                    Design
                  </Link>
                  <span className="absolute left-12 top-0 md:left-auto md:top-auto md:-right-24 bg-[var(--color-primary)] text-[var(--color-secondary)] text-[9px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    In Progress
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Company */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-bold tracking-widest uppercase mb-4 opacity-90">Company</h4>
              <div className="flex flex-col gap-3 font-medium opacity-70">
                <Link to="/about" className="hover:opacity-100 transition-opacity duration-200">About Us</Link>
                
                {/* Careers (In Progress) with Hover Tooltip */}
                <div className="relative group inline-block">
                  <Link 
                    to="#" 
                    onClick={handleInProgressClick} 
                    className="hover:opacity-100 transition-opacity duration-200 opacity-50"
                  >
                    Careers
                  </Link>
                  <span className="absolute left-16 top-0 md:left-auto md:top-auto md:-right-24 bg-[var(--color-primary)] text-[var(--color-secondary)] text-[9px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    In Progress
                  </span>
                </div>

                <Link to="/contact" className="hover:opacity-100 transition-opacity duration-200">Contact Us</Link>
                
                {/* Privacy Policy (Triggers Modal) */}
                <button 
                  onClick={() => setShowPrivacy(true)}
                  className="text-left hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 mt-10 md:mt-12 text-[10px] md:text-xs font-semibold uppercase tracking-wider opacity-60">
            <span>© {new Date().getFullYear()} Zencraft Interiors. All rights reserved.</span>
            <span>
              Designed By{' '}
              <a 
                href="https://thecontentgang.com" 
                target="_blank" 
                rel="noopener noreferrer"
                // thecontentGang styled strictly in black text
                className="text-black font-extrabold hover:underline transition-all duration-300"
              >
                thecontentGang
              </a>
            </span>
          </div>

        </div>
      </footer>

      {/* --- PRIVACY POLICY MODAL --- */}
      {showPrivacy && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-6 transition-opacity"
          onClick={() => setShowPrivacy(false)}
        >
          <div 
            className="bg-[#F7F5F2] text-[#050505] p-8 md:p-12 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <div className="flex justify-between items-center mb-6 border-b border-black/10 pb-4">
              <h3 className="text-3xl font-karlen">Privacy Policy</h3>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="text-black/50 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-sm md:text-base leading-relaxed font-light opacity-80">
              <p>
                At <strong>Zencraft Interiors</strong>, your privacy and the confidentiality of your home are our highest priorities. This Privacy Policy outlines how we handle your personal data and project details.
              </p>
              
              <h4 className="font-bold text-black mt-6 mb-2">1. Information Collection</h4>
              <p>
                We only collect information necessary to execute your design project. This includes contact details, property blueprints, architectural layouts, and personal design preferences.
              </p>

              <h4 className="font-bold text-black mt-6 mb-2">2. Confidentiality of Spaces</h4>
              <p>
                Any floor plans, financial budgets, or sensitive property details shared with our design team are kept strictly confidential. We will never share your private residence addresses or identifying structural layouts with third parties.
              </p>

              <h4 className="font-bold text-black mt-6 mb-2">3. Photography & Media</h4>
              <p>
                We pride ourselves on our portfolio, but we respect your boundaries. Photographs or videos of your completed interior project will only be published on our website or social media (e.g., Instagram) with your explicit written consent. We always ensure personal artifacts and identifying external views are obscured if requested.
              </p>

              <h4 className="font-bold text-black mt-6 mb-2">4. Data Security</h4>
              <p>
                Digital files, 3D renders, and client communications are stored securely on our encrypted servers. Access is restricted exclusively to the Zencraft team members directly involved in your project.
              </p>
            </div>

            <button 
              onClick={() => setShowPrivacy(false)}
              className="mt-10 w-full py-4 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;