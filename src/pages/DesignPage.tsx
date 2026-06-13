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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // FIX: Extracted layout logic to avoid useless variable assignments
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
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-sand selection:text-primary z-10 pt-32 pb-40">
      
      {/* --- INLINE ANIMATIONS --- */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- PAGE HEADER --- */}
      {/* FIX: Replaced max-w-[90rem] with the canonical max-w-360 */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-12 mb-24 md:mb-40 reveal-on-scroll is-revealed">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-karlen text-white leading-[0.9] tracking-tight">
              Our <span className="text-sand italic font-light">Designs.</span>
            </h1>
          </div>
          <div className="md:max-w-sm pb-2">
            <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
              A curated collection of our most defining projects, exploring the delicate balance between structural integrity and human emotion.
            </p>
          </div>
        </div>
      </div>

      {/* --- RHYTHMIC EDITORIAL GRID --- */}
      {/* FIX: Replaced max-w-[90rem] with the canonical max-w-360 */}
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-48 gap-x-8">
          
          {projects.map((project, index) => {
            // Destructure our clean, scope-safe variables
            const { colSpan, aspect } = getGridLayout(index);

            return (
              <div 
                key={project.id} 
                className={`group flex flex-col reveal-on-scroll ${colSpan}`}
              >
                {/* Image Container */}
                <a 
                  href={`/designs/${project.id}`}
                  className={`relative w-full overflow-hidden block mb-6 md:mb-10 ${aspect}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform scale-[1.03] group-hover:scale-100 transition-transform duration-[1.5s] ease-buttery"
                  />
                  {/* Subtle dark overlay that lifts on hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                </a>

                {/* Project Metadata */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-karlen text-white mb-2 group-hover:text-sand transition-colors duration-500">
                      {project.title}
                    </h2>
                    <span className="text-sm font-light text-white/50 block">
                      {project.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 md:text-right pt-2 md:pt-0">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                      {project.type}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/30">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="mt-40 pt-20 border-t border-white/10 flex flex-col items-center text-center px-6 reveal-on-scroll">
        <h3 className="text-3xl md:text-5xl font-karlen text-white mb-8">
          Ready to begin <span className="text-sand italic">your</span> narrative?
        </h3>
        <button className="group flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-white hover:text-secondary transition-colors duration-500 ease-buttery">
          <span className="w-12 h-px bg-white/20 group-hover:bg-secondary transition-colors" />
          Start a Conversation
          <span className="w-12 h-px bg-white/20 group-hover:bg-secondary transition-colors" />
        </button>
      </div>

    </main>
  );
};

export default DesignsPage;