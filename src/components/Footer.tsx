'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { useModal } from './ModalContext';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer: React.FC = () => {
  const { openModal } = useModal(); 
  const [showPrivacy, setShowPrivacy] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
      }
    });

    // Top Section Reveal
    tl.fromTo(".footer-top-el", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // Center Logo pop-in
    tl.fromTo(".footer-logo-circle",
      { scale: 0, rotation: -90 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" },
      "-=0.4"
    );

    // Socials Reveal
    tl.fromTo(".footer-social",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
      "-=0.6"
    );

    // Massive Text Reveal (Letter by Letter)
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll('.char');
      gsap.fromTo(letters,
        { y: '100%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.05, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
          }
        }
      );
    }
  }, { scope: footerRef });

  const massiveWord = "ZENCRAFT";

  // Helper for links that are in progress
  const handleInProgressClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("This page is currently in progress and will be available soon.");
  };

  return (
    <>
      <footer ref={footerRef} className="w-full font-sans overflow-hidden">
        
        {/* --- TOP SECTION (IVORY) --- */}
        <div className="bg-[#F8F5EE] text-[#39342D] pt-24 pb-32 md:pb-48 px-6 md:px-12 lg:px-24">
          <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
            
            {/* Left: CTA */}
            <div className="flex flex-col max-w-md justify-center">
              <h3 className="footer-top-el text-4xl md:text-5xl font-karlen tracking-tighter leading-[1.05] mb-6">
                <span className="text-[#39342D]/50">Imagine It.</span> <br />
                We’ll Build It.
              </h3>
              
              <p className="footer-top-el text-sm text-[#8A8175] font-light leading-relaxed mb-8">
                Ready to transform your space? Connect with our lead designers to begin your journey toward a meticulously crafted sanctuary.
              </p>

              <div className="footer-top-el">
                <button 
                  type="button"
                  onClick={openModal}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#B58A3A] bg-[#B58A3A] px-7 py-3.5 w-fit font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-out hover:bg-white hover:text-[#39342D] hover:border-[#39342D] hover:shadow-[0_0_30px_rgba(181,138,58,0.3)] active:scale-95 cursor-pointer"
                >
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                  <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em] w-full min-w-[140px]">
                    <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">START PROJECT</span>
                    <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 font-bold leading-none">BOOK NOW</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Navigation Links */}
            <div className="flex flex-wrap md:justify-end gap-12 sm:gap-24 pt-4">
              
              {/* Explore Column */}
              <div className="flex flex-col gap-4">
                <span className="footer-top-el text-[10px] font-bold tracking-[0.2em] uppercase text-[#B58A3A] mb-2">Explore</span>
                <Link to="/" className="footer-top-el text-sm font-medium opacity-70 hover:opacity-100 hover:text-[#B58A3A] transition-all w-fit">Home</Link>
                <Link to="/projects" className="footer-top-el text-sm font-medium opacity-70 hover:opacity-100 hover:text-[#B58A3A] transition-all w-fit">Projects</Link>
                <Link to="/services" className="footer-top-el text-sm font-medium opacity-70 hover:opacity-100 hover:text-[#B58A3A] transition-all w-fit">Services</Link>
                
                {/* Design (In Progress) */}
                <div className="footer-top-el relative group w-fit">
                  <Link 
                    to="#" 
                    onClick={handleInProgressClick} 
                    className="text-sm font-medium opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Design
                  </Link>
                  <span className="absolute left-14 top-0 bg-[#39342D] text-[#F8F5EE] text-[9px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    In Progress
                  </span>
                </div>
              </div>

              {/* Company Column */}
              <div className="flex flex-col gap-4">
                <span className="footer-top-el text-[10px] font-bold tracking-[0.2em] uppercase text-[#B58A3A] mb-2">Company</span>
                <Link to="/about" className="footer-top-el text-sm font-medium opacity-70 hover:opacity-100 hover:text-[#B58A3A] transition-all w-fit">About Us</Link>
                
                {/* Careers (In Progress) */}
                <div className="footer-top-el relative group w-fit">
                  <Link 
                    to="#" 
                    onClick={handleInProgressClick} 
                    className="text-sm font-medium opacity-40 hover:opacity-100 transition-opacity"
                  >
                    Careers
                  </Link>
                  <span className="absolute left-16 top-0 bg-[#39342D] text-[#F8F5EE] text-[9px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    In Progress
                  </span>
                </div>

                <Link to="/contact" className="footer-top-el text-sm font-medium opacity-70 hover:opacity-100 hover:text-[#B58A3A] transition-all w-fit">Contact Us</Link>
                
                {/* Privacy Policy (Triggers Modal) */}
                <button 
                  onClick={() => setShowPrivacy(true)}
                  className="footer-top-el text-sm font-medium opacity-70 hover:opacity-100 hover:text-[#B58A3A] transition-all w-fit text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* --- BOTTOM SECTION (CHARCOAL) --- */}
        <div className="relative bg-[#39342D] text-[#F8F5EE] pt-24 md:pt-32 pb-8 px-6 md:px-12 lg:px-24">
          
          {/* THE OVERLAPPING LOGO CIRCLE */}
          <div className="footer-logo-circle absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 bg-[#F8F5EE] rounded-full flex items-center justify-center z-20 shadow-2xl overflow-hidden border-[6px] border-[#F8F5EE]">
            <div className="w-full h-full rounded-full border border-[#B58A3A]/30 flex items-center justify-center bg-[#F8F5EE] p-6">
              <img 
                src="/logo.png" 
                alt="Zencraft Interiors Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="max-w-[90rem] mx-auto flex flex-col items-center">
            
            {/* Centered Social Icon */}
            <div className="w-full flex justify-center items-center relative z-10 mb-16 px-4">
              <a 
                href="https://instagram.com/thezencraftinteriors" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#F8F5EE] text-[#39342D] flex items-center justify-center hover:bg-[#B58A3A] hover:text-white transition-colors duration-300 shadow-lg"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-6 h-6 md:w-7 md:h-7"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* MASSIVE BRAND TEXT - Added pt-4 and leading-none to prevent top cut-off */}
            <div 
              ref={textRef} 
              className="w-full flex justify-between overflow-hidden leading-none pt-4 pb-2 mb-12 sm:mb-20 pointer-events-none select-none"
            >
              {massiveWord.split('').map((char, index) => (
                <span 
                  key={index} 
                  className="char text-[15vw] md:text-[16.5vw] font-black font-karlen tracking-tighter text-[#F8F5EE]"
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Bottom Legal Row */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#E9DFCE]/60 pt-8 border-t border-[#F8F5EE]/10">
              <span>{new Date().getFullYear()} © ZENCRAFT INTERIORS. ALL RIGHTS RESERVED.</span>
              
              <span>
                Designed By{' '}
                <a 
                  href="https://thecontentgang.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#F8F5EE] text-black px-2 py-1 rounded font-extrabold hover:bg-[#B58A3A] hover:text-white transition-all duration-300 ml-1"
                >
                  thecontentGang
                </a>
              </span>
            </div>

          </div>
        </div>

      </footer>

      {/* --- PRIVACY POLICY MODAL --- */}
      {showPrivacy && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 transition-opacity"
          onClick={() => setShowPrivacy(false)}
        >
          <div 
            className="bg-[#F8F5EE] text-[#39342D] p-8 md:p-12 rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#B58A3A]/20"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex justify-between items-center mb-6 border-b border-[#39342D]/10 pb-4">
              <h3 className="text-3xl font-karlen text-[#39342D]">Privacy Policy</h3>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="text-[#39342D]/50 hover:text-[#B58A3A] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-sm md:text-base leading-relaxed font-light text-[#8A8175]">
              <p>
                At <strong className="text-[#39342D]">Zencraft Interiors</strong>, your privacy and the confidentiality of your home are our highest priorities. This Privacy Policy outlines how we handle your personal data and project details.
              </p>
              
              <h4 className="font-bold text-[#39342D] mt-6 mb-2">1. Information Collection</h4>
              <p>
                We only collect information necessary to execute your design project. This includes contact details, property blueprints, architectural layouts, and personal design preferences.
              </p>

              <h4 className="font-bold text-[#39342D] mt-6 mb-2">2. Confidentiality of Spaces</h4>
              <p>
                Any floor plans, financial budgets, or sensitive property details shared with our design team are kept strictly confidential. We will never share your private residence addresses or identifying structural layouts with third parties.
              </p>

              <h4 className="font-bold text-[#39342D] mt-6 mb-2">3. Photography & Media</h4>
              <p>
                We pride ourselves on our portfolio, but we respect your boundaries. Photographs or videos of your completed interior project will only be published on our website or social media (e.g., Instagram) with your explicit written consent. We always ensure personal artifacts and identifying external views are obscured if requested.
              </p>

              <h4 className="font-bold text-[#39342D] mt-6 mb-2">4. Data Security</h4>
              <p>
                Digital files, 3D renders, and client communications are stored securely on our encrypted servers. Access is restricted exclusively to the Zencraft team members directly involved in your project.
              </p>
            </div>

            <button 
              onClick={() => setShowPrivacy(false)}
              className="mt-10 w-full py-4 rounded-full bg-[#39342D] text-[#F8F5EE] text-xs font-bold tracking-widest uppercase hover:bg-[#B58A3A] transition-colors"
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