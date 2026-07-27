import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Job, TrainingCenter, UserProfile, JobApplication } from '../types';
import { TiltCard } from './TiltCard';
import { formatSalaryInRupees } from './JobCard';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Users,
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Building2,
  FileText,
  Save,
  X,
  LayoutGrid,
  Table as TableIcon,
  ExternalLink,
  IndianRupee,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';
import { BRANCHES_LIST, DEGREES_LIST, YEARS_LIST, INDUSTRIES_LIST } from '../data/initialData';

interface AdminPortalProps {
  jobs: Job[];
  trainings: TrainingCenter[];
  users: UserProfile[];
  applications: JobApplication[];
  onAddJob: (job: Omit<Job, 'id' | 'createdAt'>) => Promise<void>;
  onUpdateJob: (job: Job) => Promise<void>;
  onDeleteJob: (jobId: string) => Promise<void>;
  onAddTraining: (training: Omit<TrainingCenter, 'id' | 'createdAt'>) => Promise<void>;
  onUpdateTraining: (training: TrainingCenter) => Promise<void>;
  onDeleteTraining: (trainingId: string) => Promise<void>;
  onUpdateUserStatus: (uid: string, status: 'pending' | 'verified' | 'rejected') => Promise<void>;
  onDeleteUser: (uid: string) => Promise<void>;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  jobs,
  trainings,
  users,
  applications,
  onAddJob,
  onUpdateJob,
  onDeleteJob,
  onAddTraining,
  onUpdateTraining,
  onDeleteTraining,
  onUpdateUserStatus,
  onDeleteUser
}) => {
  const [tab, setTab] = useState<'jobs' | 'trainings' | 'users' | 'applications'>('jobs');
  const [search, setSearch] = useState('');
  const [jobViewMode, setJobViewMode] = useState<'grid' | 'table'>('grid');

  // Form Modals
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [editingTraining, setEditingTraining] = useState<TrainingCenter | null>(null);

  // Available lists with custom additions
  const [availableDegrees, setAvailableDegrees] = useState<string[]>(DEGREES_LIST);
  const [availableBranches, setAvailableBranches] = useState<string[]>(BRANCHES_LIST);
  const [availableYears, setAvailableYears] = useState<number[]>(YEARS_LIST);

  const [customDegree, setCustomDegree] = useState('');
  const [customBranch, setCustomBranch] = useState('');
  const [customYear, setCustomYear] = useState('');

  // Job Form State
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    companyUrl: '',
    year: 2026,
    years: [2026] as number[],
    branches: ['CSE', 'ECE'] as string[],
    degrees: ['B.Tech'] as string[],
    industry: INDUSTRIES_LIST[0],
    salary: '₹6.0 LPA',
    location: 'Hyderabad / Remote',
    category: 'job' as 'job' | 'internship' | 'walkin',
    lastDate: '2026-08-30',
    skills: 'React, Node.js, SQL',
    description: 'Freshers hiring for core engineering and technology roles.',
    applyLink: 'https://company.com/careers',
    hrPhone: '+91 98765 43210',
    isWalkin: false,
    walkinDate: '',
    walkinVenue: ''
  });

  // Helper toggle functions
  const toggleFormYear = (y: number) => {
    setJobForm((prev) => {
      const exists = prev.years.includes(y);
      const updated = exists ? prev.years.filter((yr) => yr !== y) : [...prev.years, y];
      return { ...prev, years: updated };
    });
  };

  const toggleFormBranch = (b: string) => {
    setJobForm((prev) => {
      const exists = prev.branches.includes(b);
      const updated = exists ? prev.branches.filter((br) => br !== b) : [...prev.branches, b];
      return { ...prev, branches: updated };
    });
  };

  const toggleFormDegree = (d: string) => {
    setJobForm((prev) => {
      const exists = prev.degrees.includes(d);
      const updated = exists ? prev.degrees.filter((deg) => deg !== d) : [...prev.degrees, d];
      return { ...prev, degrees: updated };
    });
  };

  const handleAddCustomDegree = () => {
    if (!customDegree.trim()) return;
    const newDeg = customDegree.trim();
    if (!availableDegrees.includes(newDeg)) {
      setAvailableDegrees((prev) => [...prev, newDeg]);
    }
    if (!jobForm.degrees.includes(newDeg)) {
      setJobForm((prev) => ({ ...prev, degrees: [...prev.degrees, newDeg] }));
    }
    setCustomDegree('');
  };

  const handleAddCustomBranch = () => {
    if (!customBranch.trim()) return;
    const newBr = customBranch.trim();
    if (!availableBranches.includes(newBr)) {
      setAvailableBranches((prev) => [...prev, newBr]);
    }
    if (!jobForm.branches.includes(newBr)) {
      setJobForm((prev) => ({ ...prev, branches: [...prev.branches, newBr] }));
    }
    setCustomBranch('');
  };

  const handleAddCustomYear = () => {
    const yrNum = Number(customYear);
    if (!yrNum || isNaN(yrNum)) return;
    if (!availableYears.includes(yrNum)) {
      setAvailableYears((prev) => [...prev, yrNum].sort((a, b) => a - b));
    }
    if (!jobForm.years.includes(yrNum)) {
      setJobForm((prev) => ({ ...prev, years: [...prev.years, yrNum] }));
    }
    setCustomYear('');
  };

  // Training Form State
  const [trainingForm, setTrainingForm] = useState({
    title: '',
    instituteName: '',
    location: '',
    courses: 'Full Stack Java, React, Cloud',
    fee: '₹15,000',
    hrPhone: '+91 98765 43210',
    instructorEmail: 'instructor@academy.edu',
    description: 'Comprehensive placement training with resume review.',
    websiteUrl: 'https://academy.edu',
    applyLink: 'https://academy.edu/enroll'
  });

  const handleOpenJobCreate = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      company: '',
      companyUrl: '',
      year: 2026,
      years: [2026],
      branches: ['CSE', 'ECE'],
      degrees: ['B.Tech'],
      industry: INDUSTRIES_LIST[0],
      salary: '₹6.0 LPA',
      location: 'Bangalore / Hyderabad',
      category: 'job',
      lastDate: '2026-08-30',
      skills: 'React, Node.js, Python',
      description: 'Entry-level opportunity for fresher graduates.',
      applyLink: 'https://company.com/careers',
      hrPhone: '+91 98765 43210',
      isWalkin: false,
      walkinDate: '',
      walkinVenue: ''
    });
    setShowJobModal(true);
  };

  const handleOpenJobEdit = (job: Job) => {
    setEditingJob(job);
    const jobYears = job.years && job.years.length > 0 ? job.years : [job.year];
    setJobForm({
      title: job.title,
      company: job.company,
      companyUrl: job.companyUrl || '',
      year: job.year,
      years: jobYears,
      branches: job.branches || ['CSE'],
      degrees: job.degrees || ['B.Tech'],
      industry: job.industry || INDUSTRIES_LIST[0],
      salary: job.salary,
      location: job.location,
      category: job.category,
      lastDate: job.lastDate || '',
      skills: job.skills.join(', '),
      description: job.description,
      applyLink: job.applyLink || '',
      hrPhone: job.hrPhone || '',
      isWalkin: !!job.isWalkin,
      walkinDate: job.walkinDate || '',
      walkinVenue: job.walkinVenue || ''
    });
    setShowJobModal(true);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArr = jobForm.skills.split(',').map((s) => s.trim()).filter(Boolean);
    const primaryYear = jobForm.years.length > 0 ? jobForm.years[0] : 2026;

    const jobPayload = {
      ...jobForm,
      year: primaryYear,
      years: jobForm.years.length > 0 ? jobForm.years : [primaryYear],
      skills: skillsArr
    };

    if (editingJob) {
      await onUpdateJob({
        ...editingJob,
        ...jobPayload
      });
    } else {
      await onAddJob(jobPayload);
    }
    setShowJobModal(false);
  };

  const handleOpenTrainingCreate = () => {
    setEditingTraining(null);
    setTrainingForm({
      title: '',
      instituteName: '',
      location: '',
      courses: 'Java, Python, Data Analytics',
      fee: '₹12,000',
      hrPhone: '+91 98765 43210',
      instructorEmail: 'mentor@institute.com',
      description: 'Placement training for 2023-2028 batch students.',
      websiteUrl: 'https://institute.com',
      applyLink: 'https://institute.com/apply'
    });
    setShowTrainingModal(true);
  };

  const handleOpenTrainingEdit = (tr: TrainingCenter) => {
    setEditingTraining(tr);
    setTrainingForm({
      title: tr.title,
      instituteName: tr.instituteName,
      location: tr.location,
      courses: tr.courses.join(', '),
      fee: tr.fee,
      hrPhone: tr.hrPhone,
      instructorEmail: tr.instructorEmail,
      description: tr.description,
      websiteUrl: tr.websiteUrl || '',
      applyLink: tr.applyLink || ''
    });
    setShowTrainingModal(true);
  };

  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const coursesArr = trainingForm.courses.split(',').map((c) => c.trim()).filter(Boolean);

    if (editingTraining) {
      await onUpdateTraining({
        ...editingTraining,
        ...trainingForm,
        courses: coursesArr
      });
    } else {
      await onAddTraining({
        ...trainingForm,
        courses: coursesArr
      });
    }
    setShowTrainingModal(false);
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      
      {/* Top Admin Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-500/40 p-6 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-black text-white">Live Administrator Management Portal</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time multi-device Firestore synchronization for Job Postings, Walkins, Coaching Centers, and Applicant Verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Real-time Live
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
          <motion.button
            onClick={() => setTab('jobs')}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
              tab === 'jobs' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Postings ({jobs.length})
          </motion.button>

          <motion.button
            onClick={() => setTab('trainings')}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
              tab === 'trainings' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Training Centers ({trainings.length})
          </motion.button>

          <motion.button
            onClick={() => setTab('users')}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
              tab === 'users' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Users & Verifications ({users.length})
          </motion.button>

          <motion.button
            onClick={() => setTab('applications')}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
              tab === 'applications' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> Applicant Logs ({applications.length})
          </motion.button>
        </div>

        {/* Action Button & Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
            />
          </div>

          {tab === 'jobs' && (
            <motion.button
              onClick={handleOpenJobCreate}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Post New Job / Walkin
            </motion.button>
          )}

          {tab === 'trainings' && (
            <motion.button
              onClick={handleOpenTrainingCreate}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Training Center
            </motion.button>
          )}
        </div>
      </div>

      {/* JOBS SECTION WITH IN-PAGE 3D POSTING ITEM BOX AND 3D ITEM BOX GRID */}
      {tab === 'jobs' && (
        <div className="space-y-6">
          {/* Sub-toolbar for jobs tab */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">
                Active Job Postings ({filteredJobs.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* View Switcher: Grid vs Table */}
              <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setJobViewMode('grid')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    jobViewMode === 'grid'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> 3D Item Box Grid
                </button>
                <button
                  onClick={() => setJobViewMode('table')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    jobViewMode === 'table'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" /> Table View
                </button>
              </div>

              <button
                onClick={handleOpenJobCreate}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition"
              >
                <Plus className="w-4 h-4" /> {showJobModal ? 'Close Form' : 'Post New Job / Walkin'}
              </button>
            </div>
          </div>

          {/* IN-PAGE POSTING ITEM BOX FORM (STATIC NON-TILTING) */}
          {showJobModal && (
            <div className="w-full">
              <div className="p-6 md:p-8 bg-slate-900 rounded-3xl border border-purple-500/30 shadow-2xl relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider">
                        Job Posting Manager
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                        {editingJob ? 'Edit Job / Walkin Posting' : 'Post New Job / Walkin Drive'}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowJobModal(false)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    title="Close Posting Form"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleJobSubmit} className="space-y-4 text-xs">
                  {/* Title & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                        placeholder="e.g. Junior Software Engineer"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.company}
                        onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                        placeholder="e.g. TechCorp Solutions"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category, Salary, Location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">Category *</label>
                      <select
                        value={jobForm.category}
                        onChange={(e: any) =>
                          setJobForm({
                            ...jobForm,
                            category: e.target.value,
                            isWalkin: e.target.value === 'walkin'
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="job">Full-Time Job</option>
                        <option value="internship">Internship</option>
                        <option value="walkin">Walk-In Drive</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">Salary / Package</label>
                      <input
                        type="text"
                        value={jobForm.salary}
                        onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                        placeholder="e.g. ₹6.5 LPA"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">Location</label>
                      <input
                        type="text"
                        value={jobForm.location}
                        onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        placeholder="e.g. Hyderabad / Remote"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* TARGET BATCH YEAR SELECT MULTIPLE */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-200 font-bold flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-indigo-400" /> Target Batch Year * (Select Multiple Years)
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Selected ({jobForm.years.length}): {jobForm.years.join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {availableYears.map((yr) => {
                        const selected = jobForm.years.includes(yr);
                        return (
                          <button
                            type="button"
                            key={yr}
                            onClick={() => toggleFormYear(yr)}
                            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 border ${
                              selected
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/30'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {selected && <span>✓</span>} Batch {yr}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <input
                        type="number"
                        value={customYear}
                        onChange={(e) => setCustomYear(e.target.value)}
                        placeholder="Add custom batch year e.g. 2029"
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomYear}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                      >
                        + Add Batch Year
                      </button>
                    </div>
                  </div>

                  {/* DEGREE QUALIFICATION SELECT MULTIPLE */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-200 font-bold flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-emerald-400" /> Degree Qualification * (Select Multiple Degrees)
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Selected ({jobForm.degrees.length})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {availableDegrees.map((deg) => {
                        const selected = jobForm.degrees.includes(deg);
                        return (
                          <button
                            type="button"
                            key={deg}
                            onClick={() => toggleFormDegree(deg)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border flex items-center gap-1 ${
                              selected
                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-500/30'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {selected && <span>✓</span>} {deg}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <input
                        type="text"
                        value={customDegree}
                        onChange={(e) => setCustomDegree(e.target.value)}
                        placeholder="Add custom degree qualification (e.g. B.E, B.Pharm, Ph.D)..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomDegree}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Qualification
                      </button>
                    </div>
                  </div>

                  {/* TARGET BRANCHES SELECT MULTIPLE */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-200 font-bold flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-purple-400" /> Target Branches * (Select Multiple Engineering Branches)
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Selected ({jobForm.branches.length})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {availableBranches.map((br) => {
                        const selected = jobForm.branches.includes(br);
                        return (
                          <button
                            type="button"
                            key={br}
                            onClick={() => toggleFormBranch(br)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border flex items-center gap-1 ${
                              selected
                                ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/30'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {selected && <span>✓</span>} {br}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <input
                        type="text"
                        value={customBranch}
                        onChange={(e) => setCustomBranch(e.target.value)}
                        placeholder="Add custom engineering branch (e.g. Chemical, Aerospace)..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomBranch}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Branch
                      </button>
                    </div>
                  </div>

                  {/* LAST DATE TO APPLY & DIRECT APPLY LINK URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">
                        Last Date To Apply (Optional)
                      </label>
                      <input
                        type="date"
                        value={jobForm.lastDate}
                        onChange={(e) => setJobForm({ ...jobForm, lastDate: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">
                        Direct Apply Link URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={jobForm.applyLink}
                        onChange={(e) => setJobForm({ ...jobForm, applyLink: e.target.value })}
                        placeholder="https://company.com/apply/fresher-2026"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* HR Phone & Company Website URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">HR Contact Direct Phone</label>
                      <input
                        type="text"
                        value={jobForm.hrPhone}
                        onChange={(e) => setJobForm({ ...jobForm, hrPhone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 block mb-1 font-semibold">Company Website URL</label>
                      <input
                        type="url"
                        value={jobForm.companyUrl}
                        onChange={(e) => setJobForm({ ...jobForm, companyUrl: e.target.value })}
                        placeholder="https://company.com"
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Walkin Specific Fields */}
                  {jobForm.isWalkin && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-amber-300 block mb-1 font-bold">Walk-In Date</label>
                        <input
                          type="date"
                          value={jobForm.walkinDate}
                          onChange={(e) => setJobForm({ ...jobForm, walkinDate: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-amber-300 block mb-1 font-bold">Walk-In Venue Address</label>
                        <input
                          type="text"
                          value={jobForm.walkinVenue}
                          onChange={(e) => setJobForm({ ...jobForm, walkinVenue: e.target.value })}
                          placeholder="Full venue address with city..."
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">
                      Required Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={jobForm.skills}
                      onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                      placeholder="React, Java, Python, SQL"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-slate-300 block mb-1 font-semibold">Job Overview & Eligibility Details</label>
                    <textarea
                      rows={3}
                      value={jobForm.description}
                      onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                      placeholder="Provide clear job responsibilities, interview rounds, and bond terms..."
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowJobModal(false)}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                    >
                      Cancel / Close
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-500/20 transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save & Publish Job Item Box
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DISPLAY POSTINGS: 3D GRID OR TABLE */}
          {jobViewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
              {filteredJobs.map((job) => {
                const jobYears = job.years && job.years.length > 0 ? job.years : [job.year];
                return (
                  <TiltCard key={job.id} glowColor="rgba(59, 130, 246, 0.2)" className="w-full h-full">
                    <div className="h-full p-5 bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl transition-all group">
                      <div>
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {job.category === 'internship' ? 'Internship' : job.isWalkin ? 'Walk-In Drive' : 'Full-Time Job'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Batches: {jobYears.join(', ')}
                          </span>
                        </div>

                        {/* Title & Company */}
                        <h4 className="font-black text-white text-base group-hover:text-blue-300 transition line-clamp-2">
                          {job.title}
                        </h4>
                        <p className="text-xs font-bold text-blue-400 mt-1 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" /> {job.company}
                        </p>

                        {/* Salary & Location */}
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Salary</span>
                            <span className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                              <IndianRupee className="w-3 h-3" /> {formatSalaryInRupees(job.salary)}
                            </span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-[10px] text-slate-500 block">Location</span>
                            <span className="font-semibold text-slate-300 text-xs truncate block">
                              {job.location}
                            </span>
                          </div>
                        </div>

                        {/* Branches & Degrees */}
                        <div className="mt-3 space-y-1 text-[11px]">
                          <div className="text-slate-400 line-clamp-1">
                            <strong className="text-slate-300">Branches:</strong> {(job.branches || []).join(', ')}
                          </div>
                          <div className="text-slate-400 line-clamp-1">
                            <strong className="text-slate-300">Degrees:</strong> {(job.degrees || []).join(', ')}
                          </div>
                        </div>
                      </div>

                      {/* Footer Operations */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                        {job.applyLink ? (
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1.5 transition"
                          >
                            Apply Link <ExternalLink className="w-3 h-3 text-blue-400" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">No direct link</span>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenJobEdit(job)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition"
                            title="Edit Item Box"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteJob(job.id)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition"
                            title="Delete Item Box"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Title & Company</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Batch Year</th>
                    <th className="p-4">Salary</th>
                    <th className="p-4">HR Direct Phone</th>
                    <th className="p-4 text-right">CRUD Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-4">
                        <p className="font-bold text-white text-sm">{job.title}</p>
                        <p className="text-blue-400 font-semibold">{job.company}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-200 border border-slate-700">
                          {job.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-indigo-300">{job.year}</td>
                      <td className="p-4 text-emerald-400 font-bold">{formatSalaryInRupees(job.salary)}</td>
                      <td className="p-4 font-mono text-slate-300">{job.hrPhone || 'N/A'}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenJobEdit(job)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition"
                          title="Edit Posting"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteJob(job.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition"
                          title="Delete Posting"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TRAINING CENTERS CRUD TABLE */}
      {tab === 'trainings' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-4">Title & Institute</th>
                <th className="p-4">Location</th>
                <th className="p-4">Course Fee</th>
                <th className="p-4">Instructor Email</th>
                <th className="p-4 text-right">CRUD Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {trainings.map((tr) => (
                <tr key={tr.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4">
                    <p className="font-bold text-white text-sm">{tr.title}</p>
                    <p className="text-purple-400 font-semibold">{tr.instituteName}</p>
                  </td>
                  <td className="p-4">{tr.location}</td>
                  <td className="p-4 text-emerald-400 font-bold">{tr.fee}</td>
                  <td className="p-4 font-mono text-slate-300">{tr.instructorEmail}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenTrainingEdit(tr)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTraining(tr.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-300 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USERS & VERIFICATION TABLE */}
      {tab === 'users' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-4">Fresher Name & Email</th>
                <th className="p-4">Qualification & Branch</th>
                <th className="p-4">Resume File</th>
                <th className="p-4">Background Verification Status</th>
                <th className="p-4 text-right">Automated Verification CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.map((u) => (
                <tr key={u.uid} className="hover:bg-slate-800/50 transition">
                  <td className="p-4">
                    <p className="font-bold text-white text-sm">{u.firstName} {u.lastName}</p>
                    <p className="text-slate-400">{u.email}</p>
                    <p className="text-[10px] text-slate-500 font-mono mb-1.5">{u.phone}</p>
                    {(u.linkedInUrl || u.githubUrl || u.portfolioUrl) && (
                      <div className="flex items-center gap-2 mt-1">
                        {u.linkedInUrl && (
                          <a
                            href={u.linkedInUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-blue-500/20 text-blue-300 hover:bg-blue-500 hover:text-white transition"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {u.githubUrl && (
                          <a
                            href={u.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                            title="GitHub Profile"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {u.portfolioUrl && (
                          <a
                            href={u.portfolioUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-white transition"
                            title="Portfolio Website"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-blue-300 font-bold">{u.degree}</span>
                    <span className="block text-slate-400">{u.branch}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{u.resumeFileName || 'Resume.pdf'}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${
                        u.bgDocStatus === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : u.bgDocStatus === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {u.bgDocStatus === 'verified' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      {u.bgDocStatus === 'rejected' && <XCircle className="w-3 h-3 text-rose-400" />}
                      {u.bgDocStatus === 'pending' && <Clock className="w-3 h-3 text-amber-400" />}
                      {u.bgDocStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => onUpdateUserStatus(u.uid, 'verified')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 font-bold text-[10px]"
                    >
                      Approve Doc
                    </button>
                    <button
                      onClick={() => onUpdateUserStatus(u.uid, 'rejected')}
                      className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 font-bold text-[10px]"
                    >
                      Reject Doc
                    </button>
                    <button
                      onClick={() => onDeleteUser(u.uid)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-700 text-slate-300"
                      title="Delete User"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* APPLICANT LOGS */}
      {tab === 'applications' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Target Opportunity</th>
                <th className="p-4">Company</th>
                <th className="p-4">Degree & Branch</th>
                <th className="p-4">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4 font-bold text-white">{app.userName}</td>
                  <td className="p-4 text-blue-300 font-semibold">{app.jobTitle}</td>
                  <td className="p-4 text-slate-300">{app.company}</td>
                  <td className="p-4 text-slate-400">{app.userDegree} - {app.userBranch}</td>
                  <td className="p-4 font-mono text-slate-500">{app.appliedAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TRAINING EDIT/CREATE MODAL */}
      {showTrainingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => setShowTrainingModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white mb-4">
              {editingTraining ? 'Edit Training Center' : 'Add New Training Center'}
            </h3>

            <form onSubmit={handleTrainingSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Program Title</label>
                <input
                  type="text"
                  required
                  value={trainingForm.title}
                  onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Institute Name</label>
                  <input
                    type="text"
                    required
                    value={trainingForm.instituteName}
                    onChange={(e) => setTrainingForm({ ...trainingForm, instituteName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Location / Mode</label>
                  <input
                    type="text"
                    value={trainingForm.location}
                    onChange={(e) => setTrainingForm({ ...trainingForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Fee Structure</label>
                  <input
                    type="text"
                    value={trainingForm.fee}
                    onChange={(e) => setTrainingForm({ ...trainingForm, fee: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Instructor Email</label>
                  <input
                    type="email"
                    value={trainingForm.instructorEmail}
                    onChange={(e) => setTrainingForm({ ...trainingForm, instructorEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition"
              >
                Save Training Record
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
