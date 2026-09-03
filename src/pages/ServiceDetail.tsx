'use client';

import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

// --- DATA DICTIONARY (Embedded directly so you don't need extra files) ---
const serviceDetailsData = {
  'residential-sanctuaries': {
    id: '01',
    title: 'Residential',
    subtitle: 'Sanctuaries.',
    description: 'We transform private residences into deeply personal havens. By balancing architectural flow with tactile luxury, we create living spaces that cater to both quiet moments and grand entertaining.',
    nextServiceSlug: 'commercial-hospitality',
    nextServiceName: 'Commercial & Hospitality',
    phases: [
      {
        id: '01',
        title: 'Spatial Planning & Flow',
        description: 'Before aesthetics, we perfect the logic of the home. We analyze your daily routines to optimize room layouts, ensuring a seamless transition between private quarters and communal areas.',
        image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Lifestyle Auditing', 'Drafting & Layouts', 'Flow Optimization']
      },
      {
        id: '02',
        title: 'Custom Millwork & Materials',
        description: 'True luxury lies in the bespoke. We design custom cabinetry, select rare natural stones, and source premium hardwoods to build a timeless, tactile foundation for your home.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Stone Selection', 'Custom Cabinetry', 'Hardware Sourcing']
      },
      {
        id: '03',
        title: 'Textiles & Lighting',
        description: 'We layer the space with warmth. From automated ambient lighting systems to hand-woven rugs and bespoke window treatments, we control how light and texture interact throughout the day.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Lighting Mapping', 'Fabric Sourcing', 'Window Treatments']
      },
      {
        id: '04',
        title: 'Turnkey Installation',
        description: 'You simply turn the key. We handle the intense logistics of delivery, white-glove assembly, and meticulous final placement so you walk into a perfectly realized home.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Logistics Management', 'White-Glove Setup', 'Final Reveal']
      }
    ]
  },
  'commercial-hospitality': {
    id: '02',
    title: 'Commercial',
    subtitle: '& Hospitality.',
    description: 'We architect environments that perform. By merging striking aesthetics with operational flow, we create commercial spaces that captivate your clients and empower your teams.',
    nextServiceSlug: 'architectural-renovation',
    nextServiceName: 'Architectural Renovation',
    phases: [
      {
        id: '01',
        title: 'Brand Spatial Translation',
        description: 'We translate your brand’s ethos into physical architecture. Every material and touchpoint is designed to communicate your core values to clients and staff silently.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Brand Auditing', 'Concept Ideation', 'Material Boarding']
      },
      {
        id: '02',
        title: 'Flow & Ergonomics',
        description: 'Commercial spaces must perform seamlessly. We map out high-traffic zones, collaborative hubs, and private focus areas to maximize team efficiency without feeling clinical.',
        image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Traffic Mapping', 'Zoning Strategy', 'Ergonomic Layouts']
      },
      {
        id: '03',
        title: 'Acoustic & Lighting Design',
        description: 'Sound and light dictate the mood of a room. We integrate hidden acoustic dampening and layer circadian-friendly lighting to foster deep focus and intimate ambiance.',
        image: 'https://images.unsplash.com/photo-1556702571-3e11328b8eb8?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Acoustic Paneling', 'Luminary Mapping', 'Ambiance Control']
      },
      {
        id: '04',
        title: 'Commercial Execution',
        description: 'We manage the friction so you don’t have to. From contractor procurement to the final styling of the executive suites, we deliver a ready-to-operate space strictly to spec.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Contractor Oversight', 'Quality Assurance', 'Final Styling']
      }
    ]
  },
  'architectural-renovation': {
    id: '03',
    title: 'Architectural',
    subtitle: 'Renovation.',
    description: 'Breathing new life into existing structures. We oversee complex structural remodeling and layout reconfigurations to modernize outdated properties while respecting their original character.',
    nextServiceSlug: 'bespoke-furniture-styling',
    nextServiceName: 'Bespoke Furniture & Styling',
    phases: [
      {
        id: '01',
        title: 'Structural Assessment',
        description: 'We begin by understanding the bones of the building. Our team evaluates load-bearing structures and system capacities to determine exactly what is possible for your renovation.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Feasibility Study', 'Structural Review', 'Permit Consulting']
      },
      {
        id: '02',
        title: 'Layout Reconfiguration',
        description: 'We tear down boundaries to create modern flow. By opening up restrictive floor plans and relocating core services, we entirely redefine how the square footage is experienced.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Demolition Plans', 'Space Reallocation', 'Drafting']
      },
      {
        id: '03',
        title: 'Material Modernization',
        description: 'Replacing the outdated with the exceptional. We strip away aged finishes and introduce contemporary, durable materials that elevate the property’s aesthetic and market value.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Finish Selections', 'Exterior Cladding', 'Flooring Updates']
      },
      {
        id: '04',
        title: 'Contractor Management',
        description: 'Renovations require rigorous oversight. We act as your liaison on the ground, holding construction teams accountable to the design specifications, budget, and timeline.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Site Visits', 'Timeline Tracking', 'Quality Control']
      }
    ]
  },
  'bespoke-furniture-styling': {
    id: '04',
    title: 'Bespoke Furniture',
    subtitle: '& Styling.',
    description: 'The final layer of soul. We curate rare artifacts, commission custom artworks, and design bespoke furniture tailored to the exact dimensions and aesthetic of your space.',
    nextServiceSlug: 'residential-sanctuaries',
    nextServiceName: 'Residential Sanctuaries',
    phases: [
      {
        id: '01',
        title: 'Dimensional Curation',
        description: 'Standard sizing rarely fits perfectly. We measure every alcove and sightline to determine the exact proportions required for your primary furniture pieces.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Scale Mapping', 'Proportion Planning', 'Inventory Review']
      },
      {
        id: '02',
        title: 'Custom Fabrication',
        description: 'When it cannot be found, we build it. We collaborate with master craftsmen to design and fabricate one-of-a-kind dining tables, sectionals, and casework exclusive to your home.',
        image: 'https://images.unsplash.com/photo-1581428982868-e410dd447aa4?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Shop Drawings', 'Woodworking', 'Custom Upholstery']
      },
      {
        id: '03',
        title: 'Global Art Sourcing',
        description: 'Art gives a room its voice. We source distinct paintings, sculptures, and global artifacts that reflect your personal taste and serve as striking focal points.',
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Gallery Networking', 'Piece Commissioning', 'Framing Selection']
      },
      {
        id: '04',
        title: 'The Final Layer',
        description: 'The difference is in the details. Our styling team layers the space with curated ceramics, botanical elements, and textiles to make the room feel lived-in, warm, and complete.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
        deliverables: ['Accessory Placement', 'Botanical Styling', 'Final Walkthrough']
      }
    ]
  }
};

