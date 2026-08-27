'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceEducationSection from '@/components/ExperienceEducationSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Modals from '@/components/Modals';
import AIExplainerModal from '@/components/AIExplainerModal';
import { Project, ExperienceItem, EducationItem } from '@/data/portfolioData';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Modal States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [aiExplainerProject, setAiExplainerProject] = useState<Project | null>(null);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<EducationItem | null>(null);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);

  // Active section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'experience', 'education', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : 'light'}`}>
      {/* Main Content */}
      <main className="transition-all duration-300 min-h-screen bg-[#060709] text-white">
        
        {/* Dashboard Content */}
        <div className="max-w-[1600px] mx-auto px-3 sm:px-5 py-3 space-y-6">
          
          {/* Hero Cockpit Dashboard (includes projects, stats, monitors inline) */}
          <HeroSection
            onViewWorkClick={() => scrollToSection('projects')}
            onDownloadResumeClick={() => setShowResumeModal(true)}
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenAIExplainer={(project) => setAiExplainerProject(project)}
          />

          {/* Skills */}
          <SkillsSection />

          {/* Experience & Education */}
          <ExperienceEducationSection
            onOpenExperienceModal={(exp) => setSelectedExperience(exp)}
            onOpenEducationModal={(edu) => setSelectedEducation(edu)}
          />

          {/* Blog */}
          <BlogSection />

          {/* Contact */}
          <ContactSection />
          
        </div>
      </main>

      {/* Modals */}
      <Modals
        selectedProject={selectedProject}
        onCloseProject={() => setSelectedProject(null)}
        showResumeModal={showResumeModal}
        onCloseResumeModal={() => setShowResumeModal(false)}
        selectedExperience={selectedExperience}
        onCloseExperienceModal={() => setSelectedExperience(null)}
        selectedEducation={selectedEducation}
        onCloseEducationModal={() => setSelectedEducation(null)}
        showPhoneModal={showPhoneModal}
        onClosePhoneModal={() => setShowPhoneModal(false)}
      />

      {/* AI Project Explainer Voice & Text Copilot Modal */}
      <AIExplainerModal
        project={aiExplainerProject}
        isOpen={!!aiExplainerProject}
        onClose={() => setAiExplainerProject(null)}
      />
    </div>
  );
}
