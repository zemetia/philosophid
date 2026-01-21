
import React from 'react';
import { COMPETITION_TYPES } from '@/lib/constants';
import { Heading, MetaText } from '../atoms/Typography';

export const CompetitionTimeline: React.FC = () => {
  return (
    <section className="py-48 bg-[#121212] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/10 pb-12">
           <div>
              <MetaText className="text-[#4E6E81] tracking-[0.5em] block mb-4">Inquiry Frameworks</MetaText>
              <Heading level={2} className="text-white">Participation</Heading>
           </div>
           <MetaText className="text-[#8E8E8E] max-w-xs text-right hidden md:block tracking-widest">
              Three tiers of contribution, each serving a distinct structural purpose in our shared dialectic.
           </MetaText>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/20 -translate-x-1/2"></div>
          
          <div className="space-y-32">
            {COMPETITION_TYPES.map((comp, idx) => (
              <div key={comp.id} className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Node */}
                <div className="absolute left-[30px] md:left-1/2 top-0 w-16 h-16 bg-[#121212] border-2 border-[#4E6E81] -translate-x-1/2 flex items-center justify-center z-10">
                   <span className="font-ui text-xl font-bold">{comp.id}</span>
                </div>

                {/* Content Area */}
                <div className="w-full md:w-1/2 pl-24 md:pl-0 md:px-16 pt-2">
                  <div className={`p-10 border border-white/10 hover:border-[#4E6E81] transition-all duration-500 bg-[#121212]/50 backdrop-blur-sm group ${idx % 2 === 1 ? 'md:text-right' : ''}`}>
                    <MetaText className="mb-4 group-hover:text-white transition-colors tracking-[0.4em] text-[#8E8E8E] block">{comp.frequency}</MetaText>
                    <Heading level={3} className="text-white mb-6 font-bold">{comp.title}</Heading>
                    <p className="font-serif text-lg opacity-60 leading-relaxed mb-8">{comp.description}</p>
                    <div className={`pt-6 border-t border-white/10 ${idx % 2 === 1 ? 'md:flex md:justify-end' : ''}`}>
                      <div className="max-w-xs">
                        <MetaText className="text-[#4E6E81] tracking-widest mb-2 block">Standard Requirement:</MetaText>
                        <MetaText className="opacity-40 tracking-widest text-[11px]">{comp.requirements}</MetaText>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for the other side */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
