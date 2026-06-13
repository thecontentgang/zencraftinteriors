'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useModal } from './ModalContext'; // Adjust path as needed

export default function ConsultationModal() {
  const { isModalOpen, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectCategory: 'Residential',
    propertyType: '3 BHK',
    agreed: false
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSelectionChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    setIsSubmitting(true);
    const emailData = {
      name: formData.name,
      phone: `+91 ${formData.phone}`,
      project_category: formData.projectCategory,
      property_type: formData.projectCategory === 'Residential' ? formData.propertyType : 'N/A (Commercial)'
    };

    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_PUBLIC_KEY');
      alert('Consultation request sent successfully!');
      closeModal();
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-primary border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold z-10"
            >
              CLOSE ✕
            </button>

            {/* --- FORM START --- */}
            <form onSubmit={handleSubmit} className="w-full space-y-4 text-left mt-4">
              <div className="mb-2">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                  Free Consultation
                </span>
                <h3 className="text-2xl sm:text-3xl font-karlen text-white mt-1 mb-1">
                  Transform Your Space
                </h3>
                <p className="text-white/60 font-sans tracking-wide text-xs">
                  Fill in the details — we'll respond within 24 hrs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-[9px] font-bold tracking-widest uppercase text-secondary mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Full Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all font-sans text-xs sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[9px] font-bold tracking-widest uppercase text-secondary mb-1">Phone</label>
                  <div className="flex bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-secondary focus-within:bg-white/10 transition-all">
                    <div className="px-3 py-2 bg-white/5 border-r border-white/10 flex items-center justify-center">
                      <span className="text-secondary font-semibold text-xs sm:text-sm">+91</span>
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="9876543210" pattern="[0-9]{10}" required className="flex-1 bg-transparent px-3 py-2 text-white placeholder-white/30 focus:outline-none font-sans text-xs sm:text-sm tracking-wide" />
                  </div>
                </div>
              </div>

              <div>
                <span className="block text-[9px] font-bold tracking-widest uppercase text-secondary mb-1.5">Project Type</span>
                <div className="flex flex-wrap gap-2">
                  {['Residential', 'Commercial'].map((category) => (
                    <button key={category} type="button" onClick={() => handleSelectionChange('projectCategory', category)} className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium tracking-wide transition-all duration-300 border ${formData.projectCategory === category ? 'bg-secondary border-secondary text-(--color-primary) shadow-[0_0_10px_rgba(220,200,163,0.3)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'}`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${formData.projectCategory === 'Residential' ? 'max-h-25 opacity-100 mt-2' : 'max-h-0 opacity-0 m-0'}`}>
                <span className="block text-[9px] font-bold tracking-widest uppercase text-secondary mb-1.5">Property Type</span>
                <div className="flex flex-wrap gap-2">
                  {['1 BHK', '2 BHK', '3 BHK', 'Villa'].map((type) => (
                    <button key={type} type="button" onClick={() => handleSelectionChange('propertyType', type)} className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium tracking-wide transition-all duration-300 border ${formData.propertyType === type ? 'bg-secondary border-secondary text-(--color-primary) shadow-[0_0_10px_rgba(220,200,163,0.3)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleInputChange} required className="peer appearance-none w-4 h-4 rounded-[3px] border border-white/30 bg-white/5 checked:bg-secondary checked:border-secondary transition-all cursor-pointer" />
                    <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity text-(--color-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-[10px] sm:text-xs leading-tight select-none group-hover:text-white/80 transition-colors">
                    I agree to the <a href="#terms" className="text-secondary hover:underline font-semibold">Terms & Conditions</a> and consent to being contacted.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="w-full bg-secondary border border-secondary py-2.5 text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-(--color-primary) hover:bg-transparent hover:text-secondary transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-[0_0_15px_rgba(220,200,163,0.2)] active:scale-[0.98]">
                  {isSubmitting ? 'Processing...' : 'Request Consultation'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}