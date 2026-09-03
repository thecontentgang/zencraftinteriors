'use client';

import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const projectDetailsData = {
  'sumith': {
    title: 'Sumith',
    heroImage: '/src/assets/sumith-AZ/sumith-img-1.webp',
    gallery: [
      '/src/assets/sumith-AZ/sumith-img-2.webp',
      '/src/assets/sumith-AZ/sumith-img-3.webp',
      '/src/assets/sumith-AZ/sumith-img-4.webp',
      '/src/assets/sumith-AZ/sumith-img-5.webp',
      '/src/assets/sumith-AZ/sumith-img-6.webp',
      '/src/assets/sumith-AZ/sumith-img-7.webp',
      '/src/assets/sumith-AZ/sumith-img-8.webp',
      '/src/assets/sumith-AZ/sumith-img-9.webp',
      '/src/assets/sumith-AZ/sumith-img-10.webp',
      '/src/assets/sumith-AZ/sumith-img-11.webp',
      '/src/assets/sumith-AZ/sumith-img-12.webp',
      '/src/assets/sumith-AZ/sumith-img-13.webp',
      '/src/assets/sumith-AZ/sumith-img-14.webp',
      '/src/assets/sumith-AZ/sumith-img-15.webp',
      '/src/assets/sumith-AZ/sumith-img-16.webp',
      '/src/assets/sumith-AZ/sumith-img-17.webp'
    ],
     nextProjectSlug: 'prudhvi-bollineni-bion',
    nextProjectName: 'Bollineni Bion'
  },
 
  'prudhvi-bollineni-bion': {
    title: 'Prudhvi Bollineni Bion',
    heroImage: '/src/assets/prudhvi-bion/prudhvi-img-1.webp',
    gallery: [
      '/src/assets/prudhvi-bion/prudhvi-img-2.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-3.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-4.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-5.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-6.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-7.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-8.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-9.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-10.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-11.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-12.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-13.webp',
      '/src/assets/prudhvi-bion/prudhvi-img-14.webp'
    ],
    nextProjectSlug: 'praveen',
    nextProjectName: 'Praveen'
  },
  'praveen': {
    title: 'Praveen',
    heroImage: '/src/assets/praveen-VRE/praveen-img-1.webp',
    gallery: [
      '/src/assets/praveen-VRE/praveen-img-2.webp',
      '/src/assets/praveen-VRE/praveen-img-3.webp',
      '/src/assets/praveen-VRE/praveen-img-4.webp',
      '/src/assets/praveen-VRE/praveen-img-5.webp',
      '/src/assets/praveen-VRE/praveen-img-6.webp',
      '/src/assets/praveen-VRE/praveen-img-7.webp',
      '/src/assets/praveen-VRE/praveen-img-8.webp',
      '/src/assets/praveen-VRE/praveen-img-9.webp',
      '/src/assets/praveen-VRE/praveen-img-10.webp',
      '/src/assets/praveen-VRE/praveen-img-11.webp',
      '/src/assets/praveen-VRE/praveen-img-12.webp',
      '/src/assets/praveen-VRE/praveen-img-13.webp',
      '/src/assets/praveen-VRE/praveen-img-14.webp'
    ],
    nextProjectSlug: 'dharmateja',
    nextProjectName: 'Dharmateja'
  },
  'dharmateja': {
    title: 'Dharmateja',
    heroImage: '/src/assets/dharmateja/dharmateja-img-1.webp',
    gallery: [
      '/src/assets/dharmateja/dharmateja-img-2.webp',
      '/src/assets/dharmateja/dharmateja-img-3.webp',
      '/src/assets/dharmateja/dharmateja-img-4.webp',
      '/src/assets/dharmateja/dharmateja-img-5.webp',
      '/src/assets/dharmateja/dharmateja-img-6.webp',
      '/src/assets/dharmateja/dharmateja-img-7.webp',
      '/src/assets/dharmateja/dharmateja-img-8.webp',
      '/src/assets/dharmateja/dharmateja-img-9.webp',
      '/src/assets/dharmateja/dharmateja-img-10.webp'
    ],
    nextProjectSlug: 'bharani',
    nextProjectName: 'Bharani'
  },
  'bharani': {
    title: 'Bharani',
    heroImage: '/src/assets/bharani/bharani-img-1.webp',
    gallery: [
      '/src/assets/bharani/bharani-img-2.webp',
      '/src/assets/bharani/bharani-img-3.webp',
      '/src/assets/bharani/bharani-img-4.webp',
      '/src/assets/bharani/bharani-img-5.webp',
      '/src/assets/bharani/bharani-img-6.webp',
      '/src/assets/bharani/bharani-img-7.webp',
      '/src/assets/bharani/bharani-img-8.webp',
      '/src/assets/bharani/bharani-img-9.webp'
    ],
    nextProjectSlug: 'ramakrishna',
    nextProjectName: 'Ramakrishna'
  },
  'ramakrishna': {
    title: 'Ramakrishna',
    heroImage: '/src/assets/ramakrishna/ramakrishna-img-1.webp',
    gallery: [
      '/src/assets/ramakrishna/ramakrishna-img-2.webp',
      '/src/assets/ramakrishna/ramakrishna-img-3.webp',
      '/src/assets/ramakrishna/ramakrishna-img-4.webp',
      '/src/assets/ramakrishna/ramakrishna-img-5.webp',
      '/src/assets/ramakrishna/ramakrishna-img-6.webp',
      '/src/assets/ramakrishna/ramakrishna-img-7.webp',
      '/src/assets/ramakrishna/ramakrishna-img-8.webp',
      '/src/assets/ramakrishna/ramakrishna-img-9.webp',
      '/src/assets/ramakrishna/ramakrishna-img-10.webp',
      '/src/assets/ramakrishna/ramakrishna-img-11.webp',
      '/src/assets/ramakrishna/ramakrishna-img-12.webp'
    ],
    nextProjectSlug: 'sumith',
    nextProjectName: 'Sumith'
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectDetailsData[id as keyof typeof projectDetailsData] : null;

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Initial Render & Scroll Reveal Observer
  useEffect(() => {
    if (!project) return;
    window.scrollTo(0, 0); 

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
  }, [id, project]);

  // 2. Handle Body Scroll Locking safely through an effect
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // 3. Handle Keyboard Navigation completely self-contained
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen || !project) return;
      
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
      
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
      }
      
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project]);

  // 4. Click Handlers
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project) {
      setCurrentIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project) {
      setCurrentIndex((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="relative min-h-screen w-full bg-[var(--color-primary)] font-body text-white overflow-x-hidden selection:bg-[var(--color-secondary)] selection:text-[var(--color-primary)] z-10">
      
      <style>{`
        .reveal-on-scroll { opacity: 0; transform: translateY(60px); transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-revealed { opacity: 1; transform: translateY(0); }
        @keyframes image-scale { 0% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .animate-hero-scale { animation: image-scale 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .ease-buttery { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        
        /* Lightbox Fade In */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        
        /* Lightbox Image Scale In */
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-up { animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* --- HERO IMAGE --- */}
      <section className="relative w-full h-[85vh] lg:h-screen overflow-hidden">
        <img 
          src={project.heroImage} 
          alt={project.title} 
          className="w-full h-full object-cover animate-hero-scale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/10 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-12 pb-16 md:pb-24 z-10">
          <div className="max-w-[90rem] mx-auto reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-karlen text-white leading-[0.95] tracking-tight mb-2 drop-shadow-lg">
              {project.title.split(' ')[0]} <br className="hidden md:block" />
              <span className="text-[var(--color-secondary)] italic font-light">{project.title.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC 2x2 GRID GALLERY --- */}
      <section className="relative w-full px-4 sm:px-6 lg:px-12 py-16 md:py-32 bg-[var(--color-primary)]">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {project.gallery.map((imgSrc, index) => (
              <div 
                key={index} 
                onClick={() => openLightbox(index)}
                className="group relative w-full rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] reveal-on-scroll cursor-pointer"
              >
                <img 
                  src={imgSrc} 
                  alt={`${project.title} Detail ${index + 1}`} 
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000 ease-buttery" 
                />
                {/* Hover overlay with a view icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 ease-buttery">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- NEXT PROJECT CTA --- */}
      <section className="relative w-full py-24 md:py-32 px-4 text-center bg-[var(--color-primary)] flex flex-col items-center border-t border-white/5 reveal-on-scroll">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-6">
          Next Project
        </span>
        
        <Link to={`/projects/${project.nextProjectSlug}`} className="group">
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-karlen text-white/50 group-hover:text-white transition-colors duration-700 ease-buttery leading-none">
            {project.nextProjectName.split(' ')[0]} <span className="text-white/30 group-hover:text-[var(--color-secondary)] italic font-light transition-colors duration-700 ease-buttery">{project.nextProjectName.split(' ').slice(1).join(' ')}</span>
          </h2>
        </Link>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>

          {/* Left Navigation Arrow */}
          <button 
            onClick={handlePrevClick}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={handleNextClick}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>

          {/* Active Image */}
          <div className="relative w-full max-w-[90vw] h-full max-h-[85vh] flex items-center justify-center px-12 animate-scale-up">
            <img 
              key={currentIndex} 
              src={project.gallery[currentIndex]} 
              alt={`${project.title} Lightbox View`} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
          
          {/* Counter at the bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono tracking-widest">
            {currentIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}

    </main>
  );
};

export default ProjectDetail;