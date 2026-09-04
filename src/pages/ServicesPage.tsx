'use client';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: '01',
      title: 'Residential Sanctuaries',
      description: 'End-to-end interior design for luxury villas and bespoke apartments. We create deeply personal spaces that balance elegant aesthetics with daily functionality.',
      features: ['Space Planning', 'Custom Millwork', 'Material Selection', 'Turnkey Installation'],
      image: '/residential-design.webp',
      accentColor: 'from-orange-500/20 to-transparent' 
    },
    {
      id: '02',
      title: 'Commercial & Hospitality',
      description: 'Elevating brand identities through immersive spatial design. From boutique hotels to high-end executive offices, we design spaces that captivate and convert.',
      features: ['Brand Translation', 'Flow Optimization', 'Acoustic Design', 'Commercial Lighting'],
      image: '/commercial-design.webp',
      accentColor: 'from-blue-500/20 to-transparent' 
    },
    {
      id: '03',
      title: 'Architectural Renovation',
      description: 'Breathing new life into existing structures. We handle structural remodeling, layout reconfiguration, and complete exterior-to-interior modernization.',
      features: ['Structural Drafting', 'Permit Management', 'Contractor Oversight', '3D Visualization'],
      image: '/architecture-rennovation.jpg',
      accentColor: 'from-emerald-500/20 to-transparent' 
    },
    {
      id: '04',
      title: 'Bespoke Furniture & Styling',
      description: 'The final layer of soul. We curate rare artifacts, source global art pieces, and design custom furniture tailored to the exact dimensions of your space.',
      features: ['Art Curation', 'Textile Sourcing', 'Custom Upholstery', 'Final Decor Styling'],
      image: '/furniture.webp',
      accentColor: 'from-purple-500/20 to-transparent' 
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
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-hidden pt-32 pb-20 z-10 selection:bg-sand selection:text-primary">
      
      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
      <style>{`
        /* 1. The Mask Container (Hides text before it slides up) */
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em;
        }

        /* 2. Text Slide Up Effect */
        .slide-up-text {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .is-revealed .slide-up-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* 3. Standard Soft Fade & Float for Buttons/Tags */
        .slide-up-fade {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out;
        }
        .is-revealed .slide-up-fade {
          transform: translateY(0);
          opacity: 1;
        }

        /* 4. Glass Panel Background Fade */
        .glass-panel {
          opacity: 0;
          transition: opacity 1.5s ease-out;
        }
        .is-revealed .glass-panel {
          opacity: 1;
        }

        /* 5. Cinematic Image Reveal */
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

        /* Reusable buttery easing */
        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 right-0 w-full max-w-5xl h-128 bg-secondary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-12">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-40 hero-reveal">
          <div className="clip-mask mb-6">
            <div className="flex items-center gap-4 slide-up-text" style={{ transitionDelay: '0s' }}>
              <span className="w-8 md:w-12 h-px bg-secondary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-secondary">
                Our Expertise
              </span>
              <span className="w-8 md:w-12 h-px bg-secondary" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-karlen text-white leading-[1.05] tracking-tight max-w-4xl mb-8">
            <div className="clip-mask">
              <div className="slide-up-text" style={{ transitionDelay: '0.1s' }}>
                The discipline of
              </div>
            </div>
            <div className="clip-mask">
              <div className="slide-up-text text-sand italic font-light" style={{ transitionDelay: '0.2s' }}>
                beautiful engineering.
              </div>
            </div>
          </h1>
          
          <div className="clip-mask max-w-2xl mx-auto">
            <p className="slide-up-text text-sm md:text-base text-white/60 font-light leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              From the initial architectural sketches to the final placement of curated art, our services are designed to offer a seamless, turnkey transformation of your environment.
            </p>
          </div>
        </div>

        {/* --- ASYMMETRIC OVERLAPPING LAYOUT --- */}
        <div className="flex flex-col gap-24 md:gap-40">
          {services.map((service, index) => {
            // Evens have Image on Left, Glass Box on Right
            const isEven = index % 2 === 0;

            return (
              <div 
                key={service.id} 
                className={`reveal-group relative w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center group`}
              >
                
                {/* --- CINEMATIC IMAGE --- */}
                <div 
                  className="image-wrapper relative w-full lg:w-[70%] h-[400px] lg:h-[700px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl z-10 shrink-0"
                  style={{ transitionDelay: isEven ? '0s' : '0.2s' }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="image-inner w-full h-full object-cover group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0 transition-[filter,transform] duration-1000 ease-buttery"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                </div>

                {/* --- FLOATING GLASS TEXT BOX --- */}
                <div className={`
                  relative z-20 w-[90%] lg:w-[40%] -mt-16 lg:mt-24
                  ${isEven ? 'lg:-ml-32' : 'lg:-mr-32'}
                `}>
                  
                  {/* The Glass Container */}
                  <div className="glass-panel relative bg-primary/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 ease-buttery hover:bg-primary/70 hover:border-white/20">
                    
                    <div className={`absolute top-0 right-0 w-full h-full bg-linear-to-bl ${service.accentColor} opacity-50 pointer-events-none -z-10`} />

                    {/* Number Indicator */}
                    <div className="clip-mask mb-8">
                      <div className="flex items-center gap-4 slide-up-text" style={{ transitionDelay: isEven ? '0.2s' : '0s' }}>
                        <span className="text-5xl font-karlen font-bold text-white/20 group-hover:text-secondary transition-colors duration-700 ease-buttery">
                          {service.id}
                        </span>
                        <div className="h-px flex-grow bg-white/10" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="clip-mask mb-6">
                      <h2 className="slide-up-text text-3xl md:text-4xl lg:text-5xl font-karlen text-white group-hover:text-sand transition-colors duration-700 ease-buttery" style={{ transitionDelay: isEven ? '0.3s' : '0.1s' }}>
                        {service.title}
                      </h2>
                    </div>

                    {/* Desc */}
                    <div className="clip-mask mb-8">
                      <p className="slide-up-text text-sm md:text-base text-white/70 font-light leading-relaxed" style={{ transitionDelay: isEven ? '0.4s' : '0.2s' }}>
                        {service.description}
                      </p>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-10 slide-up-fade" style={{ transitionDelay: isEven ? '0.5s' : '0.3s' }}>
                      {service.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-semibold tracking-widest uppercase text-white/80"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Button changed to <Link> */}
                    <div className="slide-up-fade" style={{ transitionDelay: isEven ? '0.6s' : '0.4s' }}>
                      <Link 
                        to={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                        className="inline-flex items-center gap-4 group/btn"
                      >
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover/btn:border-secondary group-hover/btn:text-primary group-hover/btn:bg-secondary transition-all duration-500 ease-buttery">
                          <svg className="w-4 h-4 transform group-hover/btn:rotate-45 transition-transform duration-500 ease-buttery" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7-7H3" />
                          </svg>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white group-hover/btn:text-secondary transition-colors duration-500 ease-buttery">
                          Explore Service
                        </span>
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-32 md:mt-48 w-full bg-secondary/10 border border-secondary/20 rounded-[3rem] p-12 md:p-24 text-center flex flex-col items-center reveal-group">
          
          <div className="clip-mask mb-6">
            <h3 className="slide-up-text text-3xl md:text-5xl font-karlen text-white" style={{ transitionDelay: '0s' }}>
              Ready to transform your space?
            </h3>
          </div>
          
          <div className="clip-mask mb-10 max-w-xl mx-auto">
            <p className="slide-up-text text-sm md:text-base text-white/60 font-light" style={{ transitionDelay: '0.1s' }}>
              Book a complimentary consultation with our lead designers in Hyderabad to discuss your vision, timeline, and investment.
            </p>
          </div>

          {/* Changed to <Link> */}
          <div className="slide-up-fade" style={{ transitionDelay: '0.2s' }}>
            <Link to="/contact" className="px-10 py-4 bg-secondary text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] active:scale-95">
              Start a Consultation
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
};

export default ServicesPage;