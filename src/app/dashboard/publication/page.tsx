"use client";

import React, { useState } from "react";
import { Heading } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Plus, Search, BookOpen, Clock, FileEdit } from "lucide-react";

type TabState = "published" | "review" | "draft";

export default function PublicationListPage() {
  const [activeTab, setActiveTab] = useState<TabState>("published");

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Heading level={2} className="mb-2">
            Publications
          </Heading>
          <p className="font-serif italic text-lg text-[#8E8E8E] max-w-xl leading-relaxed">
            "Your archive of distilled profoundness."
          </p>
        </div>
        <Button href="/dashboard/publication/new" variant="tiller" className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Add New Publication
        </Button>
      </div>

      <div className="h-px w-full bg-black/5" />

      {/* Filters & Tabs */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex bg-white/50 backdrop-blur-sm border border-black/10 p-1 rounded-sm shadow-sm font-ui text-xs tracking-widest uppercase">
          <button
            onClick={() => setActiveTab("published")}
            className={`px-6 py-3 transition-colors ${activeTab === "published" ? "bg-black text-[#F4F2ED]" : "text-black/50 hover:text-black"}`}
          >
            Published
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-6 py-3 transition-colors ${activeTab === "review" ? "bg-black text-[#F4F2ED]" : "text-black/50 hover:text-black"}`}
          >
            In Review
          </button>
          <button
            onClick={() => setActiveTab("draft")}
            className={`px-6 py-3 transition-colors ${activeTab === "draft" ? "bg-black text-[#F4F2ED]" : "text-black/50 hover:text-black"}`}
          >
            Drafts
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
          <input
            type="text"
            placeholder="Search publications..."
            className="w-full bg-white/50 border border-black/10 text-sm font-ui pl-10 pr-4 py-3 focus:outline-none focus:border-black/30 transition-colors placeholder:text-black/30"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="min-h-[400px]">
        {activeTab === "published" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty State / Placeholder */}
            <div className="border border-black/10 bg-white/60 p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 min-h-[300px] col-span-full">
              <BookOpen className="w-8 h-8 text-black/20" />
              <div>
                <Heading level={4} className="mb-2">No Published Work Yet</Heading>
                <p className="text-sm font-serif italic text-black/40">You haven't unleashed any wisdom to the world yet.</p>
              </div>
              <Button href="/dashboard/publication/new" variant="outline" size="sm" className="mt-2">Start Writing</Button>
            </div>
          </div>
        )}

        {activeTab === "review" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-black/10 bg-white/60 p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 min-h-[300px] col-span-full">
              <Clock className="w-8 h-8 text-black/20" />
              <div>
                <Heading level={4} className="mb-2">Nothing In Review</Heading>
                <p className="text-sm font-serif italic text-black/40">No works are currently being scrutinized.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "draft" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="border border-black/10 bg-white/60 p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 min-h-[300px] col-span-full">
              <FileEdit className="w-8 h-8 text-black/20" />
              <div>
                <Heading level={4} className="mb-2">No Drafts</Heading>
                <p className="text-sm font-serif italic text-black/40">It seems your canvas is completely bare.</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
