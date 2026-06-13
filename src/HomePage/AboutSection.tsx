'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from '../components/ModalContext'; 

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModal(); // 2. Extract the openModal function

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline 1: Header & Main Content
      const topTl = gsap.timeline({
        scrollTrigger: { 
          trigger: ".gsap-top-trigger", 
          start: "top 80%" 
        }
      });

      topTl.fromTo(".gsap-badge", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
           .fromTo(".gsap-heading", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
           .fromTo(".gsap-sub", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.6")
           .fromTo(".gsap-text p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.2")
           .fromTo(".gsap-img", { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

      // Timeline 2: Stats Grid & CTA
      const bottomTl = gsap.timeline({
        scrollTrigger: { 
          trigger: ".gsap-bottom-trigger", 
          start: "top 85%" 
        }
      });

      bottomTl.fromTo(".gsap-card", { opacity: 0, y: 25, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" })
              .fromTo(".gsap-cta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-[var(--color-primary)] text-white overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff08_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* TOP SECTION: Middle-aligned Title & Header */}
        <div className="gsap-top-trigger text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center">
          <span className="gsap-badge inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-[var(--color-secondary)] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-pulse" />
            Who We Are
          </span>

          <h2 className="gsap-heading text-4xl sm:text-5xl md:text-6xl font-karlen tracking-tighter leading-tight mb-4">
            Crafting Sanctuaries of <span className="text-[var(--color-secondary)]">Timeless Elegance</span>
          </h2>

          <p className="gsap-sub text-[var(--color-secondary)] text-lg md:text-xl font-light tracking-wide">
            Timeless elegance. Thoughtful living.
          </p>
        </div>

        {/* MIDDLE SECTION: Content Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-16 md:mb-20">
          <div className="gsap-text space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-background)]/80 font-sans text-left">
            <p>
              We’ve always felt that a home shouldn’t just look good—it should change how you feel the moment you step through the door. It’s where your day slows down, where layout and light click into place, and where you finally find room to breathe.
            </p>
            <p>
              Since starting <span className="text-[var(--color-secondary)] font-medium">Zencraft Interiors</span> in Hyderabad back in 2023, our approach has been simple: skip the fleeting trends and build spaces that actually mean something to the people living in them.
            </p>
            <p>
              Whether it’s a kitchen that becomes the natural heart of your morning routine or a living space designed for quiet Sunday afternoons, we bring a balance of clean, modern utility and understated luxury to every corner we touch. We handle the heavy lifting, the meticulous details, and the custom craftsmanship, so all you have to do is settle in.
            </p>
          </div>

          <div className="relative">
            <div className="gsap-img aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl shadow-xl border border-white/10">
              <img
                src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_531/at%2Fhouse%20tours%2F2026%2Fmarch%2Ftaylor-j%2Ftours-sanfrancisco-taylor-j-3"
                alt="Luxurious modern living room interior by Zencraft Interiors"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Highlights Grid */}
        <div className="gsap-bottom-trigger grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              stat: "45+",
              title: "Homes Crafted",
              desc: "Bespoke sanctuaries brought to life across Hyderabad.",
            },
            {
              stat: "12+",
              title: "Communities",
              desc: "Transforming spaces in the city's premier residential enclaves.",
            },
            {
              stat: "100%",
              title: "Transparency",
              desc: "Fixed timelines, clear pricing, and no hidden surprises.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="gsap-card group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-secondary)]/40 backdrop-blur-md rounded-2xl p-5 md:p-6 transition-colors duration-500"
            >
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-3xl md:text-4xl font-semibold text-[var(--color-secondary)] tracking-tight">
                  {item.stat}
                </span>
                <h3 className="text-base md:text-lg font-medium tracking-tight text-white/90">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-[var(--color-background)]/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 md:mt-16">
          {/* 3. Changed <a> to <button> and added onClick={openModal} */}
          <button
            onClick={openModal}
            className="gsap-cta group relative inline-flex items-center gap-3 bg-[var(--color-secondary)] hover:bg-[#d4af37] text-[var(--color-primary)] font-semibold px-8 py-4 rounded-full text-sm tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 uppercase shadow-lg"
          >
            <span>Begin Your Journey</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;