export interface Job {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  year: number; // Primary/legacy batch year
  years?: number[]; // Target Batch Years (Select Multiple)
  branches: string[]; // Target Branches (Select Multiple Engineering Branches)
  degrees: string[]; // Qualification / Degree (Select Multiple)
  industry: string;
  salary: string;
  location: string;
  category: 'job' | 'internship' | 'walkin';
  lastDate?: string; // Last Date To Apply (Optional)
  skills: string[];
  description: string;
  applyLink: string; // Direct Apply Link URL *
  hrPhone?: string;
  isWalkin?: boolean;
  walkinDate?: string;
  walkinVenue?: string;
  createdAt: string;
}

export interface TrainingCenter {
  id: string;
  title: string;
  instituteName: string;
  location: string;
  courses: string[];
  fee: string;
  hrPhone: string;
  instructorEmail: string;
  description: string;
  websiteUrl?: string;
  applyLink?: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  degree: string;
  branch: string;
  resumeFileName?: string;
  resumeText?: string;
  bgDocFileName?: string;
  bgDocStatus: 'pending' | 'verified' | 'rejected';
  alertsEnabled: boolean;
  createdAt: string;
  cgpa?: string;
  gradYear?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  savedJobIds?: string[];
  certifications?: string[];
  certDocFileName?: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userDegree: string;
  userBranch: string;
  jobId: string;
  jobTitle: string;
  company: string;
  category: 'job' | 'internship' | 'walkin';
  status: 'submitted' | 'under_review' | 'shortlisted' | 'rejected';
  appliedAt: string;
  applyLink?: string;
}

export interface ATSResult {
  atsScore: number;
  strengths: string[];
  missingKeywords: string[];
  recommendedSkills: string[];
  tailoredAdvice: string;
  suggestedRoles: string[];
}
