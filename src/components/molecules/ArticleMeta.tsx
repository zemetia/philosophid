
import React from 'react';
import { MetaText } from '../atoms/Typography';

interface ArticleMetaProps {
  category?: string;
  readTime?: string;
  className?: string;
  author?: string;
  date?: string;
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({ category, readTime, className = '' }) => {
  return (
    <div className={`flex justify-between items-baseline text-[#8E8E8E] ${className}`}>
      <MetaText className="tracking-[0.2em]">{category}</MetaText>
      <MetaText className="tracking-[0.2em]">{readTime}</MetaText>
    </div>
  );
};

export const LegacyArticleMeta: React.FC<ArticleMetaProps> = ({ author, date, className = '' }) => (
    <p className={`font-ui text-[11px] uppercase tracking-widest text-[#8E8E8E] ${className}`}>By {author} • {date}</p>
);
