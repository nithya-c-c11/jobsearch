import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  GraduationCap,
  Bell,
  BellOff,
  User,
  ShieldCheck,
  FileCheck,
  LogOut,
  Sparkles,
  MapPin,
  Menu,
  X,
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { UserProfile } from '../types';
import { calculateProfileCompletion } from './ProfileCompletionWidget';

interface NavbarProps {
  activeTab: 'jobs' | 'internships' | 'walkins' | 'trainings' | 'ats' | 'applications' | 'saved' | 'career-path';
  setActiveTab: (tab: 'jobs' | 'internships' | 'walkins' | 'trainings' | 'ats' | 'applications' | 'saved' | 'career-path') => void;
  user: UserProfile | null;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onLogout: () => void;
  onToggleAlerts: () => void;
  alertsEnabled: boolean;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  isAdmin,
  setIsAdmin,
  onLogout,
  onToggleAlerts,
  alertsEnabled,
  onOpenAdminLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const savedCount = user?.savedJobIds?.length || 0;

  const navItems = [
    { id: 'jobs', label: 'Full-Time Jobs', icon: Briefcase },
    { id: 'internships', label: 'Internships', icon: GraduationCap },
    { id: 'walkins', label: 'Walk-In Drives', icon: MapPin },
    { id: 'trainings', label: 'Training Centers', icon: Sparkles },
    { id: 'career-path', label: 'Career Roadmap', icon: TrendingUp },
    { id: 'saved', label: savedCount > 0 ? `Saved (${savedCount})` : 'Saved', icon: Bookmark },
    { id: 'ats', label: 'ATS Resume Checker', icon: FileCheck },
    { id: 'applications', label: 'My Applications', icon: User }
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              Fresher<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Launch</span> 3D
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Fresher & Entry-Level Portal</p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        {/* Action Controls & User Controls */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Email Alerts Toggle */}
          <motion.button
            onClick={onToggleAlerts}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            title="Toggle Browser & Email Alerts for Matching Branch/Degree"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-colors ${
              alertsEnabled
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {alertsEnabled ? (
              <>
                <Bell className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> Alerts Active
              </>
            ) : (
              <>
                <BellOff className="w-3.5 h-3.5 text-slate-500" /> Get Email Alerts
              </>
            )}
          </motion.button>

          {/* Admin Toggle / Portal */}
          {isAdmin ? (
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Admin Mode Active
            </span>
          ) : (
            <motion.button
              onClick={onOpenAdminLogin}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-300 hover:border-purple-500/40 text-xs font-medium transition-colors"
            >
              Admin Portal
            </motion.button>
          )}

          {/* User Profile / Logout */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <motion.button
                onClick={() => setActiveTab('applications')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                title="Click to view Profile Completion & Recruiter Pro-Tips"
                className="text-right transition group"
              >
                <div className="flex items-center gap-1.5 justify-end">
                  <p className="text-xs font-bold text-slate-200 group-hover:text-blue-300">{user.firstName} {user.lastName}</p>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 font-mono">
                    {calculateProfileCompletion(user).score}%
                  </span>
                </div>
                <p className="text-[10px] text-blue-400 font-mono">{user.degree} • {user.branch}</p>
              </motion.button>
              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.9, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                title="Log Out"
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-800 transition-colors shadow-md"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-colors"
            >
              Sign In / Sign Up
            </motion.button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    isActive ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' : 'text-slate-300 bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-400" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={onToggleAlerts}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                alertsEnabled ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 text-slate-400'
              }`}
            >
              <Bell className="w-3.5 h-3.5" /> {alertsEnabled ? 'Alerts Active' : 'Email Alerts'}
            </button>

            {isAdmin ? (
              <span className="text-xs text-purple-400 font-bold">Admin Active</span>
            ) : (
              <button
                onClick={() => { onOpenAdminLogin(); setMobileMenuOpen(false); }}
                className="text-xs text-slate-400 hover:text-white"
              >
                Admin Login
              </button>
            )}

            {user && (
              <button onClick={onLogout} className="text-xs text-rose-400 font-bold flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
