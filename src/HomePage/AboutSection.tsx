'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useModal } from '../components/ModalContext'; 
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModal();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".about-el", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#F8F5EE] text-[#39342D] overflow-hidden font-sans"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B58A3A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-[#B58A3A]/20 pb-10">
          <div>
            <div className="about-el inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-[9px] tracking-[0.2em] uppercase bg-[#B58A3A]/10 text-[#B58A3A] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B58A3A] animate-pulse" />
              Our Philosophy
            </div>
            <h2 className="about-el text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tight leading-[1.1] text-[#39342D]">
              Designing spaces with <br className="hidden sm:block" />
              <span className="font-karlen text-[#B58A3A]">uncompromising intent.</span>
            </h2>
          </div>
          
        </div>

        {/* --- SIMPLE 3-COLUMN EDITORIAL GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
          
          {/* Card 1: The Core Intent */}
          <div className="about-el bg-white/60 backdrop-blur-md border border-[#B58A3A]/20 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_10px_30px_rgba(57,52,45,0.04)] hover:border-[#B58A3A]/50 transition-colors duration-500">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#B58A3A] uppercase font-bold block mb-4">01 / APPROACH</span>
              <h3 className="text-2xl font-karlen text-[#39342D] mb-3">Quiet Luxury</h3>
              <p className="text-xs md:text-sm text-[#8A8175] font-light leading-relaxed">
                We study natural light, flow, and material warmth to craft environments that serve your daily routines effortlessly.
              </p>
            </div>
            <a 
              href="/about"
              className="mt-8 pt-6 border-t border-[#B58A3A]/10 flex items-center justify-between text-xs font-mono text-[#39342D] group cursor-pointer"
            >
              <span className="group-hover:text-[#B58A3A] transition-colors">KNOW MORE</span>
              <ArrowRight size={14} className="text-[#B58A3A] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Card 2: Visual Impact Image */}
          <div className="about-el relative rounded-[2rem] overflow-hidden min-h-[320px] md:min-h-0 shadow-[0_15px_40px_rgba(57,52,45,0.08)] group">
            <img 
              src="/praveen-VRE/praveen-img-9.webp" 
              alt="Zencraft Interior Detail" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292723]/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[9px] tracking-[0.2em] text-white/80 uppercase font-mono block mb-1">CRAFTMANSHIP</span>
              <h4 className="text-lg font-karlen text-white tracking-wide">Meticulous Execution</h4>
            </div>
          </div>

          {/* Card 3: Metrics & Action */}
          <div className="about-el bg-[#39342D] text-[#F8F5EE] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-[#B58A3A] uppercase font-bold block mb-4">02 / IMPACT</span>
              <div className="space-y-6">
                <div>
                  <span className="block text-4xl font-karlen text-white mb-0.5">480+</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-mono">Spaces Crafted</span>
                </div>
                <div>
                  <span className="block text-4xl font-karlen text-[#B58A3A] mb-0.5">100%</span>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/60 font-mono">Tailored Precision</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <button 
                onClick={openModal}
                className="w-full bg-[#B58A3A] hover:bg-white text-white hover:text-[#39342D] font-bold text-[10px] tracking-[0.2em] uppercase py-4 rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;