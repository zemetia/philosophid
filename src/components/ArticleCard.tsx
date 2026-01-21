
import React from 'react';
import { Post } from '@/lib/types';
import Link from 'next/link';

interface Props {
  post: Post;
  className?: string;
}

export const ArticleCard: React.FC<Props> = ({ post, className }) => {
  return (
    <Link 
      href={`/article/${post.id}`}
      className={`group flex flex-col gap-4 py-8 border-b border-black/10 transition-all cursor-pointer ${className}`}
    >
      <div className="flex justify-between items-baseline font-ui text-[10px] uppercase tracking-[0.2em] text-[#8E8E8E]">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      
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
        <h3 className="font-ui text-2xl md:text-3xl font-light tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-500">
          {post.title}
        </h3>
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
