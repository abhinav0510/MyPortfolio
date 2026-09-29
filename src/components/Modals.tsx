'use client';

import React from 'react';
import Image from 'next/image';
import { X, ExternalLink, Download, Star, Check, Phone, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { Project, ExperienceItem, EducationItem, personalData } from '@/data/portfolioData';
import { GithubIcon } from './SocialIcons';

interface ModalsProps {
  selectedProject: Project | null;
  onCloseProject: () => void;
  showResumeModal: boolean;
  onCloseResumeModal: () => void;
  selectedExperience: ExperienceItem | null;
  onCloseExperienceModal: () => void;
  selectedEducation: EducationItem | null;
  onCloseEducationModal: () => void;
  showPhoneModal: boolean;
  onClosePhoneModal: () => void;
}

export default function Modals({
  selectedProject,
  onCloseProject,
  showResumeModal,
  onCloseResumeModal,
  selectedExperience,
  onCloseExperienceModal,
  selectedEducation,
  onCloseEducationModal,
  showPhoneModal,
  onClosePhoneModal
}: ModalsProps) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#12141c] border border-white/15 rounded-2xl overflow-hidden shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onCloseProject}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Media Header (Video or Image) */}
            <div className="relative w-full h-64 bg-neutral-900 overflow-hidden">
              {selectedProject.videoUrl ? (
                <video
                  src={selectedProject.videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={selectedProject.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#12141c] via-transparent to-black/30 pointer-events-none"></div>
              <span className="absolute bottom-4 left-6 px-3 py-1 rounded-md bg-neutral-900/90 border border-white/10 text-xs font-mono text-white font-semibold z-10">
                {selectedProject.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                {selectedProject.stars && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                    <Star size={14} className="fill-amber-400" />
                    <span>{selectedProject.stars} Stars</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {/* Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase">Technologies Used</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={selectedProject.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  <span>View Repository</span>
                  <GithubIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#12141c] border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseResumeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Resume Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{personalData.name}</h2>
                <p className="text-blue-400 font-mono text-sm font-semibold">{personalData.role}</p>
                <p className="text-xs text-neutral-400 mt-1">{personalData.location} • {personalData.email}</p>
              </div>

              <a
                href={personalData.resumeUrl || '/assets/Abhinav_Srivastava.pdf'}
                download={personalData.resumeFilename || 'Abhinav_Srivastava.pdf'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors shadow-md cursor-pointer"
              >
                <Download size={14} />
                <span>Download PDF</span>
              </a>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono text-neutral-400 font-bold tracking-wider">Executive Summary</h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-[#0b0c10] p-4 rounded-xl border border-white/10">
                Full Stack Developer with expertise in Next.js, React, TypeScript, Spring Boot, and PostgreSQL. Experienced in designing scalable frontend architectures and RESTful microservices, with hands-on enterprise integration background at Cognizant.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono text-neutral-400 font-bold tracking-wider">Work Experience</h4>
              <div className="bg-[#0b0c10] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-bold text-white">Trainee - Cognizant GenC (TIBCO Track)</h5>
                    <p className="text-xs text-neutral-400">Cognizant Technology Solutions</p>
                  </div>
                  <span className="text-xs font-mono text-blue-400">Mar 2025 – May 2026</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1 list-disc pl-4">
                  <li>Trained in TIBCO BW5, Eclipse, SQL, and enterprise middleware patterns.</li>
                  <li>Implemented XML/JSON transformation workflows and real-time microservices.</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono text-neutral-400 font-bold tracking-wider">Education</h4>
              <div className="bg-[#0b0c10] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-white/20 flex items-center justify-center shrink-0 overflow-hidden relative p-1">
                    <Image src="/assets/AKTU.png" alt="AKTU Logo" width={40} height={40} className="w-full h-full object-contain rounded-md" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">B.Tech in Artificial Intelligence And Machine Learning</h5>
                    <p className="text-xs text-neutral-400">Dr. A.P.J. Abdul Kalam Technical University</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-amber-400 block">CGPA: 7.2/10</span>
                  <span className="text-[11px] font-mono text-neutral-500">2022 – 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Details Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#12141c] border border-white/15 rounded-2xl p-6 space-y-5 shadow-2xl">
            <button
              onClick={onCloseExperienceModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-xl text-blue-400">
                C
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedExperience.role}</h3>
                <p className="text-xs text-neutral-400">{selectedExperience.company} • {selectedExperience.period}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono text-neutral-400 font-semibold">Key Responsibilities</h4>
              <ul className="text-xs sm:text-sm text-neutral-300 space-y-2 list-disc pl-4">
                {selectedExperience.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">{b}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono text-neutral-400 font-semibold">Skills & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Details Modal */}
      {selectedEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#12141c] border border-white/15 rounded-2xl p-6 space-y-5 shadow-2xl">
            <button
              onClick={onCloseEducationModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-white/20 flex items-center justify-center shrink-0 overflow-hidden relative p-1">
                {selectedEducation.logo ? (
                  <Image
                    src={selectedEducation.logo}
                    alt={selectedEducation.institution}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <Award size={24} className="text-amber-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedEducation.degree}</h3>
                <p className="text-xs text-neutral-400">{selectedEducation.institution} • {selectedEducation.period}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0c10] border border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">Academic Score</span>
              <span className="text-sm font-bold text-amber-400 font-mono">{selectedEducation.score}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono text-neutral-400 font-semibold">Key Coursework</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Operating Systems, Web Engineering, Software Engineering.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Phone / Contact Info Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#12141c] border border-white/15 rounded-2xl p-6 space-y-5 shadow-2xl">
            <button
              onClick={onClosePhoneModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              <p className="text-xs text-neutral-400">Direct contact details for Abhinav Srivastava</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-white" />
                  <span className="text-xs font-mono text-white">{personalData.phone}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(personalData.phone, 'phone')}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 hover:text-white"
                >
                  {copiedText === 'phone' ? <Check size={14} className="text-white" /> : 'Copy'}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0b0c10] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-xs font-mono text-white">{personalData.email}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(personalData.email, 'email')}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 hover:text-white"
                >
                  {copiedText === 'email' ? <Check size={14} className="text-white" /> : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
