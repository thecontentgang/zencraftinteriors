'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 1. Video Testimonials Data
const testimonials = [
  {
    id: 1,
    videoSrc: "/testimonials/testimonial-4.mp4",
    name: "Srinivasa Rao",
    role: "Homeowner, Secunderabad"
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
    videoSrc: "/testimonials/testimonial-5.mp4",
    name: "Rohit, Sindhuja",
    role: "3 BHK House Owner"
  },
  {
    id: 5,
    videoSrc: "/testimonials/testimonial-1.mp4",
    name: "Raghu",
    role: "Homeowner"
  }
];

// 2. Expanded Google Reviews Data
const googleReviews = [
  {
    id: 101,
    name: "Mohammed Nizam uddin",
    time: "2 months ago",
    text: "Had a great experience with The Zencraft interiors. They understood our requirements perfectly and provided exclusive design suggestions with excellent finishing ideas.The Professionalism During execution was truly impressive. Highly satisfied with the overall work and quality.",
  },
  {
    id: 102,
    name: "Teja malisetty",
    time: "7 month ago",
    text: "I’m from madhapur sky view residency, I’m very happy with Zencraft Interiors. Their designs are beautiful, the team is always available and responsive, and they delivered everything exactly as promised on time. The entire experience was smooth and satisfying. Highly recommended",
  },
  {
    id: 103,
    name: "Vijay Rajbhar",
    time: "5 months ago",
    text: "We are satisfied with the work done by the Zencraft interiors.The Designs are practical and the finishing is good.The team responded well and guided us properly during the process.Thank you for making our home look beautiful 🎉💐",
  },
  {
    id: 104,
    name: "Sai Ashwith",
    time: "5 months ago",
    text: "Interior work usually feels stressful, but Zencraft Interiors handled it really well.They listened carefully and understood what we actually needed.Everything was done with proper planning.The result feels both practical and beautiful.",
  },
  {
    id: 105,
    name: "Nandeeswar Maddirala",
    time: "7 months ago",
    text: "Zencraft Interiors is excellent when it comes to designs and execution. The team is very approachable and always available to clarify doubts. They delivered exactly what they promised, and everything was completed on time. I’m very satisfied with their work and would definitely recommend them.",
  },
  {
    id: 106,
    name: "Kurisetty Uday",
    time: "1 months ago",
    text: "Recent ga nenu Zencraft interiors tho na Duplex Interiors Chepinchanu..So Valla Designs, Problems Solvings and Excicuting work chala Bagundi.And Valla Workers kuda chala baga work chesaru and Zencraft is the Best interiors in Hyderabad",
  }
];

