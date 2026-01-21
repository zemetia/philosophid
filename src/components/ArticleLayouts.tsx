
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Post } from '@/lib/types';
import Link from 'next/link';
import gsap from 'gsap';
import Image from 'next/image';

interface LayoutProps {
  post: Post;
}

const BackButton: React.FC = () => (
  <Link 
    href="/archive"
    className="font-ui text-[10px] uppercase tracking-[0.4em] mb-16 flex items-center gap-4 hover:translate-x-[-4px] transition-all group reveal-item"
  >
    <span className="text-xl group-hover:text-[#4E6E81]">←</span> 
    <span className="group-hover:opacity-50">Archive Index</span>
  </Link>
);

const SocialSharing: React.FC<{ title: string }> = ({ title }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(encodeURIComponent(window.location.href));
  }, []);

  const text = encodeURIComponent(`Inquiry: ${title} via Philoshopid`);

  if (!url) return null;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-12 border-y border-black/10 reveal-item my-24">
      <span className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E]">Disseminate Logos</span>
      <div className="flex gap-6">
        <a 
          href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-ui text-[10px] uppercase tracking-widest font-bold hover:text-[#4E6E81] flex items-center gap-2 group transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X / Twitter
        </a>
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-ui text-[10px] uppercase tracking-widest font-bold hover:text-[#4E6E81] flex items-center gap-2 group transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          Facebook
        </a>
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-ui text-[10px] uppercase tracking-widest font-bold hover:text-[#4E6E81] flex items-center gap-2 group transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0z"/></svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
};

const useRevealAnimation = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
};

export const LongEssayLayout: React.FC<LayoutProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimation(containerRef);

  return (
    <article ref={containerRef} className="max-w-5xl mx-auto px-6 py-32 bg-[#F4F2ED] selection:bg-[#4E6E81] selection:text-white">
      <BackButton />
      
      <header className="mb-32 border-b-2 border-black pb-16 reveal-item">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="flex-1">
            <span className="font-ui text-[10px] uppercase tracking-[0.6em] text-[#4E6E81] font-bold block mb-6">Structural Inquiry</span>
            <h1 className="font-ui text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mb-8">{post.title}</h1>
          </div>
          <div className="text-right font-ui text-[10px] uppercase tracking-[0.3em] text-[#8E8E8E] leading-relaxed">
            <p className="flex justify-between md:justify-end gap-4"><span className="text-black/30">Author:</span> {post.author}</p>
            <p className="flex justify-between md:justify-end gap-4"><span className="text-black/30">Registry:</span> {post.year}</p>
            <p className="flex justify-between md:justify-end gap-4"><span className="text-black/30">Logos Count:</span> {post.wordCount}</p>
          </div>
        </div>
      </header>

      {post.abstract && (
        <section className="mb-48 grid md:grid-cols-12 gap-12 reveal-item">
          <div className="md:col-span-3">
             <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold text-[#7A5C3E]">Abstract</h3>
             <div className="w-12 h-[2px] bg-[#7A5C3E] mt-4"></div>
          </div>
          <div className="md:col-span-9 bg-white/40 p-10 brutalist-border">
            <p className="font-serif text-2xl italic leading-relaxed opacity-80">
              {post.abstract}
            </p>
          </div>
        </section>
      )}

      <div className="space-y-48 mb-48">
        {post.sections?.map((section, idx) => {
          const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'][idx] || (idx + 1).toString();
          return (
            <section key={idx} className="grid md:grid-cols-12 gap-12 group reveal-item">
              <div className="md:col-span-3">
                 <div className="sticky top-32">
                   <h2 className="font-ui text-7xl font-bold opacity-10 group-hover:opacity-100 group-hover:text-[#4E6E81] transition-all duration-700">
                     {roman}.
                   </h2>
                 </div>
              </div>
              <div className="md:col-span-9">
                 <h3 className="font-ui text-xl uppercase font-bold mb-10 tracking-[0.2em] border-b border-black/10 pb-4 inline-block">{section.title}</h3>
                 <div className="font-serif text-xl md:text-2xl leading-[1.8] text-[#121212]">
                   {section.content}
                 </div>
              </div>
            </section>
          );
        })}
      </div>

      <SocialSharing title={post.title} />

      <footer className="pt-24 border-t-2 border-black reveal-item">
        <div className="grid md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-3">
            <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold text-[#8E8E8E]">Footnotes</h3>
          </div>
          <div className="md:col-span-9">
            <ol className="space-y-6 font-ui text-[11px] uppercase tracking-widest text-[#8E8E8E] list-decimal list-inside">
              {post.footnotes?.map((note, i) => (
                <li key={i} className="hover:text-black transition-colors pl-4 border-l border-transparent hover:border-[#4E6E81]">{note}</li>
              ))}
            </ol>
          </div>
        </div>

        {post.editorialCommentary && (
          <div className="p-12 bg-black text-white brutalist-border relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 font-ui text-[8px] uppercase tracking-[0.4em] opacity-20 rotate-90 origin-top-right group-hover:opacity-40 transition-opacity">Archive Registry #441</div>
             <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold mb-8 text-[#7A5C3E]">Editorial Commentary</h3>
             <p className="font-serif text-2xl italic leading-relaxed opacity-80 border-l-2 border-[#7A5C3E] pl-8">
               &quot;{post.editorialCommentary}&quot;
             </p>
          </div>
        )}
      </footer>
    </article>
  );
};

export const PhilosophicalArticleLayout: React.FC<LayoutProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimation(containerRef);

  return (
    <article ref={containerRef} className="max-w-4xl mx-auto px-6 py-32 selection:bg-[#7A5C3E] selection:text-white">
      <BackButton />
      
      <header className="mb-32 text-center reveal-item">
        <div className="flex flex-col items-center">
          <span className="font-ui text-[10px] uppercase tracking-[0.6em] text-[#7A5C3E] font-bold block mb-10">Rational Reflection</span>
          <h1 className="font-ui text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mb-12 max-w-3xl">{post.title}</h1>
          <div className="w-16 h-[2px] bg-black mb-12"></div>
          <div className="flex gap-8 font-ui text-[10px] uppercase tracking-[0.4em] opacity-50 font-bold">
            <span>By {post.author}</span>
            <span className="text-[#4E6E81]">MMXXIV</span>
          </div>
        </div>
      </header>

      {post.openingThesis && (
        <section className="mb-48 text-center max-w-2xl mx-auto reveal-item">
          <h3 className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold mb-8 text-[#8E8E8E]">Thesis</h3>
          <p className="font-serif text-3xl md:text-5xl italic leading-tight text-[#121212] tracking-tight">
            {post.openingThesis}
          </p>
        </section>
      )}

      <section className="mb-48 grid md:grid-cols-12 gap-16 items-start reveal-item">
        <div className="md:col-span-8">
           <h3 className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold mb-10 text-[#4E6E81]">Argumentation</h3>
           <div className="font-serif text-2xl leading-relaxed text-[#121212]">
             {post.coreArgument}
           </div>
        </div>
        
        <aside className="md:col-span-4 border-t-2 border-[#7A5C3E] pt-10 sticky top-32">
           <h4 className="font-ui text-[10px] uppercase tracking-[0.4em] font-bold mb-8">Related Inquiries</h4>
           <ul className="space-y-6 font-ui text-[11px] uppercase tracking-widest text-[#8E8E8E] leading-relaxed">
             {post.relatedInquiries?.map((item, i) => (
               <li key={i} className="hover:text-black cursor-pointer group flex items-start gap-4 transition-all">
                 <span className="text-[#4E6E81]">0{i+1}</span>
                 <span className="group-hover:underline underline-offset-8 decoration-[#7A5C3E]">{item}</span>
               </li>
             ))}
           </ul>
        </aside>
      </section>

      {post.tension && (
        <section className="mb-48 bg-white p-12 brutalist-border reveal-item relative">
           <div className="absolute top-0 right-0 p-4 font-ui text-[9px] uppercase tracking-[1em] opacity-10">Dialectic</div>
           <h3 className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold mb-10 text-[#7A5C3E]">The Counterpoint</h3>
           <p className="font-serif text-2xl md:text-3xl italic leading-relaxed opacity-80 border-l-4 border-black pl-8">
             {post.tension}
           </p>
        </section>
      )}

      <SocialSharing title={post.title} />

      {post.closingReflection && (
        <footer className="pt-24 border-t-8 border-black reveal-item">
           <div className="max-w-2xl">
             <h3 className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold mb-10 text-[#8E8E8E]">Closing Reflection</h3>
             <p className="font-serif text-4xl leading-tight italic text-[#121212] tracking-tighter">
               {post.closingReflection}
             </p>
           </div>
        </footer>
      )}
    </article>
  );
};

export const ShortStoryLayout: React.FC<LayoutProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimation(containerRef);

  return (
    <article ref={containerRef} className="max-w-3xl mx-auto px-6 py-32 selection:bg-black selection:text-white">
      <BackButton />
      
      <header className="mb-32 reveal-item">
        <div className="flex justify-between items-baseline mb-12 border-b border-black/5 pb-4">
           <span className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#7A5C3E] font-bold italic">{post.formatNote || 'Philosophical Fiction'}</span>
           <span className="font-ui text-[10px] uppercase tracking-widest opacity-40">Record {post.year}</span>
        </div>
        <h1 className="font-ui text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] mb-12">{post.title}</h1>
        <div className="flex items-center gap-6 p-6 bg-white brutalist-border inline-flex">
           <div className="w-10 h-10 flex items-center justify-center bg-[#121212]">
              <Image src="/logo.png" alt="Phi" width={24} height={24} className="object-contain invert" />
           </div>
           <div>
              <p className="font-ui text-[11px] uppercase tracking-widest font-bold">{post.author}</p>
              <p className="font-ui text-[9px] uppercase tracking-widest text-[#8E8E8E]">{post.readTime} Meditation</p>
           </div>
        </div>
      </header>

      <section className="mb-48 reveal-item">
        <div className="font-serif text-2xl md:text-4xl leading-[1.8] text-[#121212] whitespace-pre-wrap first-letter:text-9xl first-letter:font-bold first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-4 first-letter:text-[#4E6E81]">
          {post.storyBody}
        </div>
      </section>

      <SocialSharing title={post.title} />

      {post.postStoryReflection && (
        <section className="mb-32 border-l-8 border-black pl-12 py-12 bg-white brutalist-border shadow-[15px_15px_0px_0px_rgba(0,0,0,0.05)] reveal-item">
           <h3 className="font-ui text-[9px] uppercase tracking-[0.5em] font-bold mb-12 text-[#7A5C3E]">The Reflective Inquiry</h3>
           <p className="font-serif text-3xl md:text-4xl italic leading-relaxed opacity-90 tracking-tight">
             {post.postStoryReflection}
           </p>
        </section>
      )}

      {post.contextNote && (
        <footer className="bg-[#EBE9E4] p-12 brutalist-border reveal-item">
           <h3 className="font-ui text-[10px] uppercase tracking-[0.5em] font-bold mb-6 text-[#8E8E8E]">Context Note</h3>
           <p className="font-ui text-[11px] uppercase tracking-[0.3em] leading-relaxed text-[#8E8E8E]">
             {post.contextNote}
           </p>
        </footer>
      )}
    </article>
  );
};

export const ArticleDetailView: React.FC<{ post: Post }> = ({ post }) => {
  switch (post.category) {
    case 'Long Essay':
      return <LongEssayLayout post={post} />;
    case 'Article':
      return <PhilosophicalArticleLayout post={post} />;
    case 'Short Story':
      return <ShortStoryLayout post={post} />;
    default:
      return <PhilosophicalArticleLayout post={post} />;
  }
};
