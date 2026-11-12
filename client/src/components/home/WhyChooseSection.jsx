import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Layers, 
  Target, 
  Repeat, 
  Compass, 
  TrendingUp 
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { WHY_CHOOSE_ITEMS } from '../../data/coursesData';

const iconMap = {
  Brain,
  Layers,
  Target,
  Repeat,
  Compass,
  TrendingUp
};

export function WhyChooseSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden border-y border-slate-200/60">
      
      {/* Subtle background graphics */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-bluegray/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Educational Philosophy"
          title="Preparation With Purpose."
          highlight="Progress With Confidence."
          subtitle="Our academic methodology prioritizes genuine conceptual understanding, disciplined progression, and strategic preparation without shortcuts."
        />

        {/* 6 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_ITEMS.map((item, index) => {
            const Icon = iconMap[item.icon] || Brain;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative rounded-2xl p-7 bg-brand-offwhite/70 border border-slate-200 hover:border-gold/40 hover:bg-white transition-all duration-300 hover:shadow-premium group"
              >
                {/* Icon with subtle glow */}
                <div className="w-13 h-13 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center mb-5 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-300">
                  <Icon className="w-6 h-6 text-navy-royal group-hover:text-amber-700 transition-colors" />
                </div>

                <h3 className="font-heading font-bold text-xl text-navy-deep group-hover:text-navy-royal transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
