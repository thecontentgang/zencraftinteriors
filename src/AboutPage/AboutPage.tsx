'use client';

import React, { useEffect } from 'react';
import AboutHero from './AboutHero';
import AboutPhilosophy from './AboutPhilosophy';
import AboutProcess from './AboutProcess';
import AboutFounder from './AboutFounder';

const About = () => {

  // Global Scroll Observer for the About Page
  // Any child component can use the class "reveal-on-scroll" to animate in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-sand selection:text-primary z-10">
      
      {/* --- GLOBAL ABOUT PAGE ANIMATIONS --- */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      {/* Slightly shifted from the homepage to give the About page its own unique "lighting" */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[100rem] h-screen pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[45%] bg-white/5 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* --- PAGE SECTIONS --- */}
      <div className="relative z-10 flex flex-col">
        <AboutHero />
        <AboutPhilosophy />
        <AboutProcess />
        <AboutFounder />
      </div>

    </main>
  );
};

export default About;