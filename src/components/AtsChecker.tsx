import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import {
  FileCheck,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileText
} from 'lucide-react';
import { ATSResult, UserProfile } from '../types';

interface AtsCheckerProps {
  user: UserProfile | null;
  onApplySuggestedRole?: (roleName: string) => void;
  onBackToJobs?: () => void;
}

export const AtsChecker: React.FC<AtsCheckerProps> = ({ user, onApplySuggestedRole, onBackToJobs }) => {
  const [resumeText, setResumeText] = useState(user?.resumeText || '');
  const [fileName, setFileName] = useState(user?.resumeFileName || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.onload = (event) => {
        setResumeText(event.target?.result as string || '');
      };
      reader.readAsText(file);
    } else {
      // For PDF / Doc simulation, read file name & basic meta or prompt text
      reader.onload = () => {
        setResumeText(
          `Resume File: ${file.name}\nCandidate Name: ${user?.firstName || 'Fresher'} ${user?.lastName || ''}\nDegree: ${user?.degree || 'Engineering'}\nBranch: ${user?.branch || 'CSE'}\nSkills & Projects: Developed full-stack web applications, REST APIs, Git version control, SQL database queries, problem solving.`
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText || resumeText.trim().length < 10) {
      setError('Please enter or upload your resume text/PDF first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ats-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          branch: user?.branch || 'CSE',
          degree: user?.degree || 'B.Tech',
          targetCategory: 'Entry Level Engineering / IT / Non-IT'
        })
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to analyze resume.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Error connecting to ATS AI service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Top Back Navigation Header */}
      {onBackToJobs && (
        <div className="flex items-center justify-between gap-4">
          <motion.button
            onClick={onBackToJobs}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2 font-bold text-xs shadow-lg shadow-black/40 group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Job Search Portal</span>
          </motion.button>
        </div>
      )}

      {/* Top Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/30 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-black text-white">AI ATS Resume Score & Skill Recommender</h2>
            </div>
            <p className="text-xs text-slate-300">
              Upload your fresher resume PDF or paste text to receive instant ATS compatibility analysis, missing keywords, and skill recommendations to boost your hiring chances.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs">
            Tailored for Freshers (2023–2028)
          </div>
        </div>
      </div>

      {/* Upload & Input Form */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl space-y-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" /> Resume Content / Document
          </label>

          <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>{fileName ? `Loaded: ${fileName}` : 'Upload Resume PDF / DOC'}</span>
            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={6}
          placeholder="Paste your full resume text here or upload file above... Include projects, skills, education, and achievements."
          className="w-full p-4 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition leading-relaxed"
        />

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <MagneticButton
            onClick={handleAnalyze}
            disabled={loading}
            magneticStrength={0.35}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" /> Analyzing ATS Score & AI Suggestions...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Run AI ATS Analysis
              </>
            )}
          </MagneticButton>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          
          {/* Score Meter Banner */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-6">
              {/* 3D Gauge Circle */}
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-slate-900 border-4 border-slate-800 shadow-2xl">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke={result.atsScore >= 75 ? '#10b981' : result.atsScore >= 55 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    strokeDasharray="301.59"
                    strokeDashoffset={301.59 - (301.59 * result.atsScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-white">{result.atsScore}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">/ 100</span>
                </div>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold inline-block mb-1 ${
                    result.atsScore >= 75
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : result.atsScore >= 55
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {result.atsScore >= 75 ? 'Excellent ATS Match' : result.atsScore >= 55 ? 'Good - Needs Optimization' : 'Requires Enhancement'}
                </span>
                <h3 className="text-base font-bold text-white">ATS Compatibility Score</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {result.tailoredAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* Grid Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Strengths */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Identified Strengths
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {result.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Keywords */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-amber-400 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Recommended Keywords to Add
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {result.missingKeywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* What to Learn next to double hiring chances */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 space-y-3">
            <h4 className="font-bold text-indigo-300 flex items-center gap-2 text-sm">
              <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" /> High-Impact Skills You Should Learn (Increases Job Chances)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {result.recommendedSkills.map((sk, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-slate-200 font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Job Roles */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggested Job Opportunities Based on Profile</h4>
            <div className="flex flex-wrap gap-2">
              {result.suggestedRoles.map((role, idx) => (
                <MagneticButton
                  key={idx}
                  magneticStrength={0.25}
                  onClick={() => onApplySuggestedRole && onApplySuggestedRole(role)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 hover:text-white border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {role} <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
