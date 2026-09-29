'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, User, Globe, X as XClose, Minus, Bookmark, Play, Pause } from 'lucide-react';
import { personalData } from '@/data/portfolioData';
import CodeEditorWidget from './CodeEditorWidget';
import { 
  ActivityFeedWidget, TechStackOverviewWidget, GitHubStatsWidget, 
  CurrentFocusWidget, DevelopmentWorkflowWidget, CurrentlyExploringWidget,
  FeaturedProjectWidget, TopLanguagesWidget, RecentBlogWidget,
  AchievementsWidget, TestimonialWidget
} from './CockpitWidgets';
import { useGitHubData } from '@/hooks/useGitHubData';
import { 
  ReactLogo, NextLogo, TSLogo, NodeLogo, SpringLogo, 
  PostgresLogo, TailwindLogo, DockerLogo, AWSLogo, GithubIcon 
} from './SocialIcons';

interface HeroSectionProps {
  onViewWorkClick: () => void;
  onDownloadResumeClick: () => void;
  onSelectProject: (project: any) => void;
  onOpenAIExplainer?: (project: any) => void;
}

export default function HeroSection({ onViewWorkClick, onDownloadResumeClick, onSelectProject, onOpenAIExplainer }: HeroSectionProps) {
  const { data: githubData } = useGitHubData();

  // Smooth scroll shift to projects section on single wheel scroll down from top
  React.useEffect(() => {
    let isScrolling = false;
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY < 60 && e.deltaY > 15 && !isScrolling) {
        isScrolling = true;
        const projectsEl = document.getElementById('projects');
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => { isScrolling = false; }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="space-y-6 pt-1 pb-6">
      
      {/* ===== FULL LANDING PAGE AREA ===== */}
      <div className="min-h-[calc(100vh-6.5rem)] flex flex-col justify-between space-y-4">
        
        {/* ROW 1: Hero Card + GitHub Activity Heatmap + Activity Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
          
          {/* LEFT CARD (xl:col-span-4): Personal Hero Bio Box */}
          <div className="xl:col-span-4 p-4 sm:p-5 rounded-xl bg-[#090a0e] border border-[#1a1d26] flex flex-col justify-between space-y-4 shadow-xl">
            {/* Status Pill */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-white uppercase">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>

            {/* Headline & Bio */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Hi, I'm <br />
                {personalData.name}<span className="text-white">_</span>
              </h1>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {personalData.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-extrabold text-xs transition-all shadow-md cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight size={13} />
              </Link>
              
              <a
                href={personalData.resumeUrl || '/assets/Abhinav_Srivastava.pdf'}
                download={personalData.resumeFilename || 'Abhinav_Srivastava.pdf'}
                onClick={() => onDownloadResumeClick && onDownloadResumeClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111318] border border-[#2a2e3d] text-white font-medium text-xs hover:bg-[#1a1e2a] transition-all cursor-pointer"
              >
                <span>Download Resume</span>
                <Download size={13} className="text-neutral-400" />
              </a>
            </div>

            {/* Bottom Quick Metrics Grid inside Hero Box */}
            <div className="grid grid-cols-4 gap-1 pt-3 border-t border-[#161822] text-left font-mono">
              <div>
                <span className="text-sm sm:text-base font-extrabold text-white block">12+</span>
                <span className="text-[8px] text-neutral-500 uppercase leading-tight block">Projects Completed</span>
              </div>
              <div>
                <span className="text-sm sm:text-base font-extrabold text-white block">1+</span>
                <span className="text-[8px] text-neutral-500 uppercase leading-tight block">Years Experience</span>
              </div>
              <div>
                <span className="text-sm sm:text-base font-extrabold text-white block">10+</span>
                <span className="text-[8px] text-neutral-500 uppercase leading-tight block">Happy Clients</span>
              </div>
              <div>
                <span className="text-sm sm:text-base font-extrabold text-white block">{githubData?.publicRepos || 16}+</span>
                <span className="text-[8px] text-neutral-500 uppercase leading-tight block">Open Source Repos</span>
              </div>
            </div>
          </div>

          {/* CENTER CARD (xl:col-span-5): Real-Time GitHub Activity Heatmap */}
          <div className="xl:col-span-5">
            <GitHubStatsWidget />
          </div>

          {/* RIGHT CARD (xl:col-span-3): Live Activity Feed */}
          <div className="xl:col-span-3">
            <ActivityFeedWidget />
          </div>

        </div>

        {/* ROW 2: Current Focus + Featured Project + Tech Stack Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
          <div className="xl:col-span-3">
            <CurrentFocusWidget />
          </div>

          <div className="xl:col-span-5">
            <FeaturedProjectWidget onSelectProject={onSelectProject} />
          </div>

          <div className="xl:col-span-4">
            <TechStackOverviewWidget />
          </div>
        </div>

        {/* ROW 3: Top Languages + Recent Blog + Achievements + Testimonial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-4 items-stretch">
          <div className="xl:col-span-3">
            <TopLanguagesWidget />
          </div>

          <div className="xl:col-span-3">
            <RecentBlogWidget />
          </div>

          <div className="xl:col-span-3">
            <AchievementsWidget />
          </div>

          <div className="xl:col-span-3">
            <TestimonialWidget />
          </div>
        </div>

        {/* ROW 4: Technologies I Work With Footer Marquee */}
        <div className="space-y-2 pt-1">
          <div className="p-3 rounded-xl bg-[#090a0e] border border-[#1a1d26] space-y-2 font-mono overflow-hidden">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] uppercase font-bold text-neutral-300 tracking-widest block">
                TECHNOLOGIES I WORK WITH
              </span>
              <a href="#skills" className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 font-bold">
                View all <ArrowRight size={10} />
              </a>
            </div>
            <TechStackMarquee />
          </div>

          {/* Interactive Scroll Down Indicator */}
          <div className="flex justify-center pt-1">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0d0f16] border border-[#1a1d26] text-[11px] font-mono text-neutral-400 hover:text-white hover:border-white/30 transition-all group cursor-pointer shadow-sm"
            >
              <span>SCROLL TO PROJECTS</span>
              <ArrowRight size={12} className="rotate-90 group-hover:translate-y-0.5 transition-transform text-white" />
            </button>
          </div>
        </div>

      </div>

      {/* ===== ROW 3: Projects + Code Editor Widget ===== */}
      <div id="projects" className="pt-6 grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        <div className="xl:col-span-8">
          {/* Projects section is rendered from page.tsx via ProjectsSection */}
          <ProjectsSectionInline onSelectProject={onSelectProject} onOpenAIExplainer={onOpenAIExplainer} />
        </div>
        
        <div className="xl:col-span-4 space-y-3">
          <CodeEditorWidget />
        </div>
      </div>

      {/* ===== ROW 4: Agile Development Workflow ===== */}
      <DevelopmentWorkflowWidget />

      {/* ===== ROW 5: Currently Exploring Technologies ===== */}
      <CurrentlyExploringWidget />

    </section>
  );
}


/* ===== Tech Stack Marquee Slider ===== */
function TechStackMarquee() {
  const techItems = [
    { icon: <ReactLogo size={18} />, name: 'React' },
    { icon: <NextLogo size={18} />, name: 'Next.js' },
    { icon: <TSLogo size={18} />, name: 'TypeScript' },
    { icon: <NodeLogo size={18} />, name: 'Node.js' },
    { icon: <SpringLogo size={18} />, name: 'Spring Boot' },
    { icon: <PostgresLogo size={18} />, name: 'PostgreSQL' },
    { icon: <MiniLogo letter="M" color="blue" />, name: 'MongoDB' },
    { icon: <TailwindLogo size={18} />, name: 'Tailwind CSS' },
    { icon: <AWSLogo size={18} />, name: 'AWS' },
    { icon: <GithubIcon size={18} className="text-neutral-200" />, name: 'GitHub Actions' },
    { icon: <DockerLogo size={18} />, name: 'Docker' },
    { icon: <MiniLogo letter="K8s" color="blue" />, name: 'Kubernetes' },
    { icon: <MiniLogo letter="R" color="red" />, name: 'Redis' },
    { icon: <MiniLogo letter="K" color="orange" />, name: 'Kafka' },
    { icon: <MiniLogo letter="LC" color="teal" />, name: 'LangChain' },
    { icon: <MiniLogo letter="LG" color="cyan" />, name: 'LangGraph' },
    { icon: <MiniLogo letter="RAG" color="purple" />, name: 'RAG' },
    { icon: <MiniLogo letter="CI" color="blue" />, name: 'CI/CD' },
  ];

  const renderCard = (tech: { icon: React.ReactNode; name: string }, idx: number) => (
    <div
      key={`${tech.name}-${idx}`}
      className="p-2.5 rounded-lg bg-[#0d0f16] border border-[#1a1d26] hover:border-[#2a3045] transition-colors flex flex-col items-center justify-center gap-1.5 text-center cursor-default shrink-0 w-22.5"
    >
      {tech.icon}
      <span className="text-[10px] text-neutral-400 font-medium leading-tight whitespace-nowrap">{tech.name}</span>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-[#090a0e] to-transparent z-10 pointer-events-none"></div>
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-[#090a0e] to-transparent z-10 pointer-events-none"></div>

      <div className="marquee-track gap-2">
        {/* First set */}
        {techItems.map((tech, idx) => renderCard(tech, idx))}
        {/* Duplicate set for seamless loop */}
        {techItems.map((tech, idx) => renderCard(tech, idx + techItems.length))}
      </div>
    </div>
  );
}

/* Mini colored letter logos for technologies without SVG brand icons */
function MiniLogo({ letter, color }: { letter: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-white/20 text-white border-white/30',
    blue: 'bg-blue-600/25 text-blue-400 border-blue-500/30',
    red: 'bg-red-600/25 text-red-400 border-red-500/30',
    orange: 'bg-orange-600/25 text-orange-400 border-orange-500/30',
    teal: 'bg-teal-600/25 text-teal-400 border-teal-500/30',
    cyan: 'bg-cyan-600/25 text-cyan-400 border-cyan-500/30',
    purple: 'bg-purple-600/25 text-purple-400 border-purple-500/30',
    green: 'bg-white/20 text-white border-white/30',
  };

  return (
    <div className={`w-5 h-5 rounded flex items-center justify-center font-extrabold text-[8px] border ${colorMap[color] || colorMap.blue}`}>
      {letter}
    </div>
  );
}


/* ===== Top Metrics Card (Dynamic Live Data) ===== */
function TopMetricsCard() {
  const { data } = useGitHubData();
  const publicRepos = data.publicRepos || 18;

  return (
    <div className="grid grid-cols-4 gap-0 p-3 rounded-xl bg-[#090a0e] border border-[#1a1d26] font-mono">
      <div className="text-center border-r border-[#1a1d26] pr-2">
        <span className="text-lg font-extrabold text-white block leading-tight">12+</span>
        <span className="text-[9px] text-neutral-400 block leading-tight">Projects<br/>Completed</span>
      </div>
      <div className="text-center border-r border-[#1a1d26] px-2">
        <span className="text-lg font-extrabold text-white block leading-tight">1+</span>
        <span className="text-[9px] text-neutral-400 block leading-tight">Years<br/>Experience</span>
      </div>
      <div className="text-center border-r border-[#1a1d26] px-2">
        <span className="text-lg font-extrabold text-white block leading-tight">10+</span>
        <span className="text-[9px] text-neutral-400 block leading-tight">Happy<br/>Clients</span>
      </div>
      <div className="text-center pl-2">
        <span className="text-lg font-extrabold text-white block leading-tight">{publicRepos}+</span>
        <span className="text-[9px] text-neutral-400 block leading-tight">Open Source<br/>Repos</span>
      </div>
    </div>
  );
}

/* ===== Featured Projects Section (Landing Page - 2 projects only) ===== */
import Image from 'next/image';
import { ExternalLink, Sparkles } from 'lucide-react';
import { projectsData, Project } from '@/data/portfolioData';

/* ===== Autoplay Video on Scroll for Featured Projects ===== */
function AutoplayVideoHero({ src, poster }: { src: string; poster: string }) {
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
      className="w-full h-full object-cover"
    />
  );
}

function ProjectsSectionInline({ 
  onSelectProject, 
  onOpenAIExplainer 
}: { 
  onSelectProject: (p: Project) => void;
  onOpenAIExplainer?: (p: Project) => void;
}) {
  // Only show 2 featured projects on landing page
  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 2);

  return (
    <div id="projects" className="space-y-6">
      {/* ===== Section Header ===== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400">
            Featured Projects
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Things I&apos;ve Built
          </h2>
          <p className="text-sm text-neutral-400 font-sans max-w-lg leading-relaxed">
            A collection of projects I&apos;ve built to solve real-world problems using modern technologies.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c0e14] border border-[#1f2536] text-sm font-sans text-white font-medium hover:bg-[#111520] hover:border-white/25 transition-all shrink-0 w-fit"
        >
          <span>View all projects</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* ===== 2-Column Featured Project Cards ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {featuredProjects.map((project, idx) => {
          const projectNum = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group rounded-2xl bg-[#0c0e14] border border-[#1a1e2a] hover:border-neutral-600 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Card Top Bar: Number + Category + Featured Badge */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0c12] border-b border-[#161a29] text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 font-bold">{projectNum}</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#111520] border border-[#1f2536] text-[11px] text-neutral-300 font-medium">
                    {project.category}
                  </span>
                </div>
                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/15 text-[10px] text-white font-bold flex items-center gap-1.5">
                    <span>★</span> FEATURED
                  </span>
                )}
              </div>

              {/* Large Video / Image Preview with Play Button & Controls Bar */}
              <div className="relative w-full aspect-video bg-[#05070c] overflow-hidden group/video">
                {project.videoUrl ? (
                  <AutoplayVideoHero
                    src={project.videoUrl}
                    poster={project.image}
                  />
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0c0e14]/70 via-transparent to-transparent pointer-events-none"></div>

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                        <Play size={22} className="text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Video Controls Bar (decorative) */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/70 backdrop-blur-sm border-t border-white/5 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2.5">
                        <Play size={14} className="text-neutral-300" />
                        <span className="text-[11px] font-mono text-neutral-400">0:00 / 0:28</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Card Body: Title + Description + Tags + Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-sans leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags Row */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-[#111520] border border-[#1f2536] text-xs font-sans text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: View Live + GitHub Repo + Ask AI */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1a1e2a]">
                  <a
                    href={project.liveDemoUrl}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 rounded-xl bg-[#111520] border border-[#1f2536] text-xs font-sans text-neutral-200 font-medium flex items-center justify-center gap-1.5 hover:text-white hover:border-neutral-500 transition-all"
                  >
                    <span>View Live</span>
                    <ExternalLink size={13} />
                  </a>
                  <a
                    href={project.githubUrl}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 rounded-xl bg-[#111520] border border-[#1f2536] text-xs font-sans text-neutral-200 font-medium flex items-center justify-center gap-1.5 hover:text-white hover:border-neutral-500 transition-all"
                  >
                    <span>GitHub</span>
                    <GithubIcon size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAIExplainer?.(project);
                    }}
                    className="py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-sans text-white font-semibold flex items-center justify-center gap-1.5 hover:bg-white/20 hover:border-white/40 transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  >
                    <span>Ask AI</span>
                    <Sparkles size={13} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
