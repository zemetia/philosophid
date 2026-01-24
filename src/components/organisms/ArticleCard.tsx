
import React from 'react';
import { Post } from '../lib/types';
import Link from 'next/link';
import { Heading } from '../atoms/Typography';
import { ArticleMeta } from '../molecules/ArticleMeta';

interface ArticleCardProps {
  post: Post;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post, className }) => {
  return (
    <Link 
      href={`/article/${post.id}`}
      className={`group flex flex-col gap-4 py-8 border-b border-black/10 transition-all cursor-pointer ${className}`}
    >
      <ArticleMeta category={post.category} readTime={post.readTime} />
      
      {post.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-black/5">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Heading level={3} className="font-light leading-none group-hover:translate-x-1 transition-transform duration-500">
          {post.title}
        </Heading>
        <p className="font-ui text-[11px] uppercase tracking-widest text-[#8E8E8E]">By {post.author} • {post.date}</p>
        <p className="mt-2 text-lg leading-relaxed text-[#121212]/80 line-clamp-3 font-serif">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-2">
        <span className="font-ui text-xs uppercase tracking-[0.2em] border-b border-black py-1 group-hover:opacity-50 transition-opacity">
          Read Inquiry
        </span>
      </div>
    </Link>
  );
};
