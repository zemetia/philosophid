"use client";

import React from "react";
import { Heading, SectionTitle } from "@/components/atoms/Typography";
import { CompetitionCard, CompetitionEntryCard } from "@/components/molecules/CompetitionCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/atoms/Button";

// Mock data (Later will be replaced with real backend data from API)
const ACTIVE_COMPETITIONS = [
  {
    id: "1",
    title: "The Nature of Emptiness",
    description: "An essay series exploring the Buddhist concept of Sunyata and its implications for modern nihilism.",
    type: "LONG_ESSAY",
    fee: "Free",
    endDate: "Apr 15, 2026",
    prize: "IDR 2.500.000 + Medal",
  },
  {
    id: "2",
    title: "Ethics in Artificial Intelligence",
    description: "How does deontology hold up in the face of machine learning algorithms?",
    type: "ARTICLE",
    fee: "IDR 50.000",
    endDate: "May 01, 2026",
    prize: "IDR 5.000.000 + Golden Badge",
  },
];

const USER_ENTRIES = [
  {
    id: "e1",
    title: "Existentialism In Digital Era",
    paperTitle: "The Absurdity of Scrolling",
    submittedAt: "Mar 20, 2026",
    status: "SUBMITTED" as const,
  },
  {
    id: "e2",
    title: "Virtue Ethics Reimagined",
    paperTitle: "Aristotle at the Office",
    submittedAt: "Feb 15, 2026",
    status: "WINNER" as const,
  },
];

export default function CompetitionPage() {
  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-4">
          <SectionTitle>Arena of Thought</SectionTitle>
          <Heading level={2}>Competitions</Heading>
          <p className="font-serif italic text-lg text-[#8E8E8E] max-w-xl leading-relaxed">
            "Testing the weight of your philosophy against the scales of reason." — The Catalyst
          </p>
        </div>
        
      </div>

      <div className="h-px w-full bg-black/5" />

      {/* User's Entries Section */}
      {USER_ENTRIES.length > 0 && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="flex items-center gap-4">
             <SectionTitle className="mb-0">Your Current Entries</SectionTitle>
            <div className="h-px flex-1 bg-black/[0.03]" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {USER_ENTRIES.map((entry) => (
              <CompetitionEntryCard key={entry.id} {...entry} />
            ))}
          </div>
        </section>
      )}

      {/* Active Competitions Section */}
      <section className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
        <div className="flex items-center gap-4">
          <SectionTitle className="mb-0">Active Call for Papers</SectionTitle>
          <div className="h-px flex-1 bg-black/[0.03]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVE_COMPETITIONS.map((comp) => (
            <CompetitionCard key={comp.id} {...comp} />
          ))}

          {/* New Competition/Create Placeholder (For Admins) - Simple visual balance */}
          <div className="border-2 border-dashed border-black/5 p-12 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-80 transition-opacity space-y-4">
            <div className="w-12 h-12 bg-black/5 flex items-center justify-center rounded-full">
              <Plus size={20} />
            </div>
            <div className="space-y-1">
              <span className="font-ui text-[10px] uppercase font-bold tracking-widest block">Admin only</span>
              <span className="font-serif italic text-sm">Create New Challenge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Info */}
      <div className="p-12 border border-black/5 bg-white/20 backdrop-blur-sm space-y-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-600">
        <SectionTitle>The Competition Protocol</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { title: "Review", desc: "Entries are blinded and reviewed by Three Pillars of Reason." },
                { title: "Authenticity", desc: "The spirit of your thought must be entirely your own." },
                { title: "Reward", desc: "Winners gain badges and philosophical status within the collective." }
            ].map(item => (
                <div key={item.title} className="space-y-2">
                    <h5 className="font-bold uppercase text-xs tracking-tight">{item.title}</h5>
                    <p className="text-xs text-[#8E8E8E] font-serif italic">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
