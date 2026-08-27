'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Star, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { projectsData, Project } from '@/data/portfolioData';
import { GithubIcon } from './SocialIcons';

/** Video component that auto-plays when scrolled into view */
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

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [starredProjects, setStarredProjects] = useState<Record<string, boolean>>({
    'heal-me': true,
    'job-tracker': true,
    'resume-analyzer': true
  });

  const categories = ['All', 'Full Stack', 'AI/ML', 'Backend', 'Tools', 'Web Apps'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="projects" className="space-y-4 pt-4 border-t border-[#1a1d26]">
      {/* Cockpit Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono select-none">
        <div className="flex items-center gap-2">
          <h2 className="text-xs uppercase font-extrabold text-white tracking-widest">
          PROJECTS
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-1 rounded-lg text-[11px] font-mono transition-all duration-150 whitespace-nowrap
                ${selectedCategory === cat
                  ? 'bg-neutral-200 text-black font-bold shadow-sm'
                  : 'bg-[#0d0e14] text-neutral-400 hover:text-white border border-[#1a1d26]'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <a href="#projects" className="text-xs font-mono text-neutral-400 hover:text-white transition-colors hidden xl:flex items-center gap-1">
          <span>View all projects</span>
          <ChevronRight size={14} />
        </a>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredProjects.map((project, idx) => {
          const isStarred = !!starredProjects[project.id];
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group rounded-2xl bg-[#090a0e] border border-[#1a1d26] hover:border-white/20 overflow-hidden transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              {/* Image Preview & Featured Tag */}
              <div className="relative w-full h-36 bg-[#0f111a] overflow-hidden">
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
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#090a0e] via-transparent to-black/40"></div>
                
                {/* Featured Badge */}
                {idx === 0 && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono text-white flex items-center gap-1">
                    <span className="text-amber-400">❖</span> Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-mono">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors font-sans">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#121520] border border-white/10 text-[10px] font-mono text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer Links matching Mockup */}
                <div className="flex items-center justify-between pt-2.5 border-t border-[#161822] text-[11px]">
                  <a
                    href={project.liveDemoUrl}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={11} />
                  </a>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon size={13} />
                    </a>

                    <button
                      onClick={(e) => toggleStar(project.id, e)}
                      className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition-colors"
                    >
                      <Star size={12} className={isStarred ? 'fill-amber-400 text-amber-400' : ''} />
                      <span className="text-[10px] font-mono">{project.stars || '128'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
