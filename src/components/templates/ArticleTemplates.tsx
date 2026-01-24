
"use client";
import React, { useRef } from 'react';
import { Post } from '../lib/types';
import Image from 'next/image';
import { BackButton } from '../molecules/BackButton';
import { SocialSharing } from '../molecules/SocialSharing';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';
import { Heading, MetaText } from '../atoms/Typography';

interface LayoutProps {
  post: Post;
}

export const LongEssayTemplate: React.FC<LayoutProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimation(containerRef);

  return (
    <article ref={containerRef} className="max-w-5xl mx-auto px-6 py-32 bg-[#F4F2ED] selection:bg-[#4E6E81] selection:text-white">
      <BackButton />
      
      <header className="mb-32 border-b-2 border-black pb-16 reveal-item">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="flex-1">
            <MetaText className="text-[#4E6E81] tracking-[0.6em] block mb-6">Structural Inquiry</MetaText>
            <Heading level={1} className="text-6xl md:text-8xl leading-[0.85] mb-8">{post.title}</Heading>
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
             <MetaText className="text-[#7A5C3E] tracking-[0.5em] font-bold">Abstract</MetaText>
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
            <MetaText className="tracking-[0.5em] font-bold text-[#8E8E8E]">Footnotes</MetaText>
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
             <MetaText className="tracking-[0.5em] font-bold mb-8 text-[#7A5C3E]">Editorial Commentary</MetaText>
             <p className="font-serif text-2xl italic leading-relaxed opacity-80 border-l-2 border-[#7A5C3E] pl-8">
               &quot;{post.editorialCommentary}&quot;
             </p>
          </div>
        )}
      </footer>
    </article>
  );
};

export const PhilosophicalArticleTemplate: React.FC<LayoutProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimation(containerRef);

  return (
    <article ref={containerRef} className="max-w-4xl mx-auto px-6 py-32 selection:bg-[#7A5C3E] selection:text-white">
      <BackButton />
      
      <header className="mb-32 text-center reveal-item">
        <div className="flex flex-col items-center">
          <MetaText className="tracking-[0.6em] text-[#7A5C3E] font-bold block mb-10">Rational Reflection</MetaText>
          <Heading level={1} className="text-5xl md:text-7xl font-bold leading-[0.85] mb-12 max-w-3xl">{post.title}</Heading>
          <div className="w-16 h-[2px] bg-black mb-12"></div>
          <div className="flex gap-8 font-ui text-[10px] uppercase tracking-[0.4em] opacity-50 font-bold">
            <span>By {post.author}</span>
            <span className="text-[#4E6E81]">MMXXIV</span>
          </div>
        </div>
      </header>

      {post.openingThesis && (
        <section className="mb-48 text-center max-w-2xl mx-auto reveal-item">
          <MetaText className="tracking-[0.5em] mb-8 text-[#8E8E8E]">Thesis</MetaText>
          <p className="font-serif text-3xl md:text-5xl italic leading-tight text-[#121212] tracking-tight">
            {post.openingThesis}
          </p>
        </section>
      )}

      <section className="mb-48 grid md:grid-cols-12 gap-16 items-start reveal-item">
        <div className="md:col-span-8">
           <MetaText className="tracking-[0.5em] mb-10 text-[#4E6E81]">Argumentation</MetaText>
           <div className="font-serif text-2xl leading-relaxed text-[#121212]">
             {post.coreArgument}
           </div>
        </div>
        
        <aside className="md:col-span-4 border-t-2 border-[#7A5C3E] pt-10 sticky top-32">
           <MetaText className="tracking-[0.4em] mb-8">Related Inquiries</MetaText>
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
           <MetaText className="tracking-[0.5em] mb-10 text-[#7A5C3E]">The Counterpoint</MetaText>
           <p className="font-serif text-2xl md:text-3xl italic leading-relaxed opacity-80 border-l-4 border-black pl-8">
             {post.tension}
           </p>
        </section>
      )}

      <SocialSharing title={post.title} />

      {post.closingReflection && (
        <footer className="pt-24 border-t-8 border-black reveal-item">
           <div className="max-w-2xl">
             <MetaText className="tracking-[0.5em] mb-10 text-[#8E8E8E]">Closing Reflection</MetaText>
             <p className="font-serif text-4xl leading-tight italic text-[#121212] tracking-tighter">
               {post.closingReflection}
             </p>
           </div>
        </footer>
      )}
    </article>
  );
};

export const ShortStoryTemplate: React.FC<LayoutProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useRevealAnimation(containerRef);

  return (
    <article ref={containerRef} className="max-w-3xl mx-auto px-6 py-32 selection:bg-black selection:text-white">
      <BackButton />
      
      <header className="mb-32 reveal-item">
        <div className="flex justify-between items-baseline mb-12 border-b border-black/5 pb-4">
           <MetaText className="tracking-[0.5em] text-[#7A5C3E] italic">{post.formatNote || 'Philosophical Fiction'}</MetaText>
           <MetaText className="tracking-widest opacity-40">Record {post.year}</MetaText>
        </div>
        <Heading level={1} className="text-7xl md:text-9xl leading-[0.8] mb-12">{post.title}</Heading>
        <div className="flex items-center gap-6 p-6 bg-white brutalist-border inline-flex">
           <div className="w-10 h-10 flex items-center justify-center bg-[#121212]">
              <Image src="/logo.png" alt="Phi" width={24} height={24} className="object-contain invert" />
           </div>
           <div>
              <MetaText className="tracking-widest font-bold">{post.author}</MetaText>
              <MetaText className="tracking-widest text-[#8E8E8E]">{post.readTime} Meditation</MetaText>
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
           <MetaText className="tracking-[0.5em] mb-12 text-[#7A5C3E]">The Reflective Inquiry</MetaText>
           <p className="font-serif text-3xl md:text-4xl italic leading-relaxed opacity-90 tracking-tight">
             {post.postStoryReflection}
           </p>
        </section>
      )}

      {post.contextNote && (
        <footer className="bg-[#EBE9E4] p-12 brutalist-border reveal-item">
           <MetaText className="tracking-[0.5em] mb-6 text-[#8E8E8E]">Context Note</MetaText>
           <MetaText className="tracking-[0.3em] leading-relaxed text-[#8E8E8E]">
             {post.contextNote}
           </MetaText>
        </footer>
      )}
    </article>
  );
};

export const ArticleDetailView: React.FC<{ post: Post }> = ({ post }) => {
  switch (post.category) {
    case 'Long Essay':
      return <LongEssayTemplate post={post} />;
    case 'Article':
      return <PhilosophicalArticleTemplate post={post} />;
    case 'Short Story':
      return <ShortStoryTemplate post={post} />;
    default:
      return <PhilosophicalArticleTemplate post={post} />;
  }
};
