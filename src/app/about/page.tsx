
"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-about', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out'
      });
      
      gsap.from('.brutal-line-about', {
        scaleX: 0,
        duration: 1.5,
        ease: 'expo.inOut',
        transformOrigin: 'left'
      });
    }, containerRef);

    // window.scrollTo(0, 0);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-64 bg-[#F4F2ED] selection:bg-[#4E6E81] selection:text-white overflow-hidden">
      {/* 1. Header & Hero Composition */}
      <header className="max-w-7xl mx-auto px-6 mb-48">
        <div className="grid md:grid-cols-12 gap-12 border-b-4 border-black pb-24">
          <div className="md:col-span-8 reveal-about">
            <span className="font-ui text-[10px] uppercase tracking-[0.8em] text-[#4E6E81] font-bold block mb-6">Structural Identity</span>
            <h1 className="font-ui text-7xl md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.8] mb-12">
              Beyond the <br /> <span className="text-[#7A5C3E]">Noise</span>
            </h1>
            <p className="font-serif text-3xl md:text-5xl leading-tight italic max-w-2xl opacity-80">
              &quot;We are an architecture of inquiry, a structuralist response to the fragmentation of contemporary discourse.&quot;
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end items-end reveal-about">
            <div className="relative w-full aspect-square brutalist-border overflow-hidden grayscale group">
               <Image 
                 src="https://images.unsplash.com/photo-1550184658-ff6132a71714?q=80&w=1500&auto=format&fit=crop" 
                 alt="Greek Column Detail" 
                 fill
                 className="object-cover group-hover:scale-110 transition-transform duration-[3s]"
               />
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Editorial Philosophy */}
      <section className="max-w-7xl mx-auto px-6 mb-64 grid md:grid-cols-12 gap-24 items-start">
        <div className="md:col-span-5 reveal-about sticky top-32">
          <h3 className="font-ui text-xs uppercase tracking-[0.5em] font-bold text-[#8E8E8E] mb-8">Editorial Philosophy</h3>
          <div className="w-24 h-1 bg-black brutal-line-about mb-12"></div>
          <p className="font-ui text-4xl font-bold uppercase tracking-tighter leading-none mb-8">
            The Priority of <span className="text-[#4E6E81]">Logos</span> over Ethos.
          </p>
        </div>
        <div className="md:col-span-7 space-y-16 reveal-about">
          <div className="space-y-8">
            <h4 className="font-ui text-xl uppercase font-bold tracking-widest border-b border-black/10 pb-4">01. Intellectual Rigor</h4>
            <p className="font-serif text-2xl leading-relaxed opacity-70">
              We reject the immediate, the shallow, and the reactive. Every piece hosted on Philoshopid must demonstrate a rigorous internal logic. We value the trajectory of an argument over the popularity of its conclusion.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="font-ui text-xl uppercase font-bold tracking-widest border-b border-black/10 pb-4">02. Structural Clarity</h4>
            <p className="font-serif text-2xl leading-relaxed opacity-70">
              Discourse should be as deliberate as architecture. We favor structuralism—the belief that meaning is derived from the relationships between concepts, rather than the concepts in isolation.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="font-ui text-xl uppercase font-bold tracking-widest border-b border-black/10 pb-4">03. Temporal Distance</h4>
            <p className="font-serif text-2xl leading-relaxed opacity-70">
              We believe in the &quot;View from Above.&quot; By situating modern dilemmas within classical frameworks, we gain the distance necessary for true clarity.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The "Not" Section - Brutalist Table */}
      <section className="bg-black text-white py-48 mb-64 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <span className="font-ui text-[20rem] font-bold uppercase tracking-tighter leading-none">Anti</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="mb-24 reveal-about">
            <span className="font-ui text-[10px] uppercase tracking-[0.6em] text-[#4E6E81] font-bold block mb-6">Structural Boundaries</span>
            <h3 className="font-ui text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">What We Are Not.</h3>
          </header>
          
          <div className="grid md:grid-cols-2 gap-px bg-white/20 border border-white/20 overflow-hidden reveal-about">
            <div className="bg-[#121212] p-16 flex flex-col gap-8">
               <span className="font-ui text-xs uppercase tracking-[0.3em] font-bold text-[#8E8E8E]">Anti-Thesis 01</span>
               <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter">Not a News Cycle</h4>
               <p className="font-serif text-xl opacity-50 leading-relaxed italic">
                 &quot;We do not report events; we investigate the underlying structures of reality that make events possible.&quot;
               </p>
            </div>
            <div className="bg-[#121212] p-16 flex flex-col gap-8">
               <span className="font-ui text-xs uppercase tracking-[0.3em] font-bold text-[#8E8E8E]">Anti-Thesis 02</span>
               <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter">Not a Platform for &apos;Opinions&apos;</h4>
               <p className="font-serif text-xl opacity-50 leading-relaxed italic">
                 &quot;Doxa (opinion) is the enemy of Episteme (knowledge). We publish inquiries, not preferences.&quot;
               </p>
            </div>
            <div className="bg-[#121212] p-16 flex flex-col gap-8">
               <span className="font-ui text-xs uppercase tracking-[0.3em] font-bold text-[#8E8E8E]">Anti-Thesis 03</span>
               <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter">Not a Social Network</h4>
               <p className="font-serif text-xl opacity-50 leading-relaxed italic">
                 &quot;Validation is secondary to verification. Silence is often more philosophical than noise.&quot;
               </p>
            </div>
            <div className="bg-[#121212] p-16 flex flex-col gap-8">
               <span className="font-ui text-xs uppercase tracking-[0.3em] font-bold text-[#8E8E8E]">Anti-Thesis 04</span>
               <h4 className="font-ui text-3xl font-bold uppercase tracking-tighter">Not &apos;Content&apos;</h4>
               <p className="font-serif text-xl opacity-50 leading-relaxed italic">
                 &quot;We produce records. Content is meant to be consumed; records are meant to be examined.&quot;
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ethics & Independence */}
      <section className="max-w-5xl mx-auto px-6 mb-64 reveal-about">
        <div className="text-center mb-24">
           <span className="font-ui text-[10px] uppercase tracking-[1em] text-[#7A5C3E] font-bold block mb-8">Independence Protocol</span>
           <h3 className="font-ui text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-12">Ethical Integrity</h3>
           <div className="w-1 h-24 bg-black mx-auto opacity-10"></div>
        </div>
        
        <div className="space-y-12 font-serif text-2xl md:text-3xl leading-relaxed text-black/80">
          <p>
            Philoshopid is a <span className="text-black font-bold">non-commercial collective</span>. We serve no advertisers, no corporate sponsors, and no algorithmic masters. Our existence is funded entirely by the structuralist community and private endowment.
          </p>
          <p>
            The anonymity of our competition submissions ensures that the <span className="italic">Logos</span> remains the only criterion for success. We do not care for credentials, only for the architecture of the thought presented.
          </p>
        </div>
      </section>

      {/* 5. Contact / Inquiries */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white brutalist-border p-12 md:p-32 flex flex-col md:flex-row gap-24 items-center reveal-about shadow-[30px_30px_0px_0px_rgba(78,110,129,0.1)]">
           <div className="flex-1">
              <h3 className="font-ui text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-12">Submit <br /> Correspondence</h3>
              <p className="font-serif text-2xl italic opacity-60 leading-relaxed">
                For institutional partnerships, archival requests, or ethical inquiries.
              </p>
           </div>

           <div className="flex-1 w-full space-y-12" id="signal">
              <div className="group">
                <span className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E] group-hover:text-black transition-colors block mb-4">Signal Terminal</span>
                <p className="font-ui text-2xl md:text-4xl font-bold uppercase tracking-tighter border-b-2 border-black/10 group-hover:border-black transition-all pb-4">LOGOS@PHILOSHOPID.ORG</p>
              </div>
              <div className="group">
                <span className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E] group-hover:text-black transition-colors block mb-4">Physical Archive</span>
                <p className="font-ui text-xl md:text-2xl font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all">ATHENS / BERLIN / DIGITAL VOID</p>
              </div>
           </div>
        </div>
      </section>

      <footer className="mt-64 pt-24 border-t-2 border-black reveal-about flex flex-col md:flex-row justify-between gap-8 font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] max-w-7xl mx-auto px-6">
         <span>Version Protocol 4.4.1</span>
         <span>Rational Clarity as Primary Standard</span>
      </footer>
    </div>
  );
}
