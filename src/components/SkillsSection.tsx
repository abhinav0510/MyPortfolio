'use client';

import React, { useState } from 'react';
import { skillsData, Skill } from '@/data/portfolioData';
import { 
  Code2, Cpu, Database, Wrench, Layers, Terminal, Server, Flame, Sparkles,
  Info, Rocket, Star, Grid, ArrowRight, ShieldCheck, Cpu as ChipIcon, Zap, Globe, GitBranch
} from 'lucide-react';
import { 
  ReactLogo, NextLogo, TSLogo, NodeLogo, SpringLogo, 
  PostgresLogo, TailwindLogo, DockerLogo, AWSLogo, GithubIcon 
} from './SocialIcons';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('Languages');

  const categories = [
    { label: 'Languages', icon: Code2 },
    { label: 'Frameworks & Libraries', icon: Layers },
    { label: 'Backend', icon: Server },
    { label: 'Databases & Cloud', icon: Database },
    { label: 'Tools & Platforms', icon: Wrench },
  ];

  // Filter skills based on category
  const filteredSkills = skillsData.filter(s => s.category === activeCategory && !s.isFeatured);
  const featuredSkills = skillsData.filter(s => s.isFeatured);

  // Return SVG / Custom Icon for each tech item
  const renderTechLogo = (name: string, size = 20) => {
    switch (name.toLowerCase()) {
      case 'react':
        return <ReactLogo className="w-6 h-6 text-cyan-400 animate-spin-slow" />;
      case 'spring boot':
        return <SpringLogo className="w-6 h-6 text-white" />;
      case 'tailwind css':
        return <TailwindLogo className="w-6 h-6 text-sky-400" />;
      case 'javascript':
        return <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center border border-amber-500/30">JS</div>;
      case 'typescript':
        return <TSLogo className="w-6 h-6 rounded" />;
      case 'python':
        return <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 font-bold font-mono text-xs flex items-center justify-center border border-blue-500/30">Py</div>;
      case 'java':
        return <div className="w-6 h-6 rounded bg-orange-500/20 text-orange-400 font-bold font-mono text-xs flex items-center justify-center border border-orange-500/30">Jv</div>;
      case 'next.js':
        return <NextLogo className="w-6 h-6 text-white" />;
      case 'node.js':
        return <NodeLogo className="w-6 h-6 text-white" />;
      case 'express.js':
        return <div className="w-6 h-6 rounded bg-neutral-800 text-neutral-300 font-bold font-mono text-xs flex items-center justify-center border border-neutral-700">ex</div>;
      case 'kafka':
        return <div className="w-6 h-6 rounded bg-neutral-800 text-amber-400 font-bold font-mono text-[10px] flex items-center justify-center border border-amber-500/30">KF</div>;
      case 'redis':
        return <div className="w-6 h-6 rounded bg-red-500/20 text-red-400 font-bold font-mono text-xs flex items-center justify-center border border-red-500/30">RD</div>;
      case 'rag architecture':
      case 'rag':
        return <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 font-bold font-mono text-[10px] flex items-center justify-center border border-purple-500/30">RAG</div>;
      case 'langchain':
        return <div className="w-6 h-6 rounded bg-white/10 text-white font-bold font-mono text-[10px] flex items-center justify-center border border-white/20">LC</div>;
      case 'langgraph':
        return <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 font-bold font-mono text-[10px] flex items-center justify-center border border-cyan-500/30">LG</div>;
      case 'postgresql':
        return <PostgresLogo className="w-6 h-6 text-blue-400" />;
      case 'mongodb':
        return <div className="w-6 h-6 rounded bg-white/10 text-white font-bold font-mono text-[10px] flex items-center justify-center border border-white/20">mg</div>;
      case 'mysql':
        return <div className="w-6 h-6 rounded bg-blue-950 text-blue-400 font-bold font-mono text-[10px] flex items-center justify-center border border-blue-800">SQL</div>;
      case 'aws':
        return <AWSLogo className="w-6 h-6 text-amber-500" />;
      case 'docker':
        return <DockerLogo className="w-6 h-6 text-blue-400" />;
      case 'kubernetes':
        return <div className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 font-bold font-mono text-[10px] flex items-center justify-center border border-blue-500/30">K8s</div>;
      case 'ci/cd':
        return <GitBranch className="w-5 h-5 text-white" />;
      case 'github':
        return <GithubIcon className="w-6 h-6 text-white" />;
      case 'vs code':
        return <Terminal className="w-5 h-5 text-blue-400" />;
      default:
        return <Wrench className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <section id="skills" className="py-8 space-y-6">
      {/* Outer Cockpit Container */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#090a0e] border border-[#1a1d26] space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

        {/* ===== TOP HEADER ROW ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest block">
              // TECHNOLOGIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-1 font-sans">
              Technologies I Work With<span className="text-white animate-pulse">_</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              A curated toolkit of languages, frameworks, databases and dev tools I use to build scalable, production-ready applications.
            </p>
          </div>

          {/* Right Header Callout Box */}
          <div className="p-3 rounded-xl bg-[#0d1017] border border-[#1a1e2b] flex items-center gap-3 max-w-sm self-start md:self-auto shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/20 flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
              &gt;_
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white font-sans">
                Always learning. Always building.
              </div>
              <div className="text-[11px] text-neutral-400 font-sans">
                Exploring new tech to solve real world problems.
              </div>
            </div>
          </div>
        </div>

        {/* ===== MAIN GRID: Left Skill Cards + Right Radar Overview ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-10 items-start">
          
          {/* ===== LEFT COLUMN (8 Cols) ===== */}
          <div className="xl:col-span-8 p-5 rounded-xl bg-[#0c0e14] border border-[#1a1d26] space-y-6">
            
            {/* Category Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1a1d26] text-xs font-mono scrollbar-none">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={`
                      flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer
                      ${isActive 
                        ? 'bg-[#141824] text-white font-bold border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.15)]' 
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#11131a]'}
                    `}
                  >
                    <IconComponent size={14} className={isActive ? 'text-white' : 'text-neutral-500'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* MOST ADVANCED Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Rocket size={13} className="text-white" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  MOST ADVANCED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {featuredSkills.map((tech) => (
                  <div 
                    key={tech.name}
                    className="p-4 rounded-xl bg-[#11141e] border border-white/20 hover:border-white/40 transition-all duration-300 space-y-3 group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#090a0e] border border-[#1a1d26] flex items-center justify-center group-hover:scale-105 transition-transform">
                        {renderTechLogo(tech.name)}
                      </div>
                      <span className="text-sm font-bold text-white group-hover:text-neutral-200 transition-colors">
                        {tech.name}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-[#1a1e2b] rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full w-[90%] shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                        <span className="text-white font-semibold">{tech.level}</span>
                        <span>90%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OTHER TECHNOLOGIES Section */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                OTHER TECHNOLOGIES ({activeCategory})
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {filteredSkills.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-3 rounded-xl bg-[#11141e] border border-[#1a1d26] hover:border-neutral-700 transition-all duration-200 flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#090a0e] border border-[#1a1d26] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {renderTechLogo(tech.name)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-neutral-200 truncate group-hover:text-white transition-colors">
                        {tech.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        {tech.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom centered link */}
            <div className="pt-2 text-center">
              <button 
                onClick={() => setActiveCategory('Languages')}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-neutral-400 hover:text-white transition-colors group cursor-pointer"
              >
                <span>View all technologies</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* ===== RIGHT SIDEBAR: Radar Chart & Metrics (4 Cols) ===== */}
          <div className="xl:col-span-4 p-5 rounded-xl bg-[#0c0e14] border border-[#1a1d26] space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-300 tracking-wider">
                <span>TECH STACK OVERVIEW</span>
                <Info size={13} className="text-neutral-400" />
              </div>
            </div>

            {/* Radar / Spider Chart SVG */}
            <div className="relative py-2 flex flex-col items-center justify-center">
              <svg viewBox="0 0 300 240" className="w-full max-w-65 h-auto overflow-visible">
                {/* Concentric Grid Pentagons */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                  <polygon
                    key={i}
                    points={getPentagonPoints(150, 110, 85 * scale)}
                    fill="none"
                    stroke="#1e2330"
                    strokeWidth="1"
                    strokeDasharray={i === 4 ? 'none' : '3 3'}
                  />
                ))}

                {/* Radar Axis Lines */}
                {getPentagonVertices(150, 110, 85).map((vertex, i) => (
                  <line
                    key={i}
                    x1={150}
                    y1={110}
                    x2={vertex.x}
                    y2={vertex.y}
                    stroke="#1e2330"
                    strokeWidth="1"
                  />
                ))}

                {/* Filled Skill Polygon (Frontend:90%, Backend:85%, Databases:80%, DevOps:75%, Tools:85%) */}
                <polygon
                  points={getSkillRadarPoints(150, 110, 85)}
                  className="fill-white/20 stroke-white stroke-2"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))' }}
                />

                {/* Glowing Radar Points */}
                {getSkillRadarVertices(150, 110, 85).map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="4"
                    className="fill-white stroke-neutral-950 stroke-2"
                  />
                ))}

                {/* Vertex Text Labels */}
                <text x="150" y="14" textAnchor="middle" className="fill-neutral-300 text-[10px] font-mono font-bold">Frontend</text>
                <text x="250" y="95" textAnchor="start" className="fill-neutral-300 text-[10px] font-mono font-bold">Backend</text>
                <text x="215" y="215" textAnchor="middle" className="fill-neutral-300 text-[10px] font-mono font-bold">Databases</text>
                <text x="85" y="215" textAnchor="middle" className="fill-neutral-300 text-[10px] font-mono font-bold">DevOps &amp; Cloud</text>
                <text x="50" y="95" textAnchor="end" className="fill-neutral-300 text-[10px] font-mono font-bold">Tools &amp; Platforms</text>
              </svg>
            </div>

            {/* 4-Item Matrix Stats */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#1a1d26] text-center font-mono">
              <div className="space-y-1">
                <Code2 size={16} className="text-white mx-auto" />
                <div className="text-base font-extrabold text-white leading-none">20+</div>
                <div className="text-[9px] text-neutral-400 leading-tight">Technologies</div>
              </div>

              <div className="space-y-1">
                <Grid size={16} className="text-white mx-auto" />
                <div className="text-base font-extrabold text-white leading-none">8+</div>
                <div className="text-[9px] text-neutral-400 leading-tight">Categories</div>
              </div>

              <div className="space-y-1">
                <Star size={16} className="text-white mx-auto" />
                <div className="text-base font-extrabold text-white leading-none">1+</div>
                <div className="text-[9px] text-neutral-400 leading-tight">Years In Practice</div>
              </div>

              <div className="space-y-1">
                <Rocket size={16} className="text-white mx-auto" />
                <div className="text-base font-extrabold text-white leading-none">Always</div>
                <div className="text-[9px] text-neutral-400 leading-tight">Learning</div>
              </div>
            </div>

            {/* Console Log Output Footer */}
            <div className="p-3 rounded-lg bg-[#07080c] border border-[#161923] font-mono text-xs flex items-center gap-2 text-white shadow-inner">
              <span className="text-neutral-500">console.log(</span>
              <span className="text-neutral-200">"Building with purpose."</span>
              <span className="text-neutral-500">)</span>
              <span className="w-1.5 h-3 bg-white inline-block animate-pulse ml-auto" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* Helper functions for Radar Pentagon Calculations */
function getPentagonVertices(cx: number, cy: number, r: number) {
  const angles = [-Math.PI / 2, -Math.PI / 2 + (2 * Math.PI) / 5, -Math.PI / 2 + (4 * Math.PI) / 5, -Math.PI / 2 + (6 * Math.PI) / 5, -Math.PI / 2 + (8 * Math.PI) / 5];
  return angles.map(a => ({
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a)
  }));
}

function getPentagonPoints(cx: number, cy: number, r: number) {
  return getPentagonVertices(cx, cy, r).map(v => `${v.x},${v.y}`).join(' ');
}

function getSkillRadarVertices(cx: number, cy: number, r: number) {
  // Skill Ratios: Frontend 90%, Backend 85%, Databases 80%, DevOps 75%, Tools 85%
  const ratios = [0.90, 0.85, 0.80, 0.75, 0.85];
  const angles = [-Math.PI / 2, -Math.PI / 2 + (2 * Math.PI) / 5, -Math.PI / 2 + (4 * Math.PI) / 5, -Math.PI / 2 + (6 * Math.PI) / 5, -Math.PI / 2 + (8 * Math.PI) / 5];
  return angles.map((a, i) => ({
    x: cx + r * ratios[i] * Math.cos(a),
    y: cy + r * ratios[i] * Math.sin(a)
  }));
}

function getSkillRadarPoints(cx: number, cy: number, r: number) {
  return getSkillRadarVertices(cx, cy, r).map(v => `${v.x},${v.y}`).join(' ');
}
