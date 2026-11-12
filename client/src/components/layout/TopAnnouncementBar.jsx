import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function TopAnnouncementBar() {
  return (
    <div className="bg-navy-deep border-b border-navy-royal/30 text-slate-200 py-2 px-4 text-xs sm:text-sm font-medium relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center">
        <span className="inline-flex items-center gap-1.5 text-gold font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="hidden sm:inline">Academic Excellence</span>
        </span>
        <span className="text-slate-400 hidden sm:inline">•</span>
        <span className="text-slate-200 truncate">
          Empowering Future Engineers Through Focused Preparation
        </span>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-gold hover:text-gold-soft font-semibold transition-colors ml-1 group"
        >
          <span>Explore Courses</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
