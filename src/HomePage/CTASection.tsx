'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Parallax Background Effect
      // The image slowly scales down and moves slightly as you scroll past it
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.15, yPercent: -10 },
        {
          scale: 1,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 2. Staggered Content Reveal
      // The text and button glide up smoothly when the section enters the viewport
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop"
          alt="Luxurious dark interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- LUXURY OVERLAY --- */}
      {/* A mix of a dark gradient and backdrop blur to make the text pop while keeping the image visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[#0a0a0a]/70 to-[#0a0a0a]/30" />

      {/* --- CONTENT --- */}
      <div 
        ref={contentRef} 
        className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Eyebrow Text */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
          Start Your Journey
        </span>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-karlen tracking-tighter leading-tight text-white mb-6">
          Ready to craft your <br className="hidden md:block" />
          <span className="text-[var(--color-secondary)]  font-light">Place?</span>
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/80 font-sans leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether it’s a complete villa transformation or a curated single room, let’s build a space that truly feels like home.
        </p>

        {/* Action Button */}
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-4 bg-[var(--color-secondary)] hover:bg-[#d4af37] text-[var(--color-primary)] font-semibold px-10 md:px-12 py-4 md:py-5 rounded-full text-sm md:text-base tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
        >
          <span>Schedule a Consultation</span>
          <span className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </a>
      </div>
    </section>
  );
};

export default CTASection;