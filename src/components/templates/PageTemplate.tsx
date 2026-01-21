
"use client";
import React, { useState } from 'react';
import { Navbar } from '../organisms/Navbar';
import { SearchOverlay } from '../organisms/SearchOverlay';
import { Footer } from '../organisms/Footer';

export const PageTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};
