
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface Props {
  onSearchClick: () => void;
}

export const Navigation: React.FC<Props> = ({ onSearchClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const isActive = (path: string) => {
      if (path === '/' && pathname === '/') return true;
      if (path !== '/' && pathname.startsWith(path)) return true;
      return false;
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 border-b border-black/5 bg-[#F4F2ED]/80 backdrop-blur-md ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-ui font-bold text-xl tracking-tighter uppercase flex items-center gap-3">
          <Image src="/logo.png" alt="Philoshopid Logo" width={24} height={24} className="object-contain" />
          <span>Philoshopid</span>
        </Link>
        <div className="flex gap-8 items-center font-ui text-[10px] uppercase tracking-[0.3em] text-[#8E8E8E] font-bold">
          <Link 
            href="/" 
            className={`hover:text-black transition-all ${isActive('/') ? 'text-black border-b border-black pb-1' : ''}`}
          >
            Index
          </Link>
          <Link 
            href="/archive" 
            className={`hover:text-black transition-all ${isActive('/archive') ? 'text-black border-b border-black pb-1' : ''}`}
          >
            Archive
          </Link>
          <Link 
            href="/competitions" 
            className={`hover:text-black transition-all ${isActive('/competitions') ? 'text-black border-b border-black pb-1' : ''}`}
          >
            Arena
          </Link>
          <Link 
            href="/hall-of-fame" 
            className={`hover:text-black transition-all ${isActive('/hall-of-fame') ? 'text-black border-b border-black pb-1' : ''}`}
          >
            Fame
          </Link>
          <Link 
            href="/about" 
            className={`hover:text-black transition-all ${isActive('/about') ? 'text-black border-b border-black pb-1' : ''}`}
          >
            About
          </Link>
          <button 
            onClick={onSearchClick}
            className="hover:text-black flex items-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search
          </button>
          <Link 
            href="/login" 
            className={`px-4 py-1.5 border-2 border-black hover:bg-black hover:text-[#F4F2ED] transition-all ${isActive('/login') ? 'bg-black text-[#F4F2ED]' : 'text-black'}`}
          >
            Registry
          </Link>
        </div>
      </div>
    </nav>
  );
};
