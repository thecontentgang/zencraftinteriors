import React from 'react';

const AboutProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Concept',
      description: 'We begin by understanding your lifestyle, vision, and the architecture of the space. This phase culminates in a detailed mood board and conceptual direction.'
    },
    {
      number: '02',
      title: 'Spatial Planning',
      description: 'Our team drafts precise 2D layouts and 3D renderings, optimizing the flow, natural light, and structural potential of your environment.'
    },
    {
      number: '03',
      title: 'Curation & Sourcing',
      description: 'We hand-select materials, bespoke furniture, and rare finishes from our global network of artisans, ensuring every piece aligns with the design narrative.'
    },
    {
      number: '04',
      title: 'Execution & Styling',
      description: 'From construction oversight to the final placement of decor and art, we manage the entire installation process to deliver a turnkey sanctuary.'
    }
  ];

  return (
    <section className="relative w-full bg-[var(--color-primary)] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5 font-body">
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-[var(--color-secondary)]" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[var(--color-secondary)]">
                Our Methodology
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-karlen leading-tight text-white">
              The Zencraft <br />
              <span className="text-[var(--color-sand)] italic font-light">Signature Approach</span>
            </h2>
          </div>
          
          <div className="md:max-w-sm">
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
              A transparent, meticulous, and collaborative journey from the first sketch to the final reveal.
            </p>
          </div>
        </div>

        {/* --- PROCESS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-[var(--color-secondary)]/50 transition-colors duration-500 overflow-hidden"
            >
              {/* Giant Background Number */}
              <div className="absolute -top-10 -right-4 text-[120px] md:text-[150px] font-karlen font-bold text-white/5 group-hover:text-[var(--color-secondary)]/10 transition-colors duration-500 pointer-events-none select-none">
                {step.number}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Small indicator dot that lights up on hover */}
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[var(--color-secondary)] transition-colors duration-500 mb-8" />
                
                <h3 className="text-xl md:text-2xl font-karlen text-white mb-4 group-hover:text-[var(--color-sand)] transition-colors duration-500">
                  {step.title}
                </h3>
                
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light mt-auto">
                  {step.description}
                </p>
              </div>

              {/* Hover Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutProcess;