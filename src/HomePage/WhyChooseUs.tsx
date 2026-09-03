'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useModal } from '../components/ModalContext';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WhyChooseUsBento: React.FC = () => {
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
    tl.fromTo(".why-header-el", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // 2. Bento Cells "Snappy" Staggered Reveal
    tl.fromTo(".why-bento-cell", 
      { opacity: 0, y: 50, scale: 0.95 }, 
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "back.out(1.2)" // Snappy, satisfying pop-in effect
      },
      "-=0.4"
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] text-white py-24 md:py-32 px-4 sm:px-6 overflow-hidden font-sans">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="why-header-el inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase text-white/70 bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_8px_var(--color-secondary)]" />
            The Zencraft Standard
          </span>
          <h2 className="why-header-el text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.05] text-white/95 mb-6">
            Why Partner With <br className="hidden md:block" />
            <span className="text-[var(--color-secondary)] italic font-light">Our Studio?</span>
          </h2>
          <p className="why-header-el text-sm md:text-base text-white/50 font-light leading-relaxed max-w-xl">
            We replace the traditional chaos of interior construction with streamlined processes, strict quality control, and absolute transparency.
          </p>
        </div>

        {/* --- BENTO GRID LAYOUT --- 
            Desktop: 4 Columns. Tablet: 2 Columns. Mobile: 1 Column.
            auto-rows-[250px] forces a consistent row height for perfect interlocking.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[280px]">
          
          {/* CELL 1: Massive Hero Box (Spans 2 cols, 2 rows) */}
          <div className="why-bento-cell lg:col-span-2 lg:row-span-2 bg-[#0D0D0E] border border-white/10 rounded-[2rem] overflow-hidden relative group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop" 
              alt="3D Visualization" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white/80 font-mono text-[10px] mb-4 backdrop-blur-md">01</span>
              <h3 className="text-3xl md:text-4xl font-karlen text-white mb-3">See It Before We Build It</h3>
              <p className="text-sm text-white/70 font-light leading-relaxed max-w-md">
                We build your entire home in high-fidelity 3D before a single hammer swings. You will know exactly what the lighting, textures, and scale will look and feel like, eliminating all guesswork.
              </p>
            </div>
          </div>

          {/* CELL 2: Data/Stats Box (Spans 1 col, 1 row) */}
          <div className="why-bento-cell lg:col-span-1 lg:row-span-1 bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20 rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-[var(--color-secondary)]/10 transition-colors duration-500 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-secondary)]/20 blur-[40px] rounded-full group-hover:bg-[var(--color-secondary)]/40 transition-colors duration-500 pointer-events-none" />
            <svg className="w-6 h-6 text-[var(--color-secondary)] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className="block text-4xl font-karlen text-[var(--color-secondary)] mb-1">Zero</span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">Hidden Costs</span>
            </div>
          </div>

          {/* CELL 3: Materials Media Box (Spans 1 col, 1 row) */}
          <div className="why-bento-cell lg:col-span-1 lg:row-span-1 bg-[#0D0D0E] border border-white/10 rounded-[2rem] overflow-hidden relative group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop" 
              alt="Premium Materials" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out opacity-60 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-transparent pointer-events-none" />
            <div className="absolute top-6 left-6 pr-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white shadow-sm">Premium Sourcing</span>
              <p className="text-xs text-white/60 mt-2 font-light">We source globally to ensure uncompromised quality.</p>
            </div>
          </div>

          {/* CELL 4: Wide Feature Box (Spans 2 cols, 1 row) */}
          <div className="why-bento-cell lg:col-span-2 lg:row-span-1 bg-[#0D0D0E] border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-white/20 transition-colors duration-500 shadow-xl">
            <div className="absolute right-0 bottom-0 w-1/2 h-full pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity duration-700">
              {/* Abstract decorative graphic */}
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[var(--color-secondary)] translate-x-1/4 translate-y-1/4 transform scale-150">
                <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,95.5,-3C94.2,12,85.5,26.5,75.3,38.8C65.1,51.1,53.4,61.2,40.4,68.9C27.4,76.6,13.7,82,-0.5,82.9C-14.7,83.8,-29.4,79.2,-41.8,71.1C-54.2,63,-64.3,51.4,-72.6,38.4C-80.9,25.4,-87.4,11,-88.3,-3.8C-89.2,-18.6,-84.5,-33.8,-76.1,-46.8C-67.7,-59.8,-55.6,-70.6,-41.9,-78.1C-28.2,-85.6,-14.1,-89.8,0.7,-91.1C15.5,-92.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="relative z-10 max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                 <span className="w-2 h-2 bg-[var(--color-secondary)] rounded-full" />
                 <h3 className="text-xl md:text-2xl font-karlen text-white">A Single Point of Contact</h3>
              </div>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Forget chasing down painters, electricians, and carpenters. You get one dedicated project manager who handles the heavy lifting, site supervision, and daily quality control on your behalf.
              </p>
            </div>
          </div>

          {/* CELL 5: Small List Box (Spans 1 col, 1 row) */}
          <div className="why-bento-cell lg:col-span-1 lg:row-span-1 bg-[#0D0D0E] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center group hover:border-[var(--color-secondary)]/30 transition-colors duration-500 shadow-xl">
            <h4 className="text-[10px] font-mono tracking-widest text-white/50 uppercase mb-6">Our Guarantees</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/80 font-light">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-secondary)] transition-colors" /> Fixed Timelines</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-secondary)] transition-colors" /> Transparent Pricing</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-secondary)] transition-colors" /> 5-Year Warranty</li>
            </ul>
          </div>

          {/* CELL 6: Wide Image/Text Box (Spans 2 cols, 1 row) */}
          <div className="why-bento-cell lg:col-span-2 lg:row-span-1 bg-[#0D0D0E] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col sm:flex-row group hover:border-white/20 transition-colors duration-500 shadow-xl relative">
            <div className="w-full sm:w-1/2 p-8 md:p-10 flex flex-col justify-center relative z-10">
              <h3 className="text-xl md:text-2xl font-karlen text-white mb-3">Factory-Precision Craft</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Our custom cabinetry and woodwork are engineered in state-of-the-art facilities, ensuring absolute precision and a flawless finish before arriving at your home.
              </p>
            </div>
            <div className="w-full sm:w-1/2 h-48 sm:h-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" 
                alt="Custom Millwork" 
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0E] to-transparent sm:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] to-transparent sm:hidden block" />
            </div>
          </div>

          {/* CELL 7: Call To Action Box (Spans 1 col, 1 row) */}
          <div 
            onClick={openModal}
            className="why-bento-cell lg:col-span-1 lg:row-span-1 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center group hover:bg-white transition-colors duration-500 shadow-xl cursor-pointer"
          >
            <svg className="w-8 h-8 mb-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7-7m7-7H3" />
            </svg>
            <h3 className="text-lg font-karlen font-bold mb-2">Start Your Project</h3>
            <p className="text-xs opacity-80 font-mono tracking-widest uppercase">Book Consultation</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsBento;