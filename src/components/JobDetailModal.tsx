import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Job, UserProfile } from '../types';
import { formatSalaryInRupees } from './JobCard';
import { MagneticButton } from './MagneticButton';
import {
  X,
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  ExternalLink,
  Phone,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  TrendingUp
} from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  user: UserProfile | null;
  onClose: () => void;
  onApply: (job: Job) => void;
  isApplied: boolean;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
  onExploreCareerPath?: (industry: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  user,
  onClose,
  onApply,
  isApplied,
  isSaved = false,
  onToggleSave,
  onExploreCareerPath
}) => {
  const [applying, setApplying] = useState(false);

  if (!job) return null;

  const handleApplyClick = async () => {
    setApplying(true);
    await onApply(job);
    setApplying(false);
  };

  const formattedSalary = formatSalaryInRupees(job.salary);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto">
      {/* Subtle 3D Gradient Border Glow Container */}
      <div className="relative w-full max-w-2xl p-[1px] rounded-3xl bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-indigo-500/20 shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)] my-8">
        
        <div className="relative w-full bg-slate-900/95 rounded-[23px] p-6 md:p-8 shadow-2xl overflow-hidden backdrop-blur-2xl border border-slate-800/80">
          
          {/* Subtle Ambient Background Aura */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Go Back Navigation Header */}
          <div className="flex items-center justify-between gap-4 mb-6 relative z-10 pb-4 border-b border-slate-800/80">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-2 font-bold text-xs border border-slate-700/60 shadow-lg group"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back to Job Postings</span>
            </motion.button>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              title="Close Modal"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/50 shadow-md"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-xl flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-blue-400" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  {job.category === 'internship' ? 'Internship Opportunity' : job.isWalkin ? 'Walk-In Drive' : 'Full-Time Entry Role'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Batch {job.year}
                </span>
                {onExploreCareerPath && (
                  <button
                    onClick={() => {
                      onExploreCareerPath(job.industry);
                      onClose();
                    }}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition flex items-center gap-1 cursor-pointer"
                    title={`View 3D Career Path Trajectory for ${job.industry}`}
                  >
                    <TrendingUp className="w-3 h-3 text-amber-400" /> Career Path: {job.industry}
                  </button>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white">{job.title}</h2>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300 mt-1">
                <span className="font-bold text-blue-300 flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-blue-400" /> {job.company}
                </span>
                {job.companyUrl && (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Visit Official Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs relative z-10">
            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
              <span className="text-slate-500 font-mono block mb-0.5">Salary Package</span>
              <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-emerald-400" /> {formattedSalary}
              </span>
            </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-0.5">Job Location</span>
            <span className="text-slate-200 font-semibold flex items-center gap-1">
              <MapPin className="w-4 h-4 text-indigo-400" /> {job.location}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-500 font-mono block mb-0.5">Last Date to Apply</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Calendar className="w-4 h-4 text-amber-400" /> {job.lastDate || 'Not Mandatory'}
            </span>
          </div>
        </div>

        {/* Walkin Venue (if applicable) */}
        {job.isWalkin && job.walkinVenue && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-6">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
              <MapPin className="w-4 h-4 text-amber-400" /> Direct Walk-In Interview Details
            </h4>
            <p className="text-xs text-slate-200">
              <strong className="text-white">Date:</strong> {job.walkinDate || 'Upcoming'}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              <strong className="text-white">Venue:</strong> {job.walkinVenue}
            </p>
          </div>
        )}

        {/* Required Eligibility & Branches */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-400" /> Eligible Branches & Degrees
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {job.branches.map((b) => (
                <span key={b} className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  {b}
                </span>
              ))}
              {job.degrees.map((d) => (
                <span key={d} className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Key Required Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* HR Direct Phone */}
          {job.hrPhone && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">HR / Recruiter Direct Contact</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{job.hrPhone}</span>
              </div>
              <a
                href={`tel:${job.hrPhone}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/40 text-xs font-bold flex items-center gap-1 transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call HR
              </a>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Overview & Responsibilities</h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed text-slate-300 whitespace-pre-line">
              {job.description}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors border border-slate-700/60 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Go Back</span>
            </motion.button>

            {onToggleSave && (
              <motion.button
                onClick={() => onToggleSave(job.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md ${
                  isSaved
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400/30" /> Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" /> Save Job
                  </>
                )}
              </motion.button>
            )}

            <motion.a
              href={job.applyLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors border border-slate-800 shadow-md"
            >
              Direct Careers Link <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </motion.a>
          </div>

          {isApplied ? (
            <span className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-bold flex items-center gap-2 shadow-inner">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Application Submitted
            </span>
          ) : (
            <MagneticButton
              onClick={handleApplyClick}
              disabled={applying}
              magneticStrength={0.4}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {applying ? 'Submitting...' : 'Apply via Portal'}
            </MagneticButton>
          )}
        </div>
      </div>
    </div>
  </div>
);
};
