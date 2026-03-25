"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAuth } from "../../../../providers/AuthProvider";
import { Button } from "../../../../components/atoms/Button";
import { ArrowLeft, Save, Share2 } from "lucide-react";
import PublicationTypeSelector from "../../../../components/organisms/PublicationTypeSelector";
import { PUBLICATION_TEMPLATES, PublicationType } from "../../../../lib/publication-templates";

// Dynamically import the editor to disable SSR
const BlockEditor = dynamic(
  () => import("../../../../components/organisms/BlockEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] w-full bg-black/5 animate-pulse rounded-md" />
    ),
  },
);

export default function NewPublicationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { firebaseUid, user } = useAuth();
  
  const typeParam = searchParams.get("type") as PublicationType;
  const [content, setContent] = useState<any>(null);
  const [paperId, setPaperId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);

  // Helper: Extract title from blocks
  const extractTitleFromBlocks = (blocks: any[]): string => {
    if (!blocks || blocks.length === 0) return "Untitled Draft";
    
    // Look for first heading
    const firstHeading = blocks.find(b => b.type === "heading");
    if (firstHeading && firstHeading.content && firstHeading.content[0]?.text) {
      return firstHeading.content[0].text;
    }
    
    // Look for first paragraph
    const firstParagraph = blocks.find(b => b.type === "paragraph");
    if (firstParagraph && firstParagraph.content && firstParagraph.content[0]?.text) {
      const text = firstParagraph.content[0].text;
      return text.length > 30 ? text.substring(0, 30) + "..." : text;
    }
    
    return "Untitled " + (typeParam?.charAt(0).toUpperCase() + typeParam?.slice(1) || "Draft");
  };

  // Determine if we should show the editor or the selector
  const showEditor = !!typeParam && !!PUBLICATION_TEMPLATES[typeParam];
  
  // Get initial content based on type
  const initialContent = useMemo(() => {
    if (typeParam && PUBLICATION_TEMPLATES[typeParam]) {
      return PUBLICATION_TEMPLATES[typeParam];
    }
    return undefined;
  }, [typeParam]);

  // AUTO-SAVE LOGIC
  useEffect(() => {
    if (!content || !showEditor || !firebaseUid) return;

    const saveDraft = async () => {
      // Don't save if content is basically the initial template and user hasn't touched it 
      // (This is a simplified check, ideally track 'dirty' state)
      if (content.length <= 1 && (!content[0]?.content || content[0].content.length === 0)) {
        return;
      }

      setSaveStatus("saving");
      try {
        const title = extractTitleFromBlocks(content);
        const payload = {
          title,
          content,
          type: typeParam.toUpperCase().replace('-', '_'), // ARTICLE, SHORT_STORY, LONG_ESSAY
          status: "DRAFT",
        };

        const url = paperId ? `/api/papers/${paperId}` : "/api/papers";
        const method = paperId ? "PUT" : "POST";
        
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "x-firebase-uid": firebaseUid,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to save draft");

        const result = await response.json();
        if (!paperId && result.data?.id) {
          setPaperId(result.data.id);
        }

        setSaveStatus("saved");
        setLastSavedTime(new Date());
      } catch (err) {
        console.error("Auto-save error:", err);
        setSaveStatus("error");
      }
    };

    const timeout = setTimeout(saveDraft, 2000); // 2 second debounce
    return () => clearTimeout(timeout);
  }, [content, firebaseUid, paperId, showEditor, typeParam]);

  const handleSelectType = (type: PublicationType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", type);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleBackToSelector = () => {
    // If we have unsaved work, maybe warn?
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`min-h-screen ${showEditor ? 'bg-white' : 'bg-[#F9F8F6]'} flex flex-col font-serif transition-colors duration-700`}>
      {/* Top Navbar */}
      <div className={`sticky top-0 z-40 ${showEditor ? 'bg-white/90 border-b border-black/5' : 'bg-transparent'} backdrop-blur-md transition-all duration-500`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showEditor ? (
              <Button 
                onClick={handleBackToSelector} 
                variant="ghost" 
                className="px-0 hover:bg-transparent text-black/60 hover:text-black gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-ui text-[10px] tracking-widest uppercase mt-[0.5px]">Change Format</span>
              </Button>
            ) : (
              <Button 
                href="/dashboard/publication" 
                variant="ghost" 
                className="px-0 hover:bg-transparent text-black/60 hover:text-black gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-ui text-[10px] tracking-widest uppercase mt-[0.5px]">Back to Dashboard</span>
              </Button>
            )}
          </div>

          {showEditor && (
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex flex-col items-end mr-2 md:mr-4">
                <span className="hidden md:inline text-[10px] font-ui tracking-widest uppercase text-black/30">
                  {typeParam?.replace('-', ' ')} Mode
                </span>
                <span className="text-[9px] font-ui tracking-tighter uppercase text-stone-400 mt-[2px] transition-all duration-300">
                  {saveStatus === "saving" && <span className="flex items-center gap-1"><span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" /> Saving...</span>}
                  {saveStatus === "saved" && lastSavedTime && `Draft Saved at ${lastSavedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  {saveStatus === "error" && <span className="text-red-400">Save Failed</span>}
                  {saveStatus === "idle" && !paperId && "Unsaved Draft"}
                </span>
              </div>
              <div className="h-4 w-[1px] bg-black/10 hidden md:block" />
              <Button variant="primary" size="sm" className={`rounded-full px-6 py-2 shadow-lg shadow-black/5 hover:shadow-black/10 transition-shadow ${saveStatus === "saving" ? "opacity-50 cursor-not-allowed" : ""}`}>
                Publish
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden flex flex-col">
        {showEditor ? (
          /* Editor Canvas Container */
          <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="w-full prose prose-lg prose-headings:font-serif prose-p:font-serif focus:outline-none">
              <BlockEditor 
                key={typeParam} 
                onChange={setContent} 
                initialContent={initialContent} 
                variant="minimal" 
              />
            </div>
          </div>
        ) : (
          /* Type Selector Container */
          <div className="flex-1 flex flex-col">
            <PublicationTypeSelector onSelect={handleSelectType} />
          </div>
        )}
      </div>

      {/* Subtle bottom indicator */}
      {!showEditor && (
        <div className="p-8 text-center bg-transparent">
          <p className="text-[10px] font-ui tracking-[0.2em] uppercase text-black/20">
            Powered by BlockNote Editor & Philosophid Intelligence
          </p>
        </div>
      )}
    </div>
  );
}


