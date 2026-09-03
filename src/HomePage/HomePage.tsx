'use client';

import { useEffect } from 'react';
import HeroSection from '../HomePage/HeroSection';
import AboutSection from '../HomePage/AboutSection';
import ProjectsSection from '../HomePage/ProjectsSection';
import ServicesSection from '../HomePage/ServicesSection';
import TestimonialsSection from '../HomePage/TestimonialSection';
import InstagramSection from './Instagram';
import WhyChooseUsSection from '../HomePage/WhyChooseUs';

const Home = () => {

  // Global Scroll Observer for the entire Homepage
  // This allows any child component to simply use the class "reveal-on-scroll"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Optional: unobserve if you only want the animation to happen once
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
      
      {/* --- GLOBAL HOMEPAGE ANIMATIONS --- */}
      {/* Putting this here ensures all your sections share the exact same easing and timing */}
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
        
        /* Smooth scrolling for anchor links across the homepage */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* --- GLOBAL AMBIENT BACKGROUND --- */}
      {/* This subtle glow will sit behind all sections, tying the dark theme together */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[100rem] h-screen pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-white/5 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* --- PAGE SECTIONS --- */}
      <div className="relative z-10 flex flex-col">
        <HeroSection /> 
        <AboutSection />
        <InstagramSection />
        <ProjectsSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
      </div>

    </main>
  );
};

export default Home;