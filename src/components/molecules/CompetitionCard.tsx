import React from "react";
import { Trophy, Calendar, Users, ArrowRight } from "lucide-react";
import { MetaText } from "../atoms/Typography";
import { Button } from "../atoms/Button";
import clsx from "clsx";
import { motion } from "framer-motion";

interface CompetitionCardProps {
  title: string;
  description: string;
  type: string;
  fee: string;
  endDate: string;
  participants?: number;
  imageUrl?: string;
  prize?: string;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({
  title,
  description,
  type,
  fee,
  endDate,
  participants,
  imageUrl,
  prize,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white border border-black/5 overflow-hidden transition-all duration-500 hover:border-black/20 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Background Image Overlay */}
      {imageUrl && (
        <div className="absolute inset-0 opacity-[0.03] grayscale transition-all duration-700 group-hover:opacity-[0.07] group-hover:scale-110">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-black text-white px-3 py-1">
            <MetaText className="text-[8px] text-white">{type}</MetaText>
          </div>
          {prize && (
            <div className="flex items-center gap-2 text-black/40">
              <Trophy size={14} />
              <span className="font-ui text-[10px] uppercase tracking-widest font-bold">{prize}</span>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-black transition-colors">
          {title}
        </h3>
        
        <p className="font-serif italic text-[#8E8E8E] text-sm leading-relaxed mb-8 line-clamp-2">
          "{description}"
        </p>

        <div className="mt-auto space-y-4">
          <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
            <div className="flex flex-col gap-1">
              <MetaText className="opacity-40">Deadline</MetaText>
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-black/60" />
                <span className="text-xs font-bold">{endDate}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <MetaText className="opacity-40">Entry Fee</MetaText>
              <span className="text-xs font-bold uppercase">{fee}</span>
            </div>
          </div>

          <Button variant="tiller" size="sm" className="w-full group/btn py-4">
            <span className="relative z-10 flex items-center gap-2">
              Join Competition <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface EntryCardProps {
  title: string;
  submittedAt: string;
  status: "SUBMITTED" | "WINNER" | "DISQUALIFIED" | "UNDER_REVIEW";
  paperTitle: string;
}

export const CompetitionEntryCard: React.FC<EntryCardProps> = ({
  title,
  submittedAt,
  status,
  paperTitle,
}) => {
  const statusColors = {
    SUBMITTED: "bg-blue-50 text-blue-600 border-blue-100",
    WINNER: "bg-gold-50 text-amber-600 border-amber-100", // Need to ensure gold isn't too flashy
    DISQUALIFIED: "bg-red-50 text-red-600 border-red-100",
    UNDER_REVIEW: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white/40 border border-black/5 hover:bg-white/60 transition-colors group">
      <div className="space-y-1">
        <h4 className="font-bold uppercase tracking-tight text-lg">{title}</h4>
        <div className="flex items-center gap-3">
          <MetaText className="opacity-40">Paper: {paperTitle}</MetaText>
          <span className="w-1 h-1 rounded-full bg-black/10" />
          <MetaText className="opacity-40">{submittedAt}</MetaText>
        </div>
      </div>
      
      <div className={clsx(
        "px-4 py-1.5 border text-[10px] font-bold uppercase tracking-widest",
        status === "SUBMITTED" && "bg-black/5 border-black/10 text-black/60",
        status === "WINNER" && "bg-black text-white border-black"
      )}>
        {status.replace("_", " ")}
      </div>
    </div>
  );
};
