"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BookOpen } from "lucide-react";
import { useCreateBlockNote, createReactInlineContentSpec, createReactBlockSpec, getDefaultReactSlashMenuItems, SuggestionMenuController } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { 
  Block, 
  BlockNoteSchema, 
  defaultBlockSpecs, 
  defaultInlineContentSpecs 
} from "@blocknote/core";
import gsap from "gsap";
import { FileSearch } from "lucide-react";
import ReferenceManager from "./ReferenceManager";

/**
 * Custom Inline Content: Citation
 */
const Citation = createReactInlineContentSpec(
  {
    type: "citation",
    propSchema: {
      referenceId: { default: "" },
      label: { default: "(...)" },
    },
    content: "none",
  },
  {
    render: (props) => {
      return (
        <span 
          className="bg-blue-50 text-blue-700 border border-blue-200 px-1 rounded cursor-pointer hover:bg-blue-100 transition-colors inline-flex items-center gap-0.5 font-medium text-[0.9em]"
          title="Click to view reference"
          onClick={() => {
            console.log("Viewing reference:", props.inlineContent.props.referenceId);
          }}
        >
          {props.inlineContent.props.label}
        </span>
      );
    },
  }
);

/**
 * Custom Block: References List (Automatic Bibliography)
 */
const ReferencesList = createReactBlockSpec(
  {
    type: "referencesList",
    propSchema: {},
    content: "none",
  },
  {
    render: (props) => {
      return <BibliographyDisplay />;
    },
  }
);

// Context for references to share state between Editor, Manager, and Bibliography block
const ReferencesContext = React.createContext<{
  references: any[];
  refreshPool: () => void;
}>({
  references: [],
  refreshPool: () => {},
});

const BibliographyDisplay = () => {
    const { references } = React.useContext(ReferencesContext);
    
    // Logic: Sort APA (Alphabetical by Author)
    const sortedRefs = [...references].sort((a, b) => {
      const authA = a.authors.toLowerCase();
      const authB = b.authors.toLowerCase();
      return authA.localeCompare(authB);
    });

    return (
        <div className="font-serif border-t-2 border-black pt-8 mt-12 mb-20">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6">References</h2>
            {sortedRefs.length === 0 ? (
              <p className="opacity-50 text-[10px] uppercase tracking-tighter italic">
                Your bibliography will appear here automatically when you add references.
              </p>
            ) : (
              <div className="flex flex-col gap-4 text-sm leading-relaxed">
                  {sortedRefs.map(ref => {
                    const firstAuthor = ref.authors.split(',')[0].trim();
                    const lastName = firstAuthor.split(' ').pop();
                    return (
                      <div key={ref.id} className="pl-8 -indent-8">
                        <span className="font-bold">{ref.authors}</span> ({ref.year}). 
                        <span className="italic"> {ref.title}</span>. {ref.sourceName}.
                        {ref.url && <span className="ml-1 text-blue-600 break-all"> {ref.url}</span>}
                      </div>
                    );
                  })}
              </div>
            )}
        </div>
    );
};

// Create schema with custom content
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    referencesList: ReferencesList(),
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    citation: Citation,
  },
});

interface BlockEditorProps {
  paperId?: string | null;
  initialContent?: any;
  onChange?: (content: any) => void;
  editable?: boolean;
  variant?: "brutalist" | "minimal";
}

const BlockEditor = ({
  paperId,
  initialContent,
  onChange,
  editable = true,
  variant = "brutalist",
}: BlockEditorProps) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isReferenceManagerOpen, setIsReferenceManagerOpen] = useState(false);
  const [references, setReferences] = useState<any[]>([]);

  const fetchReferences = useCallback(async () => {
    if (!paperId) return;
    try {
      const res = await fetch(`/api/papers/${paperId}/references`);
      const data = await res.json();
      setReferences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch references:", err);
    }
  }, [paperId]);

  useEffect(() => {
    if (paperId) fetchReferences();
  }, [paperId, fetchReferences]);

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
    schema,
    initialContent: initialContent || undefined,
    uploadFile,
  });

  // Custom Slash Menu items
  const slashMenuItems = useMemo(() => [
    ...getDefaultReactSlashMenuItems(editor),
    {
      title: "Citation",
      onItemClick: () => {
        if (!paperId) {
          alert("Please wait for the draft to be saved before adding citations.");
          return;
        }
        setIsReferenceManagerOpen(true);
      },
      aliases: ["cite", "reference", "apa"],
      group: "Advanced",
      icon: <FileSearch className="w-4 h-4" />,
    },
    {
      title: "References List",
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "referencesList" }],
          editor.getTextCursorPosition().block,
          "after"
        );
      },
      aliases: ["bib", "bibliography", "apa-list"],
      group: "Advanced",
      icon: <BookOpen className="w-4 h-4" />,
    }
  ], [editor, paperId]);

  const insertCitation = (ref: any) => {
    // Label for citation e.g. (Smith, 2023)
    const firstAuthor = ref.authors.split(',')[0].trim();
    const lastName = firstAuthor.split(' ').pop();
    const label = `(${lastName}, ${ref.year})`;

    editor.insertInlineContent([
      {
        type: "citation",
        props: {
          referenceId: ref.id,
          label: label,
        },
      },
    ]);
    setIsReferenceManagerOpen(false);
  };

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
    setBlocks(currentBlocks as Block[]);
    setLastSaved(new Date());
    if (onChange) {
      onChange(currentBlocks);
    }
  };

  // Sync initial content if editor is ready
  useEffect(() => {
    if (editor && editor.document) {
      setBlocks(editor.document as Block[]);
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
          <div className="flex items-center gap-3">
            {editable && (
              <button 
                onClick={() => setIsReferenceManagerOpen(true)}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 border-2 border-transparent hover:border-blue-300 transition-all font-ui font-black uppercase text-[10px] tracking-widest"
              >
                <FileSearch className="w-4 h-4" /> References
              </button>
            )}
            {editable && (
              <div className="word-count font-ui text-[10px] md:text-xs font-bold bg-black text-white px-2 py-1">
                {wordCount} WORDS
              </div>
            )}
          </div>
        </div>
        
        <div className="p-1 md:p-6 prose-slate max-w-none">
          <ReferencesContext.Provider value={{ references, refreshPool: fetchReferences }}>
            <BlockNoteView
              editor={editor}
              editable={editable}
              theme="light"
              sideMenu={false}
              onChange={handleOnChange}
              className="min-h-[50vh]"
              slashMenu={false} 
            >
              <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query) => 
                  slashMenuItems.filter((item) => 
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.aliases?.some(a => a.toLowerCase().includes(query.toLowerCase()))
                  )
                }
              />
            </BlockNoteView>
          </ReferencesContext.Provider>
        </div>
      </div>
      
      {editable && (
        <p className="mt-4 font-ui text-[10px] text-stone uppercase tracking-tighter opacity-70 text-center md:text-left">
          Tip: Use <span className="bg-black text-white px-1 font-bold italic">/</span> to open the command menu. Try <span className="underline">/citation</span> for APA references.
        </p>
      )}

      {/* Reference Manager Side Panel */}
      {paperId && (
        <ReferenceManager 
          paperId={paperId} 
          isOpen={isReferenceManagerOpen} 
          onClose={() => setIsReferenceManagerOpen(false)}
          onInsertCitation={insertCitation}
        />
      )}
    </div>
  );
};

export default BlockEditor;
