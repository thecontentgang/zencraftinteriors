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
            className="relative w-full max-w-3xl bg-[#39342D] border border-[#B58A3A]/30 rounded-[2rem] p-6 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Subtle Gold Glow Background inside Modal */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-[#E9DFCE]/50 hover:text-[#B58A3A] transition-colors uppercase tracking-widest text-[10px] font-bold z-10"
            >
              CLOSE ✕
            </button>

            {/* --- FORM START --- */}
            <form onSubmit={handleSubmit} className="relative z-10 w-full space-y-5 text-left mt-2">
              
              {/* Header */}
              <div className="mb-6">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#B58A3A]">
                  Free Consultation
                </span>
                <h3 className="text-3xl sm:text-4xl font-karlen text-[#F8F5EE] mt-2 mb-2">
                  Transform Your Space
                </h3>
                <p className="text-[#E9DFCE]/70 font-sans font-light tracking-wide text-xs sm:text-sm">
                  Fill in the details — we'll respond within 24 hrs.
                </p>
              </div>

              {/* Input Group: Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-1.5">
                    Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Your Full Name" 
                    required 
                    className="w-full bg-[#F8F5EE]/5 border border-[#B58A3A]/30 rounded-lg px-4 py-3 text-[#F8F5EE] placeholder-[#E9DFCE]/30 focus:outline-none focus:border-[#B58A3A] focus:bg-[#F8F5EE]/10 transition-all font-sans text-xs sm:text-sm" 
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-1.5">
                    Phone
                  </label>
                  <div className="flex bg-[#F8F5EE]/5 border border-[#B58A3A]/30 rounded-lg overflow-hidden focus-within:border-[#B58A3A] focus-within:bg-[#F8F5EE]/10 transition-all">
                    <div className="px-3 py-3 bg-[#F8F5EE]/10 border-r border-[#B58A3A]/30 flex items-center justify-center">
                      <span className="text-[#B58A3A] font-semibold text-xs sm:text-sm">+91</span>
                    </div>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="9876543210" 
                      pattern="[0-9]{10}" 
                      required 
                      className="flex-1 bg-transparent px-4 py-3 text-[#F8F5EE] placeholder-[#E9DFCE]/30 focus:outline-none font-sans text-xs sm:text-sm tracking-wide" 
                    />
                  </div>
                </div>
              </div>

              {/* Project Type */}
              <div>
                <span className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-2">
                  Project Type
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['Residential', 'Commercial'].map((category) => (
                    <button 
                      key={category} 
                      type="button" 
                      onClick={() => handleSelectionChange('projectCategory', category)} 
                      className={`px-4 py-2 rounded-lg text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
                        formData.projectCategory === category 
                          ? 'bg-[#B58A3A] border-[#B58A3A] text-[#F8F5EE] shadow-[0_0_15px_rgba(181,138,58,0.4)]' 
                          : 'bg-[#F8F5EE]/5 border-[#B58A3A]/30 text-[#E9DFCE]/70 hover:border-[#B58A3A]/70 hover:text-[#F8F5EE]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type (Conditional) */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${formData.projectCategory === 'Residential' ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 m-0'}`}>
                <span className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-2">
                  Property Type
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['1 BHK', '2 BHK', '3 BHK', 'Villa'].map((type) => (
                    <button 
                      key={type} 
                      type="button" 
                      onClick={() => handleSelectionChange('propertyType', type)} 
                      className={`px-4 py-2 rounded-lg text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
                        formData.propertyType === type 
                          ? 'bg-[#B58A3A] border-[#B58A3A] text-[#F8F5EE] shadow-[0_0_15px_rgba(181,138,58,0.4)]' 
                          : 'bg-[#F8F5EE]/5 border-[#B58A3A]/30 text-[#E9DFCE]/70 hover:border-[#B58A3A]/70 hover:text-[#F8F5EE]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox (Terms) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                    <input 
                      type="checkbox" 
                      name="agreed" 
                      checked={formData.agreed} 
                      onChange={handleInputChange} 
                      required 
                      className="peer appearance-none w-4 h-4 rounded-[4px] border border-[#B58A3A]/50 bg-[#F8F5EE]/5 checked:bg-[#B58A3A] checked:border-[#B58A3A] transition-all cursor-pointer" 
                    />
                    <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity text-[#39342D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#E9DFCE]/70 text-[10px] sm:text-xs font-light leading-relaxed select-none group-hover:text-[#F8F5EE] transition-colors">
                    I agree to the <a href="#terms" className="text-[#B58A3A] hover:underline font-semibold">Terms & Conditions</a> and consent to being contacted.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-[#B58A3A] border border-[#B58A3A] py-3.5 text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-[#F8F5EE] hover:bg-[#F8F5EE] hover:text-[#39342D] hover:border-[#F8F5EE] transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(181,138,58,0.3)] active:scale-[0.98]"
                >
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