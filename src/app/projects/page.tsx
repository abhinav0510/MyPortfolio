'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, ExternalLink, Play, Star, Code2, ArrowRight, ArrowLeft, Home,
  ChevronDown, X, Sparkles 
} from 'lucide-react';
import AIExplainerModal from '@/components/AIExplainerModal';
import { projectsData, Project, personalData } from '@/data/portfolioData';
import { GithubIcon } from '@/components/SocialIcons';
import Navbar from '@/components/Navbar';

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState<string>('projects');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Latest First');
  const [inspectProject, setInspectProject] = useState<Project | null>(null);
  const [aiExplainerProject, setAiExplainerProject] = useState<Project | null>(null);

  // Extract all unique tech tags for FILTER BY TECH sidebar
  const allTechTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, []);

  // Filter and sort
  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        const matchesTech = selectedTech === 'All' || project.tags.includes(selectedTech);
        const matchesSearch = 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTech && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'Most Stars') return (b.stars || 0) - (a.stars || 0);
        if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
        // Latest First = featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedTech, searchQuery, sortBy]);

  // Unique tech count
  const uniqueTechCount = useMemo(() => {
    const s = new Set<string>();
    projectsData.forEach(p => p.tags.forEach(t => s.add(t)));
    return s.size;
  }, []);

  return (
    <div className="min-h-screen bg-[#060709] text-white select-none font-sans space-y-4">
      {/* Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content: Sidebar + Grid */}
      <main className="max-w-[1600px] mx-auto px-3 sm:px-5 pt-2 pb-10">
        {/* Top Header Navigation Row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#0c0e14] border border-[#1a1e2a] hover:border-neutral-400 text-xs sm:text-sm font-sans font-bold text-neutral-200 hover:text-white transition-all shadow-sm group"
          >
            <ArrowLeft size={16} className="text-neutral-400 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
            <Home size={16} className="text-neutral-400 group-hover:text-white" />
            <span>Return to Home Page</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">

          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="lg:w-60 xl:w-65 shrink-0 space-y-4">
            
            {/* PROJECTS Header Card */}
            <div className="rounded-2xl bg-[#0c0e14] border border-[#1a1e2a] p-5 space-y-4">
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight font-sans uppercase">Projects</h1>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-sans">
                  A showcase of my work, passion and the problems I love to solve.
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-1 border-t border-[#1a1e2a]">
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-xl bg-[#111520] border border-[#1f2536] flex items-center justify-center text-neutral-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-white block leading-tight">{projectsData.length}+</span>
                    <span className="text-[10px] text-neutral-400 block">Projects Completed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111520] border border-[#1f2536] flex items-center justify-center text-neutral-300">
                    <Code2 size={18} />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-white block leading-tight">{uniqueTechCount}+</span>
                    <span className="text-[10px] text-neutral-400 block">Technologies</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111520] border border-[#1f2536] flex items-center justify-center text-neutral-300">
                    <Star size={18} />
                  </div>
                  <div>
                    <span className="text-lg font-extrabold text-white block leading-tight">Real-world</span>
                    <span className="text-[10px] text-neutral-400 block">Impact Focused</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Return to Home Button */}
              <Link
                href="/"
                className="w-full mt-3 py-2.5 rounded-xl bg-[#111520] border border-[#1f2536] hover:border-neutral-400 text-xs font-sans font-semibold text-neutral-200 hover:text-white flex items-center justify-center gap-2 transition-all group"
              >
                <ArrowLeft size={14} className="text-neutral-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
                <Home size={14} className="text-neutral-400 group-hover:text-white" />
                <span>Return to Home</span>
              </Link>
            </div>

            {/* FILTER BY TECH Card */}
            <div className="rounded-2xl bg-[#0c0e14] border border-[#1a1e2a] p-5 space-y-3">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold tracking-wider block">
                Filter by Tech
              </span>
              <div className="flex flex-wrap gap-2">
                {allTechTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTech(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                      selectedTech === tag
                        ? 'bg-white text-black font-bold border-white shadow-[0_0_10px_rgba(255,255,255,0.15)]'
                        : 'bg-[#111520] text-neutral-300 border-[#1f2536] hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ===== RIGHT CONTENT AREA ===== */}
          <div className="flex-1 space-y-4 min-w-0">

            {/* Top Control Bar: Search + Sort */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0c0e14] border border-[#1a1e2a] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-all font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort projects"
                  className="appearance-none bg-[#0c0e14] border border-[#1a1e2a] text-sm text-white rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-neutral-500 font-sans cursor-pointer min-w-40"
                >
                  <option value="Latest First">Latest First</option>
                  <option value="Most Stars">Most Stars</option>
                  <option value="A-Z">A-Z</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Project Cards Grid: 3 columns on xl, 2 on md */}
            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl bg-[#0c0e14] border border-[#1a1e2a] p-12 text-center space-y-3">
                <Search size={32} className="mx-auto text-neutral-500" />
                <h3 className="text-base font-bold text-white font-sans">No projects found</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto font-sans">
                  No matching projects for &quot;{searchQuery}&quot;. Try a different search term or filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTech('All'); }}
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-sans hover:bg-white/20 transition-all mt-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onInspect={setInspectProject} 
                    onOpenAIExplainer={setAiExplainerProject}
                  />
                ))}
              </div>
            )}

            {/* ===== Bottom CTA Banner ===== */}
            <div className="rounded-2xl bg-[#0c0e14] border border-[#1a1e2a] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#111520] border border-[#1f2536] flex items-center justify-center text-neutral-300 shrink-0">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">Have a project in mind?</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Let&apos;s build something scalable and intelligent together.</p>
                </div>
              </div>
              <Link
                href="/#contact"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm font-sans flex items-center gap-2 hover:bg-neutral-200 transition-all shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              >
                <span>Get In Touch</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* ===== INSPECT PROJECT MODAL ===== */}
      {inspectProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0c0e14] border border-[#1a1e2a] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setInspectProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 border border-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Hero Banner */}
            <div className="relative w-full h-64 bg-[#05070c]">
              {inspectProject.videoUrl ? (
                <video
                  src={inspectProject.videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={inspectProject.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <Image
                    src={inspectProject.image}
                    alt={inspectProject.title}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0c0e14] via-[#0c0e14]/40 to-transparent"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                      <Play size={22} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              <div className="border-b border-[#1a1e2a] pb-4">
                <h2 className="text-2xl font-extrabold text-white font-sans">{inspectProject.title}</h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">{inspectProject.category} • by {personalData.name}</p>
              </div>

              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {inspectProject.longDescription || inspectProject.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {inspectProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-xl bg-[#111520] border border-[#1f2536] text-xs font-sans text-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions: Live Demo + GitHub + Ask AI */}
              <div className="pt-4 border-t border-[#1a1e2a] grid grid-cols-3 gap-2 sm:gap-3">
                <a
                  href={inspectProject.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 rounded-xl bg-white text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors font-sans"
                >
                  <span>View Live</span>
                  <ExternalLink size={14} />
                </a>
                <a
                  href={inspectProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 rounded-xl bg-[#111520] border border-[#1f2536] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-[#181d2e] transition-colors font-sans"
                >
                  <span>GitHub</span>
                  <GithubIcon size={14} />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const projToExplain = inspectProject;
                    setInspectProject(null);
                    setAiExplainerProject(projToExplain);
                  }}
                  className="py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-white/20 transition-all font-sans shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <span>Ask AI</span>
                  <Sparkles size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Explainer Voice & Text Copilot Modal */}
      <AIExplainerModal
        project={aiExplainerProject}
        isOpen={!!aiExplainerProject}
        onClose={() => setAiExplainerProject(null)}
      />
    </div>
  );
}


/* ===== Autoplay Video on Scroll Component ===== */
function AutoplayVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      poster={poster}
      className={className}
    />
  );
}

/* ===== Project Card Component ===== */
function ProjectCard({ 
  project, 
  onInspect, 
  onOpenAIExplainer 
}: { 
  project: Project; 
  onInspect: (p: Project) => void;
  onOpenAIExplainer: (p: Project) => void;
}) {
  return (
    <div
      onClick={() => onInspect(project)}
      className="group rounded-2xl bg-[#0c0e14] border border-[#1a1e2a] hover:border-neutral-600 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image / Video Preview */}
      <div className="relative w-full h-48 bg-[#05070c] overflow-hidden">
        {project.videoUrl ? (
          <AutoplayVideo
            src={project.videoUrl}
            poster={project.image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0c0e14]/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Category badge top-right */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white font-sans">
          {project.category}
        </div>

        {/* Play button center — only show when no video */}
        {!project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <Play size={20} className="text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-white font-sans leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-neutral-400 font-sans line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech tags row */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-[#111520] border border-[#1f2536] text-[10px] font-sans text-neutral-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 rounded-lg bg-[#111520] border border-[#1f2536] text-[10px] font-sans text-neutral-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Card Footer: View Live + GitHub Repo + Ask AI */}
        <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-[#1a1e2a]">
          <a
            href={project.liveDemoUrl}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            className="py-2 rounded-xl bg-[#111520] border border-[#1f2536] text-[11px] font-sans text-neutral-200 font-medium flex items-center justify-center gap-1 hover:text-white hover:border-neutral-500 transition-all"
          >
            <span>Live</span>
            <ExternalLink size={11} />
          </a>
          <a
            href={project.githubUrl}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            className="py-2 rounded-xl bg-[#111520] border border-[#1f2536] text-[11px] font-sans text-neutral-200 font-medium flex items-center justify-center gap-1 hover:text-white hover:border-neutral-500 transition-all"
          >
            <span>GitHub</span>
            <GithubIcon size={11} />
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAIExplainer(project);
            }}
            className="py-2 rounded-xl bg-white/10 border border-white/20 text-[11px] font-sans text-white font-semibold flex items-center justify-center gap-1 hover:bg-white/20 transition-all shadow-[0_0_8px_rgba(255,255,255,0.1)]"
          >
            <span>Ask AI</span>
            <Sparkles size={11} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
