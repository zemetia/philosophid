
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_POSTS } from '@/lib/constants';
import { ArticleCard } from '@/components/ArticleCard';
import { ContentCategory, Post } from '@/lib/types';
import gsap from 'gsap';

export default function ArchivePage() {
  const [filter, setFilter] = useState<ContentCategory | 'All'>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories: (ContentCategory | 'All')[] = ['All', 'Long Essay', 'Article', 'Short Story'];
  const contentCategories: ContentCategory[] = ['Long Essay', 'Article', 'Short Story'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.archive-reveal', {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [filter]);

  const renderSection = (category: ContentCategory, posts: Post[]) => (
    <div key={category} className="mb-48 archive-reveal">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16 pb-8 border-b-4 border-black">
        <div className="flex flex-col">
          <span className="font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E] font-bold mb-2">Category Section</span>
          <h2 className="font-ui text-4xl md:text-6xl font-bold uppercase tracking-tighter text-[#4E6E81] leading-none">{category}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-black"></div>
          <span className="font-ui text-[10px] uppercase tracking-[0.4em] font-bold text-[#8E8E8E]">{posts.length} Records In-File</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="pt-32 pb-64 bg-[#F4F2ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-32 border-b-2 border-black pb-12 flex flex-col md:flex-row justify-between items-end gap-12 archive-reveal">
          <div className="flex-1">
            <span className="font-ui text-[10px] uppercase tracking-[0.8em] text-[#4E6E81] font-bold block mb-6">Structural Ledger</span>
            <h1 className="font-ui text-7xl md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.8]">The <br /> Archive</h1>
          </div>
          
          <div className="flex flex-wrap gap-8 font-ui text-[10px] uppercase tracking-[0.4em] font-bold text-[#8E8E8E] pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`transition-all pb-2 border-b-2 ${filter === cat ? 'text-black border-black' : 'border-transparent hover:text-black hover:border-black/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {filter === 'All' ? (
          contentCategories.map(cat => {
            const filtered = MOCK_POSTS.filter(p => p.category === cat);
            return filtered.length > 0 ? renderSection(cat, filtered) : null;
          })
        ) : (
          <div className="archive-reveal">
            <div className="flex items-center gap-8 mb-24">
              <h2 className="font-ui text-4xl font-bold uppercase tracking-tighter text-[#4E6E81]">{filter}</h2>
              <div className="flex-1 h-[2px] bg-black"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
              {MOCK_POSTS.filter(p => p.category === filter).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {filter !== 'All' && MOCK_POSTS.filter(p => p.category === filter).length === 0 && (
          <div className="text-center py-64 opacity-20 archive-reveal">
            <p className="font-ui text-3xl uppercase font-bold tracking-[0.5em]">Logos Empty / Null</p>
          </div>
        )}

        <footer className="mt-48 pt-24 border-t-2 border-black archive-reveal flex flex-col md:flex-row justify-between gap-8 font-ui text-[10px] uppercase tracking-[0.5em] text-[#8E8E8E]">
           <span>Viewing {filter === 'All' ? MOCK_POSTS.length : MOCK_POSTS.filter(p => p.category === filter).length} of {MOCK_POSTS.length} Total Records</span>
           <span>Filtered by Category: {filter === 'All' ? 'Complete Registry' : filter}</span>
        </footer>
      </div>
    </div>
  );
}
