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

// Added high-quality poster images for ALL posts. 
// NOTE: videoSrc requires a direct .mp4 link, not an instagram.com/reel link.
const igPosts = [
  { 
    id: 1, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your local video: "/videos/reel1.mp4"
    poster: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Project: Jubilee Hills" 
  },
  { 
    id: 2, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    poster: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Detail: Custom Millwork" 
  },
  { 
    id: 3, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    poster: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Process: Lighting Design" 
  },
  { 
    id: 4, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    poster: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Feature: Raw Textures" 
  },
  { 
    id: 5, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Concept: Open Living" 
  },
  { 
    id: 6, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Detail: Minimalist Kitchen" 
  },
  { 
    id: 7, 
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
    poster: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=600&h=750&auto=format&fit=crop", 
    title: "Project: Banjara Hills" 
  }
];

export default function SocialJournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // State to track which card is currently in the center
  const [activeIndex, setActiveIndex] = useState(1); // Start at index 1 so there's one on the left

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Fade in centered text
    tl.fromTo(headerRef.current?.children ? Array.from(headerRef.current.children) : [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // Fade in carousel container
    tl.fromTo(carouselRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: sectionRef });

  // Navigation Handlers
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, igPosts.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  // Logic to determine classes based on card position relative to the active index
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;

    if (diff === 0) {
      // CENTER CARD: Large, fully visible, on top
      return "z-30 scale-100 opacity-100 translate-x-0 shadow-2xl";
    } else if (diff === -1) {
      // LEFT CARD: Scaled down, pushed left
      return "z-20 scale-[0.80] md:scale-[0.85] opacity-60 -translate-x-[60%] md:-translate-x-[70%] cursor-pointer hover:opacity-80 shadow-lg";
    } else if (diff === 1) {
      // RIGHT CARD: Scaled down, pushed right
      return "z-20 scale-[0.80] md:scale-[0.85] opacity-60 translate-x-[60%] md:translate-x-[70%] cursor-pointer hover:opacity-80 shadow-lg";
    } else if (diff < -1) {
      // FAR LEFT: Hidden
      return "z-10 scale-75 opacity-0 -translate-x-[120%] pointer-events-none";
    } else {
      // FAR RIGHT: Hidden
      return "z-10 scale-75 opacity-0 translate-x-[120%] pointer-events-none";
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[90rem]">
        
        {/* --- 1. TOP HEADER (CENTERED) --- */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          
          <div className="inline-flex items-center gap-2 mb-6 text-[#D4AF37] opacity-90 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full">
            <InstagramIcon size={14} strokeWidth={1.5} />
            <span className="text-xs font-mono tracking-widest uppercase">Live Journal</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.05] mb-6">
            Join 70,000+ homeowners tracking our <span className="text-[#D4AF37] italic font-light">latest work.</span>
          </h2>
          
          <p className="text-base md:text-lg text-white/60 font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Step inside our active sites. We share daily architectural details, material selections, and the thought process behind our signature spaces.
          </p>

          <a 
            href="https://www.instagram.com/thezencraftinteriors/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-[#D4AF37] text-[#1B1B1D] px-8 py-4 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 shadow-lg shadow-[#D4AF37]/20 hover:shadow-white/20 hover:scale-105"
          >
            Follow @Zencraft
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

        </div>

        {/* --- 2. 3D COVER-FLOW CAROUSEL WITH VIDEOS --- */}
        <div 
          ref={carouselRef} 
          className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[550px] flex items-center justify-center"
        >
          {igPosts.map((post, index) => (
            <div 
              key={post.id}
              onClick={() => setActiveIndex(index)} // Clicking a side card makes it center
              className={`absolute w-[260px] sm:w-[320px] md:w-[400px] h-[340px] sm:h-[420px] md:h-[500px] rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getCardStyle(index)} bg-black`}
            >
              {/* VIDEO ELEMENT */}
              {/* Note: AutoPlay relies on the browser allowing it. Mobile browsers require 'muted' and 'playsInline' for autoplay to work. */}
              <video 
                src={post.videoSrc} 
                poster={post.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Gradient Overlay & Text (Only fully visible when active) */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 transition-opacity duration-500 pointer-events-none ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-white font-medium text-lg md:text-xl">
                  {post.title}
                </p>
                <a 
                  href="https://www.instagram.com/thezencraftinteriors/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  // Restore pointer events just for the link so it's clickable
                  className="pointer-events-auto flex items-center gap-2 text-[#D4AF37] mt-3 text-xs font-bold tracking-[0.1em] uppercase hover:text-white transition-colors w-fit"
                >
                  <span>View Post</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}

          {/* Nav Buttons (Left/Right of Carousel) */}
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-0 md:-left-8 z-40 w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all disabled:opacity-0 hover:bg-white hover:text-black disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={handleNext}
            disabled={activeIndex === igPosts.length - 1}
            className="absolute right-0 md:-right-8 z-40 w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all disabled:opacity-0 hover:bg-white hover:text-black disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}