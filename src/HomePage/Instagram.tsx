'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Custom Instagram SVG Icon
const InstagramIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const igPosts = [
  { 
    id: 1, 
    videoSrc: "/testimonials/insta-1.mp4", 
    title: "Project: Jubilee Hills" 
  },
  { 
    id: 2, 
    videoSrc: "/testimonials/insta-2.mp4", 
    title: "Detail: Custom Millwork" 
  },
  { 
    id: 3, 
    videoSrc: "/testimonials/insta-3.mp4", 
    title: "Process: Lighting Design" 
  },
  { 
    id: 4, 
    videoSrc: "/testimonials/insta-4.mp4", 
    title: "Feature: Raw Textures" 
  },
];

export default function SocialJournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(1); 
  const [playingId, setPlayingId] = useState<number | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Triggers when 20% of section is visible
      }
    });

    // 1. Text slide up animation
    if (headerRef.current) {
      tl.fromTo(Array.from(headerRef.current.children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }

    // 2. Card Fan-Out Animation (Mimics the CardStampArc)
    tl.from(".ig-card", {
      y: 200, // Start lower
      rotation: (i) => (i - 1.5) * 15, // Creates the fan angle (-22.5, -7.5, 7.5, 22.5)
      opacity: 0,
      scale: 0.5,
      duration: 1.2,
      stagger: 0.1,
      ease: "back.out(1.2)",
      // clearProps is CRITICAL here: it removes GSAP styles after animating 
      // so Tailwind's translate/scale classes can take over for the carousel logic
      clearProps: "transform,opacity" 
    }, "-=0.4");

  }, { scope: sectionRef });

  const pauseCurrentVideo = () => {
    if (playingId !== null && videoRefs.current[playingId]) {
      videoRefs.current[playingId]?.pause();
      setPlayingId(null);
    }
  };

  const handleNext = () => {
    pauseCurrentVideo();
    setActiveIndex((prev) => Math.min(prev + 1, igPosts.length - 1));
  };

  const handlePrev = () => {
    pauseCurrentVideo();
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      pauseCurrentVideo();
      setActiveIndex(index);
    } else {
      const video = videoRefs.current[index];
      if (!video) return;

      if (playingId === index) {
        video.pause();
        setPlayingId(null);
      } else {
        video.play();
        setPlayingId(index);
      }
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;

    if (diff === 0) {
      return "z-30 scale-100 opacity-100 translate-x-0 shadow-[0_25px_60px_rgba(0,0,0,0.5)] cursor-pointer";
    } else if (diff === -1) {
      return "z-20 scale-[0.80] md:scale-[0.85] opacity-50 -translate-x-[55%] sm:-translate-x-[60%] md:-translate-x-[70%] cursor-pointer hover:opacity-80 shadow-lg";
    } else if (diff === 1) {
      return "z-20 scale-[0.80] md:scale-[0.85] opacity-50 translate-x-[55%] sm:translate-x-[60%] md:translate-x-[70%] cursor-pointer hover:opacity-80 shadow-lg";
    } else if (diff < -1) {
      return "z-10 scale-75 opacity-0 -translate-x-[110%] md:-translate-x-[120%] pointer-events-none";
    } else {
      return "z-10 scale-75 opacity-0 translate-x-[110%] md:translate-x-[120%] pointer-events-none";
    }
  };

  return (
    <section 
      ref={sectionRef} 
      // Charcoal Background to make videos pop
      className="relative w-full bg-[#39342D] text-[#F8F5EE] py-24 md:py-32 overflow-hidden border-t border-[#B58A3A]/20 font-sans"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[90rem]">
        
        {/* --- 1. TOP HEADER (CENTERED) --- */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          
          <div className="inline-flex items-center gap-2 mb-6 text-[#B58A3A] bg-[#B58A3A]/10 border border-[#B58A3A]/30 px-5 py-2 rounded-full">
            <InstagramIcon size={14} strokeWidth={1.5} />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Live Journal</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen tracking-tight leading-[1.05] mb-6 text-[#F8F5EE]">
            Join 78,000+ tracking our <br className="hidden md:block"/>
            <span className="text-[#B58A3A] italic font-light">latest work.</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[#E9DFCE]/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Step inside our active sites. We share daily architectural details, material selections, and the thought process behind our signature spaces.
          </p>

          <a 
            href="https://www.instagram.com/thezencraftinteriors/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#B58A3A] bg-[#B58A3A] px-8 py-4 font-body text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-out hover:bg-transparent hover:text-[#B58A3A] hover:border-[#B58A3A] hover:shadow-[0_10px_30px_rgba(181,138,58,0.3)] active:scale-95"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
            <div className="relative flex items-center gap-2">
              <span>Follow The Zencraft</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>

        </div>

        {/* --- 2. 3D COVER-FLOW CAROUSEL WITH VIDEOS --- */}
        <div 
          ref={carouselRef} 
          className="relative w-full max-w-5xl mx-auto h-[380px] sm:h-[450px] md:h-[550px] flex items-center justify-center perspective-[1000px]"
        >
          {igPosts.map((post, index) => {
            const isPlaying = playingId === index;
            const isActive = activeIndex === index;

            return (
              <div 
                key={post.id}
                onClick={() => handleCardClick(index)}
                // Added "ig-card" class for the GSAP Fan-out target
                className={`ig-card absolute w-[240px] sm:w-[320px] md:w-[400px] h-[320px] sm:h-[420px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getCardStyle(index)} bg-[#39342D] border border-[#B58A3A]/20 group`}
              >
                {/* VIDEO ELEMENT */}
                <video 
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={`${post.videoSrc}#t=0.001`}
                  preload="metadata"
                  loop
                  playsInline
                  className={`w-full h-full object-cover transition-transform duration-1000 ${!isPlaying && 'group-hover:scale-105'}`}
                />

                {/* Dark overlay to make play button visible */}
                <div className={`absolute inset-0 bg-[#39342D]/30 transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />

                {/* Play/Pause UI Button */}
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isPlaying ? 'bg-black/40 opacity-0 scale-90' : 'bg-[#F8F5EE] shadow-lg group-hover:bg-[#B58A3A] group-hover:text-white opacity-100 scale-100 text-[#39342D]'}`}>
                      <svg className="w-6 h-6 ml-1 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Playing Indicator */}
                {isPlaying && (
                  <div className="absolute top-5 right-5 flex gap-1 items-end h-3 z-10">
                    <span className="w-1 h-1.5 bg-[#B58A3A] animate-[bounce_1s_infinite]" />
                    <span className="w-1 h-2.5 bg-[#B58A3A] animate-[bounce_1.2s_infinite]" />
                    <span className="w-1 h-3.5 bg-[#B58A3A] animate-[bounce_0.8s_infinite]" />
                  </div>
                )}

              </div>
            );
          })}

          {/* Nav Buttons */}
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-2 md:-left-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/40 bg-[#F8F5EE]/10 backdrop-blur-md flex items-center justify-center text-[#F8F5EE] transition-all disabled:opacity-0 hover:bg-[#B58A3A] hover:text-white hover:border-[#B58A3A] disabled:cursor-not-allowed shadow-md"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button 
            onClick={handleNext}
            disabled={activeIndex === igPosts.length - 1}
            className="absolute right-2 md:-right-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/40 bg-[#F8F5EE]/10 backdrop-blur-md flex items-center justify-center text-[#F8F5EE] transition-all disabled:opacity-0 hover:bg-[#B58A3A] hover:text-white hover:border-[#B58A3A] disabled:cursor-not-allowed shadow-md"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}