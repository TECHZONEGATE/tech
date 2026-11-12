import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none cursor-pointer tracking-wide";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-7 py-3.5 text-base font-bold gap-2.5",
    xl: "px-8 py-4 text-lg font-bold gap-3"
  };

  const variants = {
    primary: "bg-gradient-to-r from-gold to-[#c7984f] text-navy-deep hover:from-[#e5b974] hover:to-gold shadow-gold-glow hover:shadow-lg hover:-translate-y-0.5 focus:ring-gold active:translate-y-0 border border-gold-soft/40",
    secondary: "bg-navy-royal text-white hover:bg-navy-surface shadow-navy-glow hover:shadow-lg hover:-translate-y-0.5 focus:ring-navy-royal active:translate-y-0 border border-navy-light/40",
    outline: "border-2 border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-white focus:ring-navy active:translate-y-0",
    outlineGold: "border border-gold text-gold hover:bg-gold/10 focus:ring-gold",
    ghost: "text-navy-deep hover:bg-navy/5 focus:ring-navy",
    dark: "bg-navy-deep text-white hover:bg-navy shadow-md hover:-translate-y-0.5 focus:ring-navy-deep border border-navy-royal/30",
    white: "bg-white text-navy-deep hover:bg-brand-offwhite shadow-md hover:-translate-y-0.5 border border-slate-200"
  };

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && <span className="inline-flex transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex transition-transform group-hover:translate-x-1">{icon}</span>}
    </>
  );

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    variants[variant],
    className
  );

  if (to) {
    return (
      <Link to={to} className={cn(classes, "group")} {...props} ref={ref}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cn(classes, "group")} {...props} ref={ref}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cn(classes, "group")}
      onClick={onClick}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
