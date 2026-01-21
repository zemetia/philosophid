
"use client";
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation: Deliberate and smooth
      gsap.from('.reveal-element', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from('.sculpture-figure', {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 2,
        ease: 'expo.out',
      });

      // Parallax Effects
      gsap.to('.parallax-sculpture', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 150,
        scale: 1.05,
      });

      gsap.to('.parallax-text', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
        y: -100,
      });

      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 50,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex bg-[#F4F2ED] text-black font-ui"
    >
      {/* 1. Background Grid & Architecture */}
      <div className="absolute inset-0 grid-pattern opacity-40 parallax-bg z-0"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/5 z-0"></div>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/5 z-0"></div>

      {/* 2. Side Boundary: Simplified Column */}
      <aside className="absolute left-0 top-0 h-full w-24 border-r-2 border-black bg-[#F4F2ED] flex flex-col justify-between items-center py-12 z-30">
        <span className="vertical-text font-bold uppercase tracking-[0.4em] text-[10px] rotate-180 opacity-40">Dialectics of Form</span>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 border border-black rotate-45"></div>
          <Image src="/logo.png" alt="Phi Icon" width={20} height={20} className="object-contain relative z-10" />
        </div>
        <span className="vertical-text font-bold uppercase tracking-[0.4em] text-[10px] opacity-40">Philoshopid</span>
      </aside>

      {/* 3. Main Composition */}
      <div className="relative flex-1 ml-24 h-full flex flex-col justify-between p-12">
        
        {/* Header Metadata */}
        <div className="flex justify-between items-start">
          <div className="reveal-element">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.5em] mb-2 opacity-50">Inquiry Series</h2>
            <div className="w-12 h-[2px] bg-black"></div>
          </div>
          <div className="reveal-element text-right max-w-xs">
            <p className="text-[11px] uppercase leading-relaxed font-bold tracking-tight">
              &quot;The unexamined life is not worth living.&quot; — <span className="italic">Socrates</span>
            </p>
          </div>
        </div>

        {/* Primary Typography Layer (Behind and Overlapping) */}
        <div className="relative z-20 flex flex-col">
          <h1 className="parallax-text text-huge font-bold uppercase tracking-tighter text-black flex flex-col pointer-events-none">
            <span className="reveal-element">Thinking</span>
            <span className="reveal-element -mt-[0.2em] outline-text opacity-80">Logos</span>
          </h1>
        </div>

        {/* Footer Composition */}
        <div className="grid grid-cols-12 gap-8 items-end reveal-element">
          <div className="col-span-6 border-l-2 border-black pl-8">
            <p className="font-serif text-lg leading-snug italic max-w-sm opacity-70">
              A synthesis of structural brutalism and the profound stillness of classical thought.
            </p>
          </div>
          <div className="col-span-6 flex justify-end gap-12">
            <div className="text-right">
              <span className="block text-[9px] uppercase font-bold opacity-30 mb-1">Vol. IV / MMXXIV</span>
              <button className="group relative px-6 py-3 border-2 border-black overflow-hidden bg-transparent transition-colors duration-500 hover:text-white">
                <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-500 group-hover:translate-y-0 -z-10"></div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Enter Archive</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The Focal Visual: Central Socrates Statue (Simplified Masking) */}
      <div 
        ref={sculptureRef}
        className="parallax-sculpture absolute top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-[55vw] h-[85vh] z-10 pointer-events-none flex items-center justify-center"
      >
        <div className="sculpture-figure relative w-full h-full sculpture-mask">
          {/* Using a high-quality Greek Philosopher sculpture image that mimics the "Thinker" pose */}
          <Image 
            src="https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?q=80&w=2000&auto=format&fit=crop" 
            alt="Socrates Thinker Sculpture" 
            fill
            className="object-contain grayscale contrast-[1.1] brightness-[1.05]"
            priority
          />
          
          {/* Subtle Geometric Framing */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-black/10 -z-10 animate-[spin_20s_linear_infinite]"></div>
        </div>

        {/* Floating Abstract Greek Detail */}
        <div className="absolute bottom-[20%] right-[15%] reveal-element">
            <div className="bg-black text-white px-6 py-4 brutalist-border">
                <span className="text-[10px] uppercase font-bold tracking-[0.4em]">The Ethics of Form</span>
            </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px black;
          color: transparent;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .reveal-element {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};
