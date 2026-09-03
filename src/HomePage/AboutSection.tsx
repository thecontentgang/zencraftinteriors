'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useModal } from '../components/ModalContext'; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModal();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // 1. Header Reveal
    tl.fromTo(".saas-header-el", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // 2. Bento Box Grid Staggered Reveal
    tl.fromTo(".bento-box", 
      { opacity: 0, y: 40, scale: 0.98 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    // 3. Subtle Parallax for the main image
    gsap.fromTo(".bento-img", 
      { scale: 1.1, y: 0 }, 
      { 
        scale: 1, 
        y: "10%", 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#050505] text-white overflow-hidden font-sans"
    >
      {/* Background Elements: Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <div className="saas-header-el inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-[10px] tracking-widest uppercase bg-white/5 border border-white/10 text-white/70 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_8px_var(--color-secondary)]" />
            Our Studio
          </div>
          <h2 className="saas-header-el text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen tracking-tight leading-[1.05] text-white/95 mb-6">
            Designing spaces for <br className="hidden md:block" />
            <span className="text-[var(--color-secondary)] italic font-light">Modern Living.</span>
          </h2>
          <p className="saas-header-el text-white/50 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            We operate at the intersection of architectural precision and bespoke luxury. Zencraft transforms everyday environments into deeply personal sanctuaries.
          </p>
        </div>

        {/* --- BENTO BOX GRID --- */}
        {/* FIX: Changed md:grid-cols-3 to md:grid-cols-2. Removed auto-rows-fr so items size naturally. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Box 1: Core Philosophy (Text) - Spans 2 Cols */}
          {/* FIX: Added md:col-span-2 to span full width on tablet */}
          <div className="bento-box md:col-span-2 lg:col-span-2 bg-[#0D0D0E] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/20 transition-colors duration-500 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
            
            <div className="mb-12">
              <svg className="w-8 h-8 text-[var(--color-secondary)] mb-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h3 className="text-2xl md:text-3xl font-karlen text-white mb-4">The Art of Space</h3>
              <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                Design is more than aesthetics; it is about how a room makes you feel. We study natural light, flow, and materiality to craft environments that seamlessly support your lifestyle and bring quiet luxury to your daily routines.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-white/30">
              <span>Est: 2023</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Loc: Hyderabad, IN</span>
            </div>
          </div>

          {/* Box 2: Visual Media - Spans 2 Cols, 2 Rows */}
          {/* FIX: Added md:col-span-2 and a min-height for tablet so the image doesn't collapse. Fixed row spanning to only happen on desktop (lg:row-span-2). */}
          <div className="bento-box md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[350px] md:min-h-[450px] lg:min-h-0 bg-[#0D0D0E] border border-white/10 rounded-[2rem] overflow-hidden relative group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop" 
              alt="Interior Design Detail" 
              className="bento-img absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-[filter] duration-700"
            />
            {/* Elegant Overlay Widget */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:w-64 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] tracking-widest text-[var(--color-secondary)] uppercase">Craftsmanship</span>
                <span className="flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]"></span></span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-secondary)] w-full rounded-full" />
              </div>
              <span className="text-[10px] tracking-widest text-white/50 uppercase mt-2 block">Meticulous Detail</span>
            </div>
          </div>

          {/* Box 3: Capabilities (List) */}
          {/* FIX: Explicitly set to span 1 column so it pairs perfectly with Box 4 on tablet */}
          <div className="bento-box md:col-span-1 lg:col-span-1 bg-[#0D0D0E] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center hover:border-white/20 transition-colors duration-500 shadow-xl">
            <h4 className="text-[10px] tracking-widest text-white/50 uppercase mb-6">Our Expertise</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/80 font-light">
              {[
                "Turnkey Interiors", 
                "Bespoke Millwork", 
                "Space Planning", 
                "Material Sourcing"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Box 4: Studio Stats */}
          {/* FIX: Explicitly set to span 1 column so it pairs perfectly with Box 3 on tablet */}
          <div className="bento-box md:col-span-1 lg:col-span-1 bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg className="w-12 h-12 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="mb-8 relative z-10">
              <span className="block text-4xl md:text-5xl font-karlen text-[var(--color-secondary)] mb-1">1.8 M</span>
              <span className="text-[10px] tracking-widest uppercase text-white/60">Square feet Designed</span>
            </div>
            <div className="relative z-10">
              <span className="block text-4xl md:text-5xl font-karlen text-white mb-1">100%</span>
              <span className="text-[10px] tracking-widest uppercase text-white/60">Client Satisfaction</span>
            </div>
          </div>

          {/* Box 5: Wide CTA Footer with Background Image */}
          {/* FIX: Set to span 2 columns on tablet and 4 on desktop */}
          <div className="bento-box md:col-span-2 lg:col-span-4 border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 hover:border-[var(--color-secondary)]/40 transition-colors duration-500 shadow-xl relative overflow-hidden group">
            
            {/* Cinematic Background Image */}
            <img 
              src="/cta-bg.webp" 
              alt="Zencraft interior" 
              className="absolute inset-0 w-full h-full object-cover object-bottom grayscale-[20%] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            
            {/* Secondary base tint */}
            <div className="absolute inset-0 bg-[var(--color-primary)]/40 mix-blend-multiply" />

            {/* Left Content */}
            <div className="relative z-10 max-w-xl">
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-karlen text-white mb-3">
                Ready to transform your space?
              </h4>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                Connect with our lead designers to begin your journey toward a meticulously crafted sanctuary.
              </p>
            </div>
            
            {/* Right Action Button */}
            <div className="relative z-10 shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
              <button 
                onClick={openModal}
                className="w-full sm:w-auto bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-white font-bold text-[10px] md:text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] active:scale-95"
              >
                Book Consultation
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;