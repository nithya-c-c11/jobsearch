import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrainingCenter, UserProfile } from '../types';
import {
  X,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Send,
  Upload,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface TrainingDetailModalProps {
  center: TrainingCenter | null;
  user: UserProfile | null;
  onClose: () => void;
}

export const TrainingDetailModal: React.FC<TrainingDetailModalProps> = ({
  center,
  user,
  onClose
}) => {
  const [message, setMessage] = useState('');
  const [sentMsg, setSentMsg] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(user?.resumeFileName || null);

  if (!center) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSentMsg(true);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-xl flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-purple-400" />
            </div>
          </div>

          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Training & Career Accelerator
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">{center.title}</h2>
            <p className="text-xs text-blue-400 font-semibold">{center.instituteName}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-0.5">Location & Mode</span>
            <span className="text-slate-200 font-semibold flex items-center gap-1">
              <MapPin className="w-4 h-4 text-indigo-400" /> {center.location}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-500 font-mono block mb-0.5">Course Fee</span>
            <span className="text-emerald-400 font-bold text-sm">{center.fee}</span>
          </div>
        </div>

        {/* Courses Offered */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Curriculum & Modules</h4>
          <div className="flex flex-wrap gap-1.5">
            {center.courses.map((course) => (
              <span key={course} className="px-3 py-1 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-semibold">
                {course}
              </span>
            ))}
          </div>
        </div>

        {/* Direct HR & Instructor Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {center.hrPhone && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">HR / Head Phone</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{center.hrPhone}</span>
              </div>
              <motion.a
                href={`tel:${center.hrPhone}`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/40 text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
              >
                <Phone className="w-3 h-3" /> Call HR
              </motion.a>
            </div>
          )}

          {center.instructorEmail && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Instructor Email</span>
                <span className="text-xs font-bold text-blue-400 font-mono truncate max-w-[130px] block">{center.instructorEmail}</span>
              </div>
              <motion.a
                href={`mailto:${center.instructorEmail}`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/40 text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
              >
                <Mail className="w-3 h-3" /> Email
              </motion.a>
            </div>
          )}
        </div>

        {/* Direct Messaging & Resume Upload for Instructor Feedback */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-purple-400" /> Direct Messaging with Instructors for Personalized Feedback
          </h4>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Attach Resume for Review:</span>
            <label className="cursor-pointer px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white border border-purple-500/40 font-semibold flex items-center gap-1 transition">
              <Upload className="w-3.5 h-3.5" />
              <span>{resumeName ? 'Change Resume' : 'Upload PDF'}</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          {resumeName && (
            <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Attached: {resumeName}
            </p>
          )}

          {sentMsg ? (
            <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Message sent to instructors! They will review your profile & respond shortly.
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Ask instructor about curriculum, placement guarantee, or profile fit..."
                className="w-full p-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95, y: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-purple-500/20"
              >
                <Send className="w-3.5 h-3.5" /> Send Message
              </motion.button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {center.websiteUrl && (
            <motion.a
              href={center.websiteUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, x: 2 }}
              className="text-xs font-semibold text-purple-400 hover:underline flex items-center gap-1"
            >
              Institute Website <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}

          <motion.a
            href={center.applyLink || center.websiteUrl || '#'}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.95, y: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            Enroll / Inquire <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </div>
  );
};
