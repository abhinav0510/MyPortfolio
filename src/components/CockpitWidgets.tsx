'use client';

import React from 'react';
import { ChevronRight, Trash2, Maximize2, Copy, GitBranch, ArrowRight, Users, ClipboardList, Code2, CheckCircle2, UserCheck, Rocket, Mail } from 'lucide-react';
import { useGitHubData } from '@/hooks/useGitHubData';
import { personalData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

/* 1. Activity Feed Widget (LIVE Real-Time API Data) */
export function ActivityFeedWidget() {
  const { data, loading } = useGitHubData();
  const activities = data.activities;

  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] font-mono h-full flex flex-col justify-between shadow-xl space-y-3">
      {/* Top Section: Activity Feed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1">
            <span className="text-white">!</span> ACTIVITY FEED <ChevronRight size={11} className="text-neutral-500" />
          </span>
          <div className="flex items-center gap-1 text-[9px] text-white font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>
        </div>

        <div className="space-y-1 text-[10px]">
          {loading && activities.length === 0 ? (
            <div className="py-2 text-[9px] text-neutral-500 animate-pulse">Syncing GitHub feed...</div>
          ) : (
            activities.map((act, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-[#111520] last:border-0 hover:bg-[#111520]/50 px-1 rounded transition-colors">
                <div className="flex items-center gap-1.5 overflow-hidden pr-1 text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full border border-white/50 shrink-0 bg-white/20"></span>
                  <span className="truncate">{act.action}</span>
                  <span className="text-white font-semibold truncate">{act.target}</span>
                </div>
                <span className="text-[9px] text-neutral-500 shrink-0 ml-1">{act.time}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Social Quick Connect Buttons Below Activity Feed - Filling remaining height with square tiles */}
      <div className="pt-2 border-t border-[#161822] flex-1 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase font-bold text-neutral-400 tracking-wider block">
            QUICK CONNECT
          </span>
          <span className="text-[8px] text-neutral-500 font-mono">DIRECT LINKS</span>
        </div>

        {/* 3 Equal Square Tile Buttons spanning the remaining height */}
        <div className="grid grid-cols-3 gap-2 flex-1 items-stretch pt-0.5">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-[#0c0e15] border border-[#1a1d26] hover:bg-white hover:border-white transition-all shadow-md group text-center space-y-1.5 hover:scale-[1.03]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141722] group-hover:bg-black flex items-center justify-center transition-colors border border-white/10 shrink-0">
              <GithubIcon size={18} className="text-white transition-colors" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-tight text-white group-hover:text-black transition-colors">GitHub</span>
          </a>

          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-[#0c0e15] border border-[#1a1d26] hover:bg-white hover:border-white transition-all shadow-md group text-center space-y-1.5 hover:scale-[1.03]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141722] group-hover:bg-black flex items-center justify-center transition-colors border border-white/10 shrink-0">
              <LinkedinIcon size={18} className="text-white transition-colors" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-tight text-white group-hover:text-black transition-colors">LinkedIn</span>
          </a>

          <a
            href={`mailto:${personalData.email}`}
            className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-[#0c0e15] border border-[#1a1d26] hover:bg-white hover:border-white transition-all shadow-md group text-center space-y-1.5 hover:scale-[1.03]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#141722] group-hover:bg-black flex items-center justify-center transition-colors border border-white/10 shrink-0">
              <Mail size={18} className="text-white transition-colors" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-tight text-white group-hover:text-black transition-colors">Mail</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* 2. Tech Stack Overview Donut Chart */
export function TechStackOverviewWidget() {
  const categories = [
    { label: 'Frontend', percent: '40%', color: '#3b82f6' },
    { label: 'Backend', percent: '30%', color: '#ffffff' },
    { label: 'Database', percent: '15%', color: '#f59e0b' },
    { label: 'DevOps', percent: '10%', color: '#8b5cf6' },
    { label: 'Tools & Others', percent: '5%', color: '#64748b' }
  ];

  return (
    <div className="p-3 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2 font-mono">
      <span className="text-[10px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1">
        <span className="text-white">•</span> TECH STACK OVERVIEW 
      </span>

      <div className="flex items-center gap-3">
        {/* Donut Chart */}
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-neutral-900" strokeWidth="4.5" stroke="currentColor" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="40, 100" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path stroke="#ffffff" strokeWidth="4.5" strokeDasharray="30, 100" strokeDashoffset="-40" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="15, 100" strokeDashoffset="-70" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path stroke="#8b5cf6" strokeWidth="4.5" strokeDasharray="10, 100" strokeDashoffset="-85" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-0.5 text-[10px]">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: cat.color }}></span>
                <span className="text-neutral-400">{cat.label}</span>
              </div>
              <span className="text-white font-bold">{cat.percent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3. GitHub Activity & Heatmap Widget — Real-Time API Powered */
export function GitHubStatsWidget() {
  const { data } = useGitHubData();
  const stats = data.stats;
  const rawDays = data.contributionDays || [];

  // Group raw contribution days into 7 rows (0: Sun, 1: Mon, ... 6: Sat)
  const rows: Array<Array<{ date: string; level: number; styleClass: string }>> = Array.from({ length: 7 }, () => []);

  if (rawDays.length > 0) {
    rawDays.forEach((d) => {
      const dateObj = new Date(d.date);
      const dayOfWeek = dateObj.getDay(); // 0 (Sun) .. 6 (Sat)
      let styleClass = 'bg-[#141722]';
      if (d.level >= 4) styleClass = 'bg-white opacity-90 shadow-[0_0_6px_rgba(255,255,255,0.8)]';
      else if (d.level === 3) styleClass = 'bg-white/75';
      else if (d.level === 2) styleClass = 'bg-white/45';
      else if (d.level === 1) styleClass = 'bg-white/20';

      rows[dayOfWeek].push({
        date: d.date,
        level: d.level,
        styleClass
      });
    });
  } else {
    // Fallback if data is loading
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 26; c++) {
        rows[r].push({ date: '', level: 0, styleClass: 'bg-[#141722]' });
      }
    }
  }

  // Get the last 26 weeks for layout
  const displayMatrix = rows.map(row => row.slice(-26));

  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-3 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5">
          GITHUB ACTIVITY
        </span>
        <span className="text-[9px] text-neutral-400 bg-[#111520] px-2 py-0.5 rounded border border-[#1a1d26] cursor-pointer hover:border-neutral-700">
          This Year ▾
        </span>
      </div>

      {/* Contributions Count Header */}
      <div className="flex items-baseline justify-between pt-0.5">
        <div>
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{stats.contributions || 842}</span>
          <span className="text-[10px] text-neutral-400 font-sans ml-1.5">Contributions</span>
        </div>
        <span className="text-[10px] font-mono text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">
          ↑ 32% vs last year
        </span>
      </div>

      {/* Contribution Heatmap Matrix */}
      <div className="space-y-1 pt-1">
        <div className="flex gap-2">
          {/* Day Labels */}
          <div className="flex flex-col justify-between text-[8px] text-neutral-500 font-mono py-0.5">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Heatmap Grid */}
          <div className="flex-1 overflow-x-auto scrollbar-none">
            <div className="grid grid-flow-col grid-rows-7 gap-[2.5px] min-w-max">
              {displayMatrix.map((row, rIdx) =>
                row.map((cell, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`w-2.5 h-2.5 rounded-xs ${cell.styleClass} transition-colors hover:scale-125 cursor-pointer`}
                    title={`${cell.date ? cell.date + ': ' : ''}${cell.level > 0 ? `${cell.level * 3}+ contributions` : 'No contributions'}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Month Labels */}
        <div className="flex justify-between text-[8px] text-neutral-500 uppercase font-mono pl-6 pr-1">
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
        </div>
      </div>

      {/* Metrics 4-Grid matching real GitHub API numbers */}
      <div className="grid grid-cols-4 gap-2 text-left pt-2 border-t border-[#161822]">
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-white block">{stats.repositories || 24}</span>
          <span className="text-[8px] text-neutral-500 uppercase block">Repositories</span>
        </div>
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-white block">{stats.commits || 35}</span>
          <span className="text-[8px] text-neutral-500 uppercase block">Commits</span>
        </div>
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-white block">{stats.prs || 16}</span>
          <span className="text-[8px] text-neutral-500 uppercase block">Pull Requests</span>
        </div>
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-white block">{stats.issuesClosed || 8}</span>
          <span className="text-[8px] text-neutral-500 uppercase block">Issues</span>
        </div>
      </div>
    </div>
  );
}

/* 4. Current Focus Widget */
export function CurrentFocusWidget() {
  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-3 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5">
          🎯 CURRENT FOCUS
        </span>
        <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">75%</span>
      </div>

      <div className="space-y-2">
        <span className="text-xs text-white font-bold block font-sans">Building scalable microservices</span>
        <div className="w-full h-2 rounded-full bg-[#161822] overflow-hidden">
          <div className="h-full bg-white rounded-full w-[75%] shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#161822] space-y-1.5">
        <span className="text-[9px] text-neutral-500 uppercase block tracking-wider font-bold">TECH I'M EXPLORING</span>
        <div className="flex flex-wrap gap-1.5">
          {['Kafka', 'Redis', 'Kubernetes', 'Go'].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md bg-[#111520] border border-[#1a1d26] text-[10px] text-neutral-300 font-semibold">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 4b. Featured Project Widget */
export function FeaturedProjectWidget({ onSelectProject }: { onSelectProject?: (p: any) => void }) {
  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5">
          📁 FEATURED PROJECT
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center flex-1">
        {/* Thumbnail Preview */}
        <div className="sm:col-span-5 relative rounded-lg overflow-hidden border border-[#1a1d26] bg-[#0c0e15] aspect-video group">
          <div className="absolute inset-0 bg-linear-to-br from-neutral-800/40 to-neutral-950 flex flex-col justify-between p-2 z-10">
            <div className="flex justify-between items-center text-[9px]">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold border border-white/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
              </span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono border border-white/20">
                GitHub
              </span>
            </div>
            <div className="text-[10px] font-bold text-white font-mono truncate">
              AI Resume Analyzer
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="sm:col-span-7 space-y-1.5 font-sans">
          <h3 className="text-xs sm:text-sm font-extrabold text-white">AI Resume Analyzer</h3>
          <p className="text-[11px] text-neutral-400 leading-snug line-clamp-2">
            AI powered resume analysis platform with ATS scoring, skill extraction and smart recommendations. 
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1 font-mono text-[9px] pt-0.5">
            <span className="px-2 py-0.5 rounded bg-[#111520] border border-[#1a1d26] text-neutral-300">Next.js</span>
            <span className="px-2 py-0.5 rounded bg-[#111520] border border-[#1a1d26] text-neutral-300">Spring Boot</span>
            <span className="px-2 py-0.5 rounded bg-[#111520] border border-[#1a1d26] text-neutral-300">PostgreSQL</span>
            <span className="px-2 py-0.5 rounded bg-[#111520] border border-[#1a1d26] text-neutral-300">AI</span>
          </div>

          <div className="pt-1 flex items-center gap-3 font-mono text-xs">
            <a
              href="https://github.com/abhinav0510"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-neutral-300 font-bold flex items-center gap-1 text-[11px]"
            >
              Demo <ArrowRight size={11} className="-rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 4c. Top Languages Widget */
export function TopLanguagesWidget() {
  const { data } = useGitHubData();
  const languages = data.languages || [
    { name: 'TypeScript', percentage: 45.3 },
    { name: 'Java', percentage: 28.6 },
    { name: 'JavaScript', percentage: 12.4 },
    { name: 'SQL', percentage: 8.7 },
    { name: 'Other', percentage: 5.0 }
  ];

  const colors: Record<string, string> = {
    TypeScript: '#3b82f6',
    Java: '#f97316',
    JavaScript: '#eab308',
    SQL: '#06b6d4',
    Other: '#a855f7'
  };

  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider">
          TOP LANGUAGES
        </span>
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-center">
        {languages.map((lang) => {
          const color = colors[lang.name] || '#ffffff';
          return (
            <div key={lang.name} className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-neutral-300 font-medium">{lang.name}</span>
                </div>
                <span className="text-white font-bold">{lang.percentage}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#161822] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${lang.percentage}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 4d. Recent Blog Widget */
export function RecentBlogWidget() {
  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider">
          RECENT BLOG
        </span>
        <a href="#blog" className="text-[10px] text-white hover:text-neutral-300 flex items-center gap-1 font-bold">
          View all <ArrowRight size={10} />
        </a>
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-center">
        <div className="p-2.5 rounded-lg bg-[#0c0e15] border border-[#161822] space-y-1 hover:border-white/20 transition-all cursor-pointer">
          <div className="flex items-center justify-between text-[9px] text-neutral-400">
            <span>May 18, 2024</span>
            <span>5 min read</span>
          </div>
          <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">
            Building Scalable APIs with Spring Boot
          </h4>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0c0e15] border border-[#161822] space-y-1 hover:border-white/20 transition-all cursor-pointer">
          <div className="flex items-center justify-between text-[9px] text-neutral-400">
            <span>May 10, 2024</span>
            <span>6 min read</span>
          </div>
          <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">
            Optimizing React Performance
          </h4>
        </div>
      </div>
    </div>
  );
}

/* 4e. Achievements Widget */
export function AchievementsWidget() {
  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider">
          ACHIEVEMENTS
        </span>
      </div>

      <div className="space-y-2 font-sans flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0c0e15] border border-[#161822]">
          <span className="text-base">🏆</span>
          <div>
            <h4 className="text-xs font-bold text-white leading-none">Solved 300+ DSA Problems</h4>
            <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">LeetCode</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0c0e15] border border-[#161822]">
          <span className="text-base">🏅</span>
          <div>
            <h4 className="text-xs font-bold text-white leading-none">Top 10%</h4>
            <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">HackerRank</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0c0e15] border border-[#161822]">
          <span className="text-base">⭐</span>
          <div>
            <h4 className="text-xs font-bold text-white leading-none">5 Star Developer</h4>
            <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">On multiple repositories</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 4f. Testimonial Widget */
export function TestimonialWidget() {
  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider">
          TESTIMONIAL
        </span>
      </div>

      <div className="space-y-2 font-sans flex-1 flex flex-col justify-between">
        <p className="text-xs text-neutral-300 italic leading-relaxed pt-1">
          "Abhinav is a highly skilled developer who delivers clean, efficient and scalable code. Great to work with!"
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[#161822]">
          <div>
            <h4 className="text-xs font-bold text-white">Catlin Pharma Team</h4>
            <span className="text-[9px] font-mono text-neutral-400">Client</span>
          </div>
          <div className="flex gap-1 text-white text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5. System Monitor */
export function SystemMonitorWidget() {
  const metrics = [
    { label: 'CPU', value: '32%', path: 'M0 15 Q10 5, 20 18 T40 10 T60 14 T80 8 T100 12' },
    { label: 'MEMORY', value: '68%', path: 'M0 8 Q10 18, 20 10 T40 14 T60 6 T80 16 T100 10' },
    { label: 'DISK', value: '45%', path: 'M0 12 Q10 12, 20 8 T40 16 T60 10 T80 12 T100 8' },
    { label: 'NETWORK', value: '23%', path: 'M0 18 Q10 10, 20 15 T40 8 T60 18 T80 6 T100 14' }
  ];

  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5">
          <span className="text-white">•</span> SYSTEM MONITOR <ChevronRight size={11} className="text-neutral-500" />
        </span>
        <span className="text-[9px] text-neutral-400 bg-[#111520] px-2 py-0.5 rounded border border-[#1a1d26] cursor-pointer">Live ▾</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {metrics.map((m, i) => (
          <div key={i} className="p-2 rounded-lg bg-[#0d0f16] border border-[#161822] space-y-1">
            <div className="flex items-center justify-between text-[9px]">
              <span className="text-neutral-500">{m.label}</span>
              <span className="font-bold text-white text-[11px]">{m.value}</span>
            </div>
            <div className="w-full h-5">
              <svg className="w-full h-full" viewBox="0 0 100 20" fill="none">
                <path d={m.path} stroke="#ffffff" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-[#161822] text-[10px]">
        <div>
          <span className="text-[8px] text-neutral-500 uppercase block">UPTIME</span>
          <span className="text-xs font-bold text-white">7d 14h 23m</span>
        </div>
        <div>
          <span className="text-[8px] text-neutral-500 uppercase block">LOAD AVERAGE</span>
          <span className="text-xs font-bold text-white">0.75, 0.60, 0.48</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[9px] text-white pt-1 border-t border-[#161822]">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        <span className="font-semibold">STATUS</span>
        <span className="text-neutral-500">•</span>
        <span className="text-white">All systems operational</span>
      </div>
    </div>
  );
}

/* 6. Terminal */
export function TerminalWidget() {
  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2 font-mono text-[10px] text-neutral-400">
      <div className="flex items-center justify-between border-b border-[#161822] pb-2">
        <span className="text-neutral-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span className="text-white">!</span> TERMINAL <ChevronRight size={11} className="text-neutral-500" />
        </span>
        <div className="flex items-center gap-2 text-neutral-500">
          <Trash2 size={11} className="hover:text-white cursor-pointer" />
          <Maximize2 size={11} className="hover:text-white cursor-pointer" />
          <Copy size={11} className="hover:text-white cursor-pointer" />
        </div>
      </div>
      <div className="space-y-1 pt-1 leading-relaxed">
        <p><span className="text-white">abhinav@portfolio:~$</span> git status</p>
        <p className="text-neutral-400">On branch main</p>
        <p className="text-neutral-400">Your branch is up to date with 'origin/main'.</p>
        <p className="text-neutral-400">nothing to commit, working tree clean</p>
        <p className="pt-1"><span className="text-white">abhinav@portfolio:~$</span> ls projects/</p>
        <p className="text-neutral-300 font-semibold">heal-me/ job-application-tracker/ ai-resume-analyzer/ enterprise-content-hub/</p>
        <p className="flex items-center gap-1 pt-0.5">
          <span className="text-white">abhinav@portfolio:~$</span>
          <span className="w-1.5 h-3 bg-white inline-block animate-pulse"></span>
        </p>
      </div>
    </div>
  );
}

/* 7. Recent Commits — Real-Time API Data */
export function RecentCommitsWidget() {
  const { data, loading } = useGitHubData();
  const commits = data.commits;

  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5">
          <span className="text-white">!</span> RECENT COMMITS <ChevronRight size={11} className="text-neutral-500" />
        </span>
        <span className="text-neutral-600 text-[11px]">—</span>
      </div>

      <div className="space-y-1.5 text-[10px]">
        {loading && commits.length === 0 ? (
          <div className="py-2 text-[9px] text-neutral-500 animate-pulse">Fetching recent commits...</div>
        ) : (
          commits.map((c, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-[#111520] last:border-0 hover:bg-[#111520]/40 px-1 rounded transition-colors">
              <div className="flex items-center gap-2 overflow-hidden">
                <GitBranch size={11} className="text-white shrink-0" />
                <div className="truncate">
                  <span className="text-white truncate block font-sans text-[11px] font-medium">{c.title}</span>
                  <span className="text-[8px] text-neutral-500">{c.hash} {c.repo ? `• ${c.repo}` : ''}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-neutral-500 ml-2">
                <span className="text-[9px] font-mono">{c.time}</span>
                <ArrowRight size={10} className="text-neutral-500" />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-2 border-t border-[#161822]">
        <a href={`https://github.com/${data.username}`} target="_blank" rel="noreferrer" className="text-[10px] text-white hover:text-neutral-200 flex items-center gap-1 font-bold">
          View all commits <ArrowRight size={11} />
        </a>
      </div>
    </div>
  );
}

/* 8. Tech Stack Overview Footer Bar */
export function TechStackOverviewFooterWidget() {
  const stackCategories = [
    {
      title: 'Frontend',
      badge: 'N',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      skills: 'Next.js, TypeScript, Tailwind CSS'
    },
    {
      title: 'Backend',
      badge: 'B',
      badgeColor: 'text-white bg-white/10 border-white/20',
      skills: 'Java, Spring Boot, Node.js'
    },
    {
      title: 'Database',
      badge: 'D',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      skills: 'PostgreSQL, MySQL, MongoDB, Redis'
    },
    {
      title: 'DevOps',
      badge: '∞',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      skills: 'Docker, AWS, GitHub Actions'
    },
    {
      title: 'Tools',
      badge: 'T',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      skills: 'Figma, Postman, VS Code, Jira'
    }
  ];

  return (
    <div className="p-3.5 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2.5 font-mono">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-wider flex items-center gap-1.5">
          <span className="text-white">•</span> TECH STACK OVERVIEW <ChevronRight size={11} className="text-neutral-500" />
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stackCategories.map((cat, idx) => (
          <div key={idx} className="p-2.5 rounded-lg bg-[#0d0f16] border border-[#161822] space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded flex items-center justify-center font-extrabold text-[9px] border ${cat.badgeColor}`}>
                {cat.badge}
              </span>
              <span className="text-[11px] font-bold text-white">{cat.title}</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans leading-snug pl-7">{cat.skills}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 9. Development Workflow (Agile Methodology) Widget */
export function DevelopmentWorkflowWidget() {
  const steps = [
    {
      num: '01',
      title: 'REQUIREMENTS',
      desc: 'Gather & prioritize user stories',
      icon: Users,
    },
    {
      num: '02',
      title: 'PLANNING',
      desc: 'Sprint planning & task estimation',
      icon: ClipboardList,
    },
    {
      num: '03',
      title: 'SPRINT',
      desc: 'Develop the features',
      icon: Code2,
    },
    {
      num: '04',
      title: 'TESTING',
      desc: 'Test, review & get feedback',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'REVIEW',
      desc: 'Demo & collect stakeholder feedback',
      icon: UserCheck,
    },
    {
      num: '06',
      title: 'DEPLOY',
      desc: 'Release & monitor',
      icon: Rocket,
    },
  ];

  return (
    <div className="p-5 md:p-7 rounded-2xl bg-[#090a0e] border border-[#1a1d26] space-y-6 font-mono relative overflow-hidden shadow-xl">
      {/* Title Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-white rounded-full" />
          <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-widest uppercase font-mono">
            DEVELOPMENT STYLE (AGILE METHODOLOGY)
          </h3>
        </div>
        <p className="text-xs text-neutral-400 font-sans pl-3.5">
          Iterative. Collaborative. Incremental.
        </p>
      </div>

      {/* Steps Flow Grid */}
      <div className="relative pt-2 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.num} className="flex items-center gap-2 group">
                <div className="flex-1 flex flex-col items-center text-center space-y-2">
                  {/* Circle Icon Badge */}
                  <div className="w-12 h-12 rounded-full border border-white/40 bg-[#0c1017] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.12)] group-hover:border-white group-hover:scale-110 transition-all duration-300">
                    <IconComp size={20} className="group-hover:text-neutral-200" />
                  </div>

                  {/* Step Number */}
                  <span className="text-xs font-mono font-bold text-white">
                    {step.num}
                  </span>

                  {/* Step Title */}
                  <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                    {step.title}
                  </span>

                  {/* Description */}
                  <p className="text-[11px] text-neutral-400 font-sans leading-tight max-w-32.5">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow to Next Step */}
                {!isLast && (
                  <div className="hidden lg:block text-neutral-600 shrink-0 pb-12">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Dashed Loop Line with Badge */}
        <div className="mt-6 relative flex items-center justify-center">
          {/* Dashed background line */}
          {/* <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-white/30" /> */}
          
          {/* Left Arrow Up Connector */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -mt-3 text-white/60 font-bold text-xs">
            ▲
          </div>

          {/* Right Arrow Up Connector */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 -mt-3 text-white/60 font-bold text-xs">
            ▲
          </div>

          {/* Badge */}
          <div className="relative z-10 px-4 py-1.5 rounded-full bg-[#090b0e] border border-white/50 text-white text-[10px] font-mono font-extrabold tracking-widest uppercase shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            REPEAT &amp; IMPROVE
          </div>
        </div>
      </div>
    </div>
  );
}

/* 10. Currently Exploring Widget */
export function CurrentlyExploringWidget() {
  const techPills = [
    'Kafka',
    'Kubernetes',
    'Terraform',
    'LangChain',
    'Redis Streams',
  ];

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-[#090a0e] border border-[#1a1d26] space-y-4 font-mono shadow-xl">
      {/* Title Header */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-white rounded-full" />
          <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-widest uppercase font-mono">
            CURRENTLY EXPLORING
          </h3>
        </div>
        <p className="text-xs text-neutral-400 font-sans pl-3.5">
          Technologies I'm learning and building with
        </p>
      </div>

      {/* Tech Pills */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {techPills.map((tech) => (
          <div
            key={tech}
            className="px-4 py-2 rounded-xl bg-[#0c0e15] border border-[#1a1d26] hover:border-white/40 hover:bg-[#111420] transition-all duration-200 flex items-center gap-2.5 text-xs font-mono font-semibold text-neutral-200 shadow-sm cursor-default group"
          >
            <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
            <span className="group-hover:text-white transition-colors">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );



}
