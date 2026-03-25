"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePaper } from '@/hooks/usePapers';
import { MetaText, Heading } from '@/components/atoms/Typography';
import { BackButton } from '@/components/molecules/BackButton';
import { ArticleMeta } from '@/components/molecules/ArticleMeta';
import { SocialSharing } from '@/components/molecules/SocialSharing';

export default function PaperReadingPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data, isLoading, error } = usePaper(slug as string);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4F0]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#19332A] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F4F0] p-6 text-center">
        <h1 className="text-4xl font-bold uppercase mb-4">Coordinates Lost</h1>
        <p className="font-serif italic opacity-60 mb-8">This specific node in the manifold does not exist or has been archived.</p>
        <button 
          onClick={() => router.push('/papers')}
          className="px-8 py-3 bg-black text-white font-ui text-[10px] uppercase tracking-widest"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  const paper = data.data;

  return (
    <article className="relative min-h-screen bg-[#F6F4F0] text-[#19332A] pb-32">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#19332A] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Top Navigation */}
      <nav className="max-w-7xl mx-auto px-6 pt-24 mb-16 flex items-center justify-between">
        <BackButton />
        <div className="hidden md:flex items-center gap-4 opacity-40">
           <MetaText className="text-[8px]">Home</MetaText>
           <span className="text-[8px] opacity-20">/</span>
           <MetaText className="text-[8px]">Papers</MetaText>
           <span className="text-[8px] opacity-20">/</span>
           <MetaText className="text-[8px] text-black">Current Node</MetaText>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center gap-4">
            <div className="bg-[#19332A] text-white px-3 py-1">
              <MetaText className="text-[9px] tracking-[0.3em]">{paper.type.replace('_', ' ')}</MetaText>
            </div>
          </div>
          
          <Heading level={1} className="mb-8 leading-tight">
            {paper.title}
          </Heading>

          <div className="flex flex-col items-center gap-4 opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center overflow-hidden border border-black/10">
                 {paper.author.avatarUrl ? (
                   <img src={paper.author.avatarUrl} alt={paper.author.name} className="w-full h-full object-cover" />
                 ) : (
                   <span className="font-ui text-[10px] uppercase">{paper.author.name?.[0] || "A"}</span>
                 )}
              </div>
              <MetaText className="text-[10px]">{paper.author.name || "Anonymous Author"}</MetaText>
            </div>
            
            <div className="w-12 h-[1px] bg-black/20"></div>
            
            <div className="flex gap-6">
              <MetaText className="text-[8px]">{new Date(paper.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</MetaText>
              <MetaText className="text-[8px]">{paper.viewCount} Views</MetaText>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Floating Share Side */}
        <div className="hidden xl:block absolute -left-24 top-0 h-full">
           <div className="sticky top-40 flex flex-col gap-8 opacity-40 hover:opacity-100 transition-opacity">
              <SocialSharing title={paper.title} />
           </div>
        </div>

        {/* Content Body */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="reading-content font-crimson"
        >
           {/* We will render the content blocks here. For now, let's assume content is string or simplified JSON */}
           <div className="text-2xl leading-relaxed first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#19332A]">
              {/* Simplified BlockNote rendering or custom renderer needed later */}
              {typeof paper.content === 'string' ? paper.content : JSON.stringify(paper.content)}
           </div>
        </motion.section>
        
        {/* Footer of article */}
        <footer className="mt-24 pt-12 border-t border-black/5 flex flex-col items-center">
            <div className="max-w-md text-center mb-12">
               <span className="font-ui text-[8px] uppercase tracking-[0.6em] mb-4 block opacity-40">About the Witness</span>
               <h4 className="text-xl font-bold uppercase mb-4">{paper.author.name}</h4>
               <p className="font-serif italic opacity-60 text-lg leading-relaxed">
                 {paper.author.bio || "This philosopher prefers to remain in the shadows of the manifold."}
               </p>
            </div>
            
            <SocialSharing title={paper.title} />
        </footer>
      </div>


      <style jsx global>{`
        .reading-content p {
          margin-bottom: 2rem;
          font-size: 1.35rem;
          line-height: 1.9;
          color: #302C29;
        }
        .reading-content h2 {
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          color: #121212;
        }
      `}</style>
    </article>
  );
}
