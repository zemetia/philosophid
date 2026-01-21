import Link from 'next/link';
import { Heading, MetaText } from '@/components/atoms/Typography';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-24">
      <div className="mb-12">
        <MetaText className="text-[#8E8E8E]">Error: 404 // Coordinate Missing</MetaText>
      </div>

      <div className="mb-8 relative">
        <Heading level={1} className="leading-[0.8] text-8xl md:text-9xl">404</Heading>
        <div className="w-32 h-[2px] bg-black absolute -right-12 bottom-4"></div>
      </div>

      <div className="max-w-xl mx-auto mb-16 space-y-6 text-center">
        <h2 className="font-ui text-xl md:text-2xl uppercase tracking-[0.2em] font-bold">
            The Void Encountered
        </h2>
        <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-[#121212] opacity-80">
          The inquiry you seek has been lost to the digital ether, or perhaps it never existed within this manifold.
        </p>
      </div>

      <div>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center transition-all duration-300 font-ui font-bold uppercase tracking-[0.2em] bg-transparent text-black border-2 border-black hover:bg-black hover:text-[#F4F2ED] text-sm px-8 py-4"
        >
          Return to Reality
        </Link>
      </div>
    </main>
  );
}
