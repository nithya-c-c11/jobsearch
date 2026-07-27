import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { UserProfile } from '../types';
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  Award,
  Link,
  Github,
  Linkedin,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Plus,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export interface ProfileCompletionDetails {
  score: number;
  level: string;
  badgeColor: string;
  items: {
    key: string;
    label: string;
    weight: number;
    completed: boolean;
    proTip: string;
    docRequirement?: string;
  }[];
}

export function calculateProfileCompletion(user: UserProfile | null): ProfileCompletionDetails {
  if (!user) {
    return {
      score: 0,
      level: 'Unregistered',
      badgeColor: 'text-slate-400 bg-slate-800 border-slate-700',
      items: []
    };
  }

  const items = [
    {
      key: 'basic',
      label: 'Full Name & Contact Info',
      weight: 10,
      completed: Boolean(user.firstName && user.lastName && user.email && user.phone),
      proTip: 'Ensure your phone number and email are active for direct HR interview callbacks.'
    },
    {
      key: 'academic',
      label: 'Degree & Specialization Branch',
      weight: 10,
      completed: Boolean(user.degree && user.branch),
      proTip: 'Selecting your exact degree and engineering branch unlocks personalized job match alerts.'
    },
    {
      key: 'resume',
      label: 'Uploaded ATS Resume (PDF/DOC)',
      weight: 20,
      completed: Boolean(user.resumeFileName && user.resumeFileName.length > 0),
      proTip: 'Upload an updated ATS-friendly PDF resume to appear in recruiter keyword filters.',
      docRequirement: 'Resume PDF'
    },
    {
      key: 'bgDoc',
      label: 'Background Verification Doc / College ID',
      weight: 15,
      completed: Boolean(user.bgDocFileName && user.bgDocFileName.length > 0),
      proTip: 'Upload your Degree Certificate or Student ID card to get the "Verified Candidate" badge.',
      docRequirement: 'Degree Certificate or Student ID'
    },
    {
      key: 'certifications',
      label: 'Technical Certifications & Badges',
      weight: 15,
      completed: Boolean(user.certifications && user.certifications.length > 0),
      proTip: 'Upload AWS, React, Python, Java, or NPTEL certifications to increase recruiter visibility by 3x.',
      docRequirement: 'Specific Technical Certifications (AWS, Java, Full-Stack, GCP, etc.)'
    },
    {
      key: 'cgpa',
      label: 'Academic CGPA / Marks Percentage',
      weight: 15,
      completed: Boolean(user.cgpa && user.cgpa.length > 0),
      proTip: 'Many top MNCs filter candidates by 60%+ or 6.5+ CGPA criteria.'
    },
    {
      key: 'social',
      label: 'LinkedIn, GitHub & Portfolio Links',
      weight: 15,
      completed: Boolean(user.linkedInUrl || user.githubUrl || user.portfolioUrl),
      proTip: 'Add your LinkedIn, GitHub, or Personal Portfolio website link so hiring managers can directly review candidate profiles.'
    }
  ];

  const score = items.reduce((acc, item) => acc + (item.completed ? item.weight : 0), 0);

  let level = 'Starter Candidate';
  let badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  if (score >= 90) {
    level = 'Verified Recruiter All-Star';
    badgeColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40';
  } else if (score >= 70) {
    level = 'Pro Candidate';
    badgeColor = 'text-blue-300 bg-blue-500/20 border-blue-500/40';
  } else if (score >= 45) {
    level = 'Active Candidate';
    badgeColor = 'text-purple-300 bg-purple-500/20 border-purple-500/40';
  }

  return { score, level, badgeColor, items };
}

interface ProfileCompletionWidgetProps {
  user: UserProfile | null;
  onUpdateProfile?: (updatedFields: Partial<UserProfile>) => void;
  compact?: boolean;
}

