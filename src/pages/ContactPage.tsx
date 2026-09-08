'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail} from 'lucide-react';

// Custom Instagram SVG Icon
const InstagramIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

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

    // Simulate API Call
    setTimeout(() => {
      alert("Thank you for your inquiry. Our team will contact you within 24 hours.");
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', inquiryType: 'Residential Design', message: '' });
    }, 1500);
  };

  return (
    <main className="relative min-h-screen w-full bg-light-alt font-body text-text-primary overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 z-10 selection:bg-primary selection:text-white">

      {/* --- BUTTERY SCROLL ANIMATION CSS --- */}
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

      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-128 bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto w-full">

        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-start mb-16 md:mb-24 hero-reveal">
          <div className="clip-mask mb-6">
            <div className="flex items-center gap-4 slide-up-text" style={{ transitionDelay: '0s' }}>
              <span className="w-8 md:w-12 h-px bg-gold" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-gold">
                Get in Touch
              </span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-karlen text-text-primary leading-[1.05] tracking-tight max-w-5xl">
            <div className="clip-mask">
              <span className="slide-up-text block" style={{ transitionDelay: '0.1s' }}>
                Let's bring your
              </span>
            </div>
            <div className="clip-mask">
              <span className="slide-up-text text-text-secondary italic font-light block" style={{ transitionDelay: '0.2s' }}>
                vision to life.
              </span>
            </div>
          </h1>
        </div>

        {/* --- MAIN SPLIT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24 md:mb-32">

          {/* --- LEFT COLUMN: INFO & IMAGE --- */}
          <div className="reveal-group lg:col-span-5 flex flex-col h-full">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10 mb-12">

              {/* Studio Address */}
              <div className="slide-up-fade flex gap-4" style={{ transitionDelay: '0s' }}>
                <MapPin className="text-gold shrink-0 w-5 h-5 mt-1" />
                <div>
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary mb-3">
                    The Studio
                  </h3>
                  <p className="text-sm md:text-base text-text-primary/80 leading-relaxed font-light">
                    3rd Floor, NBR Towers, Road No. 36,<br />
                    Jawahar Colony, Jubilee Hills,<br />
                    Hyderabad, Telangana 500033, India
                  </p>
                </div>
              </div>

              {/* Direct Lines */}
              <div className="slide-up-fade flex gap-4" style={{ transitionDelay: '0.1s' }}>
                <div className="flex flex-col gap-3">
                  <Phone className="text-gold shrink-0 w-5 h-5" />
                  <Mail className="text-gold shrink-0 w-5 h-5 mt-4" />
                </div>
                <div>
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-text-secondary mb-3">
                    Direct Lines
                  </h3>
                  <div className="flex flex-col gap-4 text-sm md:text-base text-text-primary/80 font-light">
                    <a href="tel:+919109627282" className="hover:text-gold transition-colors">
                      +91 91096 27282
                    </a>
                    <a href="mailto:hello@zencraft.com" className="hover:text-gold transition-colors">
                      enquiry@thezencraftinteriors.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours & Socials */}
              <div className="slide-up-fade flex gap-4" style={{ transitionDelay: '0.2s' }}>

                <div className="w-full">


                  {/* Social Icons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                    <a href="https://instagram.com/thezencraftinteriors" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all">
                      <InstagramIcon size={16} />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Editorial Image */}
            <div
              className="image-wrapper relative w-full flex-grow min-h-[300px] lg:min-h-[400px] rounded-[2rem] overflow-hidden shadow-2xl mt-auto hidden sm:block"
              style={{ transitionDelay: '0.3s' }}
            >
              <img
                src="/ramakrishna/ramakrishna-img-10.webp"
                alt="The Zencraft Studio"
                className="image-inner w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-[transform,filter] duration-700"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>

          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="reveal-group lg:col-span-7">
            <div className="slide-up-fade w-full bg-surface backdrop-blur-xl border border-primary/10 rounded-[2rem] p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(12,10,13,0.08)] transition-all duration-700 ease-buttery hover:border-gold/30" style={{ transitionDelay: '0.1s' }}>

              <div className="mb-10 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-karlen text-text-primary mb-3">Send an Inquiry</h2>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  Fill out the form below and our lead designer will be in touch shortly to discuss your vision.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">

                {/* 2-Column Row: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text" name="name" id="name"
                      value={formData.name} onChange={handleInputChange} required
                      className="w-full bg-transparent border-b border-primary/20 pb-3 text-base text-text-primary placeholder-transparent focus:outline-none focus:border-gold transition-colors peer"
                      placeholder="Name"
                    />
                    <label htmlFor="name" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-gold cursor-text">
                      Full Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email" name="email" id="email"
                      value={formData.email} onChange={handleInputChange} required
                      className="w-full bg-transparent border-b border-primary/20 pb-3 text-base text-text-primary placeholder-transparent focus:outline-none focus:border-gold transition-colors peer"
                      placeholder="Email"
                    />
                    <label htmlFor="email" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-gold cursor-text">
                      Email Address
                    </label>
                  </div>
                </div>

                {/* 2-Column Row: Phone & Inquiry Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Phone Input */}
                  <div className="relative group">
                    <input
                      type="tel" name="phone" id="phone"
                      value={formData.phone} onChange={handleInputChange} required
                      className="w-full bg-transparent border-b border-primary/20 pb-3 text-base text-text-primary placeholder-transparent focus:outline-none focus:border-gold transition-colors peer"
                      placeholder="Phone"
                    />
                    <label htmlFor="phone" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-gold cursor-text">
                      Phone Number
                    </label>
                  </div>

                  {/* Custom Select / Inquiry Type */}
                  <div className="relative group">
                    <select
                      name="inquiryType" id="inquiryType"
                      value={formData.inquiryType} onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-primary/20 pb-3 text-base text-text-primary focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Residential Design" className="bg-background text-text-primary">Residential Design</option>
                      <option value="Commercial Design" className="bg-background text-text-primary">Commercial Design</option>
                      <option value="Bespoke Furniture" className="bg-background text-text-primary">Bespoke Furniture</option>
                      <option value="General Inquiry" className="bg-background text-text-primary">General Inquiry</option>
                    </select>
                    <label htmlFor="inquiryType" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-primary transition-all">
                      Subject
                    </label>
                    <svg className="absolute right-0 top-1 w-4 h-4 text-text-secondary pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                  <textarea
                    name="message" id="message" rows={4}
                    value={formData.message} onChange={handleInputChange} required
                    className="w-full bg-transparent border-b border-primary/20 pb-3 text-base text-text-primary placeholder-transparent focus:outline-none focus:border-gold transition-colors peer resize-none"
                    placeholder="Message"
                  />
                  <label htmlFor="message" className="absolute left-0 -top-5 text-[10px] md:text-xs uppercase tracking-widest text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-secondary peer-placeholder-shown:top-0 transition-all peer-focus:-top-5 peer-focus:text-[10px] md:peer-focus:text-xs peer-focus:text-gold cursor-text">
                    Project Details
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-4 bg-primary text-text-light text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full hover:bg-secondary hover:text-gold hover:border-gold hover:shadow-[0_0_20px_rgba(48,37,28,0.3)] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 ease-buttery border border-transparent"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION: EMBEDDED GOOGLE MAP --- */}
        <div className="reveal-group w-full mt-10">
          <div className="image-wrapper w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border border-primary/10 shadow-2xl relative" style={{ transitionDelay: '0.2s' }}>
            <iframe
              title="The Zencraft Studio Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.611814638222!2d78.40662157684555!3d17.430407158952537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb917e96b5aacb%3A0x47e107554558a8c1!2sThe%20Zencraft%20Interiors!5e0!3m2!1sen!2sin!4v1788435247334!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0 grayscale-[80%] opacity-80 mix-blend-multiply"
            />
          </div>
        </div>

      </div>
    </main>
  );
};

export default ContactPage;