'use client';

import React, { useEffect } from 'react';

const ServiceDetail: React.FC = () => {
  const phases = [
    {
      id: '01',
      title: 'Brand Spatial Translation',
      description: 'We translate your brand’s ethos into physical architecture. From the reception desk to the boardroom, every material and touchpoint is designed to communicate your core values to clients and staff silently.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      deliverables: ['Brand Auditing', 'Concept Ideation', 'Material Boarding']
    },
    {
      id: '02',
      title: 'Flow & Ergonomics',
      description: 'Commercial spaces must perform seamlessly. We map out high-traffic zones, collaborative hubs, and private focus areas to optimize foot traffic and maximize team efficiency without feeling clinical.',
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1200&auto=format&fit=crop',
      deliverables: ['Traffic Mapping', 'Zoning Strategy', 'Ergonomic Layouts']
    },
    {
      id: '03',
      title: 'Acoustic & Lighting Design',
      description: 'Sound and light dictate the mood of a room. We integrate hidden acoustic dampening and layer circadian-friendly lighting to foster deep focus in workspaces and intimate ambiance in hospitality venues.',
      image: 'https://images.unsplash.com/photo-1556702571-3e11328b8eb8?q=80&w=1200&auto=format&fit=crop',
      deliverables: ['Acoustic Paneling', 'Luminary Mapping', 'Ambiance Control']
    },
    {
      id: '04',
      title: 'Turnkey Execution',
      description: 'We manage the friction so you don’t have to. From contractor procurement to the final styling of the executive suites, we deliver a completed, ready-to-operate space on timeline and strictly to spec.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
      deliverables: ['Contractor Oversight', 'Quality Assurance', 'Final Styling']
    }
  ];

  // Advanced Observer targeting the 'reveal-group' wrappers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adds the class that triggers all child animations
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-group');
    revealElements.forEach((el) => observer.observe(el));

    // Force hero reveal immediately on mount
    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-sand selection:text-primary z-10">
      
      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
      <style>{`
        /* 1. The Mask Container (Hides text before it slides up) */
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em; /* Prevents letters like 'y' or 'g' from clipping */
        }

        /* 2. Text Slide Up Effect */
        .slide-up-text {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .is-revealed .slide-up-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* 3. Standard Soft Fade & Float for Paragraphs/Tags */
        .slide-up-fade {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out;
        }
        .is-revealed .slide-up-fade {
          transform: translateY(0);
          opacity: 1;
        }

        /* 4. Image Reveal (Wrapper slides up slightly, image scales down) */
        .image-wrapper {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .image-inner {
          transform: scale(1.15);
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed .image-wrapper {
          transform: translateY(0);
          opacity: 1;
        }
        .is-revealed .image-inner {
          transform: scale(1);
        }

        /* Reusable buttery easing */
        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- 1. PREMIUM CENTERED HERO --- */}
      <section className="relative w-full pt-40 pb-20 px-4 sm:px-6 lg:px-12 bg-primary flex flex-col items-center text-center hero-reveal">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl w-full flex flex-col items-center">
          
          <div className="clip-mask mb-8">
            <div className="flex items-center justify-center gap-4 slide-up-text" style={{ transitionDelay: '0s' }}>
              <span className="w-8 md:w-16 h-px bg-secondary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-secondary">
                Service 02
              </span>
              <span className="w-8 md:w-16 h-px bg-secondary" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-karlen text-white leading-[0.95] tracking-tight mb-8">
            <div className="clip-mask">
              <div className="slide-up-text" style={{ transitionDelay: '0.1s' }}>
                Commercial
              </div>
            </div>
            <div className="clip-mask">
              <div className="slide-up-text text-sand italic font-light" style={{ transitionDelay: '0.2s' }}>
                & Hospitality.
              </div>
            </div>
          </h1>
          
          <div className="clip-mask max-w-2xl mx-auto">
            <p className="slide-up-text text-sm md:text-base text-white/60 font-light leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              We architect environments that perform. By merging striking aesthetics with operational flow, we create commercial spaces that captivate your clients and empower your teams.
            </p>
          </div>

        </div>
      </section>

      {/* --- 2. CENTRAL-AXIS ALTERNATING TIMELINE --- */}
      <section className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-12 bg-primary">
        <div className="max-w-6xl mx-auto relative">
          
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/15 to-transparent z-0" />

          <div className="flex flex-col gap-24 md:gap-32">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={phase.id} 
                  className="reveal-group group relative flex flex-col md:flex-row items-center w-full"
                >
                  
                  {/* CENTRAL TIMELINE DOT (Desktop Only) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center z-20">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-secondary group-hover:scale-150 group-hover:bg-secondary transition-all duration-500 ease-buttery slide-up-fade" style={{ transitionDelay: '0.2s' }} />
                  </div>

                  {/* --- HALF 1: IMAGE --- */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:pr-16 lg:pr-24 justify-end order-1' : 'md:pl-16 lg:pl-24 justify-start order-1 md:order-2'} mb-10 md:mb-0 z-10`}>
                    
                    {/* Image Wrapper controls the slide up */}
                    <div className="image-wrapper w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative" style={{ transitionDelay: isEven ? '0s' : '0.2s' }}>
                      
                      {/* Image Inner controls the scale down & zoom */}
                      <img 
                        src={phase.image} 
                        alt={phase.title}
                        className="image-inner w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-1000 ease-buttery"
                      />
                      <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
                      
                      <div className="md:hidden absolute top-4 left-4 bg-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 slide-up-fade" style={{ transitionDelay: '0.4s' }}>
                        <span className="text-[10px] font-bold tracking-widest text-secondary">PHASE {phase.id}</span>
                      </div>

                    </div>
                  </div>

                  {/* --- HALF 2: TEXT CONTENT --- */}
                  <div className={`w-full md:w-1/2 flex flex-col justify-center z-10 ${isEven ? 'md:pl-16 lg:pl-24 order-2' : 'md:pr-16 lg:pr-24 md:items-end md:text-right order-2 md:order-1'}`}>
                    
                    <div className="clip-mask hidden md:block mb-4">
                      <span className="slide-up-text block text-[10px] font-bold tracking-[0.3em] uppercase text-secondary" style={{ transitionDelay: isEven ? '0.2s' : '0s' }}>
                        Phase {phase.id}
                      </span>
                    </div>

                    <div className="clip-mask mb-6">
                      <h3 className="slide-up-text text-3xl md:text-4xl font-karlen text-white group-hover:text-sand transition-colors duration-500 ease-buttery" style={{ transitionDelay: isEven ? '0.3s' : '0.1s' }}>
                        {phase.title}
                      </h3>
                    </div>
                    
                    <div className="clip-mask mb-8">
                      <p className={`slide-up-text text-sm md:text-base text-white/60 font-light leading-relaxed max-w-md ${isEven ? '' : 'md:ml-auto'}`} style={{ transitionDelay: isEven ? '0.4s' : '0.2s' }}>
                        {phase.description}
                      </p>
                    </div>

                    <div className={`flex flex-wrap gap-2 slide-up-fade ${isEven ? '' : 'md:justify-end'}`} style={{ transitionDelay: isEven ? '0.5s' : '0.3s' }}>
                      {phase.deliverables.map((item, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 3. IMMERSIVE STATS/QUOTE BREAK --- */}
      <section className="reveal-group relative w-full py-24 md:py-32 px-4 bg-primary border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="clip-mask mb-2">
              <span className="slide-up-text block text-5xl md:text-6xl font-karlen text-white" style={{ transitionDelay: '0s' }}>40<span className="text-secondary">+</span></span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50" style={{ transitionDelay: '0.1s' }}>Commercial Projects</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="clip-mask mb-2">
              <span className="slide-up-text block text-5xl md:text-6xl font-karlen text-white" style={{ transitionDelay: '0.2s' }}>100<span className="text-secondary">%</span></span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50" style={{ transitionDelay: '0.3s' }}>Turnkey Handover</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="clip-mask mb-2">
              <span className="slide-up-text block text-5xl md:text-6xl font-karlen text-white" style={{ transitionDelay: '0.4s' }}>ROI</span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50" style={{ transitionDelay: '0.5s' }}>Design-Driven Value</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- 4. COMPACT NEXT SERVICE CTA --- */}
      <section className="reveal-group relative w-full py-24 px-4 text-center bg-primary flex flex-col items-center">
        <div className="clip-mask mb-6">
          <span className="slide-up-text block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40" style={{ transitionDelay: '0s' }}>
            Next Service
          </span>
        </div>
        
        <a href="/services/renovation" className="group flex items-center gap-6 slide-up-fade" style={{ transitionDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-karlen text-white/50 group-hover:text-white transition-colors duration-700 ease-buttery">
            Architectural <span className="text-sand italic font-light opacity-50 group-hover:opacity-100 transition-opacity">Renovation</span>
          </h2>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:border-secondary group-hover:text-primary group-hover:bg-secondary transition-all duration-500">
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7-7H3" />
            </svg>
          </div>
        </a>
      </section>

    </main>
  );
};

export default ServiceDetail;