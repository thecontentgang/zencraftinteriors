'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useModal } from '../components/ModalContext'; // Adjust path if needed

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    id: '01',
    title: 'Residential Sanctuaries',
    description: 'End-to-end interior design for luxury villas and bespoke apartments. We create deeply personal spaces that balance elegant aesthetics with daily functionality.',
    features: ['Space Planning', 'Custom Millwork', 'Material Selection', 'Turnkey Installation'],
    image: '/residential-design.webp',
    accentColor: 'from-orange-500/20' 
  },
  {
    id: '02',
    title: 'Commercial & Hospitality',
    description: 'Elevating brand identities through immersive spatial design. From boutique hotels to high-end executive offices, we design spaces that captivate and convert.',
    features: ['Brand Translation', 'Flow Optimization', 'Acoustic Design', 'Commercial Lighting'],
    image: '/commercial-design.webp',
    accentColor: 'from-blue-500/20' 
  },
  {
    id: '03',
    title: 'Architectural Renovation',
    description: 'Breathing new life into existing structures. We handle structural remodeling, layout reconfiguration, and complete exterior-to-interior modernization.',
    features: ['Structural Drafting', 'Permit Management', 'Contractor Oversight', '3D Visualization'],
    image: '/architecture-rennovation.webp',
    accentColor: 'from-emerald-500/20' 
  },
  {
    id: '04',
    title: 'Bespoke Furniture & Styling',
    description: 'The final layer of soul. We curate rare artifacts, source global art pieces, and design custom furniture tailored to the exact dimensions of your space.',
    features: ['Art Curation', 'Textile Sourcing', 'Custom Upholstery', 'Final Decor Styling'],
    image: '/furniture.webp',
    accentColor: 'from-purple-500/20' 
  }
];

const ServicesSection: React.FC = () => {
  const { openModal } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Header Reveal
    gsap.fromTo('.section-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    );

    // 2. Alternating Row Reveals
    const rows = gsap.utils.toArray('.service-row') as HTMLElement[];

    rows.forEach((row, i) => {
      const isEven = i % 2 === 0;
      const imgWrapper = row.querySelector('.img-wrapper');
      const imgInner = row.querySelector('.img-inner');
      const card = row.querySelector('.glass-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      // Image wrapper slides up slightly
      tl.fromTo(imgWrapper,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Image inner parallax scale down (cinematic feel)
      tl.fromTo(imgInner,
        { scale: 1.15 },
        { scale: 1, duration: 1.5, ease: 'power2.out' },
        '<'
      );

      // Glass card floats in from the side based on alternating layout
      tl.fromTo(card,
        { opacity: 0, x: isEven ? 40 : -40, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
        '<0.2'
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] py-20 md:py-32 font-body overflow-hidden selection:bg-sand selection:text-primary">

      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[85rem] mx-auto w-full px-4 sm:px-6 lg:px-12">

        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 section-header">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 md:w-12 h-px bg-secondary" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-secondary">
              Our Expertise
            </span>
            <span className="w-8 md:w-12 h-px bg-secondary" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen text-white leading-[1.05] tracking-tight max-w-4xl">
            Signature <span className="text-sand italic font-light">Services</span>
          </h2>
        </div>

        {/* --- ALTERNATING CARDS LAYOUT --- 
            Adjusted Gaps: gap-20 (mobile), gap-28 (tablet), gap-32 (desktop)
        */}
        <div className="flex flex-col gap-20 md:gap-28 lg:gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`service-row relative w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center group`}
              >

                {/* --- 1. CINEMATIC IMAGE HALF --- 
                    Adjusted Heights: 320px (mobile), 400px (tablet), 500px (desktop)
                    Adjusted Widths: 60% on desktop (was 65%) to balance the shorter height
                */}
                <div className="img-wrapper relative w-full lg:w-[60%] h-[320px] sm:h-[400px] lg:h-[500px] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl z-10 shrink-0">
                  <img
                    src={service.image} // FIXED: was service.img
                    alt={service.title}
                    className="img-inner w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-[filter] duration-1000"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                </div>

                {/* --- 2. FLOATING GLASS CARD HALF --- 
                    Adjusted Widths: 90% (mobile), 80% (tablet), 45% (desktop)
                    Adjusted Overlap: -mt-12 (mobile), lg:-ml-24 / lg:-mr-24 (desktop)
                */}
                <div className={`
                  glass-card relative z-20 w-[90%] sm:w-[80%] lg:w-[45%] -mt-12 sm:-mt-16 lg:mt-0
                  ${isEven ? 'lg:-ml-24' : 'lg:-mr-24'}
                `}>

                  <div className="relative bg-[#050505]/70 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 hover:bg-[#050505]/90 hover:border-white/20">

                    {/* FIXED: was service.accent, also removed "to-transparent" from data object and placed it here for cleaner Tailwind compiling */}
                    <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${service.accentColor} to-transparent opacity-30 pointer-events-none -z-10`} />

                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <span className="text-3xl md:text-4xl font-karlen font-bold text-white/20 group-hover:text-[#D4AF37] transition-colors duration-700">
                        {service.id}
                      </span>
                      <div className="h-px flex-grow bg-white/10" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-karlen text-white mb-4 sm:mb-6 group-hover:text-[#D4AF37] transition-colors duration-700">
                      {service.title}
                    </h3>

                    <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-8 md:mb-10">
                      {service.description} {/* FIXED: was service.desc */}
                    </p>

                    <button
                      type="button"
                      onClick={openModal}
                      className="inline-flex items-center gap-4 group/btn"
                    >
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover/btn:border-[#D4AF37] group-hover/btn:text-[#050505] group-hover/btn:bg-[#D4AF37] transition-all duration-500">
                        {/* FIXED: Standardized Arrow Right SVG */}
                        <svg className="w-4 h-4 transform group-hover/btn:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M13 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white group-hover/btn:text-[#D4AF37] transition-colors duration-500">
                        Book a Consultation
                      </span>
                    </button>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;