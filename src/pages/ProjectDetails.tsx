'use client';

import React, { useEffect } from 'react';

const ProjectDetail: React.FC = () => {
  const project = {
    title: 'The Glasshouse Retreat',
    client: 'Private Residence',
    location: 'Jubilee Hills, Hyderabad',
    area: '12,500 sq ft',
    year: '2025',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop',
    overview: 'Perched on the edge of Jubilee Hills, The Glasshouse Retreat is a study in transparency and raw materiality. The clients requested a sanctuary that blurred the lines between the interior living spaces and the surrounding ancient rock formations.',
    approach: 'We utilized a restrained palette of poured concrete, blackened steel, and warm walnut to anchor the vast expanses of floor-to-ceiling glass. Custom millwork hides modern technology, allowing the architecture to speak for itself in profound silence.',
    gallery: [
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=2000&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1540932239986-30128078f3b5?q=80&w=1200&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop', 
    ]
  };

  // Set up the Intersection Observer on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Optional: stop observing once revealed so it doesn't animate out and in repeatedly
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before it hits the bottom of the screen
      }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-sand selection:text-primary z-10">
      
      {/* --- SCROLL ANIMATION CSS --- */}
      <style>{`
        /* Initial hidden state for scroll elements */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Activated state when scrolled into view */
        .reveal-on-scroll.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Keep the hero scale immediate on load */
        @keyframes image-scale {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-hero-scale {
          animation: image-scale 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- 1. FULL BLEED HERO --- */}
      <section className="relative w-full h-[85vh] lg:h-screen overflow-hidden">
        <img 
          src={project.heroImage} 
          alt={project.title} 
          className="w-full h-full object-cover animate-hero-scale"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/20 to-primary/40 pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-12 pb-16 md:pb-24 z-10">
          <div className="max-w-[90rem] mx-auto reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-karlen text-white leading-[0.95] tracking-tight mb-6">
              {project.title.split(' ')[0]} <br className="hidden md:block" />
              <span className="text-sand italic font-light">{project.title.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- 2. METADATA & OVERVIEW GRID --- */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 py-16 md:py-24 bg-primary">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-white/10 pb-16 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div>
              <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-2">Client</span>
              <span className="text-sm md:text-base text-white/80">{project.client}</span>
            </div>
            <div>
              <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-2">Location</span>
              <span className="text-sm md:text-base text-white/80">{project.location}</span>
            </div>
            <div>
              <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-2">Area</span>
              <span className="text-sm md:text-base text-white/80">{project.area}</span>
            </div>
            <div>
              <span className="block text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-2">Year</span>
              <span className="text-sm md:text-base text-white/80">{project.year}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 md:pt-24 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-karlen text-white">The Vision</h2>
            </div>
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 md:gap-16">
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed flex-1">
                {project.overview}
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed flex-1">
                {project.approach}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- 3. EXPANDED EDITORIAL GALLERY --- */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 pb-24 md:pb-40 bg-primary">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-8 md:gap-16">
          
          {/* Row 1: 40/60 Split */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="w-full md:w-[40%] rounded-2xl md:rounded-4xl overflow-hidden aspect-[3/4] md:aspect-[4/5] reveal-on-scroll">
              <img src={project.gallery[0]} alt="Project Detail 1" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
            <div className="w-full md:w-[60%] rounded-2xl md:rounded-4xl overflow-hidden aspect-[4/3] md:aspect-[16/10] reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <img src={project.gallery[1]} alt="Project Detail 2" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
          </div>

          {/* Row 2: Text Block & Small Detail Image */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 py-12 md:py-24 reveal-on-scroll">
            <div className="w-full md:w-1/2 lg:w-2/3 max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-karlen text-white leading-snug mb-6">
                "Light acts as the primary material in this residence, carving out volumes and casting shifting shadows across the textured concrete throughout the day."
              </h3>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                — Lead Architect Note
              </span>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 rounded-2xl md:rounded-[3rem] overflow-hidden aspect-square reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <img src={project.gallery[2]} alt="Project Detail 3" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
          </div>

          {/* Row 3: Massive Full Bleed Image */}
          <div className="w-full rounded-2xl md:rounded-4xl overflow-hidden aspect-video md:aspect-[21/9] reveal-on-scroll">
            <img src={project.gallery[3]} alt="Project Detail 4" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
          </div>

          {/* Row 4: Staggered 50/50 Split */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-12 md:mt-24">
            <div className="w-full md:w-1/2 rounded-2xl md:rounded-4xl overflow-hidden aspect-[4/5] reveal-on-scroll">
              <img src={project.gallery[4]} alt="Project Detail 5" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
            <div className="w-full md:w-1/2 rounded-2xl md:rounded-4xl overflow-hidden aspect-[4/5] mt-0 md:mt-32 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <img src={project.gallery[5]} alt="Project Detail 6" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
          </div>

          {/* Row 5: 60/40 Reverse Split */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-12 md:mt-24">
            <div className="w-full md:w-[60%] rounded-2xl md:rounded-4xl overflow-hidden aspect-[4/3] md:aspect-[16/10] reveal-on-scroll">
              <img src={project.gallery[6]} alt="Project Detail 7" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
            <div className="w-full md:w-[40%] rounded-2xl md:rounded-4xl overflow-hidden aspect-[3/4] md:aspect-[4/5] reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <img src={project.gallery[7]} alt="Project Detail 8" className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 scale-100 hover:scale-105 transition-all duration-1000 ease-buttery" />
            </div>
          </div>

        </div>
      </section>

      {/* --- 4. NEXT PROJECT CTA --- */}
      <section className="relative w-full py-24 md:py-32 px-4 text-center bg-primary flex flex-col items-center border-t border-white/5 reveal-on-scroll">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-6">
          Next Project
        </span>
        <a href="/projects/aura-suites" className="group">
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-karlen text-white/50 group-hover:text-white transition-colors duration-700 ease-buttery leading-none">
            Aura <span className="text-white/30 group-hover:text-sand italic font-light transition-colors duration-700 ease-buttery">Suites</span>
          </h2>
        </a>
      </section>

    </main>
  );
};

export default ProjectDetail;