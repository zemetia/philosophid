"use client";

import React from "react";
import { Heading } from "../../components/atoms/Typography";
import { Button } from "../../components/atoms/Button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Heading level={2} className="mb-2">
            Dashboard
          </Heading>
          <p className="font-serif italic text-lg text-[#8E8E8E] max-w-xl leading-relaxed">
            "Order is the dream of chaos." — Integration State
          </p>
        </div>
        <Button href="/dashboard/publication/new" variant="tiller" className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          New Publication
        </Button>
      </div>

      <div className="h-px w-full bg-black/5" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-black/5 bg-white/40 backdrop-blur-sm min-h-[200px] flex items-center justify-center transition-colors hover:border-black/20 hover:bg-white/60">
          <span className="font-ui text-xs uppercase tracking-widest text-black/30">
            Recent Activity Widget
          </span>
        </div>
      </div>
    </div>
  );
}
