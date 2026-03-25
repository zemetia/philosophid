
"use client";
import React, { useState, useEffect } from 'react';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { NavLink } from '../molecules/NavLink';
import { SearchTrigger } from '../molecules/SearchTrigger';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : { user: null })
      .then(data => {
        if (data.user) setUser(data.user);
        setAuthLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user auth state", err);
        setAuthLoading(false);
      });
  }, []);

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

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 border-b border-black/5 bg-[#F4F2ED]/80 backdrop-blur-md ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex gap-8 items-center font-ui text-[10px] uppercase tracking-[0.3em] text-[#8E8E8E] font-bold">
          <NavLink href="/">Index</NavLink>
          <NavLink href="/archive">Archive</NavLink>
          <NavLink href="/competitions">Arena</NavLink>
          <NavLink href="/hall-of-fame">Fame</NavLink>
          <NavLink href="/about">About</NavLink>
          <SearchTrigger onClick={onSearchClick} />
          {authLoading ? (
            <div className="w-8 h-8 rounded-full bg-black/10 animate-pulse border border-black/5"></div>
          ) : user ? (
            <Link href="/dashboard" className="relative w-8 h-8 rounded-full overflow-hidden border border-black/20 hover:border-black/60 transition-colors bg-[#E5E1D8]">
              {user.picture ? (
                <Image src={user.picture} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-black/40 text-xs uppercase">{user.name?.charAt(0) || user.email?.charAt(0) || '?'}</div>
              )}
            </Link>
          ) : (
            <Button href="/login" size="sm" variant="primary">Registry</Button>
          )}
        </div>
      </div>
    </nav>
  );
};
