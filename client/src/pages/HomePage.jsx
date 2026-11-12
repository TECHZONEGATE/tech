import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CourseOverviewSection } from '../components/home/CourseOverviewSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { PreparationJourneySection } from '../components/home/PreparationJourneySection';
import { SeminarPreviewSection } from '../components/home/SeminarPreviewSection';
import { EnquiryCtaSection } from '../components/home/EnquiryCtaSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CourseOverviewSection />
      <WhyChooseSection />
      <PreparationJourneySection />
      <SeminarPreviewSection />
      <EnquiryCtaSection />
    </div>
  );
}