// Google G Icon Component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Star Icon Component
const StarIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#B58A3A]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HorizontalVideoTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // --- DRAG TO SCROLL LOGIC (Videos Only) ---
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
    const walk = (x - dragData.current.startX) * 1.5; 
    
    if (Math.abs(walk) > 5) {
      dragData.current.dragged = true;
    }
    
    scrollContainerRef.current.scrollLeft = dragData.current.scrollLeft - walk;
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      }
    });

    // Animate Header
    tl.fromTo(".testi-header-el", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );

    // Animate Video Cards
    tl.fromTo(".testi-card", 
      { opacity: 0, x: 40 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    );

    // Fade in the Google Reviews Marquee container
    tl.fromTo(".reviews-marquee-container", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.2"
    );

  }, { scope: sectionRef });

  const handleVideoClick = (index: number, e: React.MouseEvent) => {
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
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F8F5EE] text-[#39342D] py-20 md:py-32 overflow-hidden font-sans border-t border-[#B58A3A]/20">
      
      {/* Required CSS for smooth infinite scrolling marquee */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 45s linear infinite;
        }
        .animate-scroll-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Soft Gold Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="testi-header-el inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#B58A3A] bg-[#B58A3A]/10 border border-[#B58A3A]/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3A] animate-pulse" />
              Client Perspectives
            </span>
            <h2 className="testi-header-el text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen tracking-tight leading-[1.05] text-[#39342D]">
              The living <span className="text-[#B58A3A] italic font-light">proof.</span>
            </h2>
          </div>
          
          {/* Global Controls & Scroll Nav */}
          <div className="testi-header-el flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-[#39342D]/60 hover:text-[#B58A3A] transition-colors"
            >
              {isMuted ? 'Unmute Videos' : 'Mute Videos'}
            </button>
            <div className="h-6 w-px bg-[#39342D]/20 mx-2 hidden md:block" />
            <div className="flex gap-2">
              <button onClick={scrollLeft} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/40 flex items-center justify-center text-[#39342D] hover:bg-[#B58A3A] hover:text-[#F8F5EE] hover:border-[#B58A3A] transition-colors shadow-sm">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={scrollRight} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#B58A3A]/40 flex items-center justify-center text-[#39342D] hover:bg-[#B58A3A] hover:text-[#F8F5EE] hover:border-[#B58A3A] transition-colors shadow-sm">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- ROW 1: SCROLLING TRACK (Videos Only) --- */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 md:gap-6 overflow-x-auto pb-4 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:select-none touch-auto ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
        >
          {testimonials.map((t, index) => {
            const isPlaying = playingId === index;

            return (
              <div 
                key={`video-${t.id}`} 
                className="testi-card relative w-[65vw] sm:w-[260px] md:w-[280px] aspect-[9/16] shrink-0 snap-center md:snap-start bg-[#39342D] border border-[#B58A3A]/30 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-[0_15px_40px_rgba(57,52,45,0.15)] hover:border-[#B58A3A] transition-all duration-500"
                onClick={(e) => handleVideoClick(index, e)}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={`${t.videoSrc}#t=0.001`}
                  preload="metadata"
                  playsInline
                  loop
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 pointer-events-none ${!isPlaying && 'group-hover:scale-105'}`}
                />
                  
                {/* Overlays */}
                <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#39342D]/60 to-transparent transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#39342D]/95 via-[#39342D]/40 to-transparent pointer-events-none" />

                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isPlaying ? 'bg-black/40 opacity-0 scale-90' : 'bg-[#F8F5EE]/90 shadow-lg group-hover:bg-[#B58A3A] group-hover:text-white opacity-100 scale-100 text-[#39342D]'}`}>
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

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end pointer-events-none">
                  <div className="flex items-center gap-3 border-t border-[#F8F5EE]/20 pt-4">
                    <div className="w-8 h-8 rounded-full bg-[#B58A3A] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-[#F8F5EE] shadow-md">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold tracking-wide text-[#F8F5EE]">
                        {t.name}
                      </h4>
                      <p className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-[#E9DFCE]/80 mt-1">
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

      {/* --- ROW 2: GOOGLE REVIEWS INFINITE MARQUEE --- */}
      <div className="reviews-marquee-container relative w-full mt-12 md:mt-20 overflow-hidden">
        
        {/* Fading gradient overlays to soften the edges */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F8F5EE] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F8F5EE] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 w-max animate-scroll-marquee px-6">
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...googleReviews, ...googleReviews].map((review, i) => (
            <div 
              key={`google-${review.id}-${i}`} 
              className="relative w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 bg-[#39342D] border border-[#B58A3A]/30 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(57,52,45,0.15)] hover:border-[#B58A3A] transition-colors duration-500 cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} />
                    ))}
                  </div>
                  {/* Google Logo */}
                  <GoogleIcon />
                </div>
                
                <p className="text-[#E9DFCE] text-sm md:text-base leading-relaxed font-light italic">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-8 pt-5 border-t border-[#B58A3A]/30">
                <div className="w-9 h-9 rounded-full bg-[#F8F5EE] text-[#39342D] flex items-center justify-center font-bold text-sm shadow-md">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[#F8F5EE] font-bold text-xs md:text-sm">{review.name}</h4>
                  <p className="text-[#B58A3A] text-[9px] md:text-[10px] uppercase tracking-widest mt-0.5">
                    {review.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HorizontalVideoTestimonials;