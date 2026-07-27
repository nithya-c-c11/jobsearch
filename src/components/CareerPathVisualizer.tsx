import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CAREER_PATHS_DATA,
  IndustryCareerPath,
  CareerTrack,
  CareerStage
} from '../data/careerPathsData';
import { MagneticButton } from './MagneticButton';
import {
  Code,
  Cpu,
  BarChart3,
  Wrench,
  Building,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Award,
  DollarSign,
  Clock,
  ChevronRight,
  Target,
  Lightbulb,
  Briefcase,
  Layers,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const getIndustryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code':
      return Code;
    case 'Cpu':
      return Cpu;
    case 'BarChart3':
      return BarChart3;
    case 'Wrench':
      return Wrench;
    case 'Building':
      return Building;
    default:
      return Sparkles;
  }
};

interface CareerPathVisualizerProps {
  onSelectIndustryJobs?: (industryName: string) => void;
  defaultIndustry?: string;
}

export const CareerPathVisualizer: React.FC<CareerPathVisualizerProps> = ({
  onSelectIndustryJobs,
  defaultIndustry
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCareerPath>(() => {
    if (defaultIndustry) {
      const match = CAREER_PATHS_DATA.find(
        (p) => p.industry.toLowerCase() === defaultIndustry.toLowerCase()
      );
      if (match) return match;
    }
    return CAREER_PATHS_DATA[0];
  });

  const [activeTrack, setActiveTrack] = useState<CareerTrack>(
    selectedIndustry.tracks[0] || CAREER_PATHS_DATA[0].tracks[0]
  );

  const [selectedStage, setSelectedStage] = useState<CareerStage | null>(
    activeTrack?.stages[0] || null
  );

  const handleIndustryChange = (ind: IndustryCareerPath) => {
    setSelectedIndustry(ind);
    setActiveTrack(ind.tracks[0]);
    setSelectedStage(ind.tracks[0]?.stages[0] || null);
  };

  const handleTrackChange = (track: CareerTrack) => {
    setActiveTrack(track);
    setSelectedStage(track.stages[0] || null);
  };

  // Chart data formatting for trajectory salary visualization
  const salaryChartData = activeTrack.stages.map((stage) => ({
    name: `Lvl ${stage.stageNumber}: ${stage.roleTitle.split(' ')[0]}`,
    fullRole: stage.roleTitle,
    salaryLpa: stage.avgSalaryLpa,
    timeline: stage.timeline
  }));

  const IndustryIcon = getIndustryIcon(selectedIndustry.iconName);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4 sm:px-6 py-6 text-slate-100">
      {/* HEADER SECTION */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/60 p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              3D Fresher Career Trajectory Engine
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Career Paths</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore step-by-step career progression from entry-level internships to executive leadership roles. Review required technical skills, salary expectations, and certifications for every stage.
            </p>
          </div>

          {onSelectIndustryJobs && (
            <MagneticButton
              onClick={() => onSelectIndustryJobs(selectedIndustry.industry)}
              magneticStrength={0.35}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-blue-500/25 flex items-center gap-2 self-start lg:self-center transition-all"
            >
              <Briefcase className="w-4 h-4 text-blue-200" />
              <span>Explore {selectedIndustry.industry} Postings</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          )}
        </div>

        {/* INDUSTRY SELECTOR PILLS */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" /> Select Target Industry Domain
          </p>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {CAREER_PATHS_DATA.map((ind) => {
              const IconComp = getIndustryIcon(ind.iconName);
              const isSelected = ind.industry === selectedIndustry.industry;
              return (
                <button
                  key={ind.industry}
                  onClick={() => handleIndustryChange(ind)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border transform-gpu ${
                    isSelected
                      ? 'bg-blue-600/25 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{ind.industry}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TRACK SWITCHER & INDUSTRY OVERVIEW CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Track Selection & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <IndustryIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedIndustry.industry}</h3>
                <span className="text-xs text-slate-400">
                  Entry Barrier: <span className="text-amber-400 font-bold">{selectedIndustry.entryBarrier}</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedIndustry.description}
            </p>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Top Hiring Companies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedIndustry.topHiringCompanies.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/80 text-[11px] font-semibold text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Track Selector */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-purple-400" /> Specialization Tracks
            </h4>

            <div className="space-y-2">
              {selectedIndustry.tracks.map((tr) => {
                const isSelected = tr.id === activeTrack.id;
                return (
                  <button
                    key={tr.id}
                    onClick={() => handleTrackChange(tr)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-bold flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/20 border-blue-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{tr.trackName}</p>
                      <p className="text-[11px] text-slate-400 font-normal line-clamp-2">{tr.description}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary Trajectory Curve Chart */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Compensation Curve (LPA)
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">Fresher to Executive</span>
            </div>

            <div className="h-44 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salaryChartData}>
                  <defs>
                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickFormatter={(val) => `₹${val}L`} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                    formatter={(value: any) => [`₹${value} LPA`, 'Average Salary']}
                  />
                  <Area
                    type="monotone"
                    dataKey="salaryLpa"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSalary)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3D FLOWCHART STAGES VIEW */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> {activeTrack.trackName} Roadmap
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click on any stage node below to view detailed skills, certifications & fresher tips
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold">
                {activeTrack.stages.length} Milestones
              </span>
            </div>

            {/* CONNECTED 3D NODE FLOWCHART */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-purple-600 before:rounded-full">
              {activeTrack.stages.map((stage, idx) => {
                const isSelected = selectedStage?.id === stage.id;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    onClick={() => setSelectedStage(stage)}
                    whileHover={{ scale: 1.015, x: 4 }}
                    className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all transform-gpu perspective-1000 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-blue-400 shadow-[0_10px_30px_rgba(59,130,246,0.25)] ring-2 ring-blue-500/50'
                        : 'bg-slate-950/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    {/* Glowing Node Dot Marker */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-6 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-blue-500 border-white text-white shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-125'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-extrabold">{stage.stageNumber}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                            Level {stage.stageNumber}: {stage.levelName}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-indigo-400" /> {stage.timeline}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-blue-300">
                          {stage.roleTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {stage.salaryRange}
                        </span>
                        <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-90 text-blue-400' : 'text-slate-600'}`} />
                      </div>
                    </div>

                    {/* Quick Preview Skills */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {stage.requiredSkills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* DETAILED INSPECTION DRAWER / PANEL FOR SELECTED STAGE */}
          <AnimatePresence mode="wait">
            {selectedStage && (
              <motion.div
                key={selectedStage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-blue-500/40 shadow-2xl space-y-6 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                      <Target className="w-4 h-4 text-amber-400" /> Stage {selectedStage.stageNumber} Deep-Dive
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">{selectedStage.roleTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Typical Timeline: {selectedStage.timeline}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-extrabold text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Compensation Band</p>
                    <p className="text-base text-emerald-400">{selectedStage.salaryRange}</p>
                  </div>
                </div>

                {/* Grid Responsibilities & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Responsibilities */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" /> Core Day-to-Day Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedStage.keyResponsibilities.map((resp, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills & Certs */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-400" /> Essential Technical Competencies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStage.requiredSkills.map((sk, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Award className="w-4 h-4 text-amber-400" /> Recommended Certifications
                      </h4>
                      <div className="space-y-1.5">
                        {selectedStage.recommendedCertifications.map((cert, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-200 font-semibold flex items-center gap-2"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fresher Pro Tip Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-blue-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                      Fresher Insider Strategy
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedStage.proTipForFreshers}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                {onSelectIndustryJobs && (
                  <div className="pt-2 flex justify-end">
                    <MagneticButton
                      onClick={() => onSelectIndustryJobs(selectedIndustry.industry)}
                      magneticStrength={0.35}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
                    >
                      <Search className="w-4 h-4" /> Search Jobs for {selectedStage.roleTitle}
                    </MagneticButton>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
