
"use client";
import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { SearchOverlay } from './SearchOverlay';
import { Footer } from './Footer';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navigation onSearchClick={() => setIsSearchOpen(true)} />
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
