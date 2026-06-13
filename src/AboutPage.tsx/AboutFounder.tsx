import React from 'react';

const AboutFounder: React.FC = () => {
  return (
    <section className="relative w-full bg-[var(--color-primary)] py-20 md:py-32 px-6 md:px-12 lg:px-20 font-body border-t border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* --- LEFT: PORTRAIT --- */}
        <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group">
          {/* Professional Founder Portrait Placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000&auto=format&fit=crop" 
            alt="Karthik Sai - Founder of Zencraft" 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          />
          {/* Subtle inner border to ground the image */}
          <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
          {/* Subtle bottom gradient to blend with the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* --- RIGHT: TYPOGRAPHY & BIO --- */}
        <div className="flex flex-col justify-center text-white">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-[var(--color-secondary)]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[var(--color-secondary)]">
              The Visionary
            </span>
          </div>

          {/* Names & Titles */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-karlen mb-2">
            Karthik Sai
          </h2>
          <p className="text-[var(--color-sand)] text-xs md:text-sm font-bold tracking-widest uppercase mb-8">
            Founder & Principal Designer
          </p>

          {/* Bio Content */}
          <div className="space-y-6 text-sm md:text-base text-white/70 leading-relaxed font-light mb-8">
            <p>
              With a profound appreciation for modern minimalism and timeless elegance, Karthik founded Zencraft to bridge the gap between architectural precision and intimate, livable design.
            </p>
            <p>
              His unique background gives him a highly analytical approach to interiors—treating every room as an ecosystem where form, function, and flow must exist in perfect, uninterrupted harmony. 
            </p>
            <p>
              Under his creative direction, Zencraft has grown into a studio known for delivering spaces that feel exceptionally tailored, deeply personal, and uncompromisingly luxurious.
            </p>
          </div>

          {/* Signature Quote */}
          <blockquote className="border-l-[3px] border-[var(--color-secondary)] pl-6 py-2 mt-4 text-white/90 italic font-karlen text-xl md:text-2xl leading-snug">
            "A space shouldn't just look beautiful; it should feel like an exhale the moment you walk through the door."
          </blockquote>

        </div>
      </div>
    </section>
  );
};

export default AboutFounder;