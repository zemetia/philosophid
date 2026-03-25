"use client";

import React, { useEffect, useRef } from "react";
import { FileText, BookOpen, Scroll } from "lucide-react";
import gsap from "gsap";
import { PublicationType } from "../../lib/publication-templates";

interface PublicationTypeSelectorProps {
  onSelect: (type: PublicationType) => void;
}

const PublicationTypeSelector: React.FC<PublicationTypeSelectorProps> = ({ onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        containerRef.current.querySelector(".selector-header"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out" }
      );

      tl.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "back.out(1.4)" 
        },
        "-=0.6"
      );
    }
  }, []);

  const types = [
    {
      id: "article" as PublicationType,
      title: "Article",
      description: "Ideal for news, opinions, or educational content. Structure your thoughts clearly.",
      icon: <FileText className="w-8 h-8 md:w-10 md:h-10 text-stone-800" />,
      color: "from-stone-50 to-stone-100",
      vibrant: "bg-blue-500",
    },
    {
      id: "short-story" as PublicationType,
      title: "Short Story",
      description: "Perfect for fiction pieces or brief narratives. Focus on scene and character.",
      icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-stone-800" />,
      color: "from-stone-50 to-stone-100",
      vibrant: "bg-orange-500",
    },
    {
      id: "long-essay" as PublicationType,
      title: "Long Essay",
      description: "Designed for academic or in-depth research papers. Formal and structured.",
      icon: <Scroll className="w-8 h-8 md:w-10 md:h-10 text-stone-800" />,
      color: "from-stone-50 to-stone-100",
      vibrant: "bg-emerald-500",
    },
  ];

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 py-12 md:py-24">
      <div className="selector-header text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-serif text-black/90 mb-6 font-medium tracking-tight">
          What are you <span className="italic">crafting</span> today?
        </h1>
        <p className="text-lg md:text-xl font-ui text-black/50 tracking-wide uppercase text-[12px]">
          Select a template to begin your journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {types.map((type, index) => (
          <div
            key={type.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            onClick={() => onSelect(type.id)}
            className={`group relative cursor-pointer overflow-hidden p-8 md:p-10 rounded-[2rem] bg-stone-50 border border-stone-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center`}
          >
            {/* Dynamic Hover Background */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            
            {/* Background Vibrancy Blob */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-all duration-700 ${type.vibrant}`} />

            <div className="mb-8 p-6 rounded-full bg-white shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500 border border-stone-100">
              {type.icon}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif text-black/90 mb-4 group-hover:tracking-wider transition-all duration-500">
              {type.title}
            </h2>
            
            <p className="text-sm md:text-base font-serif text-black/50 leading-relaxed max-w-[200px]">
              {type.description}
            </p>
            
            <div className="mt-8 flex items-center justify-center space-x-2 text-[10px] md:text-xs font-ui tracking-widest uppercase font-bold text-black/40 group-hover:text-black transition-colors duration-500">
              <span>Start Writing</span>
              <div className="w-4 h-[1px] bg-black/20 group-hover:w-8 group-hover:bg-black transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationTypeSelector;
