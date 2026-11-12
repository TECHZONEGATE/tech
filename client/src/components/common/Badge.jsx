import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'gold', size = 'md', className }) {
  const variants = {
    gold: "bg-gold/15 text-amber-700 border border-gold/40",
    navy: "bg-navy-deep text-white border border-navy-royal/30",
    soft: "bg-brand-bluegray text-navy-royal border border-slate-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dark: "bg-navy-surface text-gold border border-gold/30"
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs font-semibold",
    md: "px-3 py-1 text-xs font-bold uppercase tracking-wider",
    lg: "px-4 py-1.5 text-sm font-semibold"
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-heading transition-colors",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
}
