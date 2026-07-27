import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './lib/firebase';
import { Job, TrainingCenter, UserProfile, JobApplication } from './types';
import { INITIAL_JOBS, INITIAL_TRAININGS } from './data/initialData';

// Components
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { FilterSidebar, FilterState } from './components/FilterSidebar';
import { JobCard } from './components/JobCard';
import { JobCardSkeletonGrid } from './components/JobCardSkeleton';
import { JobDetailModal } from './components/JobDetailModal';
import { TrainingCard } from './components/TrainingCard';
import { TrainingDetailModal } from './components/TrainingDetailModal';
import { AtsChecker } from './components/AtsChecker';
import { ApplicationTracker } from './components/ApplicationTracker';
import { Applicant3DScene } from './components/Applicant3DScene';
import { AuthPage } from './components/AuthPage';
import { AdminPortal } from './components/AdminPortal';
import { NewJobNotification } from './components/NewJobNotification';
import { CareerPathVisualizer } from './components/CareerPathVisualizer';
import { Sparkles, Briefcase, GraduationCap, MapPin, Bell, ArrowLeft } from 'lucide-react';

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<'jobs' | 'internships' | 'walkins' | 'trainings' | 'ats' | 'applications' | 'saved' | 'career-path'>('jobs');
  const [selectedCareerIndustry, setSelectedCareerIndustry] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Firestore collections state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [trainings, setTrainings] = useState<TrainingCenter[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  // 3D Animated New Job Notification alert state
  const [newJobAlert, setNewJobAlert] = useState<Job | null>(null);
  const previousJobIdsRef = React.useRef<Set<string> | null>(null);

  // Selected item modals
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<TrainingCenter | null>(null);

  // Email alerts toggle state
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    years: [],
    degrees: [],
    branches: [],
    industry: '',
    isRemoteOnly: false,
    minSalaryLpa: 0,
    searchQuery: ''
  });

  // 1. Firebase Real-time Sync listeners
  useEffect(() => {
    // Listen to JOBS collection
    const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => {
      const list: Job[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as Job);
      });

      if (list.length === 0) {
        // Seed initial jobs if firestore is empty
        INITIAL_JOBS.forEach(async (j) => {
          await setDoc(doc(db, 'jobs', j.id), j);
        });
        setJobs(INITIAL_JOBS);
        previousJobIdsRef.current = new Set(INITIAL_JOBS.map((j) => j.id));
      } else {
        // Detect newly added job for real-time 3D notification alert
        if (previousJobIdsRef.current !== null) {
          const newlyAdded = list.find((j) => !previousJobIdsRef.current!.has(j.id));
          if (newlyAdded) {
            setNewJobAlert(newlyAdded);
          }
        }
        previousJobIdsRef.current = new Set(list.map((j) => j.id));
        setJobs(list);
      }
      setLoadingJobs(false);
    }, (err) => {
      console.warn('Firestore jobs sync fallback:', err);
      setJobs(INITIAL_JOBS);
      setLoadingJobs(false);
    });

    // Listen to TRAININGS collection
    const unsubTrainings = onSnapshot(collection(db, 'trainings'), (snapshot) => {
      const list: TrainingCenter[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as TrainingCenter);
      });

      if (list.length === 0) {
        INITIAL_TRAININGS.forEach(async (t) => {
          await setDoc(doc(db, 'trainings', t.id), t);
        });
        setTrainings(INITIAL_TRAININGS);
      } else {
        setTrainings(list);
      }
    }, (err) => {
      console.warn('Firestore trainings sync fallback:', err);
      setTrainings(INITIAL_TRAININGS);
    });

    // Listen to USERS collection
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const list: UserProfile[] = [];
      snapshot.forEach((d) => {
        list.push({ uid: d.id, ...d.data() } as UserProfile);
      });
      setUsers(list);
    });

    // Listen to APPLICATIONS collection
    const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      const list: JobApplication[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...d.data() } as JobApplication);
      });
      setApplications(list);
    });

    return () => {
      unsubJobs();
      unsubTrainings();
      unsubUsers();
      unsubApps();
    };
  }, []);

  // Sync user object with Firestore
  const handleLoginUser = async (profile: UserProfile) => {
    setUser(profile);
    // Save to firestore for live admin tracking
    try {
      await setDoc(doc(db, 'users', profile.uid), profile);
    } catch (e) {
      console.error('Error saving user profile to Firestore:', e);
    }
  };

  const handleUpdateUserProfile = async (updatedFields: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    try {
      await setDoc(doc(db, 'users', user.uid), updatedUser, { merge: true });
    } catch (e) {
      console.error('Error updating user profile in Firestore:', e);
    }
  };

  const handleLoginAdmin = () => {
    setIsAdmin(true);
    setShowAdminLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const handleToggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled);
  };

  const handleResetFilters = () => {
    setFilters({
      years: [],
      degrees: [],
      branches: [],
      industry: '',
      isRemoteOnly: false,
      minSalaryLpa: 0,
      searchQuery: ''
    });
  };

  // 2. Admin CRUD Handlers (Real-time Firestore operations)
  const handleAddJob = async (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    const newDocRef = doc(collection(db, 'jobs'));
    const newJob: Job = {
      ...jobData,
      id: newDocRef.id,
      createdAt: new Date().toISOString()
    };
    await setDoc(newDocRef, newJob);
  };

  const handleUpdateJob = async (job: Job) => {
    await updateDoc(doc(db, 'jobs', job.id), { ...job });
  };

  const handleDeleteJob = async (jobId: string) => {
    await deleteDoc(doc(db, 'jobs', jobId));
  };

  const handleAddTraining = async (tData: Omit<TrainingCenter, 'id' | 'createdAt'>) => {
    const newDocRef = doc(collection(db, 'trainings'));
    const newTraining: TrainingCenter = {
      ...tData,
      id: newDocRef.id,
      createdAt: new Date().toISOString()
    };
    await setDoc(newDocRef, newTraining);
  };

  const handleUpdateTraining = async (t: TrainingCenter) => {
    await updateDoc(doc(db, 'trainings', t.id), { ...t });
  };

  const handleDeleteTraining = async (tId: string) => {
    await deleteDoc(doc(db, 'trainings', tId));
  };

  const handleUpdateUserStatus = async (uid: string, status: 'pending' | 'verified' | 'rejected') => {
    await updateDoc(doc(db, 'users', uid), { bgDocStatus: status });
    if (user && user.uid === uid) {
      setUser((prev) => (prev ? { ...prev, bgDocStatus: status } : null));
    }
  };

  const handleDeleteUser = async (uid: string) => {
    await deleteDoc(doc(db, 'users', uid));
  };

  // Submit Job Application
  const handleApplyToJob = async (job: Job) => {
    if (!user) return;
    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      userId: user.uid,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      userPhone: user.phone,
      userDegree: user.degree,
      userBranch: user.branch,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      category: job.category,
      status: 'submitted',
      appliedAt: new Date().toISOString(),
      applyLink: job.applyLink
    };

    try {
      await setDoc(doc(db, 'applications', newApp.id), newApp);
      if (job.applyLink) {
        window.open(job.applyLink, '_blank', 'noopener,noreferrer');
      }
    } catch (e) {
      console.error('Error recording application:', e);
    }
  };

  // Toggle Save / Bookmark Job
  const handleToggleSaveJob = async (jobId: string) => {
    if (!user) return;
    const currentSaved = user.savedJobIds || [];
    const isSaved = currentSaved.includes(jobId);
    const updatedSaved = isSaved
      ? currentSaved.filter((id) => id !== jobId)
      : [...currentSaved, jobId];

    const updatedUser = { ...user, savedJobIds: updatedSaved };
    setUser(updatedUser);
    try {
      await setDoc(doc(db, 'users', user.uid), updatedUser, { merge: true });
    } catch (e) {
      console.error('Error updating saved jobs in Firestore:', e);
    }
  };

  // Filtered Job list based on tab & filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Saved Tab Match
      if (activeTab === 'saved') {
        if (!user?.savedJobIds?.includes(job.id)) return false;
      } else {
        // Tab Category Match
        if (activeTab === 'jobs' && (job.category !== 'job' || job.isWalkin)) return false;
        if (activeTab === 'internships' && job.category !== 'internship') return false;
        if (activeTab === 'walkins' && !job.isWalkin && job.category !== 'walkin') return false;
      }

      // Year Filter
      if (filters.years.length > 0) {
        const jobYears = job.years && job.years.length > 0 ? job.years : [job.year];
        const hasYear = jobYears.some((y) => filters.years.includes(y));
        if (!hasYear) return false;
      }

      // Branch Filter
      if (filters.branches.length > 0) {
        const hasBranch = job.branches.some((b) => filters.branches.includes(b));
        if (!hasBranch) return false;
      }

      // Degree Filter
      if (filters.degrees.length > 0) {
        const hasDegree = job.degrees.some((d) => filters.degrees.includes(d));
        if (!hasDegree) return false;
      }

      // Industry Filter
      if (filters.industry && job.industry !== filters.industry) return false;

      // Remote Filter
      if (filters.isRemoteOnly && !job.location.toLowerCase().includes('remote')) return false;

      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const match =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q)) ||
          job.location.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [jobs, activeTab, filters, user?.savedJobIds]);

  // Simulate new job alert for preview testing
  const handleSimulateNewJobAlert = () => {
    const candidateList = filteredJobs.length > 0 ? filteredJobs : jobs;
    if (candidateList.length > 0) {
      const randomIndex = Math.floor(Math.random() * candidateList.length);
      setNewJobAlert(candidateList[randomIndex]);
    }
  };
  const recommendedJobs = useMemo(() => {
    if (!user) return [];
    return jobs.filter(
      (j) =>
        j.branches.includes(user.branch) ||
        j.degrees.includes(user.degree)
    ).slice(0, 3);
  }, [jobs, user]);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 font-sans p-0 m-0 selection:bg-blue-500 selection:text-white">
      
      {/* 3D Interactive WebGL Canvas */}
      <ThreeCanvas theme={activeTab === 'ats' ? 'neon' : activeTab === 'walkins' ? 'glowing' : 'constellation'} />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between w-full">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          onLogout={handleLogout}
          onToggleAlerts={handleToggleAlerts}
          alertsEnabled={alertsEnabled}
          onOpenAdminLogin={() => setShowAdminLoginModal(true)}
        />

        {/* ADMIN MODE VIEW */}
        {isAdmin ? (
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminPortal
              jobs={jobs}
              trainings={trainings}
              users={users}
              applications={applications}
              onAddJob={handleAddJob}
              onUpdateJob={handleUpdateJob}
              onDeleteJob={handleDeleteJob}
              onAddTraining={handleAddTraining}
              onUpdateTraining={handleUpdateTraining}
              onDeleteTraining={handleDeleteTraining}
              onUpdateUserStatus={handleUpdateUserStatus}
              onDeleteUser={handleDeleteUser}
            />
          </main>
        ) : !user ? (
          /* AUTH / LOGIN / SIGNUP PAGE */
          <main className="flex-1 w-full flex items-center justify-center py-6 px-4">
            <AuthPage onLoginUser={handleLoginUser} onLoginAdmin={handleLoginAdmin} />
          </main>
        ) : (
          /* USER MAIN DASHBOARD */
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            
            {/* 3D Interviewer Candidate Walkway Scene */}
            <Applicant3DScene candidateName={`${user.firstName} ${user.lastName}`} />

            {/* Email Alerts Bar Notification if active */}
            {alertsEnabled && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold flex items-center justify-between gap-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>
                    Push Email Alerts Active for <strong className="text-white">{user.branch}</strong> ({user.degree}) batch opportunities!
                  </span>
                </div>
                <button
                  onClick={handleToggleAlerts}
                  className="text-[11px] underline text-emerald-400 hover:text-white"
                >
                  Manage
                </button>
              </div>
            )}

            {/* Curated Recommendations for Freshers */}
            {recommendedJobs.length > 0 && activeTab === 'jobs' && (
              <div className="rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/30 p-5 shadow-xl backdrop-blur-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Curated Match Recommendations for {user.firstName} ({user.branch})
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Based on your degree & branch</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
                  {recommendedJobs.map((job) => (
                    <JobCard
                      key={`rec-${job.id}`}
                      job={job}
                      onClick={(j) => setSelectedJob(j)}
                      isSaved={user?.savedJobIds?.includes(job.id)}
                      onToggleSave={(jobId) => handleToggleSaveJob(jobId)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* MAIN DASHBOARD CONTENT ROUTING */}
            {activeTab === 'career-path' ? (
              <CareerPathVisualizer
                defaultIndustry={selectedCareerIndustry}
                onSelectIndustryJobs={(industryName) => {
                  setFilters((prev) => ({ ...prev, industries: [industryName] }));
                  setActiveTab('jobs');
                }}
              />
            ) : activeTab === 'ats' ? (
              <AtsChecker
                user={user}
                onApplySuggestedRole={(role) => setActiveTab('jobs')}
                onBackToJobs={() => setActiveTab('jobs')}
              />
            ) : activeTab === 'applications' ? (
              <ApplicationTracker
                user={user}
                applications={applications}
                jobs={jobs}
                onBackToJobs={() => setActiveTab('jobs')}
                onSelectJob={(j) => setSelectedJob(j)}
                onUpdateProfile={handleUpdateUserProfile}
              />
            ) : activeTab === 'trainings' ? (
              <div className="space-y-6 w-full min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 transition flex items-center gap-2 font-bold text-xs shadow-lg shadow-black/40 group"
                  >
                    <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Job Search Portal</span>
                  </button>
                  <span className="text-xs text-slate-400 font-mono">
                    {trainings.length} Available Training Hubs
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-black text-white">Coaching & Training Hubs for Freshers</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Connect with accredited academies, review placement packages, and direct message instructors.</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs">
                    Verified Partners
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
                  {trainings.map((center) => (
                    <TrainingCard key={center.id} center={center} onClick={(c) => setSelectedTraining(c)} />
                  ))}
                </div>
              </div>
            ) : (
              /* JOBS / INTERNSHIPS / WALKINS VIEW WITH FILTERS */
              <div className="flex flex-col lg:flex-row gap-6 items-start w-full min-w-0">
                {/* Filter Sidebar */}
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onReset={handleResetFilters}
                  totalMatches={filteredJobs.length}
                />

                {/* Job Cards Grid */}
                <div className="flex-1 w-full min-w-0 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-slate-300 font-bold">
                      Showing {filteredJobs.length} {
                        activeTab === 'saved'
                          ? 'Saved Bookmarks'
                          : activeTab === 'internships'
                          ? 'Internships'
                          : activeTab === 'walkins'
                          ? 'Walk-In Drives'
                          : 'Full-Time Jobs'
                      }
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSimulateNewJobAlert}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[11px] font-bold flex items-center gap-1 transition"
                        title="Trigger live 3D pop-up notification preview"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" /> Test 3D Job Alert
                      </button>
                      <span className="text-slate-500 font-mono hidden sm:inline">Fresher & Entry-Level Only</span>
                    </div>
                  </div>

                  {loadingJobs ? (
                    <JobCardSkeletonGrid count={6} />
                  ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl bg-slate-900/50 border border-slate-800 p-8 space-y-3">
                      <p className="text-sm font-bold text-slate-300">
                        {activeTab === 'saved'
                          ? "You haven't saved any job listings yet."
                          : 'No postings matched your exact filters.'}
                      </p>
                      {activeTab === 'saved' && (
                        <p className="text-xs text-slate-400">
                          Click the bookmark icon on any job card to save it for quick access later!
                        </p>
                      )}
                      <button
                        onClick={activeTab === 'saved' ? () => setActiveTab('jobs') : handleResetFilters}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition"
                      >
                        {activeTab === 'saved' ? 'Explore Job Opportunities' : 'Reset All Filters (0)'}
                      </button>
                    </div>
                  ) : (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
                      <AnimatePresence mode="popLayout">
                        {filteredJobs.map((job) => (
                          <motion.div
                            key={job.id}
                            layout
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: -15 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                          >
                            <JobCard
                              job={job}
                              onClick={(j) => setSelectedJob(j)}
                              isSaved={user?.savedJobIds?.includes(job.id)}
                              onToggleSave={(jobId) => handleToggleSaveJob(jobId)}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

          </main>
        )}

        {/* Footer */}
        <footer className="relative z-10 w-full bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
          <p>© 2026 FresherLaunch 3D • Dedicated Career Platform for Freshers & Entry-Level Graduates</p>
        </footer>

      </div>

      {/* DETAIL MODALS */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          user={user}
          onClose={() => setSelectedJob(null)}
          onApply={handleApplyToJob}
          isApplied={applications.some((a) => a.jobId === selectedJob.id && a.userId === user?.uid)}
          isSaved={user?.savedJobIds?.includes(selectedJob.id)}
          onToggleSave={(jobId) => handleToggleSaveJob(jobId)}
          onExploreCareerPath={(industry) => {
            setSelectedCareerIndustry(industry);
            setActiveTab('career-path');
          }}
        />
      )}

      {selectedTraining && (
        <TrainingDetailModal
          center={selectedTraining}
          user={user}
          onClose={() => setSelectedTraining(null)}
        />
      )}

      {/* ADMIN LOGIN MODAL OVERLAY */}
      {showAdminLoginModal && !isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setShowAdminLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <AuthPage onLoginUser={handleLoginUser} onLoginAdmin={handleLoginAdmin} />
          </div>
        </div>
      )}

      {/* 3D NEW JOB MATCH NOTIFICATION POP-UP */}
      <NewJobNotification
        job={newJobAlert}
        onClose={() => setNewJobAlert(null)}
        onViewJob={(jobToView) => setSelectedJob(jobToView)}
      />

    </div>
  );
}
