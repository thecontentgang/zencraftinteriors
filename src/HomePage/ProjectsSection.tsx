'use client';

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CtaSection from './CtaSection';



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

const projects: Project[] = [
  {
    id: 'sumith',
    num: '01',
    name: 'Sumith',
    location: 'Hyderabad',
    leftImage: '/sumith-AZ/sumith-img-1.webp',
    rightImage: '/sumith-AZ/sumith-img-11.webp',
    leftCaption: 'The Gathering Space — Sandblasted limestone meets century-old reclaimed teak.',
    rightCaption: 'The Master Suite — Crafted for light, shadow, and quiet afternoons.'
  },
  {
    id: 'prudhvi-bollineni-bion',
    num: '02',
    name: 'Prudhvi - Bollineni Bion',
    location: 'Hyderabad',
    leftImage: '/prudhvi-bion/prudhvi-img-2.webp',
    rightImage: '/prudhvi-bion/prudhvi-img-11.webp',
    leftCaption: 'The Grand Lounge — Floating silk screens balancing monolithic travertine walls.',
    rightCaption: 'The Sanctuary — Plaster ceilings, wool textiles, and a gentle ambient glow.'
  },
  {
    id: 'praveen',
    num: '03',
    name: 'Praveen',
    location: 'Hyderabad',
    leftImage: '/praveen-VRE/praveen-img-2.webp',
    rightImage: '/praveen-VRE/praveen-img-1.webp',
    leftCaption: 'The Minimalist Foyer — A study in geometry, framing the entrance with quiet luxury.',
    rightCaption: 'The Private Terrace — Seamlessly blending indoor living with outdoor serenity.'
  },
  {
    id: 'dharmateja',
    num: '04',
    name: 'Dharmateja',
    location: 'Hyderabad',
    leftImage: '/dharmateja/dharmateja-img-3.webp',
    rightImage: '/dharmateja/dharmateja-img-1.webp',
    leftCaption: 'The Ambient Living Area — Warm textures layered over precise architectural lines.',
    rightCaption: 'The Bespoke Dining — Custom millwork tailored for intimate evening gatherings.'
  },
  {
    id: 'bharani',
    num: '05',
    name: 'Bharani',
    location: 'Hyderabad',
    leftImage: '/bharani/bharani-img-2.webp',
    rightImage: '/bharani/bharani-img-1.webp',
    leftCaption: 'The Tactile Bedroom — Woven fabrics and fluted glass providing layered depth.',
    rightCaption: 'The Floating Staircase — An engineering marvel serving as a central sculpture.'
  },
  {
    id: 'ramakrishna',
    num: '06',
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
    const cards = gsap.utils.toArray<HTMLElement>('.saas-card', containerRef.current);

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.94 - (cards.length - index) * 0.008,
        opacity: 0.5,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1],
          start: "top 90%",
          end: "top 20%",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    });

    gsap.fromTo('.intro-element',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.intro-trigger',
          start: "top 88%"
        }
      }
    );

    gsap.fromTo('.cta-reveal',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.cta-reveal',
          start: "top 92%"
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full bg-light-alt text-text-primary min-h-screen pt-12 md:pt-24 font-sans selection:bg-primary selection:text-white">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(48,37,28,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="intro-trigger text-center max-w-3xl mx-auto mb-20 md:mb-32 flex flex-col items-center">
          <div className="intro-element inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase bg-gold/10 border border-gold/20 text-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Selected Works
          </div>
          <h2 className="intro-element text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen tracking-tight leading-[1.05] text-text-primary mb-6">
            Engineering spaces <br className="hidden md:block" />
            that inspire <span className="text-primary font-velick font-light">focus.</span>
          </h2>
          <p className="intro-element text-text-secondary text-sm md:text-base max-w-xl font-light leading-relaxed">
            Explore our latest case studies. Precision craftsmanship meets modular design systems to create unparalleled living experiences.
          </p>
        </div>

        <div className="relative flex flex-col gap-12 md:gap-24 pb-12">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="saas-card sticky top-4 md:top-12 w-full bg-primary backdrop-blur-xl border border-secondary/30 rounded-[1.5rem] md:rounded-[3rem] p-5 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(12,10,13,0.15)] flex flex-col lg:flex-row gap-6 lg:gap-12 will-change-transform"
            >

              <div className="w-full lg:w-5/12 flex flex-col justify-between order-2 lg:order-1">
                <div>
                  {/* Project Name - Increased size and locked to pure Ivory for maximum readability */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-karlen tracking-tight leading-[1.1] mb-6 md:mb-8 text-[#F8F5EE]">
                    {proj.name}
                  </h3>

                  <div className="flex flex-col gap-5 sm:gap-6 mb-8 md:mb-12">

                    {/* Caption 1 */}
                    <div className="flex items-start gap-4 sm:gap-5 group">
                      {/* Architectural Line Indicator (Replaces the dot) */}
                      <div className="w-6 sm:w-8 h-[1px] bg-[#B58A3A] mt-3 shrink-0 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-[#F8F5EE]" />

                      {/* Increased font size and opacity for better visibility */}
                      <p className="text-sm sm:text-base md:text-lg text-[#E9DFCE] leading-relaxed font-light group-hover:text-[#F8F5EE] transition-colors duration-300">
                        {proj.leftCaption}
                      </p>
                    </div>

                    {/* Caption 2 */}
                    <div className="flex items-start gap-4 sm:gap-5 group">
                      {/* Architectural Line Indicator */}
                      <div className="w-6 sm:w-8 h-[1px] bg-[#B58A3A] mt-3 shrink-0 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-[#F8F5EE]" />

                      {/* Increased font size and opacity for better visibility */}
                      <p className="text-sm sm:text-base md:text-lg text-[#E9DFCE] leading-relaxed font-light group-hover:text-[#F8F5EE] transition-colors duration-300">
                        {proj.rightCaption}
                      </p>
                    </div>

                  </div>
                </div>

                <div className="flex items-center relative z-20 pointer-events-auto">
                  <Link
                    to={`/projects/${proj.id}`}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-primary bg-surface px-6 py-2.5 sm:px-7 sm:py-3.5 font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-text-primary transition-all duration-500 ease-out hover:border-gold hover:bg-secondary hover:text-gold hover:shadow-[0_0_25px_rgba(48,37,28,0.5)] active:scale-95 whitespace-nowrap min-w-[170px]"
                  >
                    {/* SHIMMER EFFECT */}
                    <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

                    {/* SLIDING TEXT WITH FIXED WIDTH CONTAINER */}
                    <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em] w-full">
                      <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">VIEW PROJECT</span>
                      <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 font-bold leading-none">VIEW PROJECT</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-7/12 relative h-[240px] sm:h-[320px] md:min-h-[500px] rounded-xl md:rounded-3xl overflow-hidden border border-primary/20 order-1 lg:order-2 group">
                <img
                  src={proj.rightImage}
                  alt={proj.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-8 md:left-8 w-[38%] aspect-[4/3] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-4 border-secondary shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1">
                  <img
                    src={proj.leftImage}
                    alt={`${proj.name} detail`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Long View All Projects Button */}
        <div className="cta-reveal mt-12 md:mt-16 flex flex-col items-center w-full max-w-5xl mx-auto">
          <Link
            to="/projects"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-primary bg-surface px-8 py-5 w-full max-w-md font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-primary transition-all duration-500 ease-out hover:border-gold hover:bg-secondary hover:text-gold hover:shadow-[0_0_30px_rgba(48,37,28,0.4)] active:scale-95"
          >
            {/* SHIMMER EFFECT */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />

            {/* SLIDING TEXT */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden h-[1.2em] w-full">
              <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">VIEW ALL PROJECTS</span>
              <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 text-gold font-bold leading-none">VIEW ALL PROJECTS</span>
            </div>
          </Link>
        </div>

      </div>

      {/* Replaced old CTA card with the dedicated CtaSection component */}
      <div className="cta-reveal w-full mt-8">
        <CtaSection />
      </div>
    </div>
  );
};

export default ProjectsSection;