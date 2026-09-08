'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useModal } from './ModalContext'; // Adjust path as needed

// Moved initialFormState OUTSIDE the component so it doesn't trigger dependency warnings
const initialFormState = {
  name: '',
  phone: '',
  projectCategory: 'Residential',
  propertyType: '3 BHK',
  agreed: false
};

export default function ConsultationModal() {
  const { isModalOpen, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState(initialFormState);

  // Lock body scroll and reset states when modal opens/closes
  useEffect(() => {
    // FIXED: Using ReturnType to automatically infer the correct timer type for your environment
    let timer: ReturnType<typeof setTimeout>;

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      
      // Reset the form and success state gracefully AFTER the exit animation finishes
      timer = setTimeout(() => {
        setSubmitStatus('idle');
        setFormData(initialFormState);
      }, 400); // 400ms matches the Framer Motion exit duration
    }

    return () => {
      document.body.style.overflow = '';
      if (timer) clearTimeout(timer);
    };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (submitStatus === 'error') setSubmitStatus('idle');
  };

  const handleSelectionChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const emailData = {
      name: formData.name,
      phone: `+91 ${formData.phone}`,
      project_category: formData.projectCategory,
      property_type: formData.projectCategory === 'Residential' ? formData.propertyType : 'N/A (Commercial)'
    };

    try {
      await emailjs.send('service_1juqg2v', 'template_5xqqq4b', emailData, 'Beq7ci5bXh5WpQMxs');
      setSubmitStatus('success');
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
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
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[95%] sm:w-full max-w-3xl bg-[#F8F5EE] border border-[#B58A3A]/20 rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-y-auto max-h-[85vh] sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle Gold Glow Background inside Modal */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[radial-gradient(ellipse_at_center,rgba(181,138,58,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

            <button
              onClick={closeModal}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 text-[#39342D]/40 hover:text-[#B58A3A] transition-colors uppercase tracking-widest text-[10px] font-bold z-20 bg-[#F8F5EE] sm:bg-transparent p-2 sm:p-0 rounded-full"
            >
              <span className="hidden sm:inline">CLOSE </span>✕
            </button>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                /* --- SUCCESS STATE --- */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-10 sm:py-16"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#B58A3A]/10 flex items-center justify-center mb-6">
                    <motion.svg 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-[#B58A3A]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B58A3A] mb-2">
                    Request Received
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-karlen text-[#39342D] mb-4">
                    Thank You, {formData.name.split(' ')[0]}
                  </h3>
                  <p className="text-[#39342D]/70 font-sans font-light tracking-wide text-xs sm:text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                    We have received your details. One of our lead designers will contact you within 24 hours to discuss your vision.
                  </p>
                  <button 
                    onClick={closeModal}
                    className="bg-[#39342D] border border-[#39342D] px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-[#F8F5EE] hover:bg-[#B58A3A] hover:border-[#B58A3A] transition-all duration-300 rounded-lg shadow-[0_10px_30px_rgba(57,52,45,0.2)] active:scale-[0.98]"
                  >
                    Return to site
                  </button>
                </motion.div>
              ) : (
                /* --- FORM STATE --- */
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="relative z-10 w-full space-y-6 sm:space-y-8 text-left mt-2 sm:mt-0"
                >
                  
                  {/* Header */}
                  <div className="mb-2 sm:mb-6 pr-6 sm:pr-0">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#B58A3A]">
                      Free Consultation
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-karlen text-[#39342D] mt-2 mb-2">
                      Transform Your Space
                    </h3>
                    <p className="text-[#39342D]/70 font-sans font-light tracking-wide text-xs sm:text-sm">
                      Fill in the details — we'll respond within 24 hrs.
                    </p>
                  </div>

                  {/* Error Banner */}
                  <AnimatePresence>
                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3"
                      >
                        <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <h4 className="text-red-800 text-xs font-bold tracking-wide uppercase mb-1">Transmission Failed</h4>
                          <p className="text-red-700/80 text-xs font-medium">There was a problem sending your request. Please check your connection and try again.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input Group: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-1.5 sm:mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Full Name"
                        required
                        className="w-full bg-[#39342D]/5 border border-[#B58A3A]/30 rounded-lg px-4 py-3 sm:py-3.5 text-[#39342D] placeholder-[#39342D]/30 focus:outline-none focus:border-[#B58A3A] focus:bg-[#39342D]/10 transition-all font-sans text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-1.5 sm:mb-2">
                        Phone
                      </label>
                      <div className="flex bg-[#39342D]/5 border border-[#B58A3A]/30 rounded-lg overflow-hidden focus-within:border-[#B58A3A] focus-within:bg-[#39342D]/10 transition-all">
                        <div className="px-3 sm:px-4 py-3 sm:py-3.5 bg-[#B58A3A]/10 border-r border-[#B58A3A]/30 flex items-center justify-center">
                          <span className="text-[#39342D] font-bold text-sm">+91</span>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="9876543210"
                          pattern="[0-9]{10}"
                          required
                          className="flex-1 bg-transparent px-4 py-3 sm:py-3.5 text-[#39342D] placeholder-[#39342D]/30 focus:outline-none font-sans text-sm tracking-wide"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <span className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-2 sm:mb-3">
                      Project Type
                    </span>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['Residential', 'Commercial'].map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleSelectionChange('projectCategory', category)}
                          className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${formData.projectCategory === category
                            ? 'bg-[#39342D] border-[#39342D] text-[#F8F5EE] shadow-[0_5px_15px_rgba(57,52,45,0.2)]'
                            : 'bg-transparent border-[#B58A3A]/30 text-[#39342D]/70 hover:border-[#39342D] hover:text-[#39342D]'
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Type (Conditional) */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${formData.projectCategory === 'Residential' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 m-0'}`}>
                    <span className="block text-[9px] font-bold tracking-widest uppercase text-[#B58A3A] mb-2 sm:mb-3">
                      Property Type
                    </span>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['1 BHK', '2 BHK', '3 BHK', 'Villa'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleSelectionChange('propertyType', type)}
                          className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${formData.propertyType === type
                            ? 'bg-[#39342D] border-[#39342D] text-[#F8F5EE] shadow-[0_5px_15px_rgba(57,52,45,0.2)]'
                            : 'bg-transparent border-[#B58A3A]/30 text-[#39342D]/70 hover:border-[#39342D] hover:text-[#39342D]'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Checkbox (Terms) */}
                  <div className="pt-2 sm:pt-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleInputChange}
                          required
                          className="peer appearance-none w-4 h-4 sm:w-5 sm:h-5 rounded sm:rounded-md border border-[#B58A3A]/60 bg-transparent checked:bg-[#39342D] checked:border-[#39342D] transition-all cursor-pointer"
                        />
                        <svg className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity text-[#F8F5EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#39342D]/70 text-[10px] sm:text-xs font-medium leading-relaxed select-none group-hover:text-[#39342D] transition-colors pr-2">
                        I agree to the <a href="#terms" className="text-[#B58A3A] hover:underline font-bold">Terms & Conditions</a> and consent to being contacted.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 sm:pt-4 pb-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-[#B58A3A] border border-[#B58A3A] py-3.5 sm:py-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.2em] text-[#F8F5EE] hover:bg-[#39342D] hover:border-[#39342D] transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(181,138,58,0.25)] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Request Consultation'
                      )}
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}