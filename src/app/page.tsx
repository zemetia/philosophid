
"use client";
import React from 'react';
import { HeroSection } from '../components/organisms/HeroSection';
import { ArticleCard } from '../components/organisms/ArticleCard';
import { CompetitionTimeline } from '../components/organisms/CompetitionTimeline';
import { MOCK_POSTS, CURRENT_COMPETITION } from '../lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Manifesto / Introduction */}
      <section className="bg-white border-y-2 border-black py-24 relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-6 text-center reveal-item">
            <span className="font-ui text-[10px] uppercase tracking-[0.8em] text-[#8E8E8E] block mb-12">The Philoshopid Manifesto</span>
            <p className="font-serif text-3xl md:text-5xl leading-tight tracking-tight text-[#121212] font-light">
              &quot;We seek the <span className="text-[#4E6E81] font-bold italic">immutable logic</span> within the chaos of the digital manifold, where reason serves as the only architect of lasting form.&quot;
            </p>
            <div className="w-1 h-24 bg-black mx-auto mt-16 opacity-10"></div>
         </div>
      </section>

      <section id="competitions-teaser" className="bg-[#121212] text-white py-32 md:py-48 overflow-hidden relative border-t-8 border-[#4E6E81]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <div>
            <span className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#4E6E81] mb-8 block font-bold">Inquiry Call / Open</span>
            <h2 className="font-ui text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12 leading-[0.85]">
              {CURRENT_COMPETITION.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            <div className="space-y-8 opacity-70 text-lg md:text-xl font-serif max-w-md leading-relaxed">
              <p>{CURRENT_COMPETITION.description}</p>
              <div className="flex flex-col gap-3 font-ui text-xs uppercase tracking-widest pt-8 border-t border-white/10">
                <p><span className="text-[#8E8E8E]">Reward:</span> {CURRENT_COMPETITION.prize}</p>
                <p><span className="text-[#8E8E8E]">Closing:</span> {CURRENT_COMPETITION.deadline}</p>
              </div>
            </div>
            <Link 
              href="/competitions"
              className="mt-16 inline-block px-12 py-5 border border-white/20 hover:bg-white hover:text-black transition-all font-ui text-xs uppercase tracking-[0.3em] font-bold"
            >
              View Full Call
            </Link>
          </div>
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden grayscale contrast-125 border border-white/10 group">
             <Image 
               src="https://images.unsplash.com/photo-1594142404563-64cccaf5a10f?q=80&w=2070&auto=format&fit=crop&grayscale=1" 
               alt="Classical Head" 
               fill
               className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      <main id="essays" className="max-w-7xl mx-auto px-6 py-24 md:py-48">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-2 border-black pb-8">
          <div>
            <span className="font-ui text-[10px] uppercase tracking-[0.4em] text-[#8E8E8E] block mb-4">The Written Word</span>
            <h2 className="font-ui text-4xl md:text-6xl uppercase font-bold tracking-tighter leading-none">Selected Inquiries</h2>
          </div>
          <Link 
            href="/archive"
            className="font-ui text-[10px] text-[#4E6E81] uppercase tracking-widest mt-4 md:mt-0 italic font-bold hover:underline"
          >
            Browse Full Archive →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
          {MOCK_POSTS.slice(0, 3).map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      
      <CompetitionTimeline />
    </>
  );
}
