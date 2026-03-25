"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useState, useMemo, useEffect } from "react";
import { Block } from "@blocknote/core";

import { useRef } from "react";
import gsap from "gsap";

interface BlockEditorProps {
  initialContent?: any; // JSON object from Prisma
  onChange?: (content: any) => void;
  editable?: boolean;
  variant?: "brutalist" | "minimal";
}

const BlockEditor = ({
  initialContent,
  onChange,
  editable = true,
  variant = "brutalist",
}: BlockEditorProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // File upload handler
  const uploadFile = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("/api/upload", {
      method: "POST",
      body: body,
    });

    const json = await ret.json();
    return json.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent || undefined,
    uploadFile,
  });

  // Calculate word count
  const wordCount = useMemo(() => {
    let total = 0;
    blocks.forEach((block) => {
      if (block.content && Array.isArray(block.content)) {
        block.content.forEach((item: any) => {
          if (item.type === "text" && item.text) {
            total += item.text.trim().split(/\s+/).filter(Boolean).length;
          }
        });
      }
    });
    return total;
  }, [blocks]);

  const handleOnChange = () => {
    const currentBlocks = editor.document;
    setBlocks(currentBlocks);
    setLastSaved(new Date());
    if (onChange) {
      onChange(currentBlocks);
    }
  };

  // Sync initial content if editor is ready
  useEffect(() => {
    if (editor && editor.document) {
      setBlocks(editor.document);
    }
  }, [editor]);

  // Entrance animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "expo.out",
          delay: 0.2 
        }
      );
    }
  }, []);

  if (variant === "minimal") {
    return (
      <div ref={containerRef} className="w-full opacity-0">
        <div className="bg-white min-h-[60vh] relative">
          <div className="py-4 prose-slate max-w-none">
            <BlockNoteView
              editor={editor}
              editable={editable}
              theme="light"
              sideMenu={false}
              onChange={handleOnChange}
              className="min-h-[50vh]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="brutalist-editor-wrapper w-full max-w-4xl mx-auto opacity-0 px-4 md:px-0">
      <div className="brutalist-editor-container bg-white brutalist-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[60vh] relative transition-all duration-300">
        <div className="editor-header flex flex-wrap gap-2 justify-between items-center p-3 md:p-4 border-b-2 border-black bg-[#F4F2ED]">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-ui font-bold uppercase tracking-widest text-[10px] md:text-sm">
              {editable ? "Editor" : "Reader"} Mode
            </span>
            {editable && lastSaved && (
              <span className="text-[9px] md:text-[10px] font-ui text-stone uppercase flex items-center gap-1">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          {editable && (
            <div className="word-count font-ui text-[10px] md:text-xs font-bold bg-black text-white px-2 py-1">
              {wordCount} WORDS
            </div>
          )}
        </div>
        
        <div className="p-1 md:p-6 prose-slate max-w-none">
          <BlockNoteView
            editor={editor}
            editable={editable}
            theme="light"
            sideMenu={false}
            onChange={handleOnChange}
            className="min-h-[50vh]"
          />
        </div>
      </div>
      
      {editable && (
        <p className="mt-4 font-ui text-[10px] text-stone uppercase tracking-tighter opacity-70 text-center md:text-left">
          Tip: Use <span className="bg-black text-white px-1 font-bold italic">/</span> to open the command menu
        </p>
      )}
    </div>
  );
};

export default BlockEditor;
