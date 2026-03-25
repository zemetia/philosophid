"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MetaText } from '../atoms/Typography';
import { PaperType } from '@prisma/client';

interface PaperCardProps {
  paper: {
    id: string;
    slug: string | null;
    title: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    type: PaperType;
    createdAt: string | Date;
    author: {
      name: string | null;
    };
  };
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const displayDate = new Date(paper.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const slugOrId = paper.slug || paper.id;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <Link href={`/papers/${slugOrId}`} className="block h-full">
        <div className="relative aspect-[4/5] overflow-hidden bg-white border border-black/5 group-hover:border-black/20 transition-colors">
          {paper.coverImageUrl ? (
            <img
              src={paper.coverImageUrl}
              alt={paper.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full bg-[#F6F4F0] flex items-center justify-center p-12 text-center">
              <span className="font-serif text-4xl italic opacity-10 select-none">Philosophid</span>
            </div>
          )}
          
          {/* Paper Type Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/90 text-white px-2 py-1">
              <MetaText className="text-[8px] tracking-[0.2em]">{paper.type.replace('_', ' ')}</MetaText>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center opacity-40">
            <MetaText className="text-[8px]">{paper.author.name || "Anonymous"}</MetaText>
            <MetaText className="text-[8px]">{displayDate}</MetaText>
          </div>
          
          <h3 className="text-xl font-bold uppercase tracking-tight text-[#19332A] group-hover:text-black transition-colors leading-none">
            {paper.title}
          </h3>
          
          {paper.excerpt && (
            <p className="font-serif text-sm opacity-60 line-clamp-2 leading-relaxed italic">
              &quot;{paper.excerpt}&quot;
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
