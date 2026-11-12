import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AccordionItem({ title, children, isOpen, onToggle, id, dark = false }) {
  return (
    <div className={cn(
      "border rounded-xl transition-all duration-200 overflow-hidden",
      dark 
        ? "border-navy-royal/30 bg-navy-surface/50 hover:border-gold/30" 
        : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
    )}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-heading font-semibold text-base sm:text-lg transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={dark ? "text-white" : "text-navy-deep"}>
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "p-1 rounded-full flex-shrink-0 transition-colors",
            dark ? "text-gold bg-navy-deep" : "text-navy-royal bg-brand-bluegray"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className={cn(
              "px-6 pb-5 pt-1 text-sm sm:text-base leading-relaxed border-t",
              dark 
                ? "text-slate-300 border-navy-royal/20" 
                : "text-brand-muted border-slate-100"
            )}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, allowMultiple = false, dark = false, className }) {
  const [openIndices, setOpenIndices] = useState([0]); // first open by default

  const handleToggle = (index) => {
    if (allowMultiple) {
      if (openIndices.includes(index)) {
        setOpenIndices(openIndices.filter(i => i !== index));
      } else {
        setOpenIndices([...openIndices, index]);
      }
    } else {
      setOpenIndices(openIndices.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question || item.title}
          isOpen={openIndices.includes(index)}
          onToggle={() => handleToggle(index)}
          dark={dark}
        >
          {item.answer || item.content || item.description}
        </AccordionItem>
      ))}
    </div>
  );
}
