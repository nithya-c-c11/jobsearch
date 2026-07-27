import React from 'react';

export const JobCardSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-full min-w-0 max-w-full rounded-2xl bg-slate-900/80 border border-slate-800/90 p-4 sm:p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-pulse">
      {/* Background ambient shine placeholder */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-800/20 rounded-full blur-2xl" />

      <div className="w-full min-w-0 space-y-3">
        {/* Top Badges Row Skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-20 bg-slate-800/90 rounded-full" />
            <div className="h-5 w-16 bg-slate-800/90 rounded-full" />
          </div>
          <div className="h-7 w-7 bg-slate-800/90 rounded-xl" />
        </div>

        {/* Title & Company Skeleton */}
        <div className="space-y-2 pt-1">
          <div className="h-5 w-3/4 bg-slate-800/90 rounded-lg" />
          <div className="h-4 w-1/2 bg-slate-800/70 rounded-lg" />
        </div>

        {/* Badges Skeleton */}
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-24 bg-slate-800/80 rounded-md" />
          <div className="h-5 w-20 bg-slate-800/80 rounded-md" />
        </div>

        {/* Salary & Location Cards Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="h-8 bg-slate-950/80 rounded-xl border border-slate-800/80" />
          <div className="h-8 bg-slate-950/80 rounded-xl border border-slate-800/80" />
        </div>

        {/* Skills Skeleton */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <div className="h-5 w-14 bg-slate-800/60 rounded-md" />
          <div className="h-5 w-16 bg-slate-800/60 rounded-md" />
          <div className="h-5 w-12 bg-slate-800/60 rounded-md" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-800/80 rounded" />
        <div className="h-4 w-16 bg-slate-800/80 rounded" />
      </div>
    </div>
  );
};

export const JobCardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
      {Array.from({ length: count }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
};
