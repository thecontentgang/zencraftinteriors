'use client';

import React from 'react';
import { useModal } from '../components/ModalContext'; // 1. Import the Modal Context

const AboutHero: React.FC = () => {
  const { openModal } = useModal(); // 2. Extract the openModal function

  return (
    <section className="relative w-full min-h-screen bg-[var(--color-primary)] font-body flex flex-col items-center pt-32 md:pt-40 pb-20 px-4 sm:px-6 overflow-hidden z-10">
      
      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-128 bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* --- TOP: CENTERED TYPOGRAPHY --- */}
      <div className="flex flex-col items-center text-center max-w-4xl z-20 animate-fade-in-up">
        
        {/* Eyebrow (Symmetrical) */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <span className="w-8 md:w-12 h-px bg-[var(--color-secondary)]/50" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-secondary)]">
            Since 2014
          </span>
          <span className="w-8 md:w-12 h-px bg-[var(--color-secondary)]/50" />
        </div>
        
        {/* Headline: Focus on Legacy and Silence */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-karlen text-white leading-[1.05] tracking-tight mb-8">
          Designing the silent <br className="hidden md:block" />
          <span className="text-sand italic font-light">language of luxury.</span>
        </h1>

        {/* Subtitle: Focus on Storytelling and Precision */}
        <p className="text-sm md:text-base text-white/70 font-light leading-relaxed max-w-2xl mb-10 md:mb-12 px-4 md:px-0">
          At The Zencraft, we believe a home is more than an address; it is a meticulously curated sanctuary where architectural precision meets the poetic rhythm of your life. We don't just build rooms; we craft your legacy.
        </p>
        
        {/* 3. Call to Action - Connected to Modal */}
        <button 
          onClick={openModal}
          className="px-10 py-4 bg-[var(--color-secondary)] text-[var(--color-primary)] text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
        >
          Consult Our Studio
        </button>
      </div>

      {/* --- BOTTOM: CINEMATIC CENTERED IMAGE & FLOATING BAR --- */}
      <div 
        className="relative w-full max-w-7xl mt-16 md:mt-24 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl z-20 animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="aspect-[4/5] sm:aspect-video md:aspect-[21/9] w-full relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop"
            alt="The Zencraft Bespoke Interior"
            className="w-full h-full object-cover scale-105 animate-[image-scale_10s_ease-out_forwards]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-primary)]/80 to-transparent pointer-events-none" />
        </div>

        {/* --- FLOATING GLASS BAR --- */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-[var(--color-primary)]/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:px-12 md:py-6 flex flex-col md:flex-row items-center gap-6 md:gap-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl font-karlen text-white mb-1">
              10<span className="text-[var(--color-secondary)]">+</span>
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/60">
              Decade of Mastery
            </span>
          </div>

          <div className="hidden md:block w-px h-12 bg-white/10" />

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl font-karlen text-white mb-1">
              150<span className="text-[var(--color-secondary)]">+</span>
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/60">
              Bespoke Residences
            </span>
          </div>

          <div className="hidden md:block w-px h-12 bg-white/10" />

          {/* Service Label */}
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full border border-[var(--color-secondary)] flex items-center justify-center mb-2 text-[var(--color-secondary)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4v14a2 2 0 002 2h12a2 2 0 002-2v-5M9 15l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-white/60">
              Artisan Curation
            </span>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes image-scale {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutHero;