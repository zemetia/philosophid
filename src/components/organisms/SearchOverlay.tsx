
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_POSTS } from '../../lib/constants';
import { Post } from '../../lib/types';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { MetaText, Heading } from '../atoms/Typography';

interface Props {
  onClose: () => void;
}

export const SearchOverlay: React.FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      
      gsap.from('.search-reveal', {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out'
      });
    }, containerRef);

    inputRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = MOCK_POSTS.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.author.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  const handleResultClick = (id: string) => {
      router.push(`/article/${id}`);
      onClose();
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#F4F2ED] overflow-y-auto"
    >
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-32 relative">
        <header className="flex justify-between items-center mb-16 search-reveal">
          <MetaText className="text-[#4E6E81] tracking-[0.8em]">Logos Inquiry Terminal</MetaText>
          <button 
            onClick={onClose}
            className="font-ui text-[10px] uppercase tracking-[0.4em] font-bold hover:text-[#4E6E81] transition-colors"
          >
            [ Close ]
          </button>
        </header>

        <div className="mb-24 search-reveal">
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, authors, or concepts..."
            className="w-full bg-transparent border-b-8 border-black font-ui text-4xl md:text-7xl font-bold uppercase tracking-tighter outline-none pb-8 placeholder:opacity-10 focus:border-[#4E6E81] transition-colors"
          />
          <div className="mt-4 flex justify-between items-center">
             <MetaText className="text-[#8E8E8E] tracking-widest">
               {query ? `${results.length} results found for "${query}"` : 'Type to begin exploration'}
             </MetaText>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10 overflow-hidden">
          {results.map((post) => (
            <button 
              key={post.id}
              onClick={() => handleResultClick(post.id)}
              className="bg-[#F4F2ED] p-10 text-left hover:bg-white transition-all group search-reveal"
            >
              <div className="flex justify-between items-baseline mb-6">
                <MetaText className="text-[#8E8E8E] tracking-widest">{post.category}</MetaText>
                <MetaText className="text-[#8E8E8E] tracking-widest">{post.year}</MetaText>
              </div>
              <Heading level={3} className="mb-4 group-hover:text-[#4E6E81] transition-colors">
                {post.title}
              </Heading>
              <MetaText className="opacity-60 tracking-widest">By {post.author}</MetaText>
            </button>
          ))}
        </div>

        {query && results.length === 0 && (
          <div className="py-32 text-center search-reveal">
            <p className="font-serif text-3xl italic opacity-30">&quot;Where there is no structure, there is no signal.&quot;</p>
            <MetaText className="mt-8 text-[#8E8E8E] tracking-[0.4em]">Null result achieved</MetaText>
          </div>
        )}

        {!query && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 search-reveal">
            <div className="space-y-4">
               <MetaText className="text-[#8E8E8E] tracking-[0.5em]">Themes</MetaText>
               <ul className="space-y-2 font-ui text-[11px] uppercase tracking-widest font-bold">
                 <li><button onClick={() => setQuery('Platonic')} className="hover:text-[#4E6E81]">Platonic</button></li>
                 <li><button onClick={() => setQuery('Logic')} className="hover:text-[#4E6E81]">Logic</button></li>
                 <li><button onClick={() => setQuery('Digital')} className="hover:text-[#4E6E81]">Digital</button></li>
               </ul>
            </div>
            <div className="space-y-4">
               <MetaText className="text-[#8E8E8E] tracking-[0.5em]">Formats</MetaText>
               <ul className="space-y-2 font-ui text-[11px] uppercase tracking-widest font-bold">
                 <li><button onClick={() => setQuery('Essay')} className="hover:text-[#4E6E81]">Essays</button></li>
                 <li><button onClick={() => setQuery('Story')} className="hover:text-[#4E6E81]">Fiction</button></li>
                 <li><button onClick={() => setQuery('Article')} className="hover:text-[#4E6E81]">Articles</button></li>
               </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
