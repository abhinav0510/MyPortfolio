'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, GraduationCap, ArrowRight, Calendar, ExternalLink, Check, Minus, Square, X } from 'lucide-react';
import { experienceData, educationData, ExperienceItem, EducationItem } from '@/data/portfolioData';

interface ExperienceEducationProps {
  onOpenExperienceModal: (exp: ExperienceItem) => void;
  onOpenEducationModal: (edu: EducationItem) => void;
}

export default function ExperienceEducationSection({
  onOpenExperienceModal,
  onOpenEducationModal
}: ExperienceEducationProps) {
  return (
    <section className="space-y-4 font-mono" id="experience">

      {/* ===== Section Header Row ===== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest">
            <span className="text-neutral-600">⌐</span>
            {/* <span>03 / PORTFOLIO</span> */}
            <span className="flex-1 h-px bg-[#1a1d26] ml-2 max-w-25"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Experience <span className="text-neutral-400 font-light">&</span> Education<span className="text-white">_</span>
          </h2>
          <p className="text-xs text-neutral-500 font-sans">
            The journey of learning, building and shipping real solutions.
          </p>
        </div>

        {/* Right: Last Updated Badge + View Timeline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] text-white font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>Last Updated</span>
            <span className="text-neutral-200 font-semibold">19 May 2025 | 14:37 IST</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d0f16] border border-[#1a1d26] hover:border-[#2a3045] text-[10px] text-neutral-300 hover:text-white transition-colors">
            <Calendar size={11} />
            <span>View Timeline</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* ===== Main 2-Column Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* ===== LEFT: EXPERIENCE.EXE Card ===== */}
        <div className="rounded-xl bg-[#090a0e] border border-[#1a1d26] overflow-hidden flex flex-col">
          
          {/* Card Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a1d26] bg-[#0b0d14]">
            <div className="flex items-center gap-2 text-[10px] text-neutral-300">
              <Briefcase size={12} className="text-blue-400" />
              <span className="uppercase font-bold tracking-wider">EXPERIENCE.EXE</span>
              <span className="text-neutral-600">//</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-white font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Latest
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            {experienceData.map((exp) => (
              <div key={exp.id} className="space-y-4">
                {/* Role Header with Logo */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#111520] border border-[#1e2230] flex items-center justify-center font-extrabold text-lg text-blue-400 shrink-0">
                    C
                  </div>
                  <div className="flex-1 space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-white font-sans leading-snug">
                        Trainee – Cognizant GenC <span className="text-neutral-400 font-normal">( TIBCO Track )</span>
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-[#111520] border border-[#1e2230] text-[9px] text-neutral-400 shrink-0">Trainee</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans">{exp.company}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 pt-0.5">
                      <Calendar size={10} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Bullet Points with Check Marks */}
                <div className="space-y-2 pl-1">
                  {exp.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-400 font-sans leading-relaxed">
                      <span className="text-white mt-0.5 shrink-0">✓</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Row */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-white font-bold">&lt;/&gt;</span>
                    <span className="text-neutral-300 uppercase font-bold tracking-wider">TECH STACK</span>
                    <span className="flex-1 h-px bg-[#1a1d26]"></span>
                    <span className="text-neutral-600 text-[9px]">// Tools I worked with</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['TIBCO BW5', 'Eclipse', 'SQL', 'XML', 'JSON', 'REST API'].map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-[#111520] border border-[#1e2230] text-[10px] text-neutral-300 font-mono">
                        {skill}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded bg-[#111520] border border-[#1e2230] text-[10px] text-neutral-500 font-mono">+3</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1a1d26]">
              <button
                onClick={() => onOpenExperienceModal(experienceData[0])}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d0f16] border border-[#1e2230] hover:border-white/30 text-[11px] font-bold text-white hover:text-neutral-200 transition-all"
              >
                View Experience
                <ArrowRight size={12} />
              </button>
              <ExternalLink size={14} className="text-neutral-600 hover:text-neutral-300 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* ===== RIGHT: EDUCATION.DAT Card ===== */}
        <div id="education" className="rounded-xl bg-[#090a0e] border border-[#1a1d26] overflow-hidden flex flex-col">
          
          {/* Card Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a1d26] bg-[#0b0d14]">
            <div className="flex items-center gap-2 text-[10px] text-neutral-300">
              <GraduationCap size={12} className="text-amber-400" />
              <span className="uppercase font-bold tracking-wider">EDUCATION.DAT</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-white font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Completed
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
            {educationData.map((edu) => (
              <div key={edu.id} className="space-y-4">
                {/* Degree Header */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-white/20 flex items-center justify-center shrink-0 overflow-hidden relative p-1">
                    {edu.logo ? (
                      <Image
                        src={edu.logo}
                        alt={edu.institution}
                        width={44}
                        height={44}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <GraduationCap size={20} className="text-black" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-white font-sans leading-snug">{edu.degree}</h3>
                      <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[9px] text-white font-bold shrink-0">CGPA 8.2/10</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans">{edu.institution}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 pt-0.5">
                      <Calendar size={10} />
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>

                {/* Score Metrics: CGPA & Percentile */}
                <div className="grid grid-cols-2 gap-3">
                  {/* CGPA Box */}
                  <div className="p-3 rounded-lg bg-[#0d0f16] border border-[#1a1d26] space-y-2">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider block">CGPA</span>
                    <div className="text-xl font-extrabold text-white font-sans">
                      7.2 <span className="text-sm font-normal text-neutral-500">/ 10</span>
                    </div>
                    {/* CGPA bar segments */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${i < 8 ? 'bg-white' : i === 8 ? 'bg-white/40' : 'bg-[#1a1d26]'}`}></div>
                      ))}
                    </div>
                  </div>

                  {/* Percentile Box */}
                  <div className="p-3 rounded-lg bg-[#0d0f16] border border-[#1a1d26] space-y-2">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-wider block">PERCENTILE</span>
                    <div className="text-xl font-extrabold text-white font-sans">
                      72.4<span className="text-sm font-normal text-neutral-500">%</span>
                    </div>
                    {/* Percentile progress bar */}
                    <div className="w-full h-1 rounded-full bg-[#1a1d26] overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: '82.4%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Key Learnings */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-neutral-300 uppercase font-bold tracking-wider">KEY LEARNINGS</span>
                    <span className="flex-1 h-px bg-[#1a1d26]"></span>
                    <span className="text-neutral-600 text-[9px]">// Core subjects</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {[
                      'Data Structures & Algorithms',
                      'Web Technologies',
                      'Database Management Systems',
                      'Software Engineering',
                      'Operating Systems',
                      'Computer Networks'
                    ].map((subject) => (
                      <div key={subject} className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-sans">
                        <span className="text-neutral-600">&gt;</span>
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1a1d26]">
              <button
                onClick={() => onOpenEducationModal(educationData[0])}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d0f16] border border-[#1e2230] hover:border-white/30 text-[11px] font-bold text-white hover:text-neutral-200 transition-all"
              >
                View Education
                <ArrowRight size={12} />
              </button>
              <ExternalLink size={14} className="text-neutral-600 hover:text-neutral-300 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

      </div>

      {/* ===== Bottom Terminal Widget ===== */}
      <div className="rounded-xl bg-[#090a0e] border border-[#1a1d26] overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1d26] bg-[#0b0d14]">
          <div className="flex items-center gap-0.5">
            {['TERMINAL', 'GIT', 'OUTPUT', 'DEBUG'].map((tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors
                  ${i === 0 ? 'bg-[#090a0e] text-white border border-[#1e2230]' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-neutral-500 text-[10px]">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              Connected
            </div>
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Minus size={12} className="hover:text-white cursor-pointer" />
              <Square size={10} className="hover:text-white cursor-pointer" />
              <X size={12} className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 space-y-1 text-[11px] font-mono text-neutral-400">
          <p>
            <span className="text-white">abhinav@portfolio:~/about$</span>
            <span className="text-white"> echo "Learning never stops..."</span>
          </p>
          <p className="text-neutral-300">Learning never stops...</p>
          <p className="flex items-center gap-1 pt-0.5">
            <span className="text-white">abhinav@portfolio:~/about$</span>
            <span className="w-1.5 h-3 bg-white inline-block animate-pulse"></span>
          </p>
        </div>
      </div>

    </section>
  );
}
