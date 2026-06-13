'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  num: string;
  name: string;
  location: string;
  leftImage: string;
  rightImage: string;
  leftCaption: string;
  rightCaption: string;
}

const projects: Project[] = [
  {
    id: 'wabi-sabi',
    num: '01',
    name: 'Wabi-Sabi Penthouse',
    location: 'Jubilee Hills',
    leftImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
    leftCaption: 'The Gathering Space — Sandblasted limestone meets century-old reclaimed teak.',
    rightCaption: 'The Reading Nook — Crafted for light, shadow, and quiet afternoons.'
  },
  {
    id: 'earth-iron',
    num: '02',
    name: 'Earth & Iron Villa',
    location: 'Gachibowli',
    leftImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop',
    leftCaption: 'The Culinary Hearth — Smoked oak cabinetry anchored by a brutalist concrete island.',
    rightCaption: 'The Courtyard Facade — An uninterrupted transition between shelter and nature.'
  },
  {
    id: 'silk-stone',
    num: '03',
    name: 'Silk & Stone Estate',
    location: 'Financial District',
    leftImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
    rightImage: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1000&auto=format&fit=crop',
    leftCaption: 'The Grand Lounge — Floating silk screens balancing monolithic travertine walls.',
    rightCaption: 'The Master Sanctuary — Plaster ceilings, wool textiles, and gentle ambient glow.'
  }
];

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

      // --- INTRO "BUTTERFLY" ANIMATION ---
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: isMobile ? "top 85%" : "top 80%", 
          end: "bottom top", 
          scrub: 1, 
        }
      });

      introTl
        .fromTo(introTextRef.current,
          { opacity: 0, y: isMobile ? 40 : 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
        )
        .to(introTextRef.current, {
          y: -30,
          duration: 2.5, 
          ease: "none"
        })
        .to(introTextRef.current, {
          opacity: 0,
          y: isMobile ? -60 : -100,
          scale: 0.95,
          duration: 1,
          ease: "power2.in"
        });

      // --- PROJECTS PINNED ANIMATION ---
      sectionsRef.current.forEach((el) => {
        if (!el) return;

        const title = el.querySelector('.project-title');
        const leftCard = el.querySelector('.left-card');
        const rightCard = el.querySelector('.right-card');
        const cta = el.querySelector('.project-cta');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=150%", 
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Title fades in
        tl.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        if (isDesktop) {
          // Desktop: Both cards fly in from the sides
          tl.fromTo(leftCard, { xPercent: -120, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=0.4")
            .fromTo(rightCard, { xPercent: 120, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "<0.2");
        } else {
          // Mobile: Only ONE card exists, sliding up gracefully
          tl.fromTo(leftCard, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.5");
        }

        // CTA fades in (tied closer to the single image on mobile)
        tl.fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, isMobile ? "-=0.4" : "-=0.8"); 
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--color-primary)] text-white -pt-20">
      
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff08_0%,transparent_70%)] pointer-events-none" />

      
      <section 
        ref={introSectionRef} 
        className="min-h-[40vh] md:min-h-screen w-full relative flex flex-col justify-center items-center z-10 px-4 md:px-6"
      >
        <div ref={introTextRef} className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 mb-6 md:mb-8 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
            Our Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-karlen tracking-tighter leading-tight text-white/95">
            Let's explore what we've <br className="md:hidden" /><span className="text-[var(--color-secondary)] italic font-light">crafted.</span>
          </h2>
        </div>
      </section>

      {/* Dynamic Projects Loop */}
      {projects.map((proj, idx) => (
        <section
          key={proj.id}
          ref={(el) => {
            sectionsRef.current[idx] = el;
          }}
          className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden px-4 md:px-6 pt-12 md:pt-24 pb-8 md:pb-12"
        >
          <div className="w-full text-center flex flex-col items-center mb-6 md:mb-12 z-20">
            <h2 className="project-title text-3xl sm:text-4xl md:text-6xl font-karlen tracking-tighter leading-none mb-2 md:mb-3">
              {proj.name}
            </h2>
          </div>

          <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10">
            
            {/* Left Card - Displays on both Mobile & Desktop */}
            <div className="left-card w-full md:w-1/2 bg-white/5 border border-white/10 p-3 md:p-5 rounded-none backdrop-blur-md shadow-2xl hover:border-white/20 transition-colors duration-500 group">
              {/* aspect-[4/3] on mobile for a taller hero image, aspect-[5/3] wide on desktop */}
              <div className="aspect-[4/3] md:aspect-[5/3] rounded-none overflow-hidden mb-3 md:mb-4 relative">
                <img
                  src={proj.leftImage}
                  alt={`${proj.name} Details`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <p className="text-[11px] md:text-sm text-[var(--color-background)]/85 font-sans leading-relaxed">
                {proj.leftCaption}
              </p>
            </div>

            {/* Right Card - HIDDEN on Mobile (hidden md:block), Displays on Desktop */}
            <div className="right-card hidden md:block md:w-1/2 bg-white/5 border border-white/10 p-3 md:p-5 rounded-none backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-[var(--color-secondary)]/40 transition-colors duration-500 group z-10">
              <div className="md:aspect-[5/3] rounded-none overflow-hidden mb-3 md:mb-4 relative">
                <img
                  src={proj.rightImage}
                  alt={`${proj.name} Main View`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <p className="text-[11px] md:text-sm text-[var(--color-background)]/85 font-sans leading-relaxed">
                {proj.rightCaption}
              </p>
            </div>

          </div>

          <div className="project-cta relative z-20 mt-6 md:mt-12">
            <a
              href={`/projects/${proj.id}`}
              className="group relative inline-flex items-center gap-3 bg-[var(--color-secondary)] hover:bg-[#d4af37] text-[var(--color-primary)] font-medium px-8 md:px-10 py-3 md:py-4 rounded-full text-xs md:text-base tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              <span>View Project</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>

        </section>
      ))}
    </div>
  );
};

export default ProjectsSection;