export const ProfileCompletionWidget: React.FC<ProfileCompletionWidgetProps> = ({
  user,
  onUpdateProfile,
  compact = false
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCert, setNewCert] = useState('');
  const [cgpa, setCgpa] = useState(user?.cgpa || '');
  const [linkedInUrl, setLinkedInUrl] = useState(user?.linkedInUrl || '');
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || '');
  const [certDocFileName, setCertDocFileName] = useState(user?.certDocFileName || '');
  const [certificationsList, setCertificationsList] = useState<string[]>(user?.certifications || []);
  const [resumeName, setResumeName] = useState(user?.resumeFileName || '');
  const [bgDocName, setBgDocName] = useState(user?.bgDocFileName || '');

  if (!user) return null;

  const details = calculateProfileCompletion(user);
  const missingItems = details.items.filter((item) => !item.completed);

  const handleAddCert = () => {
    if (newCert.trim() && !certificationsList.includes(newCert.trim())) {
      const updated = [...certificationsList, newCert.trim()];
      setCertificationsList(updated);
      setNewCert('');
    }
  };

  const handleRemoveCert = (certName: string) => {
    setCertificationsList(certificationsList.filter((c) => c !== certName));
  };

  const handleSaveProfileUpdates = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        cgpa,
        linkedInUrl,
        githubUrl,
        portfolioUrl,
        certifications: certificationsList,
        certDocFileName: certDocFileName || (certificationsList.length > 0 ? 'Technical_Certificates.pdf' : ''),
        resumeFileName: resumeName,
        bgDocFileName: bgDocName
      });
    }
    setShowEditModal(false);
  };

  return (
    <div className="w-full space-y-4">
      {/* Card Header & Progress Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400" /> Recruiter Visibility Index
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${details.badgeColor}`}>
                {details.level}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1">
              Profile Completion: <span className="text-blue-400 font-mono">{details.score}%</span>
            </h3>
          </div>

          <motion.button
            onClick={() => setShowEditModal(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Boost Visibility (+Certifications / Docs)
          </motion.button>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800/80 p-0.5 overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
            style={{ width: `${details.score}%` }}
          />
        </div>

        {/* Quick summary line */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            Completed: <strong className="text-emerald-400 font-mono">{details.items.filter(i => i.completed).length} / {details.items.length}</strong> modules
          </span>
          {missingItems.length > 0 ? (
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Complete {missingItems.length} more section{missingItems.length > 1 ? 's' : ''} to reach 100%
            </span>
          ) : (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Profile 100% Complete & Verified!
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Pro-Tips Section for missing items */}
      {!compact && missingItems.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Recommended Recruiter Pro-Tips
            </h4>
            <span className="text-[10px] text-amber-400 font-mono font-bold">Actionable Guidance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {missingItems.map((item) => (
              <div
                key={item.key}
                className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      {item.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      +{item.weight}% Score
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.proTip}
                  </p>
                  {item.docRequirement && (
                    <div className="mt-1.5 text-[10px] text-indigo-300 font-mono bg-indigo-500/10 p-1.5 rounded-lg border border-indigo-500/20">
                      📄 Required Document: <strong>{item.docRequirement}</strong>
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={() => setShowEditModal(true)}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 shadow-md"
                >
                  <span>Add {item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT / UPDATE PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <motion.button
              onClick={() => setShowEditModal(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase tracking-wider">
                Candidate Profile Enhancer
              </span>
            </div>
            <h3 className="text-xl font-black text-white mb-2">
              Add Certifications & Documents for Recruiters
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Recruiters actively search for candidates with verified certifications, GitHub repos, and college credentials.
            </p>

            <div className="space-y-4 text-xs">
              
              {/* 1. TECHNICAL CERTIFICATIONS UPLOAD / ADD */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-bold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" /> Specific Technical Certifications (+15% Score)
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">AWS, React, Java, NPTEL, etc.</span>
                </div>

                {/* Existing cert tags */}
                <div className="flex flex-wrap gap-2">
                  {certificationsList.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1.5"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(c)}
                        className="text-amber-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {certificationsList.length === 0 && (
                    <span className="text-[11px] text-slate-500 italic">No certifications added yet. Add below!</span>
                  )}
                </div>

                {/* Add new certification input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="e.g. AWS Certified Developer, Meta React Specialization, NPTEL Python"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                  <motion.button
                    type="button"
                    onClick={handleAddCert}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95, y: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors flex items-center gap-1 shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </motion.button>
                </div>

                {/* Cert Document File Upload */}
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Certification Document PDF / Image</label>
                  <label className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500 transition">
                    <span className="truncate">{certDocFileName || 'Select Certification PDF / Proof'}</span>
                    <Upload className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCertDocFileName(e.target.files[0].name);
                          if (certificationsList.length === 0) {
                            setCertificationsList(['Certified Professional']);
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* 2. CGPA & GRADUATION YEAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Academic CGPA / Percentage (+15% Score)
                  </label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g. 8.5 CGPA or 82%"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Resume Document PDF (+20% Score)
                  </label>
                  <label className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-blue-500 transition">
                    <span className="truncate">{resumeName || 'Select Resume PDF'}</span>
                    <Upload className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeName(e.target.files[0].name);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* 3. LINKEDIN, GITHUB & PORTFOLIO URLS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1.5">
                    <Link className="w-3.5 h-3.5 text-emerald-400" /> Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://myportfolio.com"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* 4. BACKGROUND DOCUMENT UPLOAD */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-400" /> College ID / Degree Marksheet PDF (+15% Score)
                </label>
                <label className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:border-purple-500 transition">
                  <span className="truncate">{bgDocName || 'Select Degree Certificate / Student ID'}</span>
                  <Upload className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBgDocName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pt-2">
                <MagneticButton
                  type="button"
                  onClick={handleSaveProfileUpdates}
                  magneticStrength={0.35}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Save Profile Enhancements
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
