'use client';

import React, { useEffect } from 'react';

const DesignsPage: React.FC = () => {
  const projects = [
    {
      id: 'prj-01',
      title: 'Villa d’Ombra',
      location: 'Lake Como, Italy',
      type: 'Residential',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'prj-02',
      title: 'The Monolith Gallery',
      location: 'Copenhagen, Denmark',
      type: 'Cultural',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'prj-03',
      title: 'Aura Penthouse',
      location: 'New York, USA',
      type: 'Interior',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'prj-04',
      title: 'Desert Pavilion',
      location: 'Joshua Tree, USA',
      type: 'Hospitality',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'prj-05',
      title: 'Brutal Sanctuary',
      location: 'Kyoto, Japan',
      type: 'Residential',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
    }
  ];

  // Advanced intersection orchestration
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-group');
    revealElements.forEach((el) => observer.observe(el));

    // Instant mounting target for layout entry header
    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, []);

  const getGridLayout = (index: number) => {
    if (index % 3 === 0) {
      return { colSpan: "md:col-span-12", aspect: "aspect-[16/9] md:aspect-[21/9]" };
    }
    if (index % 3 === 1) {
      return { colSpan: "md:col-span-7 md:col-start-1", aspect: "aspect-[4/5] md:aspect-[3/4]" };
    }
    return { colSpan: "md:col-span-4 md:col-start-8 mt-12 md:mt-48", aspect: "aspect-square md:aspect-[4/5]" };
  };

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-gold selection:text-primary z-10 pt-32 pb-40">
      
      {/* --- PREMIUM TEXT MASKING & REVEAL CSS --- */}
      <style>{`
        /* Boundary clipping wrapper */
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em;
        }

        /* Fluid upward transition for typographic structures */
        .slide-up-text {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s ease-out;
        }
        .is-revealed .slide-up-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* Subtle offset mapping for paragraphs & layout lines */
        .slide-up-fade {
          transform: translateY(35px);
          opacity: 0;
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s ease-out;
        }
        .is-revealed .slide-up-fade {
          transform: translateY(0);
          opacity: 1;
        }

        /* Image mask scaling profiles */
        .image-wrapper {
          transform: translateY(50px);
          opacity: 0;
          transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out;
        }
        .image-inner {
          transform: scale(1.15);
          transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed .image-wrapper {
          transform: translateY(0);
          opacity: 1;
        }
        .is-revealed .image-inner {
          transform: scale(1);
        }

        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- PAGE HEADER --- */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-12 mb-24 md:mb-40 hero-reveal">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-karlen text-white leading-[0.9] tracking-tight">
              <div className="clip-mask">
                <span className="slide-up-text block">Our</span>
              </div>
              <div className="clip-mask">
                <span className="slide-up-text text-gold italic font-light block">Designs.</span>
              </div>
            </h1>
          </div>
          <div className="md:max-w-sm pb-2">
            <p className="slide-up-text text-sm md:text-base text-white/50 font-light leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              A curated collection of our most defining projects, exploring the delicate balance between structural integrity and human emotion.
            </p>
          </div>
        </div>
      </div>

      {/* --- RHYTHMIC EDITORIAL GRID --- */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-48 gap-x-8">
          
          {projects.map((project, index) => {
            const { colSpan, aspect } = getGridLayout(index);

            return (
              <div 
                key={project.id} 
                className={`reveal-group group flex flex-col ${colSpan}`}
              >
                {/* Image Frame Wrapper */}
                <a 
                  href={`/designs/${project.id}`}
                  className={`image-wrapper relative w-full overflow-hidden block mb-6 md:mb-10 ${aspect}`}
                  style={{ transitionDelay: '0s' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="image-inner absolute inset-0 w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-[transform,filter] duration-[1.5s] ease-buttery"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                </a>

                {/* Project Metadata Overlay */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-t border-white/10 pt-6">
                  <div>
                    <div className="clip-mask mb-1">
                      <h2 className="slide-up-text text-3xl md:text-5xl font-karlen text-white group-hover:text-gold transition-colors duration-500" style={{ transitionDelay: '0.1s' }}>
                        {project.title}
                      </h2>
                    </div>
                    <div className="clip-mask">
                      <span className="slide-up-text text-sm font-light text-white/50 block" style={{ transitionDelay: '0.2s' }}>
                        {project.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 md:text-right pt-2 md:pt-0">
                    <div className="clip-mask">
                      <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-gold" style={{ transitionDelay: '0.1s' }}>
                        {project.type}
                      </span>
                    </div>
                    <div className="clip-mask">
                      <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] text-white/30" style={{ transitionDelay: '0.2s' }}>
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="reveal-group mt-40 pt-20 border-t border-white/10 flex flex-col items-center text-center px-6">
        <h3 className="clip-mask text-3xl md:text-5xl font-karlen text-white mb-8">
          <span className="slide-up-text block" style={{ transitionDelay: '0s' }}>
            Ready to begin <span className="text-gold italic">your</span> narrative?
          </span>
        </h3>
        
        <div className="slide-up-fade" style={{ transitionDelay: '0.2s' }}>
          <button className="group flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-white hover:text-gold transition-colors duration-500 ease-buttery">
            <span className="w-12 h-px bg-white/20 group-hover:bg-gold transition-colors" />
            Start a Conversation
            <span className="w-12 h-px bg-white/20 group-hover:bg-gold transition-colors" />
          </button>
        </div>
      </div>

    </main>
  );
};

export default DesignsPage;