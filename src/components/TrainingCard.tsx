import React from 'react';
import { TrainingCenter } from '../types';
import { TiltCard } from './TiltCard';
import { MapPin, Phone, GraduationCap, ArrowUpRight, BookOpen, Award } from 'lucide-react';

interface TrainingCardProps {
  center: TrainingCenter;
  onClick: (center: TrainingCenter) => void;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ center, onClick }) => {
  return (
    <TiltCard onClick={() => onClick(center)} glowColor="rgba(168, 85, 247, 0.3)" className="h-full">
      <div className="relative w-full h-full min-w-0 max-w-full rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/60 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300">
        
        {/* Ambient background blur accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full min-w-0">
          {/* Badge & Arrow */}
          <div
            className="flex items-start justify-between gap-2 mb-3 w-full"
            style={{ transform: 'translateZ(25px)' }}
          >
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider whitespace-nowrap">
              Training & Placement Hub
            </span>

            <div className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 group-hover:text-purple-400 group-hover:bg-purple-600/20 transition flex-shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Title & Institute */}
          <div style={{ transform: 'translateZ(35px)' }} className="w-full min-w-0 mb-3">
            <h3 className="text-base font-black text-white group-hover:text-purple-300 transition line-clamp-2 leading-tight break-words">
              {center.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 min-w-0">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span className="font-semibold text-purple-300 truncate">{center.instituteName}</span>
            </div>
          </div>

          {/* Fee & Placement Package structure */}
          <div
            className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs mb-3 flex items-center justify-between gap-2 w-full min-w-0"
            style={{ transform: 'translateZ(22px)' }}
          >
            <span className="text-slate-400 text-[11px]">Course Fee Structure</span>
            <span className="text-emerald-400 font-bold truncate">{center.fee}</span>
          </div>

          {/* Courses pills */}
          <div className="mb-3 w-full min-w-0" style={{ transform: 'translateZ(18px)' }}>
            <span className="text-[10px] font-mono text-slate-500 block mb-1">Key Courses Covered</span>
            <div className="flex flex-wrap gap-1 w-full min-w-0">
              {center.courses.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-medium text-slate-300 border border-slate-700/60 truncate max-w-[130px]"
                >
                  {c}
                </span>
              ))}
              {center.courses.length > 3 && (
                <span className="text-[10px] text-slate-500 font-bold self-center">
                  +{center.courses.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div
          className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 w-full min-w-0 gap-2"
          style={{ transform: 'translateZ(18px)' }}
        >
          <div className="flex items-center gap-1 min-w-0 truncate">
            <MapPin className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span className="truncate">{center.location}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-300 font-mono text-[10px] flex-shrink-0 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Contact Hub</span>
          </div>
        </div>

      </div>
    </TiltCard>
  );
};
