'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MoveHorizontal, ArrowUpRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useModal } from '../components/ModalContext';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Data array for multiple project views
const comparisonData = [
  {
    id: 1,
    title: "Living Space",
    render: "/render-image-1.jpg", 
    reality: "/reality-image-1.jpg"
  },
  {
    id: 2,
    title: "Master Suite",
    render: "/render-image-2.jpg", 
    reality: "/reality-image-2.jpg"
  },
  {
    id: 3,
    title: "Dining Area",
    render: "/render-image-3.jpg", 
    reality: "/reality-image-3.jpg"
  }
];

export default function RenderVsReality() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); 

  // --- GSAP SCROLL REVEAL ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    if (headerRef.current) {
      tl.fromTo(Array.from(headerRef.current.children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }

    tl.fromTo(sliderContainerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    if (pillarsRef.current) {
      tl.fromTo(Array.from(pillarsRef.current.children),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
    }

    // Reveal Button at the end
    tl.fromTo(".start-project-btn",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
  }, { scope: sectionRef });

  // --- AUTO-PAN ANIMATION ---
  useEffect(() => {
    if (hasInteracted) return; 

    const proxy = { pos: 50 };
    
    const sweepTween = gsap.to(proxy, {
      pos: 80,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      onUpdate: () => setSliderPos(proxy.pos)
    });

    gsap.to(proxy, {
      pos: 20,
      duration: 1.5,
      ease: "sine.inOut",
      onComplete: () => sweepTween.play(),
      onUpdate: () => setSliderPos(proxy.pos)
    });

    return () => {
      gsap.killTweensOf(proxy);
    };
  }, [hasInteracted, activeImageIdx]); 

  // --- SLIDER DRAG LOGIC ---
  const handleMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setHasInteracted(true); 
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  // --- CAROUSEL LOGIC ---
  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % comparisonData.length);
    setHasInteracted(false); 
    setSliderPos(50);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev === 0 ? comparisonData.length - 1 : prev - 1));
    setHasInteracted(false);
    setSliderPos(50);
  };

  const currentView = comparisonData[activeImageIdx];

  return (
    <section 
      ref={sectionRef} 
      // Changed Background to Ivory, Text to Charcoal
      className="relative w-full bg-[#F8F5EE] text-[#39342D] py-20 md:py-32 overflow-hidden border-t border-[#B58A3A]/20 font-sans"
    >
      {/* Subtle Warm Glow in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-full bg-[radial-gradient(ellipse_at_top,rgba(181,138,58,0.1)_0%,rgba(248,245,238,0)_60%)] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 lg:px-12 max-w-[90rem] relative z-10">
        
        {/* --- HEADER --- */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-flex items-center gap-2 mb-5 md:mb-6 px-4 py-1.5 rounded-full text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#B58A3A] bg-[#B58A3A]/10 border border-[#B58A3A]/30">
            Promise & Execution
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.1] mb-4 md:mb-6 text-[#39342D]">
            What you see is exactly what you <span className="text-[#B58A3A] italic font-light">step into.</span>
          </h2>
          <p className="text-sm md:text-base text-[#39342D]/70 font-light leading-relaxed max-w-2xl px-2">
            In interior design, a beautiful concept is only as good as its execution. We bridge the gap between imagination and reality with absolute precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* --- LEFT: INTERACTIVE SLIDER & CAROUSEL --- */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center w-full">
            
            <div 
              ref={sliderContainerRef}
              className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[16/10] rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#E9DFCE] shadow-[0_20px_50px_rgba(57,52,45,0.15)] touch-none select-none cursor-ew-resize border border-[#B58A3A]/30 group"
              onMouseDown={handleDragStart}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleDragStart}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* IMAGE 1: THE REALITY */}
              <img 
                key={`reality-${currentView.id}`}
                src={currentView.reality}
                alt="Finished Reality" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none animate-[fadeIn_0.5s_ease-out]"
              />
              
              <div className="absolute bottom-[4.5rem] right-4 md:bottom-20 md:right-6 bg-white/80 backdrop-blur-md border border-[#39342D]/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full z-10 pointer-events-none">
                <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#39342D] drop-shadow-sm">
                  The Reality
                </span>
              </div>

              {/* IMAGE 2: THE VISION / RENDER */}
              <div 
                className="absolute inset-0 w-full h-full pointer-events-none border-r-2 border-[#F8F5EE]"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img 
                  key={`render-${currentView.id}`}
                  src={currentView.render}
                  alt="3D Vision" 
                  className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.5s_ease-out]"
                />
                
                <div className="absolute bottom-[4.5rem] left-4 md:bottom-20 md:left-6 bg-[#39342D]/80 backdrop-blur-md border border-[#F8F5EE]/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full z-10">
                  <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-[#F8F5EE]">
                    The Vision
                  </span>
                </div>
              </div>

              {/* SLIDER HANDLE */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#F8F5EE] shadow-[0_0_15px_rgba(57,52,45,0.3)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#B58A3A] rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(181,138,58,0.4)] border-2 border-[#F8F5EE] transition-transform duration-200 group-hover:scale-110">
                  <MoveHorizontal size={18} className="text-[#F8F5EE] md:w-5 md:h-5" />
                </div>
              </div>

              {/* CAROUSEL NAVIGATION OVERLAY */}
              <div className="absolute bottom-0 left-0 w-full h-14 md:h-16 bg-[#F8F5EE]/90 backdrop-blur-md border-t border-[#B58A3A]/30 z-30 flex items-center justify-between px-4 md:px-6">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="w-8 h-8 rounded-full border border-[#B58A3A]/50 flex items-center justify-center text-[#39342D] hover:bg-[#B58A3A] hover:text-[#F8F5EE] hover:border-[#B58A3A] transition-colors shadow-sm"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex flex-col items-center">
                  <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#B58A3A] font-bold">
                    View {activeImageIdx + 1} of {comparisonData.length}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-[#39342D] tracking-wide mt-0.5">
                    {currentView.title}
                  </span>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="w-8 h-8 rounded-full border border-[#B58A3A]/50 flex items-center justify-center text-[#39342D] hover:bg-[#B58A3A] hover:text-[#F8F5EE] hover:border-[#B58A3A] transition-colors shadow-sm"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>
            
            <p className={`mt-5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#B58A3A] font-bold transition-opacity duration-500 ${hasInteracted ? 'opacity-0' : 'animate-pulse opacity-100'}`}>
              Drag the line to compare
            </p>
          </div>

          {/* --- RIGHT: THE NARRATIVE PILLARS --- */}
          <div ref={pillarsRef} className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 md:gap-10 mt-2 lg:mt-0">
            
            <div className="group border-l border-[#B58A3A]/30 pl-5 md:pl-6 hover:border-[#B58A3A] transition-colors duration-500">
              <span className="text-[10px] font-mono text-[#B58A3A] mb-1.5 block tracking-widest">01 / PROMISE</span>
              <h3 className="text-2xl md:text-3xl font-karlen text-[#39342D] mb-2">The Design</h3>
              <p className="text-sm text-[#39342D]/70 font-light leading-relaxed">
                Every project begins with hyper-realistic 3D rendering. We map out natural light, raw textures, and spatial flow so you know exactly how your home will feel before a single brick is moved.
              </p>
            </div>

            <div className="group border-l border-[#B58A3A]/30 pl-5 md:pl-6 hover:border-[#B58A3A] transition-colors duration-500">
              <span className="text-[10px] font-mono text-[#B58A3A] mb-1.5 block tracking-widest">02 / CRAFT</span>
              <h3 className="text-2xl md:text-3xl font-karlen text-[#39342D] mb-2">The Execution</h3>
              <p className="text-sm text-[#39342D]/70 font-light leading-relaxed">
                Our on-site team operates with millimeter precision. We source the exact materials and finishes approved in the design phase, ensuring zero compromises between the digital model and the physical build.
              </p>
            </div>

            <div className="group border-l border-[#B58A3A]/30 pl-5 md:pl-6 hover:border-[#B58A3A] transition-colors duration-500">
              <span className="text-[10px] font-mono text-[#B58A3A] mb-1.5 block tracking-widest">03 / REALITY</span>
              <h3 className="text-2xl md:text-3xl font-karlen text-[#39342D] mb-2">The Result</h3>
              <p className="text-sm text-[#39342D]/70 font-light leading-relaxed">
                A flawless translation of your dream. No surprises, no scaled-back details—just a meticulously crafted space that looks and feels exactly as intended.
              </p>
            </div>

          </div>

        </div>

        {/* --- BOTTOM CENTERED CTA BUTTON --- */}
        <div className="start-project-btn flex justify-center w-full mt-16 md:mt-24">
          <button 
            onClick={openModal}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#39342D] border border-[#39342D] px-8 py-4 font-body text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#F8F5EE] transition-all duration-300 ease-out hover:bg-[#B58A3A] hover:border-[#B58A3A] hover:shadow-[0_10px_30px_rgba(181,138,58,0.3)] active:scale-95 cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Start Your Project</span>
            <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

      </div>
    </section>
  );
}