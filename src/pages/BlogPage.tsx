'use client';

import React, { useEffect } from 'react';

const BlogsPage: React.FC = () => {
  const posts = [
    {
      id: '01',
      category: 'Philosophy',
      date: 'June 10, 2026',
      title: 'The Psychology of Silence in Modern Architecture',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '02',
      category: 'Materiality',
      date: 'May 24, 2026',
      title: 'Sourcing Sustainable Marble in the Heart of Carrara',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '03',
      category: 'Architecture',
      date: 'May 12, 2026',
      title: 'Why the Open Plan is Evolving into Segmented Sanctuaries',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '04',
      category: 'Lighting',
      date: 'April 28, 2026',
      title: 'Lighting as a Material: Designing with Shadows',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3b5?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '05',
      category: 'Trends',
      date: 'April 15, 2026',
      title: 'The Soft Brutalism Revival in High-End Residential',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '06',
      category: 'Curation',
      date: 'March 02, 2026',
      title: 'Curating Artifacts: The Final Layer of a Home’s Soul',
      image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop',
    }
  ];

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  // Advanced intersection observer mapping
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
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-group');
    revealElements.forEach((el) => observer.observe(el));

    // Force hero entry properties
    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-light-alt font-body text-text-primary overflow-x-hidden selection:bg-primary selection:text-white z-10 pt-24 pb-32">
      
      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
      <style>{`
        /* Boundary clipping wrapper */
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em;
        }

        /* Fluid upward transition for typographical elements */
        .slide-up-text {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .is-revealed .slide-up-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* Basic drift mapping profiles for secondary nodes */
        .slide-up-fade {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out;
        }
        .is-revealed .slide-up-fade {
          transform: translateY(0);
          opacity: 1;
        }

        /* Image mask bounding profiles */
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

      {/* --- AMBIENT GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 hero-reveal">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-karlen text-text-primary leading-[0.9] tracking-tight">
              <div className="clip-mask">
                <span className="slide-up-text block">The</span>
              </div>
              <div className="clip-mask">
                <span className="slide-up-text text-text-secondary italic font-light block">Journal.</span>
              </div>
            </h1>
          </div>
          <div className="clip-mask mb-2">
            <p className="slide-up-text text-sm text-text-secondary max-w-xs font-light leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              Exploring the intersection of materiality, light, and modern architectural philosophy.
            </p>
          </div>
        </div>

        {/* --- REVEAL TARGETED HERO ARTICLE --- */}
        <a 
          href={`/blogs/${featuredPost.id}`} 
          className="reveal-group group block relative w-full h-[60vh] md:h-[75vh] rounded-[2rem] overflow-hidden mb-8 md:mb-12 shadow-2xl"
        >
          {/* Background Image Anchor */}
          <div className="image-wrapper absolute inset-0 w-full h-full" style={{ transitionDelay: '0s' }}>
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="image-inner w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-buttery"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          </div>

          {/* Content Overlay Panel */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end z-10">
            <div className="slide-up-fade flex items-center gap-4 mb-4 md:mb-6" style={{ transitionDelay: '0.1s' }}>
              <span className="bg-gold text-dark text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                {featuredPost.category}
              </span>
              <span className="text-xs font-light text-text-light/80">
                {featuredPost.date}
              </span>
            </div>
            <div className="clip-mask">
              <h2 className="slide-up-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen text-text-light leading-[1.1] max-w-4xl group-hover:text-gold transition-colors duration-500" style={{ transitionDelay: '0.2s' }}>
                {featuredPost.title}
              </h2>
            </div>
          </div>
        </a>

        {/* --- ASYMMETRICAL GRID FOR REMAINING POSTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          {gridPosts.map((post, index) => {
            const isWide = index === 0 || index === 3; 
            const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <a
                key={post.id}
                href={`/blogs/${post.id}`}
                className={`reveal-group group flex flex-col ${colSpanClass}`}
              >
                <div className="image-wrapper relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6" style={{ transitionDelay: '0s' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="image-inner absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-buttery"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  <div className="absolute top-4 left-4 z-10 slide-up-fade" style={{ transitionDelay: '0.2s' }}>
                    <span className="bg-surface/80 backdrop-blur-md text-text-primary text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-gold/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow pr-4">
                  <div className="clip-mask mb-3">
                    <span className="slide-up-text block text-xs font-light text-text-secondary" style={{ transitionDelay: '0.1s' }}>
                      {post.date}
                    </span>
                  </div>
                  <div className="clip-mask mb-4">
                    <h3 className="slide-up-text text-2xl md:text-3xl font-karlen text-text-primary/90 group-hover:text-gold leading-tight transition-colors duration-500" style={{ transitionDelay: '0.2s' }}>
                      {post.title}
                    </h3>
                  </div>
                  
                  <div className="mt-auto pt-2 flex items-center gap-3 text-gold text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-buttery slide-up-fade" style={{ transitionDelay: '0.3s' }}>
                    <span className="w-6 h-px bg-gold" />
                    Read Article
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* --- LOAD MORE ENTRY PORTAL --- */}
        <div className="reveal-group mt-24 flex justify-center">
          <button className="slide-up-fade group flex items-center gap-6 text-[10px] md:text-xs font-bold tracking-widest uppercase text-text-primary hover:text-dark hover:bg-gold transition-all duration-500 ease-buttery px-8 py-4 rounded-full border border-gold/40 hover:border-gold" style={{ transitionDelay: '0s' }}>
            Load More Entries
          </button>
        </div>

      </div>
    </main>
  );
};

export default BlogsPage;