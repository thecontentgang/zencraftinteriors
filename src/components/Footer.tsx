'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.footer-content-el',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: footerRef }
  );

  const handleInProgressClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('This page is currently in progress and will be available soon.');
  };

  return (
    <>
      <footer
        ref={footerRef}
        className="relative w-full font-sans overflow-hidden text-text-light bg-dark min-h-[40vh] flex flex-col justify-between rounded-t-[2.5rem] md:rounded-t-[3.5rem]"
      >
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <img
            src="/footer-bg.png"
            alt="Zencraft Architecture Background"
            className="w-full h-full object-cover object-center"
          />

          {/* Dark overlay */}
          {/* <div className="absolute inset-0 bg-[#181510]/35" /> */}

          {/* Warm gold glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(48,37,28,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 max-w-[90rem] w-full mx-auto pt-12 sm:pt-16 lg:pt-16 pb-8 px-5 sm:px-8 md:px-12 lg:px-24 flex flex-col justify-between flex-grow">

          {/* MOBILE + TABLET LAYOUT */}
          <div className="lg:hidden w-full flex flex-col">

            {/* LOGO */}
            <div className="footer-content-el flex flex-col items-center justify-center text-center pb-8">
              <img
                src="/logo.png"
                alt="Zencraft Logo"
                className="w-24 sm:w-28 md:w-32 h-auto object-contain drop-shadow-lg"
              />

            </div>

            {/* DIVIDER */}
            <div className="w-full h-px bg-background/10" />

            {/* NAVIGATION TWO COLUMNS */}
            <div className="footer-content-el grid grid-cols-2 gap-x-8 sm:gap-x-16 py-8 sm:py-10">

              {/* EXPLORE */}
              <div className="flex flex-col gap-4">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-1">
                  Explore
                </span>

                <Link to="/" className="text-xs sm:text-sm text-light-muted/70 hover:text-gold transition-colors duration-300">
                  Home
                </Link>

                <Link to="/projects" className="text-xs sm:text-sm text-light-muted/70 hover:text-gold transition-colors duration-300">
                  Projects
                </Link>

                <Link to="/services" className="text-xs sm:text-sm text-light-muted/70 hover:text-gold transition-colors duration-300">
                  Services
                </Link>

                {/* Design */}
                <div className="relative group w-fit">
                  <Link
                    to="#"
                    onClick={handleInProgressClick}
                    className="text-xs sm:text-sm text-light-muted/40 hover:text-text-light transition-colors duration-300"
                  >
                    Design
                  </Link>

                  <span className="hidden sm:block absolute left-10 top-0 bg-primary text-text-light text-[8px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold/30">
                    In Progress
                  </span>
                </div>
              </div>

              {/* COMPANY */}
              <div className="flex flex-col gap-4">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-1">
                  Company
                </span>

                <Link to="/about" className="text-xs sm:text-sm text-light-muted/70 hover:text-gold transition-colors duration-300">
                  About Us
                </Link>

                {/* Careers */}
                <div className="relative group w-fit">
                  <Link
                    to="#"
                    onClick={handleInProgressClick}
                    className="text-xs sm:text-sm text-light-muted/40 hover:text-text-light transition-colors duration-300"
                  >
                    Careers
                  </Link>

                  <span className="hidden sm:block absolute left-10 top-0 bg-primary text-text-light text-[8px] uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold/30">
                    In Progress
                  </span>
                </div>

                <Link to="/contact" className="text-xs sm:text-sm text-light-muted/70 hover:text-gold transition-colors duration-300">
                  Contact Us
                </Link>

                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-xs sm:text-sm text-light-muted/70 hover:text-gold transition-colors duration-300 text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="w-full h-px bg-background/10" />

            {/* CONTACT INFORMATION */}
            <div className="footer-content-el flex flex-col py-8 sm:py-10">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-gold mb-7">
                Get In Touch
              </span>

              {/* EMAIL */}
              <a href="mailto:Enquiry@thezencraftinteriors.com" className="flex items-center gap-4 group mb-5">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                  <svg className="w-4 h-4 text-gold group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-gold mb-1">Email</span>
                  <span className="text-xs sm:text-sm text-light-muted/75 break-all group-hover:text-gold transition-colors duration-300">
                    Enquiry@thezencraftinteriors.com
                  </span>
                </div>
              </a>

              {/* PHONE */}
              <a href="tel:+919573287143" className="flex items-center gap-4 group mb-6">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                  <svg className="w-4 h-4 text-gold group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>

                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-gold mb-1">Phone</span>
                  <span className="text-xs sm:text-sm text-light-muted/75 group-hover:text-gold transition-colors duration-300">
                    +91 95732 87143
                  </span>
                </div>
              </a>

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-primary mb-1">Studio</span>
                  <p className="text-xs sm:text-sm text-light-muted/70 font-light leading-relaxed">
                    3rd Floor, NBR Towers, Road No. 36,
                    <br />
                    Jawahar Colony, Jubilee Hills,
                    <br />
                    Hyderabad, Telangana 500033
                  </p>
                </div>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="footer-content-el flex flex-col items-center py-7 sm:py-8 border-t border-background/10">
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary mb-5">
                Follow Our Journey
              </span>

              <a
                href="https://instagram.com/thezencraftinteriors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-gold/40 text-background flex items-center justify-center hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* MOBILE / TABLET LEGAL */}
            <div className="footer-content-el w-full flex flex-col items-center justify-center gap-4 text-center text-[8px] sm:text-[9px] font-bold tracking-[0.18em] uppercase text-light-muted/50 pt-7 border-t border-background/10">
              <span>
                {new Date().getFullYear()} © ZENCRAFT INTERIORS.
                <br className="sm:hidden" /> ALL RIGHTS RESERVED.
              </span>

              <span>
                Designed By{' '}
                <a
                  href="https://thecontentgang.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background text-black px-2 py-1 rounded font-extrabold hover:bg-gold hover:text-dark transition-all duration-300"
                >
                  thecontentGang
                </a>
              </span>
            </div>

          </div>

          {/* DESKTOP FOOTER (LG AND ABOVE) */}
          <div className="hidden lg:flex w-full flex-col justify-between flex-grow">

            {/* DESKTOP TOP AREA */}
            <div className="footer-content-el w-full grid grid-cols-12 gap-8 items-center justify-between">

              {/* LEFT — NAVIGATION */}
              <div className="col-span-4 grid grid-cols-2 gap-8">

                {/* EXPLORE */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-1">
                    Explore
                  </span>

                  <Link to="/" className="text-xs md:text-sm font-medium text-light-muted/70 hover:text-gold transition-all w-fit">
                    Home
                  </Link>

                  <Link to="/projects" className="text-xs md:text-sm font-medium text-light-muted/70 hover:text-gold transition-all w-fit">
                    Projects
                  </Link>

                  <Link to="/services" className="text-xs md:text-sm font-medium text-light-muted/70 hover:text-gold transition-all w-fit">
                    Services
                  </Link>

                  {/* Design */}
                  <div className="relative group w-fit">
                    <Link to="#" onClick={handleInProgressClick} className="text-xs md:text-sm font-medium text-light-muted/40 hover:text-gold transition-opacity">
                      Design
                    </Link>

                    <span className="absolute left-14 top-0 bg-primary text-text-light text-[9px] uppercase tracking-widest px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold/30">
                      In Progress
                    </span>
                  </div>
                </div>

                {/* COMPANY */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-1">
                    Company
                  </span>

                  <Link to="/about" className="text-xs md:text-sm font-medium text-light-muted/70 hover:text-gold transition-all w-fit">
                    About Us
                  </Link>

                  {/* Careers */}
                  <div className="relative group w-fit">
                    <Link to="#" onClick={handleInProgressClick} className="text-xs md:text-sm font-medium text-light-muted/40 hover:text-gold transition-opacity">
                      Careers
                    </Link>

                    <span className="absolute left-16 top-0 bg-primary text-text-light text-[9px] uppercase tracking-widest px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gold/30">
                      In Progress
                    </span>
                  </div>

                  <Link to="/contact" className="text-xs md:text-sm font-medium text-light-muted/70 hover:text-gold transition-all w-fit">
                    Contact Us
                  </Link>

                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="text-xs md:text-sm font-medium text-light-muted/70 hover:text-gold transition-all w-fit text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </div>

              </div>

              {/* CENTER — LOGO */}
              <div className="col-span-4 flex flex-col items-center justify-center text-center my-6">
                <img
                  src="/logo.png"
                  alt="Zencraft Logo"
                  className="w-24 md:w-32 h-auto object-contain drop-shadow-lg"
                />
              </div>

              {/* RIGHT — BUSINESS INFORMATION */}
              <div className="col-span-4 flex flex-col items-end text-right gap-4">
                <p className="text-xs md:text-sm text-light-muted/80 font-light leading-relaxed max-w-xs">
                  3rd Floor, NBR Towers, Road No. 36,
                  <br />
                  Jawahar Colony, Jubilee Hills,
                  <br />
                  Hyderabad, Telangana 500033
                </p>

                <div className="flex flex-col gap-1 text-xs md:text-sm font-light text-light-muted/80">
                  <a href="tel:+919573287143" className="hover:text-gold transition-colors">
                    +91 95732 87143
                  </a>

                  <a href="mailto:Enquiry@thezencraftinteriors.com" className="hover:text-gold transition-colors">
                    Enquiry@thezencraftinteriors.com
                  </a>
                </div>

                {/* Instagram */}
                <div className="pt-1">
                  <a
                    href="https://instagram.com/thezencraftinteriors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background/10 border border-gold/40 text-background flex items-center justify-center hover:bg-gold hover:border-gold hover:text-dark transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* DESKTOP LEGAL ROW */}
            <div className="footer-content-el w-full flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-light-muted/60 pt-6 border-t border-background/10 mt-12">
              <span>
                {new Date().getFullYear()} © ZENCRAFT INTERIORS. ALL RIGHTS RESERVED.
              </span>

              <span>
                Designed By{' '}
                <a
                  href="https://thecontentgang.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background text-black px-2 py-0.5 rounded font-extrabold hover:bg-gold hover:text-dark transition-all duration-300 ml-1"
                >
                  thecontentGang
                </a>
              </span>
            </div>

          </div>

        </div>

      </footer>

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 transition-opacity"
          onClick={() => setShowPrivacy(false)}
        >
          <div
            className="bg-background text-text-primary p-8 md:p-12 rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-6 border-b border-secondary/10 pb-4">
              <h3 className="text-3xl font-karlen text-text-primary">
                Privacy Policy
              </h3>

              <button
                onClick={() => setShowPrivacy(false)}
                className="text-text-primary/50 hover:text-primary transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PRIVACY CONTENT */}
            <div className="space-y-4 text-sm md:text-base leading-relaxed font-light text-text-secondary">
              <p>
                At{' '}
                <strong className="text-text-primary">
                  Zencraft Interiors
                </strong>
                , your privacy and the confidentiality of your home are our highest priorities. This Privacy Policy outlines how we handle your personal data and project details.
              </p>

              <h4 className="font-bold text-text-primary mt-6 mb-2">
                1. Information Collection
              </h4>
              <p>
                We only collect information necessary to execute your design project. This includes contact details, property blueprints, architectural layouts, and personal design preferences.
              </p>

              <h4 className="font-bold text-text-primary mt-6 mb-2">
                2. Confidentiality of Spaces
              </h4>
              <p>
                Any floor plans, financial budgets, or sensitive property details shared with our design team are kept strictly confidential. We will never share your private residence addresses or identifying structural layouts with third parties.
              </p>

              <h4 className="font-bold text-text-primary mt-6 mb-2">
                3. Photography & Media
              </h4>
              <p>
                We pride ourselves on our portfolio, but we respect your boundaries. Photographs or videos of your completed interior project will only be published on our website or social media (e.g., Instagram) with your explicit written consent. We always ensure personal artifacts and identifying external views are obscured if requested.
              </p>

              <h4 className="font-bold text-text-primary mt-6 mb-2">
                4. Data Security
              </h4>
              <p>
                Digital files, 3D renders, and client communications are stored securely on our encrypted servers. Access is restricted exclusively to the Zencraft team members directly involved in your project.
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-10 w-full py-4 rounded-full bg-secondary text-background text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors cursor-pointer"
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