
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
      if (path === '/' && pathname === '/') return true;
      if (path !== '/' && pathname.startsWith(path)) return true;
      return false;
  }

  const activeState = isActive(href);

  return (
    <Link 
      href={href} 
      className={`hover:text-black transition-all ${activeState ? 'text-black border-b border-black pb-1' : ''}`}
    >
      {children}
    </Link>
  );
};
