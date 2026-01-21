
"use client";
import React, { useEffect, useRef } from 'react';
import { DETAILED_HALL_OF_FAME, JURY_NOTES } from '@/lib/constants';
import gsap from 'gsap';
import Image from 'next/image';

export default function HallOfFamePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.from('.brutal-line', {
        scaleX: 0,
        duration: 1.5,
        ease: 'expo.inOut',
        transformOrigin: 'left'
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-16 pb-64 bg-[#F4F2ED] relative overflow-hidden selection:bg-[#7A5C3E] selection:text-white">
      {/* 1. New Design Hero Section */}
      <header className="relative min-h-screen flex border-b-2 border-black/10">
        {/* Vertical Sidebar Title */}
        <aside className="w-32 md:w-48 border-r border-black/5 flex items-center justify-center bg-[#F4F2ED] z-20">
          <h1 className="vertical-text font-ui font-bold text-6xl md:text-8xl uppercase tracking-tighter leading-none select-none reveal-item">
            <span className="outline-text opacity-40">Hall of</span>
            <span className="mt-4">Fame</span>
          </h1>
        </aside>

        {/* Main Hero Content */}
        <div className="flex-1 relative flex flex-col justify-between p-8 md:p-20">
          {/* Grid Overlay */}
          <div className="absolute inset-0 grid-pattern opacity-40 -z-10"></div>

          {/* Top: Selection Criteria Label */}
          <div className="reveal-item">
            <div className="inline-block border border-[#7A5C3E] px-6 py-2 bg-transparent mb-16 shadow-[4px_4px_0px_0px_rgba(122,92,62,0.1)]">
              <span className="font-ui text-[10px] uppercase tracking-[0.4em] text-[#7A5C3E] font-bold">Selection Criteria</span>
            </div>
          </div>

          {/* Middle: The Main Quote */}
          <div className="max-w-5xl reveal-item">
            <p className="font-ui text-4xl md:text-7xl font-bold italic tracking-tighter leading-[1.1] text-black/90 mb-24">
              ”Distinction is not granted by beauty, but by the relentless pursuit of structural truth.”
            </p>
          </div>

          {/* Bottom: Three Column Detail Grid */}
          <div className="grid md:grid-cols-3 gap-16 md:gap-24 items-start reveal-item pt-12 border-t border-black/5">
            <div className="space-y-6">
              <h4 className="font-ui text-[10px] uppercase tracking-[0.4em] font-bold text-[#8E8E8E]">01. Intellectual Rigor</h4>
              <p className="font-ui text-sm leading-relaxed text-black/60 font-medium">
                The laureate must demonstrate a profound understanding of the philosophical underpinnings of their medium, moving beyond mere visual aesthetics into the realm of pure reason.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-ui text-[10px] uppercase tracking-[0.4em] font-bold text-[#8E8E8E]">02. Formal Sovereignty</h4>
              <p className="font-ui text-sm leading-relaxed text-black/60 font-medium">
                A commitment to unyielding grids, raw materiality, and the rejection of decorative softness in favor of brutalist integrity.
              </p>
            </div>
            <div className="space-y-6 flex flex-col items-start md:items-end md:text-right">
              <h4 className="font-ui text-[10px] uppercase tracking-[0.4em] font-bold text-black">Annual Induction</h4>
              <p className="font-ui text-[10px] uppercase tracking-widest leading-relaxed text-[#8E8E8E] max-w-[240px]">
                Each year, Philoshopid recognizes individuals who have significantly shifted the paradigm of design thinking through architectural discipline.
              </p>
            </div>
          </div>

          {/* Absolute Bottom Ribbon */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-transparent flex justify-between items-center px-8 md:px-20 border-t border-black/5 font-ui text-[9px] uppercase tracking-[0.5em] text-[#8E8E8E] reveal-item">
            <div>The Archive / Laureates</div>
            <div className="flex gap-8">
              <span>Filter: All Years</span>
              <span className="opacity-30">/</span>
              <span>Sort: Chronological</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32">
        {/* Highlight Section */}
        <section className="mb-48">
          <div className="flex items-center gap-6 mb-16 reveal-item">
            <span className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] font-bold whitespace-nowrap">Featured Case Study</span>
            <div className="w-full h-[1px] bg-black/10"></div>
          </div>
          
          {DETAILED_HALL_OF_FAME.filter(e => e.highlightEntry).map((entry) => (
            <div key={entry.id} className="grid md:grid-cols-12 gap-16 mb-48 border-b border-black/5 pb-32 reveal-item">
              <div className="md:col-span-5 relative group">
                <div className="aspect-[4/5] bg-black/5 overflow-hidden grayscale relative brutalist-border">
                   <Image 
                     src={`https://picsum.photos/seed/${entry.id}/800/1000?grayscale`} 
                     alt={entry.name}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 font-ui text-xs font-bold tracking-widest z-10">
                     DISTINCTION: {entry.points}
                   </div>
                   <div className="absolute bottom-4 left-4 font-ui text-[8px] uppercase tracking-[0.5em] text-white bg-black/40 backdrop-blur-sm p-2 z-10">
                     Case #{entry.id.split('-')[1]}
                   </div>
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 border border-black/10 -z-10 group-hover:rotate-45 transition-transform duration-700"></div>
              </div>
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="mb-10">
                  <span className="font-ui text-[12px] text-[#7A5C3E] uppercase tracking-widest font-bold mb-4 block">
                    {entry.award} • {entry.year}
                  </span>
                  <h2 className="font-ui text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-none">{entry.name}</h2>
                </div>
                
                <div className="space-y-12">
                  <div className="border-t border-black pt-8">
                    <h4 className="font-ui text-[10px] uppercase tracking-widest font-bold mb-4 text-[#8E8E8E]">The Primary Thesis</h4>
                    <p className="font-ui text-3xl font-light leading-tight tracking-tight">{entry.highlightEntry?.title}</p>
                  </div>
                  <p className="font-serif text-xl opacity-70 leading-relaxed max-w-xl">
                    {entry.highlightEntry?.excerpt}
                  </p>
                  <div className="bg-white brutalist-border p-10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 font-ui text-[8px] uppercase tracking-widest opacity-20 rotate-90 origin-top-right">Confidential</div>
                     <h4 className="font-ui text-[10px] uppercase tracking-widest font-bold mb-6 flex items-center gap-4">
                       <span className="w-8 h-[2px] bg-[#7A5C3E]"></span>
                       Editorial Synthesis
                     </h4>
                     <p className="font-serif italic text-xl leading-relaxed">&quot;{entry.highlightEntry?.editorialNote}&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Index Grid */}
        <section className="mb-48">
          <div className="flex justify-between items-end mb-16 border-b-2 border-black pb-6">
             <h3 className="font-ui text-xs uppercase tracking-[0.5em] font-bold">Structural Ledger</h3>
             <span className="font-ui text-[10px] text-[#8E8E8E] uppercase tracking-widest hidden md:block">Records Sorted chronologically / by Merit</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black border border-black overflow-hidden">
            {DETAILED_HALL_OF_FAME.map(entry => (
              <div key={entry.id} className="bg-[#F4F2ED] p-12 group hover:bg-black hover:text-white transition-colors duration-500 reveal-item cursor-crosshair">
                <div className="flex justify-between items-start mb-16">
                   <div className="flex flex-col gap-1">
                     <span className="font-ui text-xs uppercase tracking-widest font-bold">{entry.year}</span>
                     <span className="font-ui text-[9px] uppercase tracking-widest opacity-40">{entry.month || 'Annual'}</span>
                   </div>
                   <span className="font-ui text-[9px] uppercase tracking-widest border border-current px-3 py-1 font-bold group-hover:bg-[#7A5C3E] group-hover:border-[#7A5C3E] transition-colors">{entry.category}</span>
                </div>
                <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter mb-4 leading-[0.9]">{entry.name}</h4>
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] opacity-60 mb-12">{entry.award}</p>
                <div className="w-full h-[1px] bg-current opacity-10 mb-8"></div>
                <div className="flex justify-between items-center font-ui font-bold">
                  <span className="text-[9px] uppercase tracking-[0.4em]">Index: #{entry.id.split('-')[1]}</span>
                  <span className="text-2xl tracking-tighter">+{entry.points}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curator Insights */}
        <section className="grid md:grid-cols-12 gap-24 py-48 border-t border-black">
          <div className="md:col-span-4 sticky top-32 h-fit">
             <h3 className="font-ui text-xs uppercase tracking-[0.5em] font-bold mb-8">Curatorial Oversight</h3>
             <div className="w-16 h-[4px] bg-black mb-8"></div>
             <p className="font-ui text-[10px] text-[#8E8E8E] uppercase leading-relaxed tracking-widest">
               Commentary from the presiding jury on the selection architecture for the current epoch.
             </p>
          </div>
          <div className="md:col-span-8 space-y-32">
            {JURY_NOTES.map((note, i) => (
              <div key={i} className="reveal-item">
                <p className="font-serif text-3xl md:text-4xl leading-snug text-black opacity-90 mb-8 italic relative">
                  <span className="absolute -left-12 top-0 text-6xl font-ui opacity-10 text-[#7A5C3E]">“</span>
                  {note.note}
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-10 h-[1px] bg-black"></div>
                  <p className="font-ui text-[11px] uppercase tracking-[0.4em] font-bold">{note.curator}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <footer className="mt-32 pt-48 border-t-8 border-black text-center reveal-item">
           <h4 className="font-ui text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-16">The Deep Archive</h4>
           <button className="group relative px-16 py-6 border-2 border-black overflow-hidden bg-transparent transition-colors duration-500 hover:text-white mb-24">
             <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-500 group-hover:translate-y-0 -z-10"></div>
             <span className="font-ui text-xs uppercase font-bold tracking-[0.5em]">Request Historical Access</span>
           </button>
        </footer>
      </div>
      
      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px black;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
