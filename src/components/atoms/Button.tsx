
import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'tiller';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  href, 
  children, 
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-ui font-bold uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-black text-[#F4F2ED] border-2 border-black hover:bg-transparent hover:text-black",
    outline: "bg-transparent text-black border-2 border-black hover:bg-black hover:text-[#F4F2ED]",
    ghost: "bg-transparent text-black hover:bg-black/5",
    tiller: "group relative overflow-hidden bg-transparent text-black border-2 border-black hover:text-[#F4F2ED]" // The complex hero animation style
  };

  const sizes = {
    sm: "text-[10px] px-4 py-1.5",
    md: "text-xs px-6 py-3",
    lg: "text-sm px-8 py-4"
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const content = (
    <>
      {variant === 'tiller' && (
        <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-500 group-hover:translate-y-0 -z-10"></div>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};
