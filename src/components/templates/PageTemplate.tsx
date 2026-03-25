
"use client";
import React, { useState } from 'react';
import { Navbar } from '../organisms/Navbar';
import { SearchOverlay } from '../organisms/SearchOverlay';
import { Footer } from '../organisms/Footer';

import { usePathname } from 'next/navigation';

export const PageTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar onSearchClick={() => setIsSearchOpen(true)} />}
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
      <main className={isDashboard ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
};
