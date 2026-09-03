'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    id: 1,
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with 9:16 vertical videos
    poster: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&h=1066&auto=format&fit=crop",
    quote: "They didn't just redesign our home; they completely re-engineered how we live in it. The spatial flow and custom millwork are flawless.",
    name: "Vikram Reddy",
    role: "Homeowner, Jubilee Hills"
  },
  {
    id: 2,
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&h=1066&auto=format&fit=crop",
    quote: "Our corporate headquarters required a balance of aggressive modernism and calm focus. The execution was handled with absolute precision.",
    name: "Priya Sharma",
    role: "CEO, TechFlow Solutions"
  },
  {
    id: 3,
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&h=1066&auto=format&fit=crop",
    quote: "Finding designers who truly understand 'quiet luxury' is rare. The way they manipulate natural light and raw textures is nothing short of mastery.",
    name: "Ananya Desai",
    role: "Creative Director, Studio Aura"
  },
  {
    id: 4,
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&h=1066&auto=format&fit=crop",
    quote: "No hidden costs, no missed deadlines. The sanctuary they crafted for us is deeply personal and perfectly balanced for our family.",
    name: "Arjun Rao",
    role: "Homeowner, Banjara Hills"
  }
];

const HorizontalVideoTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  // Track which video is currently playing to ensure only one plays at a time
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Animate Header
    tl.fromTo(".testi-header-el", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // Animate Cards Sliding In
    tl.fromTo(".testi-card", 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: sectionRef });

  // Handle Video Playback Logic
  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingId === index) {
      video.pause();
      setPlayingId(null);
    } else {
      if (playingId !== null && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      video.play();
      setPlayingId(index);
    }
  };

  // Sync mute state across all videos
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  // Carousel Scroll Controls
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="testi-header-el inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase text-white/70 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary,white)] animate-pulse" />
              Client Perspectives
            </span>
            <h2 className="testi-header-el text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.05] text-white/95">
              The living <span className="text-[var(--color-secondary,#D4AF37)] italic font-light">proof.</span>
            </h2>
          </div>
          
          {/* Global Controls & Scroll Nav */}
          <div className="testi-header-el flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {isMuted ? 'Unmute Videos' : 'Mute Videos'}
            </button>
            <div className="h-6 w-px bg-white/20 mx-2 hidden md:block" />
            <div className="flex gap-2">
              <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- INSTAGRAM REELS STYLE CAROUSEL --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {testimonials.map((t, index) => {
            const isPlaying = playingId === index;

            return (
              <div 
                key={t.id} 
                // Instagram-style 9:16 vertical aspect ratio card
                className="testi-card relative w-[80vw] sm:w-[320px] md:w-[340px] aspect-[9/16] shrink-0 snap-center md:snap-start bg-[#0D0D0E] border border-white/10 rounded-[2rem] overflow-hidden group shadow-xl hover:border-white/20 transition-all duration-500 cursor-pointer"
                onClick={() => togglePlay(index)}
              >
                
                {/* 1. Video Player */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={t.videoSrc}
                  poster={t.poster}
                  playsInline
                  loop
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${!isPlaying && 'group-hover:scale-105'}`}
                />
                  
                {/* 2. Instagram-Style Gradient Overlays */}
                {/* Top gradient for pause/play UI contrast */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                
                {/* Bottom gradient for text readability (always visible like IG Reels) */}
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Play/Pause UI Button (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isPlaying ? 'bg-black/50 opacity-0 scale-90' : 'bg-white/20 border border-white/30 group-hover:bg-[var(--color-secondary,#D4AF37)] group-hover:border-transparent group-hover:text-black opacity-100 scale-100'}`}>
                    <svg className="w-6 h-6 ml-1 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Playing Indicator (Top Right) */}
                {isPlaying && (
                  <div className="absolute top-6 right-6 flex gap-1 items-end h-4">
                    <span className="w-1 h-2 bg-white animate-[bounce_1s_infinite]" />
                    <span className="w-1 h-3 bg-white animate-[bounce_1.2s_infinite]" />
                    <span className="w-1 h-4 bg-white animate-[bounce_0.8s_infinite]" />
                  </div>
                )}

                {/* 3. Text Content (Floating at bottom like IG Reels) */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                  <svg className="w-5 h-5 text-[var(--color-secondary,#D4AF37)] opacity-70 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                  
                  <p className="text-base md:text-lg font-medium leading-snug text-white mb-5 line-clamp-4 shadow-black drop-shadow-md">
                    {t.quote}
                  </p>
                  
                  <div className="flex items-center gap-3 border-t border-white/20 pt-4">
                    {/* Optional: Add an avatar placeholder here if you want it to look exactly like an IG profile */}
                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide text-white drop-shadow-md">
                        {t.name}
                      </h4>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-white/70 mt-0.5 drop-shadow-md">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HorizontalVideoTestimonials;