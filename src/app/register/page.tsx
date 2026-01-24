
"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wizard-step-reveal', {
        opacity: 0,
        x: 20,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      // Complete
      router.push('/');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const InputField = ({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) => (
    <div className="space-y-4 group">
      <label className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E] group-focus-within:text-black transition-colors">
        {label}
      </label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-2 font-ui text-sm uppercase tracking-widest transition-all placeholder:opacity-10"
      />
    </div>
  );

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#F4F2ED] flex flex-col overflow-hidden pt-16">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-pattern opacity-40 z-0"></div>
      
      {/* Progress Architecture */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-black/5 mt-16">
        <div 
          className="h-full bg-[#4E6E81] transition-all duration-700 ease-in-out" 
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-4xl w-full">
          
          <header className="mb-16 flex justify-between items-end border-b-2 border-black pb-8">
            <div className="wizard-step-reveal">
              <span className="font-ui text-[10px] uppercase tracking-[0.8em] text-[#4E6E81] font-bold block mb-4">Constitutional Registry</span>
              <h2 className="font-ui text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                Step <span className="outline-text">0{step}</span>
              </h2>
            </div>
            <div className="text-right font-ui text-[9px] uppercase tracking-widest text-[#8E8E8E] mb-2">
               Phase {step} of {totalSteps}
            </div>
          </header>

          <div className="bg-white brutalist-border shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] p-12 md:p-20 wizard-step-reveal">
            
            {step === 1 && (
              <div className="space-y-12">
                <div className="mb-12">
                  <h3 className="font-ui text-2xl uppercase font-bold tracking-widest mb-4">Personal Archetype</h3>
                  <p className="font-serif italic text-lg opacity-60">Define the physical vessel of your dialectic presence.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <InputField label="Full Appellation" placeholder="NAME / IDENTITY" />
                  <InputField label="Cycles Lived (Age)" placeholder="SOLAR CYCLES" type="number" />
                  <InputField label="Temporal Origin (Birthday)" placeholder="YYYY / MM / DD" type="date" />
                  <InputField label="Geopolitical Locus" placeholder="NATIONALITY" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <div className="mb-12">
                  <h3 className="font-ui text-2xl uppercase font-bold tracking-widest mb-4">Academic Standpoint</h3>
                  <p className="font-serif italic text-lg opacity-60">Situate your thought within the institutional manifold.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <InputField label="Parent Institution" placeholder="ACADEMY / UNIVERSITY" />
                  <InputField label="Primary Discipline" placeholder="MAJOR FIELD" />
                  <InputField label="Focus Domain" placeholder="INTERESTING FIELD" />
                  <InputField label="Favored Logos (Philosopher)" placeholder="ARCHETYPE MENTOR" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12">
                <div className="mb-12">
                  <h3 className="font-ui text-2xl uppercase font-bold tracking-widest mb-4">The Connected Mind</h3>
                  <p className="font-serif italic text-lg opacity-60">Map your digital synapses across the manifold.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <InputField label="Vocal Signal (Phone)" placeholder="+00 000 0000" type="tel" />
                  <InputField label="Instagram Node" placeholder="@IDENTITY" />
                  <InputField label="Facebook Alias" placeholder="PROFILE LINK" />
                  <InputField label="LinkedIn Professional" placeholder="CAREER TRACE" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-12">
                <div className="mb-12">
                  <h3 className="font-ui text-2xl uppercase font-bold tracking-widest mb-4">Final Affirmation</h3>
                  <p className="font-serif italic text-lg opacity-60">Commit your data to the immutable archive of Reason.</p>
                </div>
                <div className="space-y-8">
                  <InputField label="Written Code Preference" placeholder="ENGLISH / GREEK / LATIN" />
                  <InputField label="Primary School of Thought" placeholder="EXISTENTIALISM / STOICISM / etc" />
                  
                  <div className="flex items-start gap-4 p-6 bg-black/5 border-l-4 border-[#4E6E81]">
                    <input type="checkbox" className="mt-1 w-4 h-4 accent-[#4E6E81]" id="terms" />
                    <label htmlFor="terms" className="font-ui text-[10px] uppercase tracking-widest leading-relaxed text-[#8E8E8E] cursor-pointer">
                      I acknowledge that my inquiries will be subjected to the <span className="text-black font-bold">Logos Protocol</span> and that structural integrity is my primary responsibility within this collective.
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-20 flex justify-between items-center border-t border-black/10 pt-12">
              <button 
                onClick={handleBack}
                disabled={step === 1}
                className={`font-ui text-[10px] uppercase tracking-[0.5em] font-bold py-4 px-8 border-2 border-black hover:bg-black hover:text-white transition-all ${step === 1 ? 'opacity-20 cursor-not-allowed' : ''}`}
              >
                Retrace
              </button>
              
              <button 
                onClick={handleNext}
                className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold py-4 px-12 bg-black text-white hover:bg-[#4E6E81] transition-all brutalist-border"
              >
                {step === totalSteps ? 'Finalize Record' : 'Advance Phase'}
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
