
"use client";
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-48 pb-16 border-t border-black/10 bg-[#F4F2ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-24 mb-32">
          <div className="md:col-span-2">
            <h2 className="font-ui text-5xl font-bold tracking-tighter uppercase mb-10">Philoshopid</h2>
            <p className="max-w-sm text-[#8E8E8E] font-serif italic text-lg leading-relaxed">
              &quot;The unexamined life is not worth living.&quot; — Socrates
            </p>
          </div>
          <div className="flex flex-col gap-4 font-ui text-[10px] uppercase tracking-widest font-bold">
            <span className="text-black/30">Connect</span>
            <a href="#" className="hover:text-[#4E6E81]">Correspondence</a>
            <a href="#" className="hover:text-[#4E6E81]">Institutions</a>
            <a href="#" className="hover:text-[#4E6E81]">Ethical Standards</a>
          </div>
          <div className="flex flex-col gap-4 font-ui text-[10px] uppercase tracking-widest font-bold">
            <span className="text-black/30">Registry</span>
            <Link href="/archive" className="hover:text-[#4E6E81] text-left">Full Archive</Link>
            <Link href="/competitions" className="hover:text-[#4E6E81] text-left">The Arena</Link>
            <Link href="/hall-of-fame" className="hover:text-[#4E6E81] text-left">Permanent Records</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-black/10 font-ui text-[9px] uppercase tracking-[0.5em] text-[#8E8E8E]">
          <p>&copy; MMXXIV Philoshopid Collective. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span>Structuralist Architecture</span>
             <span>Logos Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
