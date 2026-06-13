'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    id: 1,
    text: "Zencraft Interiors completely transformed our penthouse in Jubilee Hills. They managed to blend our modern tastes with a timeless, calm aesthetic. The attention to detail in the custom millwork and spatial planning was beyond anything we expected.",
    name: "Vikram Reddy",
    role: "Homeowner, Jubilee Hills",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: 2,
    text: "When we were setting up our new corporate office in Gachibowli, we needed a space that inspired our team and impressed our clients. They didn't just give us an office; they gave us an environment that truly reflects our forward-thinking identity.",
    name: "Priya Sharma",
    role: "CEO, TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: 3,
    text: "What stood out the most during our villa renovation in Banjara Hills was their absolute transparency and project management. No hidden costs, no missed deadlines. The sanctuary they crafted for us is so deeply personal and perfectly balanced.",
    name: "Arjun Rao",
    role: "Homeowner, Banjara Hills",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: 4,
    text: "We wanted a minimalist, wabi-sabi inspired aesthetic for our boutique studio. Finding designers who truly understand 'quiet luxury' is rare, but they nailed the brief perfectly. The way they manipulate natural light and raw textures is nothing short of artistic mastery.",
    name: "Ananya Desai",
    role: "Creative Director, Studio Aura",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDE_DURATION = 3000;

  // New Animation: Horizontal Slide & Fade
  const animateSlide = useCallback((newIndex: number, direction: 'next' | 'prev' = 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const xOffset = direction === 'next' ? 30 : -30;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        // Animate new text IN from the opposite side
        gsap.fromTo(
          [textRef.current, authorRef.current],
          { opacity: 0, x: xOffset },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", onComplete: () => setIsAnimating(false) }
        );
      }
    });

    // Animate current text OUT to the side
    tl.to([textRef.current, authorRef.current], {
      opacity: 0,
      x: -xOffset,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    });
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    animateSlide(nextIndex, 'next');
  }, [currentIndex, animateSlide]);

  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    animateSlide(prevIndex, 'prev');
  }, [currentIndex, animateSlide]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      handleNext();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleNext]); 

  const triggerManualNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    handleNext();
  };

  const triggerManualPrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    handlePrev();
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative w-full bg-[var(--color-primary)] text-white py-16 md:py-24 px-6 overflow-hidden">
      
      {/* Subtle background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff08_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col justify-center">
        
        {/* --- TOP HEADER --- */}
        <div className="flex justify-between items-start mb-8 md:mb-12">
          <div className="flex items-center gap-3 text-xs md:text-sm font-sans tracking-wide opacity-80">
            <span className="font-semibold text-white">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <span>What our clients say:</span>
          </div>

          {/* Large Quote Icon SVG (Matching reference image position) */}
          <div className="text-[var(--color-secondary)] opacity-60 w-12 h-12 md:w-16 md:h-16 -mt-4">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
            </svg>
          </div>
        </div>

        {/* --- MAIN QUOTE TEXT --- */}
        <div className="min-h-[200px] md:min-h-[240px] flex items-center mb-10">
          <p 
            ref={textRef} 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-karlen leading-tight md:leading-[1.15] tracking-tight text-white/95"
          >
            {currentTestimonial.text}
          </p>
        </div>

        {/* --- BOTTOM ROW: AUTHOR & CONTROLS --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          
          {/* Author Details */}
          <div ref={authorRef} className="flex items-center gap-4">
            <img 
              src={currentTestimonial.image} 
              alt={currentTestimonial.name} 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover grayscale opacity-90"
            />
            <div>
              <h4 className="text-base md:text-lg font-medium tracking-tight mb-0.5 text-white">
                {currentTestimonial.name}
              </h4>
              <p className="text-[var(--color-secondary)] text-xs md:text-sm font-sans tracking-wide">
                {currentTestimonial.role}
              </p>
            </div>
          </div>

          {/* Navigation Controls (Square blocks matching reference) */}
          <div className="flex gap-2">
            <button 
              onClick={triggerManualPrev}
              disabled={isAnimating}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Previous Testimonial"
            >
              <svg className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={triggerManualNext}
              disabled={isAnimating}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Next Testimonial"
            >
              <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;