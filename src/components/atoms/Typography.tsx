
import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const MetaText: React.FC<TextProps> = ({ children, className = '' }) => (
  <span className={`font-ui text-[10px] uppercase font-bold tracking-[0.4em] ${className}`}>
    {children}
  </span>
);

export const SectionTitle: React.FC<TextProps> = ({ children, className = '' }) => (
  <h2 className={`font-ui text-[10px] uppercase font-bold tracking-[0.5em] mb-2 opacity-50 ${className}`}>
    {children}
  </h2>
);

export const Heading: React.FC<TextProps & { level?: 1 | 2 | 3 | 4 }> = ({ children, className = '', level = 2 }) => {
  const Tag = `h${level}` as React.ElementType;
  const sizes = {
    1: 'text-huge', // Custom class from globals/tailwind?
    2: 'text-3xl md:text-5xl',
    3: 'text-2xl md:text-3xl',
    4: 'text-xl'
  };

  return (
    <Tag className={`font-bold uppercase tracking-tighter text-black ${sizes[level]} ${className}`}>
        {children}
    </Tag>
  );
};
