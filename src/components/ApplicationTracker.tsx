import React from 'react';
import { motion } from 'motion/react';
import { Job, JobApplication, UserProfile } from '../types';
import { ProfileCompletionWidget } from './ProfileCompletionWidget';
import {
  FileCheck,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ExternalLink,
  Briefcase,
  Award,
  Linkedin,
  Github
} from 'lucide-react';

interface ApplicationTrackerProps {
  user: UserProfile | null;
  applications: JobApplication[];
  jobs?: Job[];
  onBackToJobs?: () => void;
  onSelectJob?: (job: Job) => void;
  onUpdateProfile?: (updatedFields: Partial<UserProfile>) => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  user,
  applications,
  jobs = [],
  onBackToJobs,
  onSelectJob,
  onUpdateProfile
}) => {
  const userApps = applications.filter((app) => app.userId === user?.uid || app.userEmail === user?.email);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Top Back Navigation Header */}
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

        <span className="text-xs text-slate-400 font-mono">
          Total Applications: <strong className="text-white">{userApps.length}</strong>
        </span>
      </div>

      {/* Profile Completion Progress Bar & Recruiter Pro-Tips Widget */}
      {user && (
        <ProfileCompletionWidget user={user} onUpdateProfile={onUpdateProfile} />
      )}

      {/* Document Status Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/30 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase tracking-wider">
              Profile Verification Dashboard
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              Application & Document Tracking Status
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Track background document approval and real-time status updates for your applied positions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Background Doc Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                user?.bgDocStatus === 'verified'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : user?.bgDocStatus === 'rejected'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {user?.bgDocStatus === 'verified' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              {user?.bgDocStatus === 'rejected' && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
              {user?.bgDocStatus === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
              {(user?.bgDocStatus || 'pending').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Profile summary card */}
      {user && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-1">Candidate Profile</span>
            <p className="font-bold text-white text-sm">{user.firstName} {user.lastName}</p>
            <p className="text-slate-400 truncate">{user.email}</p>
            <p className="text-slate-500 font-mono text-[10px] mt-0.5">{user.phone}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-1">Academics & Performance</span>
            <p className="font-bold text-blue-300 text-sm">{user.degree}</p>
            <p className="text-slate-400">{user.branch} Branch</p>
            {user.cgpa && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                CGPA: {user.cgpa}
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-1">Uploaded Resume & ID</span>
            <p className="font-bold text-emerald-400 truncate">{user.resumeFileName || 'Fresher_Resume.pdf'}</p>
            <p className="text-[10px] text-purple-300 truncate mt-0.5">Doc: {user.bgDocFileName || 'Degree_Certificate.pdf'}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-1">Certifications & Links</span>
            {user.certifications && user.certifications.length > 0 ? (
              <div className="flex flex-wrap gap-1 my-1">
                {user.certifications.slice(0, 2).map((c) => (
                  <span key={c} className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    {c}
                  </span>
                ))}
                {user.certifications.length > 2 && (
                  <span className="text-[10px] text-slate-400">+{user.certifications.length - 2} more</span>
                )}
              </div>
            ) : (
              <p className="text-slate-500 italic text-[11px]">No certifications added yet</p>
            )}

            <div className="flex items-center gap-2 mt-2">
              {user.linkedInUrl && (
                <a href={user.linkedInUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1 text-[10px]">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
              )}
              {user.githubUrl && (
                <a href={user.githubUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:underline flex items-center gap-1 text-[10px]">
                  <Github className="w-3 h-3" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Log List */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-blue-400" /> Submitted Job & Internship Applications ({userApps.length})
        </h3>

        {userApps.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-slate-400 text-xs">
              No applications submitted yet. Browse Full-Time Jobs, Internships, or Walk-In drives to apply!
            </p>
            <button
              onClick={onBackToJobs}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition inline-flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" /> Explore Active Job Drive Postings
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {userApps.map((app) => {
              const matchingJob = jobs.find((j) => j.id === app.jobId);
              const targetApplyLink = app.applyLink || matchingJob?.applyLink;

              return (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition shadow-lg group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                        {app.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Submitted
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Applied on: {app.appliedAt.slice(0, 10)}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition truncate">
                      {app.jobTitle}
                    </h4>

                    <p className="text-xs text-blue-400 font-semibold flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{app.company}</span>
                    </p>
                  </div>

                  {/* Actions: Direct Link & Details */}
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    {matchingJob && onSelectJob && (
                      <button
                        onClick={() => onSelectJob(matchingJob)}
                        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs transition"
                      >
                        View Job Details
                      </button>
                    )}

                    <a
                      href={targetApplyLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!targetApplyLink) {
                          e.preventDefault();
                          alert('Apply URL is not configured for this position.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 transition flex-1 sm:flex-none"
                    >
                      <span>Navigate to Apply Link</span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
