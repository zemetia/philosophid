"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MetaText } from '../atoms/Typography';

const PAPER_TYPES = ["ALL", "ARTICLE", "SHORT_STORY", "LONG_ESSAY"];

interface PublicationFilterProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

export const PublicationFilter: React.FC<PublicationFilterProps> = ({ activeType, onTypeChange }) => {
  return (
    <div className="flex items-center gap-8 border-b border-black/5 pb-6 overflow-x-auto scrollbar-hide">
      {PAPER_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className="relative group py-2"
        >
          <MetaText 
            className={`text-[9px] transition-colors ${
              activeType === type ? "text-black" : "text-black/40 hover:text-black"
            }`}
          >
            {type.replace('_', ' ')}
          </MetaText>
          
          {activeType === type && (
            <motion.div
              layoutId="activeFilter"
              className="absolute bottom-0 left-0 w-full h-[2px] bg-[#19332A]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
