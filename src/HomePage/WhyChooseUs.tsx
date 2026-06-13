'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    num: "01",
    title: "Tailored Design Solutions",
    desc: "Every project is unique. We take the time to understand your vision, lifestyle, and requirements to create spaces that truly reflect your personality and goals."
  },
  {
    num: "02",
    title: "Expert Design Team",
    desc: "Our experienced designers bring creativity, technical expertise, and industry knowledge to every project, ensuring exceptional results from concept to completion."
  },
  {
    num: "03",
    title: "Quality & Craftsmanship",
    desc: "We prioritize high-quality materials, premium finishes, and meticulous attention to detail to deliver interiors that are both beautiful and durable."
  },
  {
    num: "04",
    title: "Transparent Communication",
    desc: "From initial consultation to project handover, we keep you informed at every stage with clear timelines, updates, and honest communication."
  },
  {
    num: "05",
    title: "End-to-End Project Management",
    desc: "We handle everything—from planning and design to execution and final styling—so you can enjoy a seamless and stress-free experience."
  },
  {
    num: "06",
    title: "Timely Project Delivery",
    desc: "We understand the value of your time and work diligently to ensure projects are completed on schedule without compromising quality."
  },
  {
    num: "07",
    title: "Innovative & Functional Designs",
    desc: "Our designs strike the perfect balance between aesthetics and practicality, creating spaces that look stunning and function effortlessly."
  },
  {
    num: "08",
    title: "Customer-Centric Approach",
    desc: "Your satisfaction is at the heart of everything we do. We collaborate closely with you to ensure the final outcome exceeds expectations."
  }
];

const WhyChooseUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw the central timeline line on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%", // Starts drawing when the top of the section reaches the middle of the screen
            end: "bottom 80%", // Finishes drawing near the bottom
            scrub: 1, // Smooth scrubbing
          },
        }
      );

      // 2. Animate each card and dot as you scroll past them
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const dot = dotsRef.current[index];
        const isLeft = index % 2 === 0;

        // Animate the Card sliding in
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: isLeft ? -50 : 50, // Left cards slide from left, Right cards from right
            y: 30 
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%", // Trigger when the card hits 75% down the screen
              toggleActions: "play none none reverse",
            },
          }
        );

        // Animate the Dot "lighting up"
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, backgroundColor: "transparent" },
            {
              scale: 1,
              backgroundColor: "var(--color-secondary)",
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: card,
                start: "top 70%", 
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--color-primary)] text-white py-24 md:py-32 px-6 overflow-hidden">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff08_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
            Our Ethos
          </span>
          <h2 className="text-5xl md:text-7xl font-karlen tracking-tighter leading-tight mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-sans leading-relaxed">
            We combine creativity, functionality, and attention to detail to create spaces that inspire, perform, and stand the test of time.
          </p>
        </div>

        {/* --- TIMELINE --- */}
        <div className="relative w-full">
          
          {/* The Background Line (Dimmed) */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
          
          {/* The Animated "Drawing" Line (Golden) */}
          <div 
            ref={lineRef}
            className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-secondary)] to-transparent origin-top" 
          />

          {/* Timeline Cards */}
          <div className="flex flex-col gap-12 md:gap-24 relative">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-center justify-between md:justify-normal w-full group">
                  
                  {/* The Timeline Dot */}
                  <div 
                    ref={(el) => { dotsRef.current[index] = el; }}
                    className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-[var(--color-secondary)] bg-[var(--color-primary)] z-20 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  />

                  {/* Desktop Layout Helper: Keeps cards on alternate sides */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right text-left' : 'md:pl-16 md:ml-auto text-left'} pl-16 md:pl-0`}>
                    
                    {/* The Card */}
                    <div 
                      ref={(el) => { cardsRef.current[index] = el; }}
                      className={`relative bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl hover:border-[var(--color-secondary)]/30 transition-colors duration-500`}
                    >
                      {/* Number Indicator */}
                      <span className={`text-[var(--color-secondary)] text-lg md:text-xl font-mono mb-4 block opacity-80 ${isEven ? 'md:text-right text-left' : 'text-left'}`}>
                        {item.num} //
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-karlen tracking-tight text-white mb-3">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-white/70 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;