const ServiceDetail: React.FC = () => {
  // 1. Grab the ID from the URL (e.g., "commercial-hospitality")
  const { id } = useParams<{ id: string }>();
  
  // 2. Find the matching data
  const data = id ? serviceDetailsData[id as keyof typeof serviceDetailsData] : null;

  // Advanced Observer targeting the 'reveal-group' wrappers
  useEffect(() => {
    // If no data is found, we don't need to run animations
    if (!data) return;

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

    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, [id, data]); // Re-run when the ID changes

  // 3. If someone types a bad URL, redirect them back to the services page
  if (!data) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-sand selection:text-primary z-10">
      
      <style>{`
        .clip-mask { overflow: hidden; padding-bottom: 0.15em; }
        .slide-up-text { transform: translateY(110%); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out; }
        .is-revealed .slide-up-text { transform: translateY(0); opacity: 1; }
        .slide-up-fade { transform: translateY(40px); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out; }
        .is-revealed .slide-up-fade { transform: translateY(0); opacity: 1; }
        .image-wrapper { transform: translateY(40px); opacity: 0; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out; }
        .image-inner { transform: scale(1.15); transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .is-revealed .image-wrapper { transform: translateY(0); opacity: 1; }
        .is-revealed .image-inner { transform: scale(1); }
        .ease-buttery { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* --- 1. PREMIUM CENTERED HERO --- */}
      <section className="relative w-full pt-40 pb-20 px-4 sm:px-6 lg:px-12 bg-primary flex flex-col items-center text-center hero-reveal">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-4xl w-full flex flex-col items-center">
          
          <div className="clip-mask mb-8">
            <div className="flex items-center justify-center gap-4 slide-up-text" style={{ transitionDelay: '0s' }}>
              <span className="w-8 md:w-16 h-px bg-secondary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-secondary">
                Service {data.id}
              </span>
              <span className="w-8 md:w-16 h-px bg-secondary" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-karlen text-white leading-[0.95] tracking-tight mb-8">
            <div className="clip-mask">
              <div className="slide-up-text" style={{ transitionDelay: '0.1s' }}>
                {data.title}
              </div>
            </div>
            <div className="clip-mask">
              <div className="slide-up-text text-sand italic font-light" style={{ transitionDelay: '0.2s' }}>
                {data.subtitle}
              </div>
            </div>
          </h1>
          
          <div className="clip-mask max-w-2xl mx-auto">
            <p className="slide-up-text text-sm md:text-base text-white/60 font-light leading-relaxed" style={{ transitionDelay: '0.3s' }}>
              {data.description}
            </p>
          </div>

        </div>
      </section>

      {/* --- 2. CENTRAL-AXIS ALTERNATING TIMELINE --- */}
      <section className="relative w-full py-20 md:py-32 px-4 sm:px-6 lg:px-12 bg-primary">
        <div className="max-w-6xl mx-auto relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/15 to-transparent z-0" />

          <div className="flex flex-col gap-24 md:gap-32">
            {data.phases.map((phase, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={phase.id} className="reveal-group group relative flex flex-col md:flex-row items-center w-full">
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center z-20">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-secondary group-hover:scale-150 group-hover:bg-secondary transition-all duration-500 ease-buttery slide-up-fade" style={{ transitionDelay: '0.2s' }} />
                  </div>

                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:pr-16 lg:pr-24 justify-end order-1' : 'md:pl-16 lg:pl-24 justify-start order-1 md:order-2'} mb-10 md:mb-0 z-10`}>
                    <div className="image-wrapper w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative" style={{ transitionDelay: isEven ? '0s' : '0.2s' }}>
                      <img src={phase.image} alt={phase.title} className="image-inner w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-1000 ease-buttery" />
                      <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
                      <div className="md:hidden absolute top-4 left-4 bg-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 slide-up-fade" style={{ transitionDelay: '0.4s' }}>
                        <span className="text-[10px] font-bold tracking-widest text-secondary">PHASE {phase.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`w-full md:w-1/2 flex flex-col justify-center z-10 ${isEven ? 'md:pl-16 lg:pl-24 order-2' : 'md:pr-16 lg:pr-24 md:items-end md:text-right order-2 md:order-1'}`}>
                    <div className="clip-mask hidden md:block mb-4">
                      <span className="slide-up-text block text-[10px] font-bold tracking-[0.3em] uppercase text-secondary" style={{ transitionDelay: isEven ? '0.2s' : '0s' }}>
                        Phase {phase.id}
                      </span>
                    </div>

                    <div className="clip-mask mb-6">
                      <h3 className="slide-up-text text-3xl md:text-4xl font-karlen text-white group-hover:text-sand transition-colors duration-500 ease-buttery" style={{ transitionDelay: isEven ? '0.3s' : '0.1s' }}>
                        {phase.title}
                      </h3>
                    </div>
                    
                    <div className="clip-mask mb-8">
                      <p className={`slide-up-text text-sm md:text-base text-white/60 font-light leading-relaxed max-w-md ${isEven ? '' : 'md:ml-auto'}`} style={{ transitionDelay: isEven ? '0.4s' : '0.2s' }}>
                        {phase.description}
                      </p>
                    </div>

                    <div className={`flex flex-wrap gap-2 slide-up-fade ${isEven ? '' : 'md:justify-end'}`} style={{ transitionDelay: isEven ? '0.5s' : '0.3s' }}>
                      {phase.deliverables.map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-white/80">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 3. IMMERSIVE STATS/QUOTE BREAK --- */}
      <section className="reveal-group relative w-full py-24 md:py-32 px-4 bg-primary border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="clip-mask mb-2">
              <span className="slide-up-text block text-5xl md:text-6xl font-karlen text-white" style={{ transitionDelay: '0s' }}>40<span className="text-secondary">+</span></span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50" style={{ transitionDelay: '0.1s' }}>Completed Projects</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="clip-mask mb-2">
              <span className="slide-up-text block text-5xl md:text-6xl font-karlen text-white" style={{ transitionDelay: '0.2s' }}>100<span className="text-secondary">%</span></span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50" style={{ transitionDelay: '0.3s' }}>Turnkey Handover</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
            <div className="clip-mask mb-2">
              <span className="slide-up-text block text-5xl md:text-6xl font-karlen text-white" style={{ transitionDelay: '0.4s' }}>ROI</span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50" style={{ transitionDelay: '0.5s' }}>Design-Driven Value</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. COMPACT NEXT SERVICE CTA --- */}
      <section className="reveal-group relative w-full py-24 px-4 text-center bg-primary flex flex-col items-center">
        <div className="clip-mask mb-6">
          <span className="slide-up-text block text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40" style={{ transitionDelay: '0s' }}>
            Next Service
          </span>
        </div>
        
        {/* Changed to React Router Link */}
        <Link to={`/services/${data.nextServiceSlug}`} className="group flex items-center gap-6 slide-up-fade" style={{ transitionDelay: '0.2s' }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-karlen text-white/50 group-hover:text-white transition-colors duration-700 ease-buttery">
            {data.nextServiceName.split(' ')[0]} <span className="text-sand italic font-light opacity-50 group-hover:opacity-100 transition-opacity">{data.nextServiceName.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:border-secondary group-hover:text-primary group-hover:bg-secondary transition-all duration-500">
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7-7m7-7H3" />
            </svg>
          </div>
        </Link>
      </section>

    </main>
  );
};

export default ServiceDetail;