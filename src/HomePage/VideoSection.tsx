'use client';

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function VideoShowcaseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    // Base background set to Ivory to seamlessly blend with the navbar and hero
    <section className="relative w-full py-12 md:py-24 bg-[#F8F5EE] text-[#39342D] overflow-hidden">
      
      {/* --- AMBIENT GLOW BACKDROPS (Soft Gold Blends) --- */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#B58A3A]/10 blur-[130px] rounded-full mix-blend-multiply" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#E9DFCE]/60 blur-[120px] rounded-full mix-blend-multiply" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        
        {/* --- SECTION HEADER --- */}
        <div className="text-center max-w-3xl mb-10 md:mb-16">
          
          {/* Section Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-karlen text-2xl sm:text-4xl md:text-6xl font-normal leading-tight tracking-tight text-[#39342D]"
          >
            Immerse in spaces <br className="hidden sm:inline" />
            sculpted with <span className="font-velick text-[#B58A3A]">precision</span>.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm md:text-base text-[#8A8175] font-light max-w-xl mx-auto leading-relaxed px-4"
          >
            Step inside our recent residential and architectural transformations. Experience light, proportion, and bespoke materials in real time.
          </motion.p>
        </div>

        {/* --- MAIN CINEMATIC VIDEO & ATTACHED STATS --- */}
        <div className="relative w-full max-w-6xl flex flex-col items-center">
          
          {/* 1. The Video Frame (Sits on top with z-10) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] group z-10 shadow-lg"
          >
            {/* Inner Video Container */}
            <div className="relative w-full h-full rounded-[1rem] md:rounded-[2.2rem] overflow-hidden bg-[#E9DFCE] flex flex-col justify-end">
              
              {/* The Video Element */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                onClick={togglePlay}
              >
                <source src="/Zencraft-Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Subtle Contrast Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#292723]/80 via-transparent to-[#292723]/20" />

              {/* Floating Media Controls Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-10 pointer-events-none">
                
                {/* Top Controls: Status pill */}
                <div className="flex justify-between items-center w-full">
                  <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-mono tracking-wider text-white shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3A] animate-pulse" />
                    PROJECT REEL 2026
                  </div>
                </div>

                {/* Center Overlay: Big Play/Pause trigger button */}
                <div className="flex justify-center items-center">
                  <button
                    onClick={togglePlay}
                    type="button"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className={`pointer-events-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#B58A3A] text-white shadow-[0_0_30px_rgba(181,138,58,0.3)] transition-all duration-300 transform hover:scale-110 active:scale-95 hover:bg-white hover:text-[#B58A3A] ${
                      isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause size={22} className="fill-current sm:w-7 sm:h-7" />
                    ) : (
                      <Play size={22} className="fill-current translate-x-0.5 sm:w-7 sm:h-7" />
                    )}
                  </button>
                </div>

                {/* Bottom Details Bar */}
                <div className="flex items-end justify-between w-full">
                  <div>
                    <h4 className="text-sm sm:text-lg md:text-xl font-medium text-white tracking-wide drop-shadow-md">
                      The Modernist 3 BHK
                    </h4>
                    <p className="text-[10px] sm:text-xs md:text-sm text-white/80 mt-0.5 drop-shadow-sm">
                      Architecture & Interior Design · 2,400 sq.ft.
                    </p>
                  </div>

                  {/* Live Scrub Indicator */}
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-[11px] font-mono text-white/80 drop-shadow-sm">4K CINEMATIC</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. The Attached "Half Pill" Stats Bar (Sits behind video with z-0 and pulls up with negative margin) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-0 w-[92%] sm:w-[85%] max-w-4xl -mt-5 md:-mt-8 bg-gradient-to-b from-[#F8F5EE]/95 to-[#F8F5EE]/80 backdrop-blur-md border border-t-0 border-[#B58A3A]/30 shadow-[0_15px_40px_rgba(57,52,45,0.08)] rounded-b-[1.5rem] md:rounded-b-[3.5rem] pt-10 md:pt-16 pb-5 md:pb-8 px-3 sm:px-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 divide-x-0 md:divide-x divide-[#B58A3A]/20 text-center">
              
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-start">
                  <span className="text-xl sm:text-2xl md:text-4xl font-karlen text-[#39342D] leading-none tracking-tight">480</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#B58A3A] to-[#8F711C] text-xs sm:text-sm md:text-xl font-karlen ml-0.5">+</span>
                </div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8A8175] mt-1.5 md:mt-2 font-body font-semibold">Completed Projects</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-start">
                  <span className="text-xl sm:text-2xl md:text-4xl font-karlen text-[#39342D] leading-none tracking-tight">100</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#B58A3A] to-[#8F711C] text-xs sm:text-sm md:text-xl font-karlen ml-0.5">%</span>
                </div>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8A8175] mt-1.5 md:mt-2 font-body font-semibold">Bespoke Furniture</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl md:text-4xl font-karlen text-[#39342D] leading-none tracking-tight">20</span>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8A8175] mt-1.5 md:mt-2 font-body font-semibold">Design Experts</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl md:text-4xl font-karlen text-transparent bg-clip-text bg-gradient-to-b from-[#B58A3A] to-[#8F711C] leading-none tracking-tight">Zero</span>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8A8175] mt-1.5 md:mt-2 font-body font-semibold">Compromises</p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}