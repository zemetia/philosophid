"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  X, 
  BookOpen, 
  Link as LinkIcon, 
  FileText, 
  Globe, 
  ChevronRight,
  Search,
  CheckCircle2,
  FileSearch,
  ArrowLeft,
  GraduationCap,
  MessageSquare
} from "lucide-react";
import { ReferenceSourceType } from "@prisma/client";
import { Button } from "../atoms/Button";

const REFERENCE_SOURCE_TYPES: ReferenceSourceType[] = [
  ReferenceSourceType.BOOK,
  ReferenceSourceType.JOURNAL_ARTICLE,
  ReferenceSourceType.WEBSITE,
  ReferenceSourceType.CONFERENCE_PROCEEDING,
  ReferenceSourceType.REPORT,
  ReferenceSourceType.THESIS,
];

interface Reference {
  id: string;
  type: ReferenceSourceType;
  authors: string;
  year: number;
  title: string;
  sourceName: string;
  url?: string | null;
  internalLabel: string;
}

interface ReferenceManagerProps {
  paperId: string;
  isOpen: boolean;
  onClose: () => void;
  onInsertCitation?: (ref: Reference) => void;
}

const SOURCE_ICONS = {
  [ReferenceSourceType.BOOK]: <BookOpen className="w-4 h-4" />,
  [ReferenceSourceType.JOURNAL_ARTICLE]: <FileSearch className="w-4 h-4" />,
  [ReferenceSourceType.WEBSITE]: <Globe className="w-4 h-4" />,
  [ReferenceSourceType.CONFERENCE_PROCEEDING]: <MessageSquare className="w-4 h-4" />,
  [ReferenceSourceType.REPORT]: <FileText className="w-4 h-4" />,
  [ReferenceSourceType.THESIS]: <GraduationCap className="w-4 h-4" />,
};

