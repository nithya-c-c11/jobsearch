import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Lock,
  Mail,
  Phone,
  GraduationCap,
  Layers,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  KeyRound,
  FileText,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { BRANCHES_LIST, DEGREES_LIST } from '../data/initialData';

interface AuthPageProps {
  onLoginUser: (profile: UserProfile) => void;
  onLoginAdmin: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginUser, onLoginAdmin }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'admin'>('login');

  // Sign up state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [degree, setDegree] = useState(DEGREES_LIST[0]);
  const [branch, setBranch] = useState(BRANCHES_LIST[0]);
  const [resumeFileName, setResumeFileName] = useState('');
  const [bgDocFileName, setBgDocFileName] = useState('');
  const [signupError, setSignupError] = useState('');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Admin state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleBgDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBgDocFileName(e.target.files[0].name);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!firstName || !lastName || !email || !password) {
      setSignupError('Please fill in all mandatory fields.');
      return;
    }

    if (password !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }

    const newUser: UserProfile = {
      uid: 'user-' + Date.now(),
      firstName,
      lastName,
      email,
      phone,
      degree,
      branch,
      resumeFileName: resumeFileName || 'Fresher_Resume.pdf',
      bgDocFileName: bgDocFileName || 'Degree_Certificate.pdf',
      bgDocStatus: bgDocFileName ? 'pending' : 'pending',
      alertsEnabled: true,
      createdAt: new Date().toISOString()
    };

    onLoginUser(newUser);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }

    const userProfile: UserProfile = {
      uid: 'user-' + Date.now(),
      firstName: loginEmail.split('@')[0] || 'Fresher',
      lastName: 'Applicant',
      email: loginEmail,
      phone: '+91 98765 43210',
      degree: 'B.Tech',
      branch: 'CSE',
      resumeFileName: 'Fresher_Resume.pdf',
      bgDocFileName: 'Background_Doc.pdf',
      bgDocStatus: 'verified',
      alertsEnabled: true,
      createdAt: new Date().toISOString()
    };

    onLoginUser(userProfile);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    // Secret Admin check
    if (adminUsername.trim() === 'Who is my God' && adminPassword === 'Radhakrishna') {
      onLoginAdmin();
    } else {
      setAdminError('Invalid security credentials. Access denied.');
    }
  };

  return (
    <div className="relative z-10 min-w-full min-h-[85vh] flex items-center justify-center p-4 my-6">
      
      {/* 3D Glassmorphic Card Container */}
      <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all">
        
        {/* Mode Toggle Tabs */}
        <div className="flex rounded-2xl bg-slate-950 p-1 mb-6 border border-slate-800">
          <motion.button
            onClick={() => setMode('login')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </motion.button>

          <motion.button
            onClick={() => setMode('signup')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              mode === 'signup'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </motion.button>
        </div>

        {/* LOG IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-black text-white">Welcome Back, Fresher!</h2>
              <p className="text-xs text-slate-400 mt-1">Access curated job & internship opportunities</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="fresher@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotSent(!forgotSent)}
                  className="text-[11px] text-blue-400 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {forgotSent && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium">
                Password recovery link has been sent to your email!
              </div>
            )}

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {loginError}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 25px -5px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              Log In to Portal <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
            <div className="text-center mb-3">
              <h2 className="text-xl font-black text-white">Create Fresher Profile</h2>
              <p className="text-xs text-slate-400 mt-0.5">Build your career launchpad with verified credentials</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Rahul"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sharma"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@rgmcet.edu.in"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Degree Qualification</label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                >
                  {DEGREES_LIST.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Branch / Stream</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                >
                  {BRANCHES_LIST.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resume & Background Document Uploads */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Resume Upload</label>
                <label className="cursor-pointer flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500 text-xs transition">
                  <Upload className="w-3.5 h-3.5 mr-1 text-blue-400" />
                  <span className="truncate">{resumeFileName || 'Select Resume'}</span>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
                </label>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Background Doc</label>
                <label className="cursor-pointer flex items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500 text-xs transition">
                  <FileText className="w-3.5 h-3.5 mr-1 text-purple-400" />
                  <span className="truncate">{bgDocFileName || 'Marksheet/ID'}</span>
                  <input type="file" accept=".pdf,.png,.jpg" onChange={handleBgDocChange} className="hidden" />
                </label>
              </div>
            </div>

            {signupError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {signupError}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 25px -5px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              Complete Fresher Sign Up <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </motion.button>
          </form>
        )}

        {/* ADMIN LOGIN MODE */}
        {mode === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold uppercase tracking-wider">
                Authorized Access
              </span>
              <h2 className="text-xl font-black text-white mt-1">Admin Portal Verification</h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time live multi-device CRUD administration</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Security Identifier</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="Enter Administrator Identifier"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Security Passcode</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter Security Passcode"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 25px -5px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.97, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              Authenticate Admin Portal <ShieldCheck className="w-4 h-4 text-purple-300" />
            </motion.button>
          </form>
        )}

        {/* ADMIN MODE SWITCHER BELOW LOGIN BUTTONS */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          {mode !== 'admin' ? (
            <motion.button
              type="button"
              onClick={() => setMode('admin')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-slate-400 hover:text-purple-300 transition flex items-center justify-center gap-1.5 mx-auto font-medium"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Switch to Admin Portal Login
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={() => setMode('login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-slate-400 hover:text-blue-300 transition flex items-center justify-center gap-1.5 mx-auto font-medium"
            >
              <User className="w-4 h-4 text-blue-400" /> Return to Fresher Candidate Login
            </motion.button>
          )}
        </div>

      </div>
    </div>
  );
};
