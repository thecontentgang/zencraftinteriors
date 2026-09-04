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
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", 
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

  const [activeIndex, setActiveIndex] = useState(1); 

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%", // Triggers exactly when entering the viewport
      }
    });

    // Fade in centered text snappily
    if (headerRef.current) {
      tl.fromTo(Array.from(headerRef.current.children),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }

    // Fade in carousel container
    tl.fromTo(carouselRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.2"
    );
  }, { scope: sectionRef });

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, igPosts.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;

    if (diff === 0) {
      // CENTER CARD
      return "z-30 scale-100 opacity-100 translate-x-0 shadow-[0_25px_60px_rgba(57,52,45,0.2)]";
    } else if (diff === -1) {
      // LEFT CARD
      return "z-20 scale-[0.80] md:scale-[0.85] opacity-60 -translate-x-[55%] sm:-translate-x-[60%] md:-translate-x-[70%] cursor-pointer hover:opacity-80 shadow-lg";
    } else if (diff === 1) {
      // RIGHT CARD
      return "z-20 scale-[0.80] md:scale-[0.85] opacity-60 translate-x-[55%] sm:translate-x-[60%] md:translate-x-[70%] cursor-pointer hover:opacity-80 shadow-lg";
    } else if (diff < -1) {
      // FAR LEFT
      return "z-10 scale-75 opacity-0 -translate-x-[110%] md:-translate-x-[120%] pointer-events-none";
    } else {
      // FAR RIGHT
      return "z-10 scale-75 opacity-0 translate-x-[110%] md:translate-x-[120%] pointer-events-none";
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#F8F5EE] text-[#39342D] py-20 md:py-32 overflow-hidden border-t border-[#B58A3A]/10 font-sans"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[90rem]">
        
        {/* --- 1. TOP HEADER (CENTERED) --- */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          
          <div className="inline-flex items-center gap-2 mb-6 text-[#B58A3A] bg-[#B58A3A]/10 border border-[#B58A3A]/30 px-4 py-1.5 rounded-full">
            <InstagramIcon size={14} strokeWidth={1.5} />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">Live Journal</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.05] mb-6 text-[#39342D]">
            Join 78,000+ homeowners tracking our <span className="text-[#B58A3A] italic font-light">latest work.</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-[#8A8175] font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Step inside our active sites. We share daily architectural details, material selections, and the thought process behind our signature spaces.
          </p>

          <a 
            href="https://www.instagram.com/thezencraftinteriors/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#B58A3A] bg-[#B58A3A] px-7 py-3.5 font-body text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 ease-out hover:bg-[#39342D] hover:border-[#39342D] hover:shadow-[0_0_25px_rgba(181,138,58,0.4)] active:scale-95"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
            <div className="relative flex items-center gap-2">
              <span>Follow @Zencraft</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </a>

        </div>

        {/* --- 2. 3D COVER-FLOW CAROUSEL WITH VIDEOS --- */}
        <div 
          ref={carouselRef} 
          className="relative w-full max-w-5xl mx-auto h-[380px] sm:h-[450px] md:h-[550px] flex items-center justify-center"
        >
          {igPosts.map((post, index) => (
            <div 
              key={post.id}
              onClick={() => setActiveIndex(index)}
              className={`absolute w-[240px] sm:w-[320px] md:w-[400px] h-[320px] sm:h-[420px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${getCardStyle(index)} bg-[#39342D] border border-[#B58A3A]/20`}
            >
              <video 
                src={post.videoSrc} 
                poster={post.poster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Gradient Overlay & Text */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[#39342D]/95 via-[#39342D]/30 to-transparent flex flex-col justify-end p-5 md:p-8 transition-opacity duration-500 pointer-events-none ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-[#F8F5EE] font-karlen text-lg md:text-xl">
                  {post.title}
                </p>
                <a 
                  href="https://www.instagram.com/thezencraftinteriors/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto flex items-center gap-2 text-[#B58A3A] mt-2 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase hover:text-[#F8F5EE] transition-colors w-fit"
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
            className="absolute left-2 md:-left-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/30 bg-white/60 backdrop-blur-md flex items-center justify-center text-[#39342D] transition-all disabled:opacity-0 hover:bg-[#B58A3A] hover:text-white hover:border-[#B58A3A] disabled:cursor-not-allowed shadow-md"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button 
            onClick={handleNext}
            disabled={activeIndex === igPosts.length - 1}
            className="absolute right-2 md:-right-8 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/30 bg-white/60 backdrop-blur-md flex items-center justify-center text-[#39342D] transition-all disabled:opacity-0 hover:bg-[#B58A3A] hover:text-white hover:border-[#B58A3A] disabled:cursor-not-allowed shadow-md"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}