"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCompetition } from '@/hooks/useCompetitions';
import { Heading, MetaText, SectionTitle } from '@/components/atoms/Typography';
import { BackButton } from '@/components/molecules/BackButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function CompetitionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { data, isLoading } = useCompetition(id as string);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F4F2ED]"><div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" /></div>;
  }

  const competition = data?.data;
  if (!competition) return <div>Inquiry not found.</div>;

  const handleEnterClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    // We'll implement the actual modal/flow next
    alert("Entry protocol coming soon. Ensure your paper is ready in the repository.");
  };

  return (
    <div className="pt-32 pb-64 bg-[#F4F2ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <BackButton />
        
        <div className="grid lg:grid-cols-12 gap-24 mt-16">
          {/* Left: Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#19332A] text-white px-3 py-1 font-ui text-[10px] uppercase tracking-widest font-bold">
                  {competition.type}
                </span>
                <span className="font-ui text-[10px] uppercase tracking-widest opacity-40">Challenge #{competition.id.slice(-4)}</span>
              </div>
              
              <Heading level={1} className="text-6xl md:text-8xl leading-[0.9] mb-12">
                {competition.title}
              </Heading>
              
              <div className="prose prose-xl font-serif italic opacity-80 leading-relaxed mb-16">
                &quot;{competition.description}&quot;
              </div>

              <div className="grid md:grid-cols-2 gap-12 border-t border-black/10 pt-16">
                 <div>
                    <SectionTitle>Criteria for Logos</SectionTitle>
                    <p className="font-serif text-lg opacity-60 leading-relaxed">
                       Submissions must demonstrate structural integrity and original dialectic advancement. We seek clarity over complexity, and truth over trend.
                    </p>
                 </div>
                 <div>
                    <SectionTitle>The Rewards</SectionTitle>
                    <p className="font-serif text-lg opacity-60 leading-relaxed">
                       Beyond the material compensation of <strong>{competition.prizes}</strong>, winners will be archived in the permanent Hall of Fame.
                    </p>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Sidebar Activity */}
          <div className="lg:col-span-4">
             <div className="sticky top-32 space-y-8">
                <div className="p-8 brutalist-border bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                   <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-black/5 pb-4">
                         <div className="flex items-center gap-3 opacity-40">
                            <Calendar className="w-4 h-4" />
                            <MetaText className="text-[9px]">Deadline</MetaText>
                         </div>
                         <MetaText className="text-[9px] text-black">{new Date(competition.endDate).toLocaleDateString()}</MetaText>
                      </div>
                      
                      <div className="flex items-center justify-between border-b border-black/5 pb-4">
                         <div className="flex items-center gap-3 opacity-40">
                            <Users className="w-4 h-4" />
                            <MetaText className="text-[9px]">Inscribers</MetaText>
                         </div>
                         <MetaText className="text-[9px] text-black">{competition._count.entries} Participants</MetaText>
                      </div>

                      <div className="flex items-center justify-between border-b border-black/5 pb-4">
                         <div className="flex items-center gap-3 opacity-40">
                            <ShieldCheck className="w-4 h-4" />
                            <MetaText className="text-[9px]">Status</MetaText>
                         </div>
                         <span className="text-[9px] font-ui font-bold uppercase tracking-widest text-green-600">Active</span>
                      </div>
                   </div>

                   <button 
                     onClick={handleEnterClick}
                     className="w-full mt-12 bg-black text-white p-6 font-ui text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#19332A] transition-all flex items-center justify-center gap-3 group"
                   >
                     Initiate Entry
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                   
                   {competition.fee > 0 && (
                     <p className="text-center mt-4 font-ui text-[8px] uppercase tracking-widest opacity-40">
                        Entry Fee: IDR {competition.fee.toLocaleString()}
                     </p>
                   )}
                </div>

                {/* Entry Preview List */}
                <div className="space-y-4">
                   <SectionTitle>Recent Witnesses</SectionTitle>
                   <div className="space-y-2">
                      {competition.entries?.slice(0, 5).map((entry: any) => (
                        <div key={entry.id} className="flex items-center gap-3 p-3 bg-white/40 border border-black/5">
                           <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center font-ui text-[8px] uppercase">
                              {entry.user.name?.[0]}
                           </div>
                           <MetaText className="text-[8px] opacity-60">{entry.user.name}</MetaText>
                        </div>
                      ))}
                      {competition._count.entries > 5 && (
                        <MetaText className="text-[8px] opacity-20 text-center block">+ {competition._count.entries - 5} more</MetaText>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
