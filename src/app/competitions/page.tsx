
"use client";
import React, { useEffect, useRef } from 'react';
import { COMPETITION_TYPES, CURRENT_COMPETITION } from '@/lib/constants';
import gsap from 'gsap';

export default function CompetitionsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out'
      });
    }, containerRef);
    
    // window.scrollTo(0, 0); // Next.js handles scroll, but useEffect runs after mount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-64 bg-[#F4F2ED] selection:bg-[#4E6E81] selection:text-white overflow-hidden">
      {/* 1. Header & Brief */}
      <header className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-12 gap-12 border-b-4 border-black pb-24">
          <div className="md:col-span-8 reveal-item">
            <span className="font-ui text-[10px] uppercase tracking-[0.6em] text-[#4E6E81] font-bold block mb-6">Open Inquiry</span>
            <h1 className="font-ui text-7xl md:text-[9rem] font-bold uppercase tracking-tighter leading-[0.8] mb-12">
              Arena of <br /> <span className="text-[#7A5C3E]">Logos</span>
            </h1>
            <p className="font-serif text-3xl md:text-4xl leading-snug italic max-w-2xl opacity-80">
              &quot;{CURRENT_COMPETITION.description}&quot;
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end items-end reveal-item">
            <div className="text-right space-y-4">
              <div className="brutalist-border p-6 bg-black text-white inline-block">
                <span className="font-ui text-xs uppercase tracking-widest block font-bold">Reward</span>
                <span className="font-ui text-3xl font-bold uppercase tracking-tight">{CURRENT_COMPETITION.prize}</span>
              </div>
              <div className="font-ui text-[10px] uppercase tracking-widest text-[#8E8E8E]">
                Deadline: <span className="text-black font-bold">{CURRENT_COMPETITION.deadline}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Brutalist Timeline of Competition Types */}
      <section className="mb-48 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] mb-16 font-bold">Chronology of Inquiry</h3>
          
          <div className="relative border-l-4 border-black ml-4 md:ml-0 md:border-l-0">
             {/* Horizontal line for desktop */}
             <div className="hidden md:block absolute top-0 left-0 w-full h-1 bg-black"></div>

             <div className="grid md:grid-cols-3 gap-12 md:gap-0">
               {COMPETITION_TYPES.map((type, idx) => (
                 <div key={type.id} className="reveal-item relative pt-12 md:px-8 group">
                   {/* Node marker */}
                   <div className="absolute top-0 left-[-10px] md:left-8 w-4 h-4 bg-black rounded-full md:top-[-6px]"></div>
                   
                   <div className="p-8 brutalist-border bg-white group-hover:bg-[#121212] group-hover:text-white transition-all duration-500 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] group-hover:shadow-[10px_10px_0px_0px_#4E6E81]">
                     <span className="font-ui text-xs uppercase tracking-widest font-bold text-[#4E6E81] block mb-4">{type.frequency}</span>
                     <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter mb-4">{type.title}</h4>
                     <p className="font-serif text-lg opacity-70 leading-relaxed mb-6">{type.description}</p>
                     <div className="font-ui text-[9px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 group-hover:text-[#4E6E81] transition-opacity">
                        Framework: {type.id}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Detailed */}
      <section className="bg-[#121212] text-white py-32 mb-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-baseline border-b border-white/10 pb-8 mb-24">
             <h3 className="font-ui text-4xl md:text-6xl font-bold uppercase tracking-tighter">Contribution Tiers</h3>
             <span className="font-ui text-[10px] uppercase tracking-[0.4em] text-[#8E8E8E]">Categorical Distinctions</span>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="reveal-item">
              <div className="font-ui text-huge opacity-10 leading-none mb-[-0.4em]">01</div>
              <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter mb-6">Long Essay</h4>
              <p className="font-serif text-lg opacity-60 leading-relaxed">
                Extensive dialectic research focusing on original advancement of philosophical thought. Requires formal citation and deep structural integrity.
              </p>
            </div>
            <div className="reveal-item">
              <div className="font-ui text-huge opacity-10 leading-none mb-[-0.4em]">02</div>
              <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter mb-6">Article</h4>
              <p className="font-serif text-lg opacity-60 leading-relaxed">
                Focused reflections on specific contemporary issues through a classical lens. Clarity and immediate relevance are prioritized.
              </p>
            </div>
            <div className="reveal-item">
              <div className="font-ui text-huge opacity-10 leading-none mb-[-0.4em]">03</div>
              <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter mb-6">Short Story</h4>
              <p className="font-serif text-lg opacity-60 leading-relaxed">
                Narrative-driven experiments using allegory and fiction to explore complex metaphysical or ethical frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rules & Constraints */}
      <section className="max-w-7xl mx-auto px-6 mb-48">
        <div className="grid md:grid-cols-2 gap-24">
          <div className="reveal-item">
            <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] mb-12 font-bold">Technical Constraints</h3>
            <ul className="space-y-8 font-ui text-xl md:text-2xl font-bold uppercase tracking-tighter">
              <li className="flex gap-6 items-baseline border-b border-black/10 pb-4">
                <span className="text-[#4E6E81]">01</span>
                <span>Anonymized Manuscripts ONLY</span>
              </li>
              <li className="flex gap-6 items-baseline border-b border-black/10 pb-4">
                <span className="text-[#4E6E81]">02</span>
                <span>Original Dialectic Advancement</span>
              </li>
              <li className="flex gap-6 items-baseline border-b border-black/10 pb-4">
                <span className="text-[#4E6E81]">03</span>
                <span>Maximum 1 Submission per Cycle</span>
              </li>
              <li className="flex gap-6 items-baseline border-b border-black/10 pb-4">
                <span className="text-[#4E6E81]">04</span>
                <span>Logos Standard Citation Formats</span>
              </li>
            </ul>
          </div>
          <div className="reveal-item">
            <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] mb-12 font-bold">Judging Criteria</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 border-l-4 border-[#7A5C3E] bg-white">
                <h5 className="font-ui text-sm uppercase font-bold mb-2">Rational Clarity</h5>
                <p className="font-serif text-sm opacity-70 italic">Is the internal logic sound?</p>
              </div>
              <div className="p-6 border-l-4 border-[#7A5C3E] bg-white">
                <h5 className="font-ui text-sm uppercase font-bold mb-2">Semantic Depth</h5>
                <p className="font-serif text-sm opacity-70 italic">Beyond the superficial word.</p>
              </div>
              <div className="p-6 border-l-4 border-[#7A5C3E] bg-white">
                <h5 className="font-ui text-sm uppercase font-bold mb-2">Syntactic Rigor</h5>
                <p className="font-serif text-sm opacity-70 italic">The architecture of sentences.</p>
              </div>
              <div className="p-6 border-l-4 border-[#7A5C3E] bg-white">
                <h5 className="font-ui text-sm uppercase font-bold mb-2">Dialectic Tension</h5>
                <p className="font-serif text-sm opacity-70 italic">The resolution of contradiction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Submission Process */}
      <section className="max-w-4xl mx-auto px-6 text-center reveal-item">
        <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] mb-16 font-bold">Submission Protocol</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <div className="w-16 h-16 brutalist-border bg-white flex items-center justify-center font-ui text-2xl font-bold mx-auto mb-6">1</div>
            <p className="font-ui text-xs uppercase tracking-widest font-bold">Digital Encrypt</p>
          </div>
          <div className="hidden md:block w-12 h-[2px] bg-black/10"></div>
          <div className="flex-1">
            <div className="w-16 h-16 brutalist-border bg-white flex items-center justify-center font-ui text-2xl font-bold mx-auto mb-6">2</div>
            <p className="font-ui text-xs uppercase tracking-widest font-bold">Protocol Dispatch</p>
          </div>
          <div className="hidden md:block w-12 h-[2px] bg-black/10"></div>
          <div className="flex-1">
            <div className="w-16 h-16 brutalist-border bg-white flex items-center justify-center font-ui text-2xl font-bold mx-auto mb-6">3</div>
            <p className="font-ui text-xs uppercase tracking-widest font-bold">Jury Verification</p>
          </div>
        </div>

        <button className="mt-32 px-16 py-8 bg-black text-white font-ui text-xs uppercase tracking-[0.5em] font-bold hover:bg-[#4E6E81] transition-all brutalist-border">
          Initiate Submission
        </button>
        <p className="mt-8 font-ui text-[9px] uppercase tracking-widest text-[#8E8E8E]">
           Current System Load: 44% / Ready for Dispatch
        </p>
      </section>
    </div>
  );
}
