import React from 'react';
import { motion } from 'motion/react';
import { Job } from '../types';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import {
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  ArrowUpRight,
  Phone,
  Clock,
  GraduationCap,
  Briefcase,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

export const formatSalaryInRupees = (salaryStr?: string): string => {
  if (!salaryStr) return '₹ Not disclosed';
  const trimmed = salaryStr.trim();
  if (trimmed.startsWith('₹') || trimmed.toLowerCase().includes('rs') || trimmed.toLowerCase().includes('inr')) {
    return trimmed;
  }
  return `₹${trimmed}`;
};

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  isSaved?: boolean;
  onToggleSave?: (jobId: string, e: React.MouseEvent) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, isSaved = false, onToggleSave }) => {
  const isWalkin = job.isWalkin || job.category === 'walkin';
  const targetYears = job.years && job.years.length > 0 ? job.years : [job.year];
  const targetBranches = job.branches && job.branches.length > 0 ? job.branches : ['CSE'];
  const targetDegrees = job.degrees && job.degrees.length > 0 ? job.degrees : ['B.Tech'];

  const formattedSalary = formatSalaryInRupees(job.salary);

  const glowColor =
    job.category === 'internship'
      ? 'rgba(168, 85, 247, 0.3)'
      : isWalkin
      ? 'rgba(245, 158, 11, 0.3)'
      : 'rgba(59, 130, 246, 0.3)';

  return (
    <TiltCard onClick={() => onClick(job)} glowColor={glowColor} className="h-full">
      <div className="relative w-full h-full min-w-0 max-w-full rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/60 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300">
        
        {/* Subtle background ambient 3D gradient aura */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full min-w-0">
          {/* Top Badges Row */}
          <div
            className="flex flex-wrap items-center justify-between gap-2 mb-3 w-full"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-full">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shadow-sm ${
                  job.category === 'internship'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : isWalkin
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}
              >
                {job.category === 'internship' ? 'Internship' : isWalkin ? 'Walk-In Drive' : 'Full-Time Job'}
              </span>

              {/* Target Batch Years Pill */}
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800/90 text-slate-200 border border-slate-700/80 whitespace-nowrap">
                Batch {targetYears.join(', ')}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {onToggleSave && (
                <MagneticButton
                  type="button"
                  magneticStrength={0.3}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(job.id, e);
                  }}
                  className={`p-1.5 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-slate-800/80 text-slate-400 hover:text-amber-300 border-slate-700/80'
                  }`}
                  title={isSaved ? 'Remove from Saved Jobs' : 'Save Job Bookmark'}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/30" /> : <Bookmark className="w-4 h-4" />}
                </MagneticButton>
              )}
              <div className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-600/20 transition flex-shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Job Title & Company */}
          <div style={{ transform: 'translateZ(35px)' }} className="w-full min-w-0 mb-3">
            <h3 className="text-base font-black text-white group-hover:text-blue-300 transition line-clamp-2 leading-tight break-words">
              {job.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 flex-wrap min-w-0">
              <span className="flex items-center gap-1 font-semibold text-blue-400 min-w-0 truncate">
                <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{job.company}</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 truncate max-w-[120px]">{job.industry}</span>
            </div>
          </div>

          {/* Degrees & Branches Badges */}
          <div
            className="flex flex-wrap gap-1 mb-3 text-[10px] text-slate-300 w-full min-w-0"
            style={{ transform: 'translateZ(20px)' }}
          >
            <span className="px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 font-medium flex items-center gap-1 truncate max-w-full">
              <GraduationCap className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{targetDegrees.join(', ')}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30 font-medium flex items-center gap-1 truncate max-w-full">
              <Briefcase className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{targetBranches.join(', ')}</span>
            </span>
          </div>

          {/* Salary & Location Cards Grid */}
          <div
            className="grid grid-cols-2 gap-2 text-xs mb-3 w-full min-w-0"
            style={{ transform: 'translateZ(22px)' }}
          >
            <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="font-bold text-slate-200 truncate text-[11px] sm:text-xs">
                {formattedSalary}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800/80 flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="text-slate-300 truncate text-[11px] sm:text-xs">
                {job.location}
              </span>
            </div>
          </div>

          {/* Required Skills Pills */}
          <div
            className="flex flex-wrap gap-1 mb-3 w-full min-w-0"
            style={{ transform: 'translateZ(15px)' }}
          >
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-medium text-slate-300 border border-slate-700/60 truncate max-w-[120px]"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-[10px] text-slate-500 font-bold self-center">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Details (Floats at translateZ 18px) */}
        <div
          className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 w-full min-w-0 gap-2"
          style={{ transform: 'translateZ(18px)' }}
        >
          <div className="flex items-center gap-1 text-slate-400 min-w-0 truncate">
            <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">
              {job.lastDate ? `Last Date: ${job.lastDate}` : 'Open Enrollment'}
            </span>
          </div>

          {job.hrPhone ? (
            <div className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] font-bold flex-shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>Direct HR</span>
            </div>
          ) : (
            <span className="text-[10px] text-blue-400 font-semibold underline flex-shrink-0">
              Direct Apply
            </span>
          )}
        </div>

      </div>
    </TiltCard>
  );
};
