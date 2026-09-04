'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useModal } from '../components/ModalContext'; 

gsap.registerPlugin(ScrollTrigger, useGSAP);

const timelineSteps = [
  {
    id: 'step-1',
    num: '01',
    title: 'Consultation & Concept',
    desc: 'We begin by understanding your lifestyle, functional needs, and aesthetic vision. Our team drafts initial space layouts and mood boards to establish a clear design direction.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-2',
    num: '02',
    title: 'High-Fidelity 3D Visualization',
    desc: 'See it before we build it. We construct your entire home in photorealistic 3D, allowing you to experience the lighting, textures, and scale, eliminating all guesswork.',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-3',
    num: '03',
    title: 'Factory-Precision Manufacturing',
    desc: 'Your custom cabinetry, millwork, and furniture are engineered in our state-of-the-art facilities. This ensures absolute precision and zero hidden costs before arriving at your home.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-4',
    num: '04',
    title: 'Dedicated Site Execution',
    desc: 'Forget chasing contractors. You receive a single dedicated project manager who handles all heavy lifting, site supervision, and daily quality control on your behalf.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'step-5',
    num: '05',
    title: 'Handover & 5-Year Warranty',
    desc: 'We deliver your sanctuary on the guaranteed timeline, meticulously styled and ready for living. Every project comes backed by our comprehensive 5-year structural warranty.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  }
];

const WhyChooseUsTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Header Reveal (Fast trigger as it enters the viewport)
    gsap.fromTo(".why-header-el", 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 90%" }
      }
    );

    // 2. Animate the central glowing line drawing downwards
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 85%", // Starts drawing earlier
            end: "bottom 90%", 
            scrub: true,
          }
        }
      );
    }

    // 3. MatchMedia for Responsive Card Animations
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };
      
      const steps = gsap.utils.toArray<HTMLElement>(".timeline-step");
      steps.forEach((step, i) => {
        const isEven = i % 2 === 0;
        const card = step.querySelector('.timeline-card');
        const dot = step.querySelector('.timeline-dot');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 90%", // Instant trigger upon entering viewport
            toggleActions: "play none none reverse"
          }
        });

        // Fast Dot Animation
        tl.fromTo(dot, 
          { backgroundColor: "#F8F5EE", borderColor: "rgba(181,138,58,0.3)", scale: 0.8 },
          { backgroundColor: "#B58A3A", borderColor: "#B58A3A", scale: 1, duration: 0.3, ease: "back.out(2)" }
        );

        // Determine X-axis starting position based on device
        // Mobile: Always slide from the right (positive X). Desktop: Alternate left/right.
        const startX = isMobile ? 40 : (isEven ? 40 : -40);

        // Fast Card Slide-in
        tl.fromTo(card,
          { opacity: 0, x: startX, y: 15 },
          { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.15" // Snappy overlap with the dot
        );
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F8F5EE] text-[#39342D] py-20 md:py-32 px-4 sm:px-6 overflow-hidden font-sans">
      
      {/* Soft Ambient Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-32 flex flex-col items-center">
          
          <h2 className="why-header-el text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.05] text-[#39342D] mb-4 md:mb-6">
            Our Proven <br className="hidden md:block" />
            <span className="text-[#B58A3A] italic font-light">Journey.</span>
          </h2>
          <p className="why-header-el text-sm md:text-base text-[#8A8175] font-light leading-relaxed max-w-xl">
            We replace the traditional chaos of interior construction with a streamlined, 5-step process. Absolute transparency from concept to handover.
          </p>
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div className="timeline-container relative max-w-5xl mx-auto">
          
          {/* Faint Background Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-[#B58A3A]/20 md:-translate-x-1/2 z-0" />
          
          {/* Animated Gold Progress Line */}
          <div 
            ref={lineRef} 
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#B58A3A] md:-translate-x-1/2 z-0 origin-top shadow-[0_0_15px_#B58A3A]" 
          />

          {/* Timeline Steps */}
          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.id} className="timeline-step relative flex items-center justify-between w-full">
                  
                  {/* The Dot */}
                  <div className="timeline-dot absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full border-2 border-[#B58A3A]/30 bg-[#F8F5EE] transform -translate-x-1/2 z-20 shadow-sm" />

                  {/* Desktop Alternating Spacer */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-1' : 'order-3'}`} />

                  {/* The Content Card */}
                  <div className={`w-full md:w-5/12 pl-[64px] md:pl-0 ${isEven ? 'order-3' : 'order-1'}`}>
                    <div className="timeline-card group bg-white/80 backdrop-blur-xl border border-[#B58A3A]/20 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(57,52,45,0.06)] hover:border-[#B58A3A]/40 hover:shadow-[0_20px_50px_rgba(57,52,45,0.1)] transition-all duration-500">
                      
                      {/* Card Image */}
                      <div className="relative w-full h-44 sm:h-56 md:h-64 overflow-hidden">
                        <img 
                          src={step.img} 
                          alt={step.title} 
                          className="absolute inset-0 w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                        />
                        {/* Soft overlay so the badge stands out without using heavy black */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#39342D]/40 to-transparent" />
                        
                        {/* Number Badge */}
                        <div className="absolute bottom-4 left-4 md:left-6 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#B58A3A]/20 text-[#B58A3A] font-karlen text-lg shadow-md">
                          {step.num}
                        </div>
                      </div>

                      {/* Card Text */}
                      <div className="p-5 md:p-8 pt-6 md:pt-8">
                        <h3 className="text-xl md:text-2xl font-karlen text-[#39342D] mb-2 md:mb-3 group-hover:text-[#B58A3A] transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-[13px] md:text-sm text-[#8A8175] font-light leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="why-header-el mt-20 md:mt-32 flex justify-center">
          <button 
            onClick={openModal}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#B58A3A] bg-[#B58A3A] px-7 py-3.5 w-[85%] sm:w-auto font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-out hover:bg-white hover:text-[#39342D] hover:border-[#39342D] hover:shadow-[0_0_30px_rgba(181,138,58,0.3)] active:scale-95 cursor-pointer"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
            <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em] w-full min-w-[160px]">
              <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">START YOUR PROJECT</span>
              <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 font-bold leading-none">GET STARTED</span>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsTimeline;