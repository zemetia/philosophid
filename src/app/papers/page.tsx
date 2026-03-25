"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePapers } from '@/hooks/usePapers';
import { PaperCard } from '@/components/molecules/PaperCard';
import { PublicationFilter } from '@/components/molecules/PublicationFilter';
import { Heading, SectionTitle } from '@/components/atoms/Typography';
import { Search } from 'lucide-react';

export default function PapersDiscoveryPage() {
  const [activeType, setActiveType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = usePapers({
    type: activeType === "ALL" ? undefined : activeType,
    search: searchQuery || undefined,
    limit: 12,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      {/* 1. Page Header */}
      <header className="mb-16">
        <SectionTitle>Discovery Feed</SectionTitle>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <Heading level={1} className="max-w-2xl">
            The Manifold of <span className="outline-text">Thought</span>
          </Heading>
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH THE VOID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none pl-8 py-2 font-ui text-[10px] uppercase tracking-widest transition-all"
            />
          </div>
        </div>
      </header>

      {/* 2. Filter Bar */}
      <div className="mb-12">
        <PublicationFilter 
          activeType={activeType} 
          onTypeChange={setActiveType} 
        />
      </div>

      {/* 3. Paper Grid */}
      <div className="relative min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-2 border-black border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {data?.data?.length > 0 ? (
              <motion.div 
                key={activeType + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
              >
                {data.data.map((paper: any) => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black/5"
              >
                <SectionTitle>Silence prevails.</SectionTitle>
                <p className="font-serif italic opacity-40 text-center max-w-xs px-6">
                  No publications were found matching your current coordinates in the manifold.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* 4. Pagination (Simplified for now) */}
      {!isLoading && data?.meta?.totalPages > 1 && (
        <div className="mt-20 flex justify-center">
            <button className="px-12 py-4 border border-black hover:bg-black hover:text-white transition-all font-ui text-[10px] uppercase tracking-[0.5em] font-bold">
              Explore Deeper
            </button>
        </div>
      )}
    </div>
  );
}
