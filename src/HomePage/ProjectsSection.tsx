'use client';

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Mapped to your 7 specific projects and local image paths
const projects: Project[] = [
  {
    id: 'sumith',
    num: '01',
    name: 'Sumith',
    location: 'Hyderabad',
    leftImage: '/sumith-AZ/sumith-img-2.webp',
    rightImage: '/sumith-AZ/sumith-img-1.webp',
    leftCaption: 'The Gathering Space — Sandblasted limestone meets century-old reclaimed teak.',
    rightCaption: 'The Master Suite — Crafted for light, shadow, and quiet afternoons.'
  },
  {
    id: 'prudhvi-bollineni-bion',
    num: '03',
    name: 'Prudhvi - Bollineni Bion',
    location: 'Hyderabad',
    leftImage: '/prudhvi-bion/prudhvi-img-2.webp',
    rightImage: '/prudhvi-bion/prudhvi-img-1.webp',
    leftCaption: 'The Grand Lounge — Floating silk screens balancing monolithic travertine walls.',
    rightCaption: 'The Sanctuary — Plaster ceilings, wool textiles, and a gentle ambient glow.'
  },
  {
    id: 'praveen',
    num: '04',
    name: 'Praveen',
    location: 'Hyderabad',
    leftImage: '/praveen-VRE/praveen-img-2.webp',
    rightImage: '/praveen-VRE/praveen-img-1.webp',
    leftCaption: 'The Minimalist Foyer — A study in geometry, framing the entrance with quiet luxury.',
    rightCaption: 'The Private Terrace — Seamlessly blending indoor living with outdoor serenity.'
  },
  {
    id: 'dharmateja',
    num: '05',
    name: 'Dharmateja',
    location: 'Hyderabad',
    leftImage: '/dharmateja/dharmateja-img-2.webp',
    rightImage: '/dharmateja/dharmateja-img-1.webp',
    leftCaption: 'The Ambient Living Area — Warm textures layered over precise architectural lines.',
    rightCaption: 'The Bespoke Dining — Custom millwork tailored for intimate evening gatherings.'
  },
  {
    id: 'bharani',
    num: '06',
    name: 'Bharani',
    location: 'Hyderabad',
    leftImage: '/bharani/bharani-img-2.webp',
    rightImage: '/bharani/bharani-img-1.webp',
    leftCaption: 'The Tactile Bedroom — Woven fabrics and fluted glass providing layered depth.',
    rightCaption: 'The Floating Staircase — An engineering marvel serving as a central sculpture.'
  },
  {
    id: 'ramakrishna',
    num: '07',
    name: 'Ramakrishna',
    location: 'Hyderabad',
    leftImage: '/ramakrishna/ramakrishna-img-2.webp',
    rightImage: '/ramakrishna/ramakrishna-img-1.webp',
    leftCaption: 'The Monolithic Bath — Carved stone elements elevating daily rituals.',
    rightCaption: 'The Sunlit Corridor — Guiding the eye through meticulously proportioned spaces.'
  }
];

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- SAAS CARD STACKING EFFECT ---
    const cards = gsap.utils.toArray<HTMLElement>('.saas-card', containerRef.current);
    
    cards.forEach((card, index) => {
      // The last card doesn't need to scale down
      if (index === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.92 - (cards.length - index) * 0.01, // Progressively scale down
        opacity: 0.4,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1],
          start: "top 85%", // Start scaling when the next card enters
          end: "top 15%",   // Finish scaling when the next card hits the sticky top
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    });

    // --- INTRO FADE UP ---
    gsap.fromTo('.intro-element', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: '.intro-trigger', start: "top 80%" } }
    );

    // --- BOTTOM CTA FADE UP ---
    gsap.fromTo('.cta-reveal',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.cta-reveal', start: "top 90%" } }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--color-primary)] text-white min-h-screen py-24 md:py-32 font-sans selection:bg-[var(--color-secondary)] selection:text-white">
      
      {/* SaaS Ambient Mesh Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- SAAS INTRO HEADER --- */}
        <div className="intro-trigger text-center max-w-3xl mx-auto mb-20 md:mb-32 flex flex-col items-center">
          <div className="intro-element inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium tracking-widest uppercase bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.03)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
            Selected Works
          </div>
          <h2 className="intro-element text-4xl sm:text-5xl md:text-7xl font-karlen tracking-tight leading-[1.05] text-white/95 mb-6">
            Engineering spaces <br className="hidden md:block" />
            that inspire <span className="text-[var(--color-secondary)] italic font-light">focus.</span>
          </h2>
          <p className="intro-element text-white/50 text-sm md:text-base max-w-xl font-light">
            Explore our latest case studies. Precision craftsmanship meets modular design systems to create unparalleled living experiences.
          </p>
        </div>

        {/* --- STACKING CARDS CONTAINER --- */}
        <div className="relative flex flex-col gap-12 md:gap-24 pb-20">
          {projects.map((proj) => (
            <div 
              key={proj.id} 
              // The sticky class holds it at the top of the screen while scrolling
              className="saas-card sticky top-6 md:top-12 w-full bg-[#0D0D0E] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl flex flex-col lg:flex-row gap-8 lg:gap-12 will-change-transform"
            >
              
              {/* Card Left: Data & Typography */}
              <div className="w-full lg:w-5/12 flex flex-col justify-between order-2 lg:order-1">
                <div>
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <span className="text-[var(--color-secondary)] font-mono text-sm tracking-widest">
                      {proj.num}
                    </span>
                    <span className="w-8 h-[1px] bg-white/20" />
                    <span className="text-white/40 font-mono text-xs uppercase tracking-wider">
                      {proj.location}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-karlen tracking-tight leading-none mb-6">
                    {proj.name}
                  </h3>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                      <p className="text-white/60 text-sm leading-relaxed font-light">
                        {proj.leftCaption}
                      </p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                      <p className="text-white/60 text-sm leading-relaxed font-light">
                        {proj.rightCaption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Case Study Link */}
                <Link 
                  to={`/projects/${proj.id}`}
                  className="group flex items-center justify-center gap-2 w-full md:w-fit bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-[var(--color-secondary)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95"
                >
                  Explore Case Study
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7-7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Card Right: Bento Box Media Grid */}
              <div className="w-full lg:w-7/12 relative min-h-[300px] md:min-h-[500px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 order-1 lg:order-2 group">
                {/* Main Hero Image */}
                <img 
                  src={proj.rightImage} 
                  alt={proj.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E]/80 via-transparent to-transparent opacity-60" />
                
                {/* Floating Inset Image (Bento Widget vibe) */}
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-[40%] aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border-4 border-[#0D0D0E] shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1">
                  <img 
                    src={proj.leftImage} 
                    alt={`${proj.name} detail`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- VIEW ALL PROJECTS CTA --- */}
        <div className="cta-reveal mt-16 md:mt-24 flex justify-center">
          <Link 
            to="/projects"
            className="group flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center text-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:text-black group-hover:border-[var(--color-secondary)] transition-colors duration-500 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">
              View All Projects
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProjectsSection;