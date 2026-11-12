import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-offwhite px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-navy-surface text-gold flex items-center justify-center mx-auto shadow-gold-glow">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="font-heading font-black text-6xl text-navy-deep">
          404
        </h1>

        <h2 className="font-heading font-extrabold text-2xl text-navy-deep">
          Page Not Found
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          The educational page you are looking for does not exist or may have been relocated.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            to="/"
            variant="primary"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Return to Home
          </Button>
          <Button
            to="/courses"
            variant="outline"
          >
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
}
