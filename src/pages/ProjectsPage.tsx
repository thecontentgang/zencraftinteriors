'use client';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CtaSection from '../HomePage/CtaSection';

const ProjectsPage: React.FC = () => {


  // Projects array simplified (removed layout properties as all are uniform now)
  const projects = [
    {
      id: '01',
      title: 'Sumith',
      category: 'Residential',
      image: '/sumith-AZ/sumith-img-1.webp',
    },
    {
      id: '03',
      title: 'Prudhvi - Bollineni Bion',
      category: 'Residential',
      image: '/prudhvi-bion/prudhvi-img-1.webp',
    },
    {
      id: '04',
      title: 'Praveen',
      category: 'Residential',
      image: '/praveen-VRE/praveen-img-1.webp',
    },
    {
      id: '05',
      title: 'Dharmateja',
      category: 'Residential',
      image: '/dharmateja/dharmateja-img-1.webp',
    },
    {
      id: '06',
      title: 'Bharani',
      category: 'Residential',
      image: '/bharani/bharani-img-1.webp',
    },
    {
      id: '07',
      title: 'Ramakrishna',
      category: 'Residential',
      image: '/ramakrishna/ramakrishna-img-1.webp',
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-group');
    revealElements.forEach((el) => observer.observe(el));

    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#F8F5EE] font-body text-[#39342D] overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 z-10 selection:bg-[#B58A3A] selection:text-white">

      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
      <style>{`
        .clip-mask { overflow: hidden; padding-bottom: 0.15em; }
        .slide-up-text { transform: translateY(110%); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out; }
        .is-revealed .slide-up-text { transform: translateY(0); opacity: 1; }
        .slide-up-fade { transform: translateY(40px); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out; }
        .is-revealed .slide-up-fade { transform: translateY(0); opacity: 1; }
        .image-wrapper { transform: translateY(50px); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out; }
        .image-inner { transform: scale(1.12); transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .is-revealed .image-wrapper { transform: translateY(0); opacity: 1; }
        .is-revealed .image-inner { transform: scale(1); }
        .ease-buttery { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* --- WARM AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-128 bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full">

        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32 pt-10 hero-reveal">

          <div className="clip-mask mb-6">
            <div className="flex items-center justify-center gap-4 slide-up-text" style={{ transitionDelay: '0s' }}>
              <span className="w-8 md:w-12 h-px bg-[#B58A3A]" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#B58A3A]">
                Our Portfolio
              </span>
              <span className="w-8 md:w-12 h-px bg-[#B58A3A]" />
            </div>
          </div>

          <div className="w-full mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-karlen text-[#39342D] leading-[1.05] tracking-tight flex flex-col items-center">
              <div className="clip-mask block">
                <span className="slide-up-text block" style={{ transitionDelay: '0.1s' }}>
                  Selected
                </span>
              </div>
              <div className="clip-mask block">
                <span className="slide-up-text block text-[#B58A3A] italic font-light" style={{ transitionDelay: '0.2s' }}>
                  Works.
                </span>
              </div>
            </h1>
          </div>

          <div className="clip-mask max-w-2xl mx-auto">
            <p className="slide-up-text text-sm md:text-base text-[#8A8175] font-light leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              A curated exhibition of our most defining spaces. Each project represents our commitment to architectural purity and bespoke luxury.
            </p>
          </div>
        </div>

        {/* --- UNIFORM, CENTERED PROJECT LIST --- */}
        <div className="flex flex-col gap-16 md:gap-24 items-center">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="reveal-group group flex flex-col w-full max-w-[75rem]"
            >
              {/* Image Container with Text Overlay */}
              <div className="image-wrapper relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/7] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(57,52,45,0.15)] border border-[#B58A3A]/20" style={{ transitionDelay: '0s' }}>

                {/* Background Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="image-inner w-full h-full object-cover grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-[transform,filter] duration-1000 ease-buttery"
                />

                {/* General Dark Tint (Fades out on hover for pop effect) */}
                <div className="absolute inset-0 bg-[#39342D]/15 group-hover:bg-transparent transition-colors duration-1000 ease-buttery pointer-events-none z-0" />

                {/* Dark Gradient Overlay strictly at the bottom for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] lg:h-[70%] bg-gradient-to-t from-[#39342D]/95 via-[#39342D]/50 to-transparent pointer-events-none z-10 transition-opacity duration-1000 ease-buttery group-hover:opacity-90" />

                {/* Text Content Overlay (Flex spread between Title and Action Button) */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-12 z-20 flex items-end justify-between">

                  {/* Left Side: Category & Title */}
                  <div className="flex flex-col">
                    <div className="clip-mask mb-3">
                      <div className="slide-up-text flex items-center gap-3" style={{ transitionDelay: '0.1s' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3A]" />
                        <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#B58A3A] drop-shadow-md">
                          {project.category}
                        </p>
                      </div>
                    </div>

                    <div className="clip-mask">
                      <h2 className="slide-up-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-karlen text-[#F8F5EE] group-hover:text-[#B58A3A] transition-colors duration-500 ease-buttery drop-shadow-lg" style={{ transitionDelay: '0.2s' }}>
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  {/* Right Side: View Project Button / Icon */}
                  <div className="clip-mask hidden sm:block">
                    <div className="slide-up-text flex items-center gap-4" style={{ transitionDelay: '0.3s' }}>
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-transparent group-hover:text-[#F8F5EE] transition-colors duration-500 ease-buttery translate-x-4 group-hover:translate-x-0">
                        View Project
                      </span>
                      <div className="w-14 h-14 rounded-full border border-[#B58A3A]/40 flex items-center justify-center text-[#F8F5EE] bg-[#39342D]/30 backdrop-blur-sm group-hover:border-[#B58A3A] group-hover:bg-[#B58A3A] transition-all duration-500 ease-buttery">
                        {/* Correct "Arrow Up Right" SVG for linking to details */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-buttery"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="cta-reveal w-full mt-8">
          <CtaSection />
        </div>

      </div>
    </main>
  );
};

export default ProjectsPage;