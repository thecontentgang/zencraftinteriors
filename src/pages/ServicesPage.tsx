'use client';

import React, { useEffect } from 'react';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: '01',
      title: 'Residential Sanctuaries',
      description: 'End-to-end interior design for luxury villas and bespoke apartments. We create deeply personal spaces that balance elegant aesthetics with daily functionality.',
      features: ['Space Planning', 'Custom Millwork', 'Material Selection', 'Turnkey Installation'],
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop',
      accentColor: 'from-orange-500/20 to-transparent' 
    },
    {
      id: '02',
      title: 'Commercial & Hospitality',
      description: 'Elevating brand identities through immersive spatial design. From boutique hotels to high-end executive offices, we design spaces that captivate and convert.',
      features: ['Brand Translation', 'Flow Optimization', 'Acoustic Design', 'Commercial Lighting'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
      accentColor: 'from-blue-500/20 to-transparent' 
    },
    {
      id: '03',
      title: 'Architectural Renovation',
      description: 'Breathing new life into existing structures. We handle structural remodeling, layout reconfiguration, and complete exterior-to-interior modernization.',
      features: ['Structural Drafting', 'Permit Management', 'Contractor Oversight', '3D Visualization'],
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop',
      accentColor: 'from-emerald-500/20 to-transparent' 
    },
    {
      id: '04',
      title: 'Bespoke Furniture & Styling',
      description: 'The final layer of soul. We curate rare artifacts, source global art pieces, and design custom furniture tailored to the exact dimensions of your space.',
      features: ['Art Curation', 'Textile Sourcing', 'Custom Upholstery', 'Final Decor Styling'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
      accentColor: 'from-purple-500/20 to-transparent' 
    }
  ];

  // Set up Scroll Animations
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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-hidden pt-32 pb-20 z-10 selection:bg-sand selection:text-primary">
      
      {/* --- SCROLL ANIMATION CSS --- */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.is-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .ease-buttery {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 right-0 w-full max-w-5xl h-128 bg-secondary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-12">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-40 reveal-on-scroll is-revealed">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 md:w-12 h-px bg-secondary" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-secondary">
              Our Expertise
            </span>
            <span className="w-8 md:w-12 h-px bg-secondary" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-karlen text-white leading-[1.05] tracking-tight max-w-4xl mb-8">
            The discipline of <br className="hidden md:block" />
            <span className="text-sand italic font-light">beautiful engineering.</span>
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-2xl">
            From the initial architectural sketches to the final placement of curated art, our services are designed to offer a seamless, turnkey transformation of your environment.
          </p>
        </div>

        {/* --- ASYMMETRIC OVERLAPPING LAYOUT --- */}
        <div className="flex flex-col gap-24 md:gap-40">
          {services.map((service, index) => {
            // Evens have Image on Left, Glass Box on Right
            // Odds have Image on Right, Glass Box on Left
            const isEven = index % 2 === 0;

            return (
              <div 
                key={service.id} 
                className={`relative w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center group reveal-on-scroll`}
              >
                
                {/* --- CINEMATIC IMAGE --- */}
                {/* On mobile: takes full width, sits on top. On Desktop: Takes 70% width, acts as background anchor */}
                <div className="relative w-full lg:w-[70%] h-[400px] lg:h-[700px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl z-10 shrink-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-buttery"
                  />
                  {/* Subtle dark overlay for depth */}
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
                </div>

                {/* --- FLOATING GLASS TEXT BOX --- */}
                {/* Pulled up negatively on mobile (-mt-16) to overlap. On Desktop pulled sideways negatively (-ml-32) to overlap */}
                <div className={`
                  relative z-20 w-[90%] lg:w-[40%] -mt-16 lg:mt-24
                  ${isEven ? 'lg:-ml-32' : 'lg:-mr-32'}
                `}>
                  
                  {/* The Glass Container */}
                  <div className="relative bg-primary/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 ease-buttery hover:bg-primary/70 hover:border-white/20">
                    
                    {/* Atmospheric Glow tied to the specific service accent color */}
                    <div className={`absolute top-0 right-0 w-full h-full bg-linear-to-bl ${service.accentColor} opacity-50 pointer-events-none -z-10`} />

                    {/* Number Indicator */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-5xl font-karlen font-bold text-white/20 group-hover:text-secondary transition-colors duration-700 ease-buttery">
                        {service.id}
                      </span>
                      <div className="h-px flex-grow bg-white/10" />
                    </div>

                    {/* Title & Desc */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-karlen text-white mb-6 group-hover:text-sand transition-colors duration-700 ease-buttery">
                      {service.title}
                    </h2>
                    <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                      {service.features.map((feature, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-semibold tracking-widest uppercase text-white/80"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Interactive 'Learn More' Button */}
                    <a href={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="inline-flex items-center gap-4 group/btn">
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover/btn:border-secondary group-hover/btn:text-primary group-hover/btn:bg-secondary transition-all duration-500 ease-buttery">
                        <svg className="w-4 h-4 transform group-hover/btn:rotate-45 transition-transform duration-500 ease-buttery" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white group-hover/btn:text-secondary transition-colors duration-500 ease-buttery">
                        Explore Service
                      </span>
                    </a>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-32 md:mt-48 w-full bg-secondary/10 border border-secondary/20 rounded-[3rem] p-12 md:p-24 text-center flex flex-col items-center reveal-on-scroll">
          <h3 className="text-3xl md:text-5xl font-karlen text-white mb-6">
            Ready to transform your space?
          </h3>
          <p className="text-sm md:text-base text-white/60 font-light mb-10 max-w-xl">
            Book a complimentary consultation with our lead designers in Hyderabad to discuss your vision, timeline, and investment.
          </p>
          <a href="/contact" className="px-10 py-4 bg-secondary text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] active:scale-95">
            Start a Consultation
          </a>
        </div>

      </div>
    </main>
  );
};

export default ServicesPage;