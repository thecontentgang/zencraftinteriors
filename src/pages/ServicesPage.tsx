'use client';

import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useModal } from '../components/ModalContext'; // Import for the Book Consultation modal
import CtaSection from '../HomePage/CtaSection';

const ServicesPage: React.FC = () => {
  const { openModal } = useModal();

  const services = [
    {
      id: '01',
      title: 'Residential Sanctuaries',
      description: 'End-to-end interior design for luxury villas and bespoke apartments. We create deeply personal spaces that balance elegant aesthetics with daily functionality.',
      features: ['Space Planning', 'Custom Millwork', 'Material Selection', 'Turnkey Installation'],
      image: '/residential-design.webp',
    },
    {
      id: '02',
      title: 'Commercial & Hospitality',
      description: 'Elevating brand identities through immersive spatial design. From boutique hotels to high-end executive offices, we design spaces that captivate and convert.',
      features: ['Brand Translation', 'Flow Optimization', 'Acoustic Design', 'Commercial Lighting'],
      image: '/commercial-design.webp',
    },
    {
      id: '03',
      title: 'Architectural Renovation',
      description: 'Breathing new life into existing structures. We handle structural remodeling, layout reconfiguration, and complete exterior-to-interior modernization.',
      features: ['Structural Drafting', 'Permit Management', 'Contractor Oversight', '3D Visualization'],
      image: '/architecture-rennovation.jpg',
    },
    {
      id: '04',
      title: 'Bespoke Furniture & Styling',
      description: 'The final layer of soul. We curate rare artifacts, source global art pieces, and design custom furniture tailored to the exact dimensions of your space.',
      features: ['Art Curation', 'Textile Sourcing', 'Custom Upholstery', 'Final Decor Styling'],
      image: '/furniture.webp',
    }
  ];

  // Advanced Observer targeting the 'reveal-group' wrappers
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
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-group');
    revealElements.forEach((el) => observer.observe(el));

    // Force hero reveal immediately on mount
    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#F8F5EE] font-body text-[#39342D] overflow-hidden pt-32 pb-20 z-10 selection:bg-[#B58A3A] selection:text-white">

      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
      <style>{`
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em;
        }

        .slide-up-text {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .is-revealed .slide-up-text {
          transform: translateY(0);
          opacity: 1;
        }

        .slide-up-fade {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out;
        }
        .is-revealed .slide-up-fade {
          transform: translateY(0);
          opacity: 1;
        }

        .glass-panel {
          opacity: 0;
          transition: opacity 1.5s ease-out;
        }
        .is-revealed .glass-panel {
          opacity: 1;
        }

        .image-wrapper {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .image-inner {
          transform: scale(1.15);
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed .image-wrapper {
          transform: translateY(0);
          opacity: 1;
        }
        .is-revealed .image-inner {
          transform: scale(1);
        }

        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- WARM AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 right-0 w-full max-w-5xl h-128 bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-12">

        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mt-10 mb-20 md:mb-32 hero-reveal">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen text-[#39342D] leading-[1.05] tracking-tight max-w-4xl mb-6">
            <div className="clip-mask">
              <div className="slide-up-text" style={{ transitionDelay: '0.1s' }}>
                The discipline of
              </div>
            </div>
            <div className="clip-mask">
              <div className="slide-up-text text-[#B58A3A] italic font-light" style={{ transitionDelay: '0.2s' }}>
                beautiful engineering.
              </div>
            </div>
          </h1>

          <div className="clip-mask max-w-2xl mx-auto">
            <p className="slide-up-text text-sm md:text-base text-[#8A8175] font-light leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              From the initial architectural sketches to the final placement of curated art, our services are designed to offer a seamless, turnkey transformation of your environment.
            </p>
          </div>
        </div>

        {/* --- SHORTER, UNIFORM OVERLAPPING LAYOUT --- */}
        <div className="flex flex-col gap-20 md:gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className={`reveal-group relative w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center group`}
              >

                {/* --- CINEMATIC IMAGE (SHORTER HEIGHT) --- */}
                <div
                  className="image-wrapper relative w-full lg:w-[60%] h-[280px] sm:h-[350px] lg:h-[450px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(57,52,45,0.12)] border border-[#B58A3A]/20 z-10 shrink-0"
                  style={{ transitionDelay: isEven ? '0s' : '0.2s' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="image-inner w-full h-full object-cover group-hover:scale-105 grayscale-[15%] group-hover:grayscale-0 transition-[filter,transform] duration-1000 ease-buttery"
                  />
                  <div className="absolute inset-0 bg-[#39342D]/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                </div>

                {/* --- FLOATING CHARCOAL GLASS BOX --- */}
                <div className={`
                  relative z-20 w-[95%] lg:w-[45%] -mt-12 lg:mt-16
                  ${isEven ? 'lg:-ml-20' : 'lg:-mr-20'}
                `}>

                  <div className="glass-panel relative bg-[#39342D] text-[#F8F5EE] backdrop-blur-2xl border border-[#B58A3A]/30 rounded-[1.5rem] lg:rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_30px_60px_rgba(57,52,45,0.25)] overflow-hidden transition-all duration-700 ease-buttery hover:border-[#B58A3A]/60">

                    {/* Uniform subtle gold gradient in background */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#B58A3A]/15 to-transparent opacity-50 pointer-events-none -z-10" />

                    {/* Number Indicator */}
                    <div className="clip-mask mb-6">
                      <div className="flex items-center gap-4 slide-up-text" style={{ transitionDelay: isEven ? '0.2s' : '0s' }}>
                        <span className="text-3xl md:text-4xl font-karlen font-bold text-[#F8F5EE]/25 group-hover:text-[#B58A3A] transition-colors duration-700 ease-buttery">
                          {service.id}
                        </span>
                        <div className="h-px flex-grow bg-[#F8F5EE]/15" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="clip-mask mb-4">
                      <h2 className="slide-up-text text-2xl md:text-3xl lg:text-4xl font-karlen text-[#F8F5EE] group-hover:text-[#B58A3A] transition-colors duration-700 ease-buttery" style={{ transitionDelay: isEven ? '0.3s' : '0.1s' }}>
                        {service.title}
                      </h2>
                    </div>

                    {/* Desc */}
                    <div className="clip-mask mb-6">
                      <p className="slide-up-text text-xs md:text-sm text-[#E9DFCE]/80 font-light leading-relaxed" style={{ transitionDelay: isEven ? '0.4s' : '0.2s' }}>
                        {service.description}
                      </p>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-8 slide-up-fade" style={{ transitionDelay: isEven ? '0.5s' : '0.3s' }}>
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-[#F8F5EE]/5 border border-[#B58A3A]/30 rounded-full text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-[#F8F5EE]/90"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Book Consultation Button */}
                    <div className="slide-up-fade" style={{ transitionDelay: isEven ? '0.6s' : '0.4s' }}>
                      <button
                        onClick={openModal}
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#B58A3A] text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#F8F5EE] hover:text-[#39342D] transition-all duration-300 shadow-[0_5px_15px_rgba(181,138,58,0.2)] active:scale-95 border border-transparent"
                      >
                        Book Consultation
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="cta-reveal w-full mt-8">
                  <CtaSection />
                </div>
        
      </div>
    </main>
  );
};

export default ServicesPage;