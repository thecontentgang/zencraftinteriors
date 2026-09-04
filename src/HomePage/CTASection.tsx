'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../components/ModalContext';

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
    <section ref={sectionRef} className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-10 bg-[#F8F5EE]">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[#B58A3A]/30 shadow-[0_20px_50px_rgba(57,52,45,0.1)]">

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

        {/* Ivory cloud overlay — fades into the image */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#F8F5EE]/95 via-[#F8F5EE]/75 sm:via-[#F8F5EE]/70 to-transparent" />

        {/* CONTENT — aligned right on mobile and desktop */}
        <div className="relative z-10 flex items-center justify-end px-6 py-10 sm:px-12 sm:py-16 md:px-16 md:py-20">
          <div ref={contentRef} className="flex flex-col items-end text-right gap-4 sm:gap-6 max-w-[210px] sm:max-w-sm">
            {/* Headline */}
            <h2 className="font-karlen text-[1.35rem] sm:text-4xl md:text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-[#39342D]">
              Ready to re-engineer your{' '}
              <span className="text-[#B58A3A] italic font-light">
                living space?
              </span>
            </h2>

            {/* CTA button */}
            <button
              type="button"
              onClick={openModal}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#B58A3A] px-5 py-2.5 sm:px-7 sm:py-3.5 font-body text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 ease-out hover:bg-[#39342D] hover:shadow-[0_8px_28px_rgba(57,52,45,0.22)] active:scale-[0.97] cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Book consultation</span>
              <ArrowUpRight
                size={11}
                className="relative transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}