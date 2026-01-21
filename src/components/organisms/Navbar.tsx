
"use client";
import React, { useState, useEffect } from 'react';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { NavLink } from '../molecules/NavLink';
import { SearchTrigger } from '../molecules/SearchTrigger';

interface NavbarProps {
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
          <Button href="/login" size="sm" variant="primary">Registry</Button>
        </div>
      </div>
    </nav>
  );
};
