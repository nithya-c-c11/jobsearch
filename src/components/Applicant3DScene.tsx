import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, User, Award, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface Applicant3DSceneProps {
  candidateName?: string;
  onComplete?: () => void;
}

export const Applicant3DScene: React.FC<Applicant3DSceneProps> = ({
  candidateName = 'Fresher Candidate',
  onComplete
}) => {
  const [step, setStep] = useState(0); // 0: Start, 1: Walking, 2: Presenting Resume, 3: Approved
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 3) {
          setIsAutoPlaying(false);
          if (onComplete) onComplete();
          return 3;
        }
        return prev + 1;
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [isAutoPlaying, onComplete]);

  return (
    <TiltCard glowColor="rgba(99, 102, 241, 0.25)">
      <div className="relative w-full min-w-0 max-w-full rounded-3xl bg-slate-900/90 border border-slate-800/90 p-5 md:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Background ambient glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Header Info */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-6 z-10 relative"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="text-lg font-black text-white">3D Candidate Interview Pathway</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live interactive journey of <span className="text-blue-400 font-semibold">{candidateName}</span> presenting credentials to recruiter desk.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setStep(0); setIsAutoPlaying(true); }}
              className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              Replay Journey
            </button>
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
            >
              Next Phase <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stage Visual Container */}
        <div
          className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-between px-6 sm:px-12 md:px-20"
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        >
          {/* Isometric Pathway Grid Lines */}
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="200" x2="100%" y2="200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="0" y1="230" x2="100%" y2="230" stroke="#6366f1" strokeWidth="1" />
            </svg>
          </div>

          {/* CANDIDATE CHARACTER */}
          <motion.div
            animate={{
              x: step === 0 ? 0 : step === 1 ? 100 : step === 2 ? 180 : 180,
              scale: step === 3 ? 1.05 : 1
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="relative z-10 flex flex-col items-center"
            style={{ transform: 'translateZ(40px)' }}
          >
            {/* Resume Icon Held in Hand */}
            <motion.div
              animate={{
                rotate: [0, -8, 8, 0],
                y: [0, -4, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="relative -mb-2 z-20 flex items-center justify-center w-8 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold shadow-lg shadow-amber-500/30 text-[10px]"
            >
              <FileText className="w-5 h-5 text-slate-900" />
            </motion.div>

            {/* Candidate Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-0.5 shadow-2xl shadow-blue-500/30 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                <User className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <span className="text-xs font-bold text-slate-200 mt-2 bg-slate-800/90 px-3 py-0.5 rounded-full border border-slate-700 shadow-md">
              {candidateName}
            </span>
            <span className="text-[10px] text-blue-400 font-mono mt-0.5">Fresher Applicant</span>
          </motion.div>

          {/* INTERVIEWER DESK & INTERVIEWER */}
          <div className="relative z-10 flex flex-col items-center" style={{ transform: 'translateZ(40px)' }}>
            {/* Status Badge popup when step === 3 */}
            {step === 3 && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="absolute -top-14 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs shadow-xl shadow-emerald-500/20 whitespace-nowrap"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" /> Profile Verified & Shortlisted!
              </motion.div>
            )}

            {/* Interviewer Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-2xl shadow-purple-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <span className="text-xs font-bold text-slate-200 mt-2 bg-slate-800/90 px-3 py-0.5 rounded-full border border-slate-700 shadow-md">
              Hiring Panel
            </span>
            <span className="text-[10px] text-purple-400 font-mono mt-0.5">Tech Evaluation Desk</span>
          </div>
        </div>

        {/* Steps Indicator */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center"
          style={{ transform: 'translateZ(20px)' }}
        >
          {[
            { label: '1. Prepare Resume', desc: 'Document verified' },
            { label: '2. Walk to Desk', desc: 'In movement' },
            { label: '3. Hand Resume', desc: 'Under review' },
            { label: '4. Verified Match', desc: 'Ready for interview' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => { setStep(idx); setIsAutoPlaying(false); }}
              className={`cursor-pointer p-2.5 rounded-xl border text-left transition ${
                step >= idx
                  ? 'bg-blue-950/50 border-blue-500/60 text-blue-200 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500'
              }`}
            >
              <p className="text-xs font-bold">{item.label}</p>
              <p className="text-[10px] opacity-75 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </TiltCard>
  );
};
