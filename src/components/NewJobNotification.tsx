import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../types';
import { Sparkles, Building2, MapPin, ArrowRight, X, Bell, Briefcase } from 'lucide-react';
import { formatSalaryInRupees } from './JobCard';
import { MagneticButton } from './MagneticButton';

interface NewJobNotificationProps {
  job: Job | null;
  onClose: () => void;
  onViewJob: (job: Job) => void;
  autoHideDuration?: number; // in ms
}

export const NewJobNotification: React.FC<NewJobNotificationProps> = ({
  job,
  onClose,
  onViewJob,
  autoHideDuration = 9000
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!job) return;

    setProgress(100);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPercent = Math.max(0, 100 - (elapsed / autoHideDuration) * 100);
      setProgress(remainingPercent);

      if (remainingPercent <= 0) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [job, autoHideDuration, onClose]);

  return (
    <AnimatePresence>
      {job && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full px-4 sm:px-0 pointer-events-auto perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.82, rotateX: 25, rotateY: -12 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              transition: {
                type: 'spring',
                stiffness: 320,
                damping: 22,
                mass: 0.8
              }
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.85,
              rotateX: -15,
              transition: { duration: 0.25, ease: 'easeIn' }
            }}
            whileHover={{
              scale: 1.02,
              rotateY: 3,
              rotateX: -2,
              boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.45)'
            }}
            className="relative overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-blue-500/40 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white group transform-gpu transition-all"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top Glowing Ambient Light Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-400/40 transition-all duration-500" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-indigo-500/25 rounded-full blur-xl pointer-events-none" />

            {/* Header / Badge */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" /> New Matching Opportunity
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Job Content Details */}
            <div className="space-y-2 mb-3.5">
              <h4 className="text-sm font-extrabold text-white leading-tight line-clamp-1 group-hover:text-blue-300 transition-colors">
                {job.title}
              </h4>

              <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                <span className="font-semibold text-slate-200 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" /> {job.company}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> {job.location || 'Remote / Hybrid'}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                  {formatSalaryInRupees(job.salary)}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300">
                  Batch: {job.years ? job.years.join(', ') : job.year}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <MagneticButton
                onClick={() => {
                  onViewJob(job);
                  onClose();
                }}
                magneticStrength={0.3}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/30 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>View Job Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>

              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Dismiss
              </button>
            </div>

            {/* Countdown Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
