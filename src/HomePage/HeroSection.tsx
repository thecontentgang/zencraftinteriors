'use client'; // Added this since you are using context and hooks

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useModal } from '../components/ModalContext'; // 1. Import the Modal Context

// Register all GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const { openModal } = useModal(); // 2. Extract the openModal function

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // High-performance media optimization: guarantees video playback wakes up
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Video autoplay blocked by browser policy; awaiting interaction.");
      });
    }
  }, []);

  // Robust GSAP ScrollTrigger Timeline
  useGSAP(() => {
    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;
    const headline = headlineRef.current;
    const button = buttonRef.current;

    if (!section || !videoContainer || !headline || !button) return;

    // Refresh ScrollTrigger after a slight delay to account for font/image loading
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=1200",             // Controls the scroll duration of the expansion
        scrub: 1,                  // Smooth tracking linked to scrollbar velocity
        pin: true,                 // Pins the section
        pinSpacing: true,          // Forces the DOM to hold space below the pinned element
        preventOverlaps: true,     // Stops subsequent sections from crashing into this one
        fastScrollEnd: true,       // Prevents layout breaking if user scrolls aggressively
        invalidateOnRefresh: true  // Recalculates dynamically on resize
      }
    });

    // Synchronized Animation Sequence
    tl.to(headline, {
      opacity: 0.25,
      scale: 0.96,
      y: -30,
      ease: "power2.out"
    }, 0)
      .to(button, {
        opacity: 0.25,
        scale: 0.96,
        y: 20,
        ease: "power2.out"
      }, 0)
      .to(videoContainer, {
        width: "100vw",            // Sweeps outward to full screen margins
        height: "100vh",           // Scales upward edge-to-edge
        maxWidth: "100vw",
        maxHeight: "100vh",
        borderRadius: "0px",       // Smoothly sharpens corners down to match edge alignment
        marginTop: "0px",
        marginBottom: "0px",
        ease: "power2.inOut"
      }, 0);
  }, { scope: sectionRef });

  return (
    /* 1. THE CLEAN WRAPPER */
    <div className="relative w-full z-10 bg-[#F7F5F2]">

      {/* 2. THE TRIGGER SECTION: The actual pinned element */}
      <div
        ref={sectionRef}
        className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center"
      >

        {/* --- NEW: CINEMATIC BACKGROUND IMAGE --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-interiors.webp"
            alt="Zencraft Interior Architecture"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          {/* Original subtle gold glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_60%)] mix-blend-multiply" />
        </div>

        {/* Main Structural Content Box */}
        <div className="container mx-auto flex flex-col items-center justify-center relative z-10 w-full h-full py-12">
          <div className="mx-auto w-full flex flex-col items-center justify-between">

            {/* Heading - Padding applied specifically here so it doesn't restrict the video */}
            <div ref={headlineRef} className="w-full px-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-karlen font-normal text-5xl leading-[0.9] text-[#D4AF37] md:text-7xl xl:text-8xl tracking-wide select-none text-center drop-shadow-sm"
              >
                We design spaces you'll
                <br />
                <span className="text-[#D4AF37] block mt-1">
                  Love coming home to.
                </span>
              </motion.h1>
            </div>

            {/* Premium GSAP Morphing Expansion Video Container */}
            <div
              ref={videoContainerRef}
              // 1. Set a responsive initial height (h-[40vh] to h-[55vh]) instead of relying on content size
              className="relative w-[90%] md:w-[60%] h-[40vh] md:h-[55vh] mt-6 mb-10 overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-[#1B1B1D]/5 origin-center flex items-center justify-center"
            >
              <div className="w-full h-full bg-[#1B1B1D] relative flex items-center justify-center">
                <video
                  ref={videoRef}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover opacity-95"
                >
                  <source
                    src="/Zencraft-Video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-[#4A3A2F]/10 pointer-events-none mix-blend-multiply" />
              </div>
            </div>

            {/* Morphing CTA Button */}
            <div ref={buttonRef} className="w-full flex justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="flex items-center justify-center"
              >
                {/* 3. Added onClick={openModal} to the button */}
                <button 
                  onClick={openModal}
                  type="button"
                  className="group flex items-center gap-3 rounded-full hover:rounded-none bg-[#D4AF37] border border-[#D4AF37] px-8 py-4 font-body text-xs font-bold tracking-[0.2em] uppercase text-white shadow-lg transition-all duration-500 ease-out hover:bg-[#1B1B1D] hover:border-[#1B1B1D] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Design Consultation
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                    />
                  </span>
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}