
import React from 'react';
import Link from 'next/link';

export const BackButton: React.FC = () => (
  <Link 
    href="/archive"
    className="font-ui text-[10px] uppercase tracking-[0.4em] mb-16 flex items-center gap-4 hover:translate-x-[-4px] transition-all group reveal-item"
  >
    <span className="text-xl group-hover:text-[#4E6E81]">←</span> 
    <span className="group-hover:opacity-50">Archive Index</span>
  </Link>
);
