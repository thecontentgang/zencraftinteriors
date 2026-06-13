import React from 'react';

const AboutPhilosophy: React.FC = () => {
  return (
    <section className="relative w-full bg-[var(--color-primary)] py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden font-body text-white">
      
      {/* Subtle background accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-secondary)]/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* --- LEFT: OVERLAPPING IMAGE COMPOSITION --- */}
        <div className="relative w-full max-w-md mx-auto lg:max-w-full">
          {/* Main Large Image */}
          <div className="relative w-[85%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl z-10">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" 
              alt="Luxury Interior Living Space" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
          </div>

          {/* Secondary Overlapping Image (Texture/Detail) */}
          <div className="absolute -bottom-10 -right-4 md:-right-10 w-[55%] aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border-8 border-[var(--color-primary)]">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" 
              alt="Interior Material Detail" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          
          {/* Decorative Element */}
          <div className="absolute top-10 -left-6 w-24 h-24 border border-[var(--color-secondary)]/30 rounded-full animate-pulse-slow -z-10" />
        </div>

        {/* --- RIGHT: TYPOGRAPHY & STORY --- */}
        <div className="flex flex-col items-start mt-12 lg:mt-0 z-10">
          
          {/* Section Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-[var(--color-secondary)]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[var(--color-secondary)]">
              Our Philosophy
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-karlen leading-tight text-white mb-8">
            Designing spaces that <br className="hidden md:block" />
            <span className="text-[var(--color-sand)] italic font-light">breathe with you.</span>
          </h2>

          {/* Body Text */}
          <div className="space-y-6 text-sm md:text-base text-white/70 leading-relaxed font-light mb-10 max-w-xl">
            <p>
              At Zencraft, we believe that true luxury is not defined by excess, but by intention. Every texture we select, every light we place, and every layout we draft is rooted in a deep understanding of how you live and interact with your environment.
            </p>
            <p>
              Our approach marries timeless architectural principles with modern sensibilities. We don't just decorate rooms; we sculpt sanctuaries that reflect your personal narrative, creating a seamless harmony between aesthetics and functionality.
            </p>
          </div>

          {/* Founder/Lead Signature Block */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/10 w-full max-w-md">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0">
              {/* Optional: Replace with actual founder image */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" 
                alt="Lead Designer" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div>
              <h4 className="text-white font-karlen text-lg tracking-wide">Karthik Sai</h4>
              <p className="text-[10px] tracking-widest uppercase text-[var(--color-secondary)] font-bold mt-1">
                Founder & Lead Designer
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPhilosophy;