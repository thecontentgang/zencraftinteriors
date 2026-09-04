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
    title: 'Consultation',
    img: '/consultation.png'
  },
  {
    id: 'step-2',
    num: '02',
    title: 'Concept & Design',
    img: '/concept-design.png'
  },
  {
    id: 'step-3',
    num: '03',
    title: 'Material Selection',
    img: 'material-selection.webp'
  },
  {
    id: 'step-4',
    num: '04',
    title: 'Site Execution',
    img: '/site-execution.webp'
  },
  {
    id: 'step-5',
    num: '05',
    title: 'Handover',
    img: '/handover.webp'
  }
];

const WhyChooseUsTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Header Reveal
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
            start: "top 85%", 
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
            start: "top 90%", 
            toggleActions: "play none none reverse"
          }
        });

        // Fast Dot Animation
        tl.fromTo(dot, 
          { backgroundColor: "#F8F5EE", borderColor: "rgba(181,138,58,0.3)", scale: 0.8 },
          { backgroundColor: "#B58A3A", borderColor: "#B58A3A", scale: 1, duration: 0.3, ease: "back.out(2)" }
        );

        // Mobile: slide from right. Desktop: alternate left/right.
        const startX = isMobile ? 40 : (isEven ? 40 : -40);

        // Fast Card Slide-in
        tl.fromTo(card,
          { opacity: 0, x: startX, y: 15 },
          { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.15" 
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
          <span className="why-header-el inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#B58A3A] bg-[#B58A3A]/10 border border-[#B58A3A]/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3A] animate-pulse shadow-[0_0_8px_#B58A3A]" />
            The Zencraft Standard
          </span>
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

                  {/* The Premium Image + Text Block */}
                  <div className={`w-full md:w-5/12 pl-[64px] md:pl-0 ${isEven ? 'order-3' : 'order-1'}`}>
                    
                    <div className="timeline-card group w-full flex flex-col rounded-xl md:rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(57,52,45,0.08)] border border-[#B58A3A]/20 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(181,138,58,0.15)] hover:border-[#B58A3A]/50 bg-[#B58A3A]">
                      
                      {/* Top: Image Section */}
                      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] overflow-hidden">
                        <img 
                          src={step.img} 
                          alt={step.title} 
                          className="absolute inset-0 w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        
                        <div className="absolute inset-0 bg-[#39342D]/10 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
                        
                        {/* Floating Number Badge */}
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F8F5EE]/90 backdrop-blur-md border border-[#B58A3A]/40 text-[#B58A3A] font-karlen text-lg md:text-xl shadow-lg z-10 group-hover:bg-[#B58A3A] group-hover:text-[#F8F5EE] group-hover:border-[#B58A3A] transition-colors duration-500">
                          {step.num}
                        </div>
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