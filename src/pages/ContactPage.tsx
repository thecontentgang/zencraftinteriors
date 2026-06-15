'use client';

import React, { useState, useEffect } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Residential Design',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Advanced Observer tracking our layout reveals
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

    // Instantly trigger header arrival profiles
    setTimeout(() => {
      document.querySelector('.hero-reveal')?.classList.add('is-revealed');
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert("Thank you for your inquiry. Our team will contact you within 24 hours.");
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', inquiryType: 'Residential Design', message: '' });
    }, 1500);
  };

  return (
    <main className="relative min-h-screen w-full bg-primary font-body text-surface overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 selection:bg-sand selection:text-primary">
      
      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
      <style>{`
        /* Boundary clipping wrapper */
        .clip-mask {
          overflow: hidden;
          padding-bottom: 0.15em;
        }

        /* Fluid upward shift for typography layers */
        .slide-up-text {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
        .is-revealed .slide-up-text {
          transform: translateY(0);
          opacity: 1;
        }

        /* Structural translation mapping for panels & cards */
        .slide-up-fade {
          transform: translateY(40px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out;
        }
        .is-revealed .slide-up-fade {
          transform: translateY(0);
          opacity: 1;
        }

        /* Image mask scaling profiles */
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

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-128 bg-secondary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-start mb-16 md:mb-24 hero-reveal">
          <div className="clip-mask mb-6">
            <div className="flex items-center gap-4 slide-up-text" style={{ transitionDelay: '0s' }}>
              <span className="w-8 md:w-12 h-px bg-secondary" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-secondary">
                Get in Touch
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-karlen text-white leading-[1.05] tracking-tight max-w-4xl">
            <div className="clip-mask">
              <span className="slide-up-text block" style={{ transitionDelay: '0.1s' }}>
                Let's bring your
              </span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text text-sand italic font-light block" style={{ transitionDelay: '0.2s' }}>
                vision to life.
              </span>
            </div>
          </h1>
        </div>

        {/* --- MAIN SPLIT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* --- LEFT COLUMN: INFO & IMAGE --- */}
          <div className="reveal-group lg:col-span-5 flex flex-col h-full">
            
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10 mb-12">
              
              {/* Studio Address */}
              <div className="slide-up-fade" style={{ transitionDelay: '0s' }}>
                <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
                  The Studio
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                  124 Luxury Avenue, Suite 400<br />
                  Jubilee Hills, Hyderabad<br />
                  Telangana 500033, India
                </p>
                <a href="#map" className="inline-block mt-3 text-xs font-semibold tracking-widest uppercase text-secondary hover:text-white transition-colors">
                  View Map →
                </a>
              </div>

              {/* Direct Lines */}
              <div className="slide-up-fade" style={{ transitionDelay: '0.1s' }}>
                <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Direct Lines
                </h3>
                <div className="flex flex-col gap-2 text-sm md:text-base text-white/80 font-light">
                  <a href="mailto:hello@zencraft.com" className="hover:text-secondary transition-colors">
                    hello@zencraft.com
                  </a>
                  <a href="tel:+919876543210" className="hover:text-secondary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

            </div>

            {/* Editorial Image */}
            <div 
              className="image-wrapper relative w-full flex-grow min-h-[300px] lg:min-h-[400px] rounded-4xl overflow-hidden shadow-2xl mt-auto hidden sm:block"
              style={{ transitionDelay: '0.2s' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop" 
                alt="Zencraft Studio Materials" 
                className="image-inner w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-[transform,filter] duration-700"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(27,27,29,0.5)] pointer-events-none" />
            </div>

          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="reveal-group lg:col-span-7">
            <div className="slide-up-fade w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-6 sm:p-10 md:p-12 shadow-2xl transition-all duration-700 ease-buttery hover:border-white/20" style={{ transitionDelay: '0.1s' }}>
              
              <div className="mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-karlen text-white mb-2">Send an Inquiry</h2>
                <p className="text-xs md:text-sm text-white/60 font-light">
                  Fill out the form below and our lead designer will be in touch shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                
                {/* 2-Column Row: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" name="name" id="name"
                      value={formData.name} onChange={handleInputChange} required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-sm md:text-base text-white placeholder-transparent focus:outline-none focus:border-secondary transition-colors peer"
                      placeholder="Name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-secondary peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-secondary cursor-text">
                      Full Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input 
                      type="email" name="email" id="email"
                      value={formData.email} onChange={handleInputChange} required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-sm md:text-base text-white placeholder-transparent focus:outline-none focus:border-secondary transition-colors peer"
                      placeholder="Email"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-secondary peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-secondary cursor-text">
                      Email Address
                    </label>
                  </div>
                </div>

                {/* 2-Column Row: Phone & Inquiry Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {/* Phone Input */}
                  <div className="relative group">
                    <input 
                      type="tel" name="phone" id="phone"
                      value={formData.phone} onChange={handleInputChange} required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-sm md:text-base text-white placeholder-transparent focus:outline-none focus:border-secondary transition-colors peer"
                      placeholder="Phone"
                    />
                    <label htmlFor="phone" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-secondary peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-secondary cursor-text">
                      Phone Number
                    </label>
                  </div>

                  {/* Custom Select / Inquiry Type */}
                  <div className="relative group">
                    <select
                      name="inquiryType" id="inquiryType"
                      value={formData.inquiryType} onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-sm md:text-base text-white focus:outline-none focus:border-secondary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Residential Design" className="bg-primary text-white">Residential Design</option>
                      <option value="Commercial Design" className="bg-primary text-white">Commercial Design</option>
                      <option value="Bespoke Furniture" className="bg-primary text-white">Bespoke Furniture</option>
                      <option value="General Inquiry" className="bg-primary text-white">General Inquiry</option>
                    </select>
                    <label htmlFor="inquiryType" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-secondary transition-all">
                      Subject
                    </label>
                    <svg className="absolute right-0 top-1 w-4 h-4 text-white/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                  <textarea 
                    name="message" id="message" rows={4}
                    value={formData.message} onChange={handleInputChange} required
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-sm md:text-base text-white placeholder-transparent focus:outline-none focus:border-secondary transition-colors peer resize-none"
                    placeholder="Message"
                  />
                  <label htmlFor="message" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-secondary peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-secondary cursor-text">
                    Project Details
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-secondary text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 ease-buttery"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;