'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CtaSection from '../HomePage/CtaSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);

  // --- GSAP BUTTERY SCROLL ANIMATIONS ---
  useGSAP(() => {
    // 1. Text slide-up reveals (Hero & Headers)
    const slideTexts = gsap.utils.toArray<HTMLElement>('.gsap-slide-up');
    slideTexts.forEach((el) => {
      gsap.fromTo(
        el,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 85%',
          },
        }
      );
    });

    // 2. Soft fade-up for paragraphs and cards
    const fadeElements = gsap.utils.toArray<HTMLElement>('.gsap-fade-up');
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    });

    // 3. Cinematic Image Reveal (Scale down slightly while fading in)
    const images = gsap.utils.toArray<HTMLElement>('.gsap-image-reveal');
    images.forEach((wrapper) => {
      const img = wrapper.querySelector('img');
      if (img) {
        gsap.fromTo(
          wrapper,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
            },
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
            },
          }
        );
      }
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="relative w-full bg-[#F8F5EE] font-body text-[#39342D] overflow-x-hidden selection:bg-[#B58A3A] selection:text-white z-10">
      
      {/* Global CSS for masking the text slide-up effect */}
      <style>{`
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em;
        }
      `}</style>

      {/* --- AMBIENT WARM GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[90rem] h-screen bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none -z-10" />

      {/* =========================================================
          1. HERO SECTION (Typographic Intro)
      ========================================================= */}
      <section className="relative w-full pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        
        <div className="clip-mask mb-6">
          <div className="gsap-slide-up flex items-center justify-center gap-4">
            <span className="w-8 md:w-12 h-px bg-[#B58A3A]" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#B58A3A]">
              The Zencraft Story
            </span>
            <span className="w-8 md:w-12 h-px bg-[#B58A3A]" />
          </div>
        </div>

        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-karlen leading-[1.05] tracking-tight">
            <div className="clip-mask">
              <span className="gsap-slide-up block text-[#39342D]">Engineering the art</span>
            </div>
            <div className="clip-mask">
              <span className="gsap-slide-up block text-[#B58A3A] italic font-light">of living beautifully.</span>
            </div>
          </h1>
        </div>

        <div className="clip-mask max-w-2xl mx-auto">
          <p className="gsap-slide-up text-sm md:text-base text-[#8A8175] font-light leading-relaxed">
            We are a collective of architects, interior designers, and artisans dedicated to creating uncompromising spaces that balance raw textures with refined elegance.
          </p>
        </div>
      </section>


      {/* =========================================================
          2. PHILOSOPHY SECTION (Ivory Background)
      ========================================================= */}
      <section className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: OVERLAPPING IMAGE COMPOSITION */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-full">
            {/* Main Large Image */}
            <div className="gsap-image-reveal relative w-[85%] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(57,52,45,0.15)] z-10 border border-[#B58A3A]/20">
              <img 
                src="/prudhvi-bion/prudhvi-img-8.webp" 
                alt="Luxury Interior Living Space" 
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Secondary Overlapping Image (Texture/Detail) */}
            <div className="gsap-image-reveal absolute -bottom-10 -right-4 md:-right-10 w-[55%] aspect-square rounded-[2rem] overflow-hidden shadow-2xl z-20 border-[6px] md:border-8 border-[#F8F5EE]">
              <img 
                src="/prudhvi-bion/prudhvi-img-11.webp" 
                alt="Interior Material Detail" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute top-10 -left-6 w-24 h-24 border border-[#B58A3A]/30 rounded-full -z-10" />
          </div>

          {/* RIGHT: TYPOGRAPHY & STORY */}
          <div className="flex flex-col items-start mt-12 lg:mt-0 z-10">
            
            <div className="clip-mask mb-6">
              <div className="gsap-slide-up flex items-center gap-4">
                <span className="w-10 h-px bg-[#B58A3A]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#B58A3A]">
                  Our Philosophy
                </span>
              </div>
            </div>

            <div className="clip-mask mb-8">
              <h2 className="gsap-slide-up text-4xl md:text-5xl lg:text-6xl font-karlen leading-[1.1] text-[#39342D]">
                Designing spaces that <br className="hidden md:block" />
                <span className="text-[#B58A3A] italic font-light">breathe with you.</span>
              </h2>
            </div>

            <div className="gsap-fade-up space-y-6 text-sm md:text-base text-[#8A8175] leading-relaxed font-light mb-10 max-w-xl">
              <p>
                At The Zencraft, we believe that true luxury is not defined by excess, but by intention. Every texture we select, every light we place, and every layout we draft is rooted in a deep understanding of how you live and interact with your environment.
              </p>
              <p>
                Our approach marries timeless architectural principles with modern sensibilities. We don't just decorate rooms; we sculpt sanctuaries that reflect your personal narrative, creating a seamless harmony between aesthetics and functionality.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          3. PROCESS SECTION (Deep Charcoal Background)
      ========================================================= */}
      <section className="relative w-full bg-[#39342D] text-[#F8F5EE] py-24 md:py-32 px-6 md:px-12 lg:px-24 mt-20 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_-20px_50px_rgba(57,52,45,0.1)]">
        
        {/* Subtle glow inside the dark section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        <div className="max-w-[85rem] mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="clip-mask mb-6">
                <div className="gsap-slide-up flex items-center gap-4">
                  <span className="w-10 h-px bg-[#B58A3A]" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#B58A3A]">
                    Our Methodology
                  </span>
                </div>
              </div>
              
              <div className="clip-mask">
                <h2 className="gsap-slide-up text-4xl md:text-5xl lg:text-6xl font-karlen leading-[1.1] text-[#F8F5EE]">
                  The Zencraft <br className="hidden sm:block" />
                  <span className="text-[#B58A3A] italic font-light">Signature Approach</span>
                </h2>
              </div>
            </div>
            
            <div className="md:max-w-xs lg:max-w-sm gsap-fade-up">
              <p className="text-sm md:text-base text-[#E9DFCE]/70 leading-relaxed font-light">
                A transparent, meticulous, and collaborative journey from the first sketch to the final breathtaking reveal.
              </p>
            </div>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { num: '01', title: 'Discovery & Concept', desc: 'We begin by understanding your lifestyle, vision, and architecture, culminating in a detailed conceptual direction.' },
              { num: '02', title: 'Spatial Planning', desc: 'Drafting precise 2D layouts and 3D renderings to optimize flow, natural light, and structural potential.' },
              { num: '03', title: 'Curation & Sourcing', desc: 'Hand-selecting materials and bespoke furniture from our global network of artisans to fit the narrative.' },
              { num: '04', title: 'Execution & Styling', desc: 'From construction oversight to the final placement of decor, delivering a completely turnkey sanctuary.' }
            ].map((step, index) => (
              <div 
                key={index}
                className="gsap-fade-up group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-[#F8F5EE]/5 border border-[#B58A3A]/20 hover:border-[#B58A3A]/70 transition-colors duration-500 overflow-hidden"
              >
                {/* Giant Background Number */}
                <div className="absolute -top-6 -right-2 text-[100px] md:text-[130px] font-karlen font-bold text-[#F8F5EE]/5 group-hover:text-[#B58A3A]/10 transition-colors duration-500 pointer-events-none select-none">
                  {step.num}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-2 h-2 rounded-full bg-[#B58A3A]/40 group-hover:bg-[#B58A3A] transition-colors duration-500 mb-8 shadow-[0_0_10px_rgba(181,138,58,0)] group-hover:shadow-[0_0_10px_rgba(181,138,58,0.8)]" />
                  
                  <h3 className="text-xl md:text-2xl font-karlen text-[#F8F5EE] mb-4 group-hover:text-[#B58A3A] transition-colors duration-500">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-[#E9DFCE]/70 leading-relaxed font-light mt-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================
          4. FOUNDER SECTION (Return to Ivory)
      ========================================================= */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: PORTRAIT */}
          <div className="md:col-span-5 relative w-full aspect-[4/5] md:aspect-auto md:h-[650px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(57,52,45,0.15)] border border-[#B58A3A]/20 gsap-image-reveal">
            <img 
              src="/founder.webp" 
              alt="MD. Sharifuddin - Founder of The Zencraft" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
            />
            {/* Soft inner shadow */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#39342D]/60 via-transparent to-transparent pointer-events-none opacity-60" /> */}
          </div>

          {/* RIGHT: TYPOGRAPHY & BIO */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            <div className="clip-mask mb-6">
              <div className="gsap-slide-up flex items-center gap-4">
                <span className="w-10 h-px bg-[#B58A3A]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#B58A3A]">
                  The Visionary
                </span>
              </div>
            </div>

            <div className="clip-mask mb-2">
              <h2 className="gsap-slide-up text-4xl md:text-5xl lg:text-6xl font-karlen text-[#39342D]">
                MD.Sharifuddin
              </h2>
            </div>
            
            <div className="clip-mask mb-8">
              <p className="gsap-slide-up text-[#8A8175] text-[10px] md:text-xs font-bold tracking-widest uppercase">
                Founder & Principal Designer
              </p>
            </div>

            <div className="gsap-fade-up space-y-6 text-sm md:text-base text-[#8A8175] leading-relaxed font-light mb-10 max-w-xl">
              <p>
                With a profound appreciation for modern minimalism and timeless elegance, Sharifuddin founded The Zencraft to bridge the gap between rigorous architectural precision and intimate, highly livable design.
              </p>
              <p>
                His unique background gives him an analytical yet deeply empathetic approach to interiors—treating every room as an ecosystem where form, function, and flow must exist in perfect, uninterrupted harmony. 
              </p>
              <p>
                Under his creative direction, The Zencraft has grown into a studio known for delivering spaces that feel exceptionally tailored, deeply personal, and uncompromisingly luxurious.
              </p>
            </div>

            <blockquote className="gsap-fade-up border-l-[3px] border-[#B58A3A] pl-6 py-2 mt-4 text-[#39342D] italic font-karlen text-xl md:text-2xl leading-snug max-w-lg">
              "A space shouldn't just look beautiful; it should feel like an exhale the moment you walk through the door."
            </blockquote>

          </div>
        </div>
      </section>

      <div className="cta-reveal w-full mt-8">
                <CtaSection />
              </div>
      

    </main>
  );
};

export default AboutPage;