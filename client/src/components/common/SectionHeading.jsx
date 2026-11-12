import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  theme = 'light',
  className
}) {
  const isCenter = align === 'center';

  return (
    <div className={cn(
      "max-w-3xl mb-12 md:mb-16",
      isCenter ? "mx-auto text-center" : "text-left",
      className
    )}>
      {badge && (
        <div className={cn("mb-4 flex", isCenter ? "justify-center" : "justify-start")}>
          <Badge variant={theme === 'dark' ? 'dark' : 'gold'}>
            {badge}
          </Badge>
        </div>
      )}

      <h2 className={cn(
        "font-heading font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl leading-tight mb-4",
        theme === 'dark' ? "text-white" : "text-navy-deep"
      )}>
        {title}{' '}
        {highlight && (
          <span className="relative inline-block text-gold">
            {highlight}
            <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gradient-to-r from-gold to-transparent opacity-60 rounded-full" />
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={cn(
          "text-base sm:text-lg leading-relaxed font-normal",
          theme === 'dark' ? "text-slate-300" : "text-brand-muted"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
