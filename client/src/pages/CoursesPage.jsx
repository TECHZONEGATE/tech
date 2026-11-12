import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  GraduationCap, 
  Award, 
  Building2, 
  ArrowRight, 
  Check, 
  Filter, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { COURSES } from '../data/coursesData';

const iconMap = {
  Target,
  GraduationCap,
  Award,
  Building2
};

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredCourses = activeFilter === 'ALL'
    ? COURSES
    : COURSES.filter(c => c.category === activeFilter);

  const filterTabs = [
    { id: 'ALL', label: 'All Programs' },
    { id: 'GATE', label: 'GATE' },
    { id: 'ESE', label: 'ESE' },
    { id: 'PSU', label: 'PSU' },
  ];

  return (
    <div className="bg-brand-offwhite">
      
      {/* Hero Header */}
      <section className="bg-navy-gradient text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="dark" size="md" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Academic Curriculum
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4 leading-tight">
            Programs Built Around <span className="text-gold">Your Goals.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Whether you are targeting high-yield subject mastery or end-to-end multi-stage competitive examination preparation, our curriculums are designed with clarity, depth, and academic discipline.
          </p>
        </div>
      </section>

      {/* Course Filter Tabs & Course Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Interactive Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-navy-deep text-gold shadow-md border border-navy-royal'
                  : 'bg-white text-brand-dark hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course, idx) => {
            const Icon = iconMap[course.icon] || Target;

            return (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-premium hover:shadow-premium-lg hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-surface/10 border border-navy-royal/20 flex items-center justify-center text-navy-royal">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {course.tag}
                    </span>
                  </div>

                  <h2 className="font-heading font-extrabold text-2xl text-navy-deep mb-2">
                    {course.title}
                  </h2>

                  <p className="text-xs font-semibold text-gold-dark mb-4">
                    {course.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {course.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 bg-brand-offwhite p-4 rounded-xl border border-slate-200/60 text-xs">
                    {course.highlights.map((h, i) => (
                      <div key={i}>
                        <span className="text-slate-400 block font-medium">{h.label}</span>
                        <span className="font-semibold text-navy-deep">{h.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Program Pillars
                    </span>
                    {course.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    to={`/courses/${course.slug}`}
                    variant="primary"
                    className="w-full sm:w-auto flex-1 justify-center"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Course Details
                  </Button>

                  <Button
                    to={`/student-enquiry?course=${course.slug}`}
                    variant="outline"
                    className="w-full sm:w-auto justify-center"
                  >
                    Enquire Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* Course Comparison Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="Pathway Architecture"
            title="Compare Our Preparation"
            highlight="Pathways."
            subtitle="Understand how our educational offerings align with your preparation timeline, career targets, and study commitments."
          />

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-deep text-white font-heading text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Program</th>
                  <th className="py-4 px-6">Syllabus Coverage</th>
                  <th className="py-4 px-6">Pedagogical Depth</th>
                  <th className="py-4 px-6">Testing Structure</th>
                  <th className="py-4 px-6">Best Suited For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-normal">
                {COURSES.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"}>
                    <td className="py-4 px-6 font-bold text-navy-deep">
                      <Link to={`/courses/${c.slug}`} className="hover:text-gold transition-colors">
                        {c.title.split('—')[0]}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-slate-700">{c.comparisonPoints.coverage}</td>
                    <td className="py-4 px-6 text-slate-700">{c.comparisonPoints.depth}</td>
                    <td className="py-4 px-6 text-slate-700">{c.comparisonPoints.testing}</td>
                    <td className="py-4 px-6 text-slate-600 text-xs">{c.comparisonPoints.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

    </div>
  );
}
