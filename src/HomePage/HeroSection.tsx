'use client'; 

import { motion } from "framer-motion";
import { useModal } from '../components/ModalContext';
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { openModal } = useModal(); 

  return (
    <div className="relative w-full h-[100dvh] min-h-[650px] overflow-hidden bg-background flex flex-col items-center justify-center">

      {/* --- CINEMATIC BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/herosection-bg.png"
          alt="Zencraft Interior Architecture"
          className="w-full h-full object-cover grayscale-[5%]"
        />
        
        {/* Overlays using background for a bright, airy, luxurious bleed */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/10" />
      </div>

      {/* --- MAIN CONTENT BOX --- */}
      {/* 
        Optically centered using dynamic viewport heights (pb-[15vh] and pt-[8vh]).
        This ensures the text sits perfectly in the middle of the "open" space above the bottom stats pill.
      */}
      <div className="relative z-10 w-full h-full px-6 flex flex-col items-center justify-center text-center pt-[8vh] pb-[15vh] md:pt-[5vh] md:pb-[12vh]">
        
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-karlen font-normal text-3xl sm:text-5xl md:text-6xl xl:text-6xl leading-[1.15] md:leading-[1.1] text-text-primary tracking-wide select-none drop-shadow-sm"
        >
          We design spaces you'll
          <span className="block mt-1 md:mt-2">
            Love coming home to.
          </span>
        </motion.h1>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          // Increased top margin (mt-14 md:mt-20) to give the layout luxurious breathing room
          className="mt-14 sm:mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xl"
        >
          {/* Secondary Button: View Projects */}
          <Link to="/projects" 
            type="button"
            className="w-[85%] sm:w-auto max-w-[280px] sm:max-w-none flex items-center justify-center rounded-full border border-primary bg-transparent px-6 py-3.5 sm:px-8 sm:py-4 font-body text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary shadow-sm transition-all duration-500 ease-out hover:bg-primary hover:text-white hover:shadow-[0_8px_20px_rgba(48,37,28,0.2)] active:scale-95 cursor-pointer"
          >
            View Projects
          </Link>

          {/* Primary Button: Book Consultation */}
          <button 
            onClick={openModal}
            type="button"
            className="group relative overflow-hidden w-[85%] sm:w-auto max-w-[280px] sm:max-w-none flex items-center justify-center rounded-full bg-primary border border-primary px-6 py-3.5 sm:px-8 sm:py-4 font-body text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white shadow-lg transition-all duration-500 ease-out hover:bg-white hover:border-white hover:text-primary hover:shadow-[0_10px_30px_rgba(48,37,28,0.25)] active:scale-95 cursor-pointer"
          >
            {/* SHIMMER EFFECT */}
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%] z-0" />

            {/* SLIDING TEXT CONTAINER */}
            <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden h-[1.2em]">
              {/* DEFAULT STATE */}
              <span className="transition-all duration-500 group-hover:-translate-y-full leading-none">
                BOOK CONSULTATION
              </span>
              {/* HOVER STATE ("GET STARTED") */}
              <span className="absolute translate-y-full transition-all duration-500 group-hover:translate-y-0 leading-none">
                GET STARTED
              </span>
            </div>
          </button>
        </motion.div>

      </div>

      {/* --- HALF-PILL GRADIENT STATS OVERLAY --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        className="absolute bottom-0 w-[92%] sm:w-[85%] max-w-4xl left-1/2 -translate-x-1/2 z-20"
      >
        {/* Half Pill Shape: Rounded heavily on top, flat on bottom */}
        <div className="relative overflow-hidden rounded-t-[2rem] md:rounded-t-[3.5rem] border-t border-l border-r border-primary/30 shadow-[0_-10px_40px_rgba(48,37,28,0.08)]">
          
          {/* Glass & Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-light via-light/90 to-light/70 backdrop-blur-md z-0" />
          
          {/* Subtle glowing accent gradient line running across the top edge */}
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-0" />

          {/* Content (Forced horizontal on all screens) */}
          <div className="relative z-10 flex flex-row items-center justify-between divide-x divide-primary/20 px-2 sm:px-6 md:px-12 py-5 md:py-8">
            
            {/* Stat 1 */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-start">
                <span className="text-2xl sm:text-4xl md:text-5xl font-karlen text-text-primary leading-none tracking-tight">1.8</span>
                {/* Gradient text for the accent marks */}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary text-sm sm:text-xl md:text-2xl font-karlen ml-0.5">M</span>
              </div>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-body tracking-[0.15em] sm:tracking-[0.2em] uppercase text-text-secondary/70 mt-1.5 md:mt-3 text-center">
                sq.ft Designed
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-start">
                <span className="text-2xl sm:text-4xl md:text-5xl font-karlen text-text-primary leading-none tracking-tight">15</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary text-[9px] sm:text-xs md:text-sm font-body font-semibold tracking-widest uppercase ml-1 mt-0.5 md:mt-1">Yrs</span>
              </div>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-body tracking-[0.15em] sm:tracking-[0.2em] uppercase text-text-secondary/70 mt-1.5 md:mt-3 text-center">
                Design Experience
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-start">
                <span className="text-2xl sm:text-4xl md:text-5xl font-karlen text-text-primary leading-none tracking-tight">100</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary text-sm sm:text-xl md:text-2xl font-karlen ml-0.5">%</span>
              </div>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-body tracking-[0.15em] sm:tracking-[0.2em] uppercase text-text-secondary/70 mt-1.5 md:mt-3 text-center">
                Customized Designs
              </span>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  );
}