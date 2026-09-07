'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../components/ModalContext'; // Adjust path if needed

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CtaSection() {
  const { openModal } = useModal();

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full px-4 sm:px-6 lg:px-12 py-10 md:py-20 bg-[#F8F5EE]">
      <div className="relative mx-auto max-w-[75rem] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-[#B58A3A]/30 shadow-[0_20px_50px_rgba(57,52,45,0.2)]">

        {/* DESKTOP / TABLET BG IMAGE */}
        <img
          src="/cta-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center hidden sm:block"
        />

        {/* MOBILE BG IMAGE */}
        <img
          src="/cta-mobilebg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center block sm:hidden"
        />

        {/* Dark Charcoal Cloud Overlay — fades into the image */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#39342D]/95 via-[#39342D]/80 sm:via-[#39342D]/75 to-transparent" />

        {/* CONTENT — aligned right on mobile and desktop */}
        <div className="relative z-10 flex items-center justify-end px-6 py-12 sm:px-12 sm:py-20 md:px-20 md:py-28">
          <div ref={contentRef} className="flex flex-col items-end text-right gap-4 sm:gap-6 max-w-[240px] sm:max-w-md">
            
            {/* Headline */}
            <h2 className="font-karlen text-[1.5rem] sm:text-4xl md:text-[3rem] lg:text-[3rem] leading-[1.08] tracking-[-0.02em] text-[#F8F5EE]">
              Change your{' '} <br/>
              <span className="text-[#B58A3A] italic font-light">
                living space?
              </span>
            </h2>

            {/* CTA button */}
            <button
              type="button"
              onClick={openModal}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#B58A3A] border border-[#B58A3A] px-6 py-3 sm:px-8 sm:py-4 font-body text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#F8F5EE] transition-all duration-300 ease-out hover:bg-[#F8F5EE] hover:text-[#39342D] hover:border-[#F8F5EE] hover:shadow-[0_8px_28px_rgba(181,138,58,0.4)] active:scale-[0.97] cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Book consultation</span>
              <ArrowUpRight
                size={14}
                className="relative transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            
          </div>
        </div>
      </div>
    </section>
  );
}