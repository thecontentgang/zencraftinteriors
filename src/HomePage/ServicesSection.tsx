'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from '../components/ModalContext'; 

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Residential Design",
    headline: "Crafting your personal sanctuary.",
    desc: "We transform houses into deeply personal spaces. From spatial planning and custom millwork to selecting the perfect textiles, every detail is meticulously curated to reflect your lifestyle and bring quiet luxury into your daily routines.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Commercial Spaces",
    headline: "Environments that inspire.",
    desc: "Your workspace should leave a lasting impression. We design commercial environments—whether boutique retail, modern offices, or hospitality venues—that perfectly balance your brand's identity with ergonomic, seamless flow.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Design Consultation",
    headline: "Clarity for your vision.",
    desc: "Not sure where to begin? We offer dedicated sessions to untangle your ideas. We’ll guide you through layout strategies, premium material selections, and color palettes, giving you a definitive roadmap for your space.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
  },
  {
    title: "Project Management",
    headline: "Flawless, stress-free execution.",
    desc: "We handle the complexities so you don't have to. From coordinating trusted contractors to overseeing the final installation, we ensure your project is executed to our exact standards, on schedule, and within your budget.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070&auto=format&fit=crop"
  }
];

const ServicesSection: React.FC = () => {
  const { openModal } = useModal(); 

  const containerRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const bgImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean, isDesktop: boolean };

      gsap.set(imageWrapperRef.current, {
        xPercent: -50,
        bottom: isMobile ? "24px" : "48px",
        width: isMobile ? "92vw" : "60vw",
        height: isMobile ? "30vh" : "40vh",
        borderRadius: "24px"
      });

      bgImagesRef.current.forEach((img, i) => {
        if (i !== 0) gsap.set(img, { opacity: 0 });
      });

      // FIX: Use autoAlpha instead of opacity so invisible cards don't block clicks!
      cardsRef.current.forEach((card) => {
        gsap.set(card, { autoAlpha: 0, y: 40 }); 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1, 
          anticipatePin: 1,
        }
      });

      tl.to(introTextRef.current, { opacity: 0, y: -50, duration: 1 }, 0);
      
      tl.to(imageWrapperRef.current, {
        width: "100vw",
        height: "100vh",
        bottom: "0px",
        borderRadius: "0px",
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);

      tl.to(overlayRef.current, { opacity: 0.75, duration: 1 }, 1);
      
      // FIX: autoAlpha used here
      tl.to(cardsRef.current[0], { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, 1.2);

      for (let i = 1; i < services.length; i++) {
        const label = `slide${i}`;
        
        tl.to({}, { duration: 1.5 }); 
        
        // FIX: autoAlpha used here to hide the old card and remove it from mouse interactions
        tl.to(cardsRef.current[i - 1], { autoAlpha: 0, y: -40, duration: 1 }, label);
        
        tl.to(bgImagesRef.current[i], { opacity: 1, duration: 1.2 }, label);
        
        // FIX: autoAlpha used here to show the new card
        tl.to(cardsRef.current[i], { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, `${label}+=0.4`);
      }

      tl.to({}, { duration: 1.5 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full bg-[var(--color-primary)] overflow-hidden"
    >
      
      {/* --- INTRO HEADLINE --- */}
      <div 
        ref={introTextRef} 
        className="absolute top-[15%] md:top-[20%] left-1/2 -translate-x-1/2 z-20 text-center w-full px-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
          Expertise
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-karlen tracking-tighter leading-tight text-white">
          What We <span className='text-[var(--color-secondary)]'>Provide</span> 
        </h2>
      </div>

      {/* --- EXPANDING IMAGE CONTAINER --- */}
      <div
        ref={imageWrapperRef}
        className="absolute left-1/2 z-10 overflow-hidden"
      >
        {services.map((service, index) => (
          <img
            key={index}
            ref={(el) => { bgImagesRef.current[index] = el; }}
            src={service.img}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
          />
        ))}
        <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0a] opacity-0 z-10" />
      </div>

      {/* --- SERVICES CARDS --- */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center px-4 md:px-0">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="absolute w-full max-w-xl md:max-w-2xl bg-black/40 border border-white/10 backdrop-blur-2xl p-8 md:p-14 rounded-3xl pointer-events-auto shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-center flex flex-col items-center"
          >
            <span className="text-[var(--color-secondary)] text-sm md:text-base font-mono mb-4 block opacity-90 tracking-widest uppercase">
              0{index + 1} // {service.title}
            </span>
            
            <h3 className="text-3xl md:text-5xl font-karlen tracking-tight text-white mb-6 leading-tight">
              {service.headline}
            </h3>
            
            <p className="text-base md:text-lg text-white/80 font-sans leading-relaxed mb-10 mx-auto max-w-lg">
              {service.desc}
            </p>
            
            <button 
              type="button"
              onClick={openModal}
              className="group relative inline-flex items-center gap-3 bg-[var(--color-secondary)] hover:bg-[#d4af37] text-[var(--color-primary)] font-medium px-8 md:px-10 py-4 rounded-full text-sm md:text-base tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              <span>Book a Consultation</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ServicesSection;