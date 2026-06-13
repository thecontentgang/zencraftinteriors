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

  // Separate the latest post for the featured hero section
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

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
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-x-hidden selection:bg-sand selection:text-primary z-10 pt-24 pb-32">
      
      {/* --- INLINE ANIMATIONS --- */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
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

      {/* --- AMBIENT GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full px-4 sm:px-6 lg:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal-on-scroll">
          <div>
           
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-karlen text-white leading-[0.9] tracking-tight">
              The <span className="text-sand italic font-light">Journal.</span>
            </h1>
          </div>
          <p className="text-sm text-white/50 max-w-xs font-light leading-relaxed mb-2">
            Exploring the intersection of materiality, light, and modern architectural philosophy.
          </p>
        </div>

        
        <a 
          href={`/blogs/${featuredPost.id}`} 
          className="group block relative w-full h-[60vh] md:h-[75vh] rounded-[2rem] overflow-hidden mb-8 md:mb-12 reveal-on-scroll shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-buttery"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="bg-secondary text-primary text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                {featuredPost.category}
              </span>
              <span className="text-xs font-light text-white/70">
                {featuredPost.date}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-karlen text-white leading-[1.1] max-w-4xl group-hover:text-sand transition-colors duration-500">
              {featuredPost.title}
            </h2>
          </div>
        </a>

        {/* --- ASYMMETRICAL GRID FOR REMAINING POSTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          {gridPosts.map((post, index) => {
            // Create a staggered masonry feel using col-span
            const isWide = index === 0 || index === 3; 
            const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <a
                key={post.id}
                href={`/blogs/${post.id}`}
                className={`group flex flex-col reveal-on-scroll ${colSpanClass}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-buttery"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow pr-4">
                  <span className="text-xs font-light text-white/40 mb-3">
                    {post.date}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-karlen text-white/90 group-hover:text-white leading-tight mb-4 transition-colors duration-500">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-2 flex items-center gap-3 text-secondary text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-buttery">
                    <span className="w-6 h-px bg-secondary" />
                    Read Article
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        
        <div className="mt-24 flex justify-center reveal-on-scroll">
          <button className="group flex items-center gap-6 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white hover:text-secondary transition-colors duration-500 ease-buttery px-8 py-4 rounded-full border border-white/20 hover:border-secondary/50">
            Load More Entries
          </button>
        </div>

      </div>
    </main>
  );
};

export default BlogsPage;