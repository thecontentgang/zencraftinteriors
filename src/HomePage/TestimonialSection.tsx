'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Removed the static 'poster' images from the data array
const testimonials = [
  {
    id: 1,
    videoSrc: "/testimonials/testimonial-1.mp4", 
    name: "Raghu",
    role: "Homeowner"
  },
  {
    id: 2,
    videoSrc: "/testimonials/testimonial-2.mp4",
    name: "Surya Kumar",
    role: "Retired Accountant"
  },
  {
    id: 3,
    videoSrc: "/testimonials/testimonial-3.mp4",
    name: "Vamsi",
    role: "House Owner"
  },
  {
    id: 4,
    videoSrc: "/testimonials/testimonial-4.mp4",
    quote: "No hidden costs, no missed deadlines. The sanctuary they crafted for us is deeply personal and perfectly balanced for our family.",
    name: "Srinivasa Rao",
    role: "Homeowner, Secunderabad"
  },
  {
    id: 5,
    videoSrc: "/testimonials/testimonial-5.mp4",
    name: "Rohit, Sindhuja",
    role: "3 BHK House Owner"
  }
];

const HorizontalVideoTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // --- DRAG TO SCROLL LOGIC (Desktop Only) ---
  const [isDragging, setIsDragging] = useState(false);
  const dragData = useRef({ isDown: false, startX: 0, scrollLeft: 0, dragged: false });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragData.current.isDown = true;
    dragData.current.dragged = false;
    setIsDragging(true);
    if (scrollContainerRef.current) {
      dragData.current.startX = e.pageX - scrollContainerRef.current.offsetLeft;
      dragData.current.scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    dragData.current.isDown = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    dragData.current.isDown = false;
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragData.current.isDown || !scrollContainerRef.current) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragData.current.startX) * 1.5; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
      dragData.current.dragged = true;
    }
    
    scrollContainerRef.current.scrollLeft = dragData.current.scrollLeft - walk;
  };
  // -----------------------------

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
      }
    });

    tl.fromTo(".testi-header-el", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );

    tl.fromTo(".testi-card", 
      { opacity: 0, x: 40 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: sectionRef });

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    if (dragData.current.dragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

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

  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F8F5EE] text-[#39342D] py-20 md:py-32 overflow-hidden font-sans border-t border-[#B58A3A]/10">
      
      {/* Soft Gold Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="testi-header-el inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#B58A3A] bg-[#B58A3A]/10 border border-[#B58A3A]/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3A] animate-pulse" />
              Client Perspectives
            </span>
            <h2 className="testi-header-el text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.05] text-[#39342D]">
              The living <span className="text-[#B58A3A] italic font-light">proof.</span>
            </h2>
          </div>
          
          {/* Global Controls & Scroll Nav */}
          <div className="testi-header-el flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-[#8A8175] hover:text-[#39342D] transition-colors"
            >
              {isMuted ? 'Unmute Videos' : 'Mute Videos'}
            </button>
            <div className="h-6 w-px bg-[#B58A3A]/30 mx-2 hidden md:block" />
            <div className="flex gap-2">
              <button onClick={scrollLeft} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/30 flex items-center justify-center text-[#39342D] hover:bg-[#B58A3A] hover:text-white hover:border-[#B58A3A] transition-colors shadow-sm">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={scrollRight} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/30 flex items-center justify-center text-[#39342D] hover:bg-[#B58A3A] hover:text-white hover:border-[#B58A3A] transition-colors shadow-sm">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- INSTAGRAM REELS STYLE CAROUSEL --- */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          // Added md:select-none to allow normal touch behavior on mobile while enabling drag on desktop
          className={`flex gap-4 md:gap-6 overflow-x-auto pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:select-none touch-auto ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
        >
          {testimonials.map((t, index) => {
            const isPlaying = playingId === index;

            return (
              <div 
                key={t.id} 
                className="testi-card relative w-[65vw] sm:w-[260px] md:w-[280px] aspect-[9/16] shrink-0 snap-center md:snap-start bg-[#39342D] border border-[#B58A3A]/20 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(57,52,45,0.1)] hover:border-[#B58A3A]/50 transition-all duration-500"
                onClick={(e) => handleCardClick(index, e)}
              >
                
                {/* 1. Video Player (No poster, using #t=0.001 to force first frame) */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={`${t.videoSrc}#t=0.001`}
                  preload="metadata"
                  playsInline
                  loop
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 pointer-events-none ${!isPlaying && 'group-hover:scale-105'}`}
                />
                  
                {/* 2. Instagram-Style Gradient Overlays */}
                <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#39342D]/60 to-transparent transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#39342D]/95 via-[#39342D]/40 to-transparent pointer-events-none" />

                {/* Play/Pause UI Button (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isPlaying ? 'bg-black/40 opacity-0 scale-90' : 'bg-white/90 shadow-lg group-hover:bg-[#B58A3A] group-hover:text-white opacity-100 scale-100 text-[#39342D]'}`}>
                    <svg className="w-5 h-5 ml-1 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Playing Indicator */}
                {isPlaying && (
                  <div className="absolute top-5 right-5 flex gap-1 items-end h-3">
                    <span className="w-1 h-1.5 bg-[#B58A3A] animate-[bounce_1s_infinite]" />
                    <span className="w-1 h-2.5 bg-[#B58A3A] animate-[bounce_1.2s_infinite]" />
                    <span className="w-1 h-3.5 bg-[#B58A3A] animate-[bounce_0.8s_infinite]" />
                  </div>
                )}

                {/* 3. Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end pointer-events-none">
                  <svg className="w-4 h-4 text-[#B58A3A] opacity-90 mb-2 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                  
                  <p className="text-xs md:text-sm font-medium leading-snug text-[#F8F5EE] mb-4 line-clamp-4 drop-shadow-md">
                    {t.quote}
                  </p>
                  
                  <div className="flex items-center gap-2.5 border-t border-white/20 pt-3">
                    <div className="w-7 h-7 rounded-full bg-[#B58A3A] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-wide text-white drop-shadow-md">
                        {t.name}
                      </h4>
                      <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-[#E9DFCE]/80 mt-0.5 drop-shadow-md">
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