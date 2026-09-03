'use client';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../components/ModalContext'; 

const ProjectsPage: React.FC = () => {
  const { openModal } = useModal(); 
  
  // 7 Projects mapped to your local assets
  const projects = [
    {
      id: '01',
      title: 'Sumith',
      category: 'Residential',
      image: '/sumith-AZ/sumith-img-1.webp',
      layout: 'full', 
    },
    {
      id: '03',
      title: 'Prudhvi- Bollineni Bion',
      category: 'Residential',
      image: '/prudhvi-bion/prudhvi-img-1.webp',
      layout: 'left', 
    },
    {
      id: '04',
      title: 'Praveen',
      category: 'Residential',
      image: '/praveen-VRE/praveen-img-1.webp',
      layout: 'full',
    },
    {
      id: '05',
      title: 'Dharmateja',
      category: 'Residential',
      image: '/dharmateja/dharmateja-img-1.webp',
      layout: 'right',
    },
    {
      id: '06',
      title: 'Bharani',
      category: 'Residential',
      image: '/bharani/bharani-img-1.webp',
      layout: 'left',
    },
    {
      id: '07',
      title: 'Ramakrishna',
      category: 'Residential',
      image: '/ramakrishna/ramakrishna-img-1.webp',
      layout: 'full',
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
    <main className="relative min-h-screen w-full bg-[var(--color-primary)] font-body text-white overflow-hidden pt-32 pb-32 px-4 sm:px-6 lg:px-12 z-10 selection:bg-[var(--color-secondary)] selection:text-[var(--color-primary)]">
      
      <style>{`
        .clip-mask { overflow: hidden; padding-bottom: 0.15em; }
        .slide-up-text { transform: translateY(110%); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out; }
        .is-revealed .slide-up-text { transform: translateY(0); opacity: 1; }
        .slide-up-fade { transform: translateY(40px); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out; }
        .is-revealed .slide-up-fade { transform: translateY(0); opacity: 1; }
        .image-wrapper { transform: translateY(50px); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out; }
        .image-inner { transform: scale(1.15); transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .is-revealed .image-wrapper { transform: translateY(0); opacity: 1; }
        .is-revealed .image-inner { transform: scale(1); }
        .ease-buttery { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      <div className="absolute top-0 left-0 w-full max-w-3xl h-128 bg-[var(--color-secondary)]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col mb-24 md:mb-40 pt-10 hero-reveal">
          <div className="w-full mb-12 md:mb-16">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-karlen text-white leading-[0.95] tracking-tight flex flex-col">
              <div className="clip-mask block">
                <span className="slide-up-text block" style={{ transitionDelay: '0.1s' }}>
                  Selected
                </span>
              </div>
              <div className="clip-mask block self-end md:self-center pr-4 md:pl-32 lg:pl-64">
                <span className="slide-up-text block text-[var(--color-secondary)] italic font-light" style={{ transitionDelay: '0.2s' }}>
                  Works.
                </span>
              </div>
            </h1>
          </div>
          
          <div className="w-full flex justify-end">
            <div className="max-w-md border-l-[1.5px] border-[var(--color-secondary)]/30 pl-6 py-1 slide-up-fade" style={{ transitionDelay: '0.4s' }}>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                A curated exhibition of our most defining spaces. Each project represents our commitment to architectural purity and bespoke luxury.
              </p>
            </div>
          </div>
        </div>

        {/* PROJECT LIST */}
        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project) => {
            let layoutClasses = "w-full";
            let aspectRatio = "aspect-[16/9] md:aspect-[21/9]";
            
            if (project.layout === 'right') {
              layoutClasses = "w-full lg:w-[75%] lg:ml-auto";
              aspectRatio = "aspect-[4/3] md:aspect-[16/10]";
            } else if (project.layout === 'left') {
              layoutClasses = "w-full lg:w-[75%] lg:mr-auto";
              aspectRatio = "aspect-[4/3] md:aspect-[16/10]";
            }

            return (
              <Link 
                key={project.id} 
                to={`/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className={`reveal-group group flex flex-col ${layoutClasses}`}
              >
                {/* 1. Image Container with Text Overlay */}
                <div className={`image-wrapper relative w-full ${aspectRatio} overflow-hidden rounded-2xl md:rounded-3xl`} style={{ transitionDelay: '0s' }}>
                  
                  {/* Background Image */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="image-inner w-full h-full object-cover group-hover:scale-105 transition-[transform,filter] duration-1000 ease-buttery"
                  />
                  
                  {/* General Dark Tint (Optional, fades out on hover) */}
                  <div className="absolute inset-0 bg-[var(--color-primary)]/10 group-hover:bg-transparent transition-colors duration-1000 ease-buttery pointer-events-none z-0" />

                  {/* Dark Gradient Overlay strictly at the bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10 transition-opacity duration-1000 ease-buttery group-hover:opacity-90" />

                  {/* Text Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex flex-col justify-end">
                    
                    {/* Category Label (Yellow) */}
                    <div className="clip-mask mb-2">
                      <p className="slide-up-text text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] drop-shadow-md" style={{ transitionDelay: '0.1s' }}>
                        {project.category}
                      </p>
                    </div>

                    {/* Project Title (White, turns Yellow on hover) */}
                    <div className="clip-mask">
                      <h2 className="slide-up-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-karlen text-white group-hover:text-[var(--color-secondary)] transition-colors duration-500 ease-buttery drop-shadow-lg" style={{ transitionDelay: '0.2s' }}>
                        {project.title}
                      </h2>
                    </div>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="reveal-group mt-40 md:mt-56 flex flex-col items-center justify-center text-center">
          <div className="slide-up-fade w-12 h-px bg-[var(--color-secondary)]/50 mb-8 block" style={{ transitionDelay: '0s' }} />
          
          <div className="clip-mask mb-6">
            <h2 className="slide-up-text text-4xl md:text-6xl lg:text-7xl font-karlen text-white tracking-tight" style={{ transitionDelay: '0.1s' }}>
              Ready to craft your <br className="hidden md:block"/>
              <span className="text-[var(--color-secondary)] italic font-light">sanctuary?</span>
            </h2>
          </div>
          
          <div className="clip-mask mb-12 max-w-xl">
            <p className="slide-up-text text-sm md:text-base text-white/60 font-light leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              Let us help you bring your vision to life. Connect with our design studio to begin your journey toward a meticulously curated space.
            </p>
          </div>
          
          <div className="slide-up-fade" style={{ transitionDelay: '0.3s' }}>
            <button 
              type="button"
              onClick={openModal}
              className="px-10 py-4 bg-[var(--color-secondary)] text-[var(--color-primary)] text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
            >
              Start Your Project
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ProjectsPage;