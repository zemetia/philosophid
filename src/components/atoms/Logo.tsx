
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  withText?: boolean;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  withText = true,
  size = 24
}) => {
  return (
    <Link href="/" className={`font-ui font-bold text-xl tracking-tighter uppercase flex items-center gap-3 ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Philoshopid Logo" 
        width={size} 
        height={size} 
        className="object-contain" 
      />
      {withText && <span>Philoshopid</span>}
    </Link>
  );
};
