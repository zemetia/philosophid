"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 30, filter: "blur(10px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, x: -30, filter: "blur(10px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } }
};

const InputField = ({ 
  label, 
  placeholder, 
  field,
  formData,
  handleInputChange,
  type = "text",
  options = []
}: { 
  label: string, 
  placeholder: string, 
  field: string,
  formData: any,
  handleInputChange: (field: string, value: string) => void,
  type?: string,
  options?: string[]
}) => {
  const isFocusedOrFilled = formData[field] !== '';
  
  return (
    <div className="relative w-full group">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-ui uppercase tracking-[0.2em] font-bold ${
          isFocusedOrFilled ? '-top-6 text-[10px] text-black/60' : 'top-4 text-xs text-black/40'
        }`}
      >
        {label}
      </label>
      
      {type === 'select' ? (
        <select
          id={field}
          name={field}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-4 font-ui text-sm uppercase tracking-widest transition-colors cursor-pointer appearance-none"
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          id={field}
          name={field}
          type={type} 
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-4 font-ui text-sm uppercase tracking-widest transition-colors placeholder:text-transparent focus:placeholder:text-black/20"
        />
      )}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 ease-out group-focus-within:w-full"></div>
    </div>
  );
};

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    location: '',
    institution: '',
    major: '',
    interests: '',
    favoritePhilosopher: '',
    phone: '',
    instagram: '',
    facebook: '',
    linkedIn: '',
    preferredLanguage: 'English',
    philosophySchool: '',
  });

  const [agreed, setAgreed] = useState(false);
  const totalSteps = 4;
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      if (!agreed) {
        alert("Please agree to the Terms of Service.");
        return;
      }
      await handleFinalize();
    }
  };

  const handleFinalize = async () => {
    setLoading(true);
    try {
      // Clean up empty fields so they don't override Firebase data with blanks
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v && v.toString().trim() !== '')
      );

      const payload = {
        ...cleanedData
      };
      
      const response = await fetch('/api/auth/sync', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const err = await response.json();
        alert(err.error || "Failed to save profile. Please try again.");
      }
    } catch (error) {
      console.error("Finalize error:", error);
      alert("An unexpected error occurred during registration. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };



  return (
    <section className="relative w-full min-h-screen bg-[#F4F2ED] flex flex-col pt-24 pb-12 overflow-hidden selection:bg-[#4E6E81] selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#E5E1D8] to-transparent opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4E6E81] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 zoom-in animate-pulse-slow"></div>
      
      {/* Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-black/5">
        <motion.div 
          className="h-full bg-black" 
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.8, ease: "anticipate" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 w-full max-w-5xl mx-auto">
        <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Left Column: Context */}
          <div className="w-full md:w-5/12 flex flex-col pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-ui text-[10px] uppercase tracking-[0.4em] text-black/50 font-bold mb-6 block">
                Onboarding &bull; Phase 0{step}
              </span>
              <h1 className="font-serif italic text-4xl lg:text-5xl leading-tight text-[#2A2A2A] mb-8">
                {step === 1 && "Start by sharing who you are."}
                {step === 2 && "What fuels your intellect?"}
                {step === 3 && "Where can the world find you?"}
                {step === 4 && "Final touches for your persona."}
              </h1>
              <p className="font-ui text-sm leading-relaxed text-black/60 max-w-sm hidden md:block">
                We collect this to tailor your dashboard experience and accurately portray your philosophical identity within the collective.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive Wizard */}
          <div className="w-full md:w-7/12 mt-8 md:mt-0">
            <div className="bg-white p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
              {/* Subtle dynamic border */}
              <div className="absolute inset-0 border-[0.5px] border-black/10 transition-colors group-hover:border-black/20 pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="min-h-[420px]"
                >
                  {step === 1 && (
                    <div className="space-y-12 pt-4">
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Preferred Moniker (Full Name)" placeholder="YOUR NAME" field="name" />
                      <div className="grid grid-cols-1 gap-8">
                        <InputField formData={formData} handleInputChange={handleInputChange} label="Birthday" placeholder="YYYY-MM-DD" type="date" field="birthday" />
                      </div>
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Location (City, Country)" placeholder="CITY / COUNTRY" field="location" />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-12 pt-4">
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Institution / Alma Mater" placeholder="UNIVERSITY OR SCHOOL" field="institution" />
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Major / Focus Area" placeholder="E.G. PHILOSOPHY, LITERATURE" field="major" />
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Primary Interests" placeholder="TOPICS YOU DEEPLY CARE ABOUT" field="interests" />
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Favorite Philosopher" placeholder="NAME OF YOUR INTELLECTUAL HERO" field="favoritePhilosopher" />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-12 pt-4">
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Phone Number" placeholder="+62 000 0000" type="tel" field="phone" />
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Instagram Handle" placeholder="@YOURNAME" field="instagram" />
                      <InputField formData={formData} handleInputChange={handleInputChange} label="Facebook Profile" placeholder="URL OR USERNAME" field="facebook" />
                      <InputField formData={formData} handleInputChange={handleInputChange} label="LinkedIn URL" placeholder="URL" field="linkedIn" />
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-12 pt-4">
                      <InputField 
                        formData={formData} handleInputChange={handleInputChange}
                        label="Preferred Language" 
                        placeholder="SELECT LANGUAGE" 
                        field="preferredLanguage" 
                        type="select"
                        options={['English', 'Indonesian']}
                      />
                      <InputField 
                        formData={formData} handleInputChange={handleInputChange}
                        label="Primary School of Thought" 
                        placeholder="SELECT OR TYPE OR LEAVE BLANK"
                        field="philosophySchool" 
                      />
                      
                      <div className="pt-6">
                        <label className="flex items-start gap-5 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input 
                              type="checkbox" 
                              className="peer sr-only" 
                              checked={agreed}
                              onChange={(e) => setAgreed(e.target.checked)} 
                            />
                            <div className="w-5 h-5 border-2 border-black/20 peer-checked:border-black peer-checked:bg-black transition-all flex items-center justify-center group-hover:border-black/50">
                              <CheckCircle2 className={`w-3 h-3 text-white transition-opacity ${agreed ? 'opacity-100' : 'opacity-0'}`} />
                            </div>
                          </div>
                          <span className="font-ui text-[11px] uppercase tracking-widest leading-relaxed text-black/60 group-hover:text-black/80 transition-colors mt-0.5">
                            I agree to the <b className="text-black inline-block under-dash mx-1 cursor-pointer">Terms of Service</b> and acknowledge my data logic.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="mt-16 flex justify-between items-center relative z-20">
                <button 
                  onClick={handleBack}
                  disabled={step === 1 || loading}
                  className={`flex items-center gap-2 font-ui text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                  <ArrowLeft size={14} className="mb-0.5" />
                  Return
                </button>
                
                <button 
                  onClick={handleNext}
                  disabled={loading}
                  className="group flex items-center gap-3 font-ui text-[11px] uppercase tracking-[0.2em] font-bold py-4 px-8 bg-black text-white hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin mb-0.5" /> Processing</>
                    ) : (
                      <>{step === totalSteps ? 'Complete Registration' : 'Next Phase'} <ArrowRight size={14} className="mb-0.5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </span>
                  {/* Hover visual effect */}
                  <div className="absolute inset-0 bg-[#2A2A2A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                </button>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