const ReferenceManager = ({ paperId, isOpen, onClose, onInsertCitation }: ReferenceManagerProps) => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"LIST" | "ADD" | "EDIT">("LIST");
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<{
    type: ReferenceSourceType;
    authors: string;
    year: number;
    title: string;
    sourceName: string;
    url: string;
  }>({
    type: ReferenceSourceType.WEBSITE,
    authors: "",
    year: new Date().getFullYear(),
    title: "",
    sourceName: "",
    url: "",
  });

  const fetchReferences = useCallback(async () => {
    if (!paperId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/papers/${paperId}/references`);
      const data = await res.json();
      setReferences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch references:", err);
    } finally {
      setIsLoading(false);
    }
  }, [paperId]);

  useEffect(() => {
    if (isOpen && paperId) {
      fetchReferences();
    }
  }, [isOpen, paperId, fetchReferences]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/papers/${paperId}/references`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setView("LIST");
        fetchReferences();
        setFormData({
          type: ReferenceSourceType.WEBSITE,
          authors: "",
          year: new Date().getFullYear(),
          title: "",
          sourceName: "",
          url: "",
        });
      }
    } catch (err) {
      console.error("Failed to add reference:", err);
    }
  };

  const handleDelete = async (refId: string) => {
    if (!confirm("Are you sure you want to remove this reference?")) return;
    try {
      await fetch(`/api/papers/${paperId}/references/${refId}`, { method: "DELETE" });
      fetchReferences();
    } catch (err) {
      console.error("Failed to delete reference:", err);
    }
  };

  // Extract Short APA Label: (Smith, 2023)
  const getAPALabel = (ref: Reference) => {
    const firstAuthor = ref.authors.split(',')[0].trim();
    const lastName = firstAuthor.split(' ').pop();
    return `(${lastName}, ${ref.year})`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]"
          />
          
          {/* Side Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F9F8F6] shadow-2xl z-[101] flex flex-col border-l-2 border-black"
          >
            {/* Header */}
            <div className="p-6 border-b-2 border-black bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-ui font-black uppercase tracking-tighter text-xl">References</h3>
                  <p className="font-ui text-[10px] text-stone-500 uppercase tracking-widest">APA 7th Edition</p>
                </div>
              </div>
              <button onClick={onClose} className="hover:bg-black/5 p-2 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {view === "LIST" && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-ui font-bold text-xs uppercase tracking-widest text-stone-400">Your Pool ({references.length})</p>
                    <Button 
                      size="sm" 
                      onClick={() => setView("ADD")}
                      className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> New
                    </Button>
                  </div>

                  {isLoading ? (
                    <div className="flex flex-col gap-3">
                      {[1, 2, 3].map(i => <div key={i} className="h-24 bg-black/5 animate-pulse border border-black/10" />)}
                    </div>
                  ) : references.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center gap-4 border-2 border-dashed border-black/10">
                      <BookOpen className="w-12 h-12 text-black/10" />
                      <p className="font-serif italic text-stone-400 text-sm">No references added yet.</p>
                    </div>
                  ) : (
                    references.map(ref => (
                      <div 
                        key={ref.id} 
                        className="group bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col gap-2"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-1.5 text-[10px] font-ui font-black text-stone-400 uppercase tracking-widest">
                            {SOURCE_ICONS[ref.type]} {ref.type.replace('_', ' ')}
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleDelete(ref.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-lg leading-tight">{ref.title}</h4>
                        <p className="text-xs text-stone-600 font-serif italic">{ref.authors} ({ref.year})</p>
                        
                        <div className="mt-2 flex items-center gap-2 pt-3 border-t border-dotted border-black/10">
                          {onInsertCitation && (
                            <button 
                              onClick={() => onInsertCitation(ref)}
                              className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 font-ui font-black uppercase text-[10px] tracking-widest hover:bg-stone-800 transition-colors"
                            >
                              <Plus className="w-3 h-3" /> Cite in text
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {view === "ADD" && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                  <button 
                    onClick={() => setView("LIST")}
                    className="flex items-center gap-2 text-stone-400 hover:text-black transition-colors font-ui text-[10px] font-black uppercase tracking-widest"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to List
                  </button>

                  <form onSubmit={handleAdd} className="flex flex-col gap-5">
                    <div className="space-y-1.5">
                      <label className="font-ui font-black text-[10px] uppercase tracking-widest block">Resource Type</label>
                      <select 
                        className="w-full bg-white border-2 border-black p-3 font-ui text-sm focus:bg-stone-50 transition-colors outline-none cursor-pointer"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value as ReferenceSourceType})}
                      >
                        {REFERENCE_SOURCE_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t.replace(/_/g, " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-ui font-black text-[10px] uppercase tracking-widest block">Author(s)</label>
                      <input 
                        type="text" 
                        placeholder="Smith, A., Jones, B." 
                        required
                        className="w-full bg-white border-2 border-black p-3 font-ui text-sm placeholder:text-stone-300 outline-none focus:bg-stone-50 transition-colors"
                        value={formData.authors}
                        onChange={e => setFormData({...formData, authors: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 space-y-1.5">
                        <label className="font-ui font-black text-[10px] uppercase tracking-widest block">Year</label>
                        <input 
                          type="number" 
                          required
                          className="w-full bg-white border-2 border-black p-3 font-ui text-sm outline-none focus:bg-stone-50 transition-colors"
                          value={formData.year}
                          onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                        />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="font-ui font-black text-[10px] uppercase tracking-widest block">Source / Publisher / Journal</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Oxford Press" 
                          required
                          className="w-full bg-white border-2 border-black p-3 font-ui text-sm placeholder:text-stone-300 outline-none focus:bg-stone-50 transition-colors"
                          value={formData.sourceName}
                          onChange={e => setFormData({...formData, sourceName: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-ui font-black text-[10px] uppercase tracking-widest block">Title</label>
                      <textarea 
                        placeholder="Full title of the work..." 
                        required
                        rows={2}
                        className="w-full bg-white border-2 border-black p-3 font-serif text-sm placeholder:text-stone-300 outline-none focus:bg-stone-50 transition-colors resize-none"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-ui font-black text-[10px] uppercase tracking-widest block">URL / DOI (Optional)</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="https://..." 
                          className="w-full bg-white border-2 border-black p-3 pl-10 font-ui text-sm placeholder:text-stone-300 outline-none focus:bg-stone-50 transition-colors"
                          value={formData.url}
                          onChange={e => setFormData({...formData, url: e.target.value})}
                        />
                        <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="mt-4 bg-black text-white p-4 font-ui font-black uppercase text-xs tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                      Save Reference
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t-2 border-black text-center">
              <p className="font-ui text-[9px] text-stone-300 uppercase tracking-widest">
                Philosophid Referencing engine v1.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReferenceManager;
