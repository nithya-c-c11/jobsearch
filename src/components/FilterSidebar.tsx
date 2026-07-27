import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Filter,
  RotateCcw,
  Search,
  Building2,
  GraduationCap,
  Calendar,
  Layers,
  DollarSign,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BRANCHES_LIST, DEGREES_LIST, YEARS_LIST, INDUSTRIES_LIST } from '../data/initialData';

export interface FilterState {
  years: number[];
  degrees: string[];
  branches: string[];
  industry: string;
  isRemoteOnly: boolean;
  minSalaryLpa: number;
  searchQuery: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  totalMatches: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onReset,
  totalMatches
}) => {
  const [industrySearch, setIndustrySearch] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const toggleYear = (year: number) => {
    setFilters((prev) => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter((y) => y !== year)
        : [...prev.years, year]
    }));
  };

  const toggleDegree = (degree: string) => {
    setFilters((prev) => ({
      ...prev,
      degrees: prev.degrees.includes(degree)
        ? prev.degrees.filter((d) => d !== degree)
        : [...prev.degrees, degree]
    }));
  };

  const toggleBranch = (branch: string) => {
    setFilters((prev) => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter((b) => b !== branch)
        : [...prev.branches, branch]
    }));
  };

  const filteredIndustries = INDUSTRIES_LIST.filter((ind) =>
    ind.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const activeFilterCount =
    filters.years.length +
    filters.degrees.length +
    filters.branches.length +
    (filters.industry ? 1 : 0) +
    (filters.isRemoteOnly ? 1 : 0) +
    (filters.minSalaryLpa > 0 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Smart Filters</h3>
            <p className="text-[10px] text-slate-400 font-mono">
              {totalMatches} Active Opportunities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
              title="Reset 0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>
          )}

          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      <div className={`${collapsed ? 'hidden lg:block' : 'block'} space-y-6 mt-4`}>
        {/* Search Query */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <Search className="w-3.5 h-3.5 text-blue-400" /> Key Search
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
            placeholder="Role, skills, company..."
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Year Wise Selector (2023 - 2028) */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Batch Year
            </span>
            <span className="text-[10px] text-slate-500 font-mono">2023–2028</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {YEARS_LIST.map((year) => {
              const selected = filters.years.includes(year);
              return (
                <motion.button
                  key={year}
                  onClick={() => toggleYear(year)}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95, y: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    selected
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {year}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Branch / Stream Selector */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <Layers className="w-3.5 h-3.5 text-purple-400" /> Engineering & Academic Branch
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BRANCHES_LIST.map((branch) => {
              const selected = filters.branches.includes(branch);
              return (
                <motion.button
                  key={branch}
                  onClick={() => toggleBranch(branch)}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95, y: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                    selected
                      ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {branch}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Degree Qualification Selector */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Qualification / Degree
          </label>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {DEGREES_LIST.map((degree) => {
              const selected = filters.degrees.includes(degree);
              return (
                <motion.button
                  key={degree}
                  onClick={() => toggleDegree(degree)}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
                    selected
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-sm'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{degree}</span>
                  {selected && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Industry Sector Search & Select */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400" /> Industry Sector
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={industrySearch}
              onChange={(e) => setIndustrySearch(e.target.value)}
              placeholder="Type industry..."
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            <select
              value={filters.industry}
              onChange={(e) => setFilters((p) => ({ ...p, industry: e.target.value }))}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
            >
              <option value="">All Industry Sectors</option>
              {filteredIndustries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary Expectations Filter */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Min Expected Package
            </span>
            <span className="text-blue-400 font-mono">
              {filters.minSalaryLpa === 0 ? 'Any Package' : `₹${filters.minSalaryLpa} LPA+`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={filters.minSalaryLpa}
            onChange={(e) => setFilters((p) => ({ ...p, minSalaryLpa: Number(e.target.value) }))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        {/* Remote Only Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Remote Availability
          </span>
          <motion.button
            onClick={() => setFilters((p) => ({ ...p, isRemoteOnly: !p.isRemoteOnly }))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`w-10 h-6 rounded-full transition-colors relative p-0.5 shadow-md ${
              filters.isRemoteOnly ? 'bg-blue-600' : 'bg-slate-800'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-5 h-5 rounded-full bg-white shadow-md ${
                filters.isRemoteOnly ? 'ml-auto' : 'ml-0'
              }`}
            />
          </motion.button>
        </div>
      </div>
    </aside>
  );
};
