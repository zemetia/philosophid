
import { useEffect } from 'react';
import gsap from 'gsap';

export const useRevealAnimation = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
};
