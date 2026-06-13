import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // High-performance media optimization: guarantees video playback wakes up after mounting
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Video autoplay blocked by browser policy; awaiting interaction.");
      });
    }
  }, []);

  // GSAP ScrollTrigger Timeline
  useEffect(() => {
    const section = sectionRef.current;
    const videoContainer = videoContainerRef.current;
    const headline = headlineRef.current;
    const button = buttonRef.current;

    if (!section || !videoContainer || !headline || !button) return;

    // Use gsap.context for clean scoping and React cleanup protection
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",         // Pins the section immediately when it hits the top of the viewport
          end: "+=1200",            // The duration of the scroll-controlled expansion timeline
          scrub: 1,                 // Smooth tracking linked to your scrollbar velocity (1s catch-up time)
          pin: true,                // Securely handles screen pinning without layout popping
          invalidateOnRefresh: true // Recalculates dynamically if screen dimensions change
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
        maxWidth: "100vw",          // Sweeps outward to full screen margins
        maxHeight: "100vh",         // Scales upward edge-to-edge
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",        // Smoothly sharpens corners down to match edge alignment
        marginTop: "0px",
        marginBottom: "0px",
        ease: "power2.inOut"        // Premium, non-linear cinematic distribution curves
      }, 0);
    }, section);

    return () => ctx.revert(); // Complete garbage collection cleanup on unmount
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-[#F7F5F2] overflow-hidden flex flex-col justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none z-0" />

      {/* Main Structural Content Box */}
      <div className="container mx-auto flex flex-col items-center justify-center px-6 relative z-10 w-full h-full py-12">
        <div className="mx-auto w-full flex flex-col items-center justify-between">

          {/* Heading */}
          <div ref={headlineRef} className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-karlen font-normal text-5xl leading-[0.9] text-[#1B1B1D] md:text-7xl xl:text-8xl tracking-wide select-none text-center"
            >
              No Project Too Small.
              <br />
              <span className="text-[#D4AF37] block mt-1">
                No Style Too Big.
              </span>
            </motion.h1>
          </div>

          {/* Premium GSAP Morphing Expansion Video Container */}
          <div 
            ref={videoContainerRef}
            className="relative w-full max-w-4xl mt-6 mb-10 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#1B1B1D]/5 origin-center flex items-center justify-center"
          >
            {/* Aspect Wrapper remains highly optimized */}
            <div className="w-full h-full aspect-[21/9] min-h-[220px] bg-[#1B1B1D] relative flex items-center justify-center">
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-90"
              >
                <source 
                  src="/Zencraft-Video.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
              {/* Soft overlay tint matching brand color aesthetics */}
              <div className="absolute inset-0 bg-[#4A3A2F]/10 pointer-events-none mix-blend-multiply" />
            </div>
          </div>

          {/* Morphing CTA Button */}
          <div ref={buttonRef} className="w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="flex items-center justify-center"
            >
              <button className="group flex items-center gap-3 rounded-full hover:rounded-none bg-[#D4AF37] border border-[#D4AF37] px-8 py-4 font-body text-xs font-bold tracking-[0.2em] uppercase text-white shadow-md transition-all duration-500 ease-out hover:bg-[#1B1B1D] hover:border-[#1B1B1D] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] active:scale-95 cursor-pointer">
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
  );
}