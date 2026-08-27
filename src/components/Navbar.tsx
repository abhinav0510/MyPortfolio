'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, User, FolderKanban, Cpu, Briefcase, GraduationCap, 
  BookOpen, Mail, Menu, X, Check, MapPin, Clock, Command
} from 'lucide-react';
import { personalData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, XIcon } from './SocialIcons';

import { useRouter, usePathname } from 'next/navigation';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  activeSection,
  setActiveSection
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeString(`${now.toLocaleTimeString('en-US', options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    if (id === 'projects') {
      router.push('/projects');
      return;
    }
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header className="sticky top-2 z-50 w-full max-w-[1600px] mx-auto px-3 sm:px-6 select-none font-mono">
      {/* Outer Floating Glass Box */}
      <div className="relative rounded-2xl bg-[#080c16]/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)] p-2.5 sm:p-3 space-y-2.5 overflow-hidden">
        {/* Subtle white glow top line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-white/10 via-white/30 to-white/10"></div>

        {/* Row 1: Top Utility Status Line */}
        <div className="flex items-center justify-between px-2 text-xs font-mono">
          {/* Left: Command icon + WELCOME TO MY PORTFOLIO */}
          <div className="flex items-center gap-2 text-neutral-300">
            <Command size={13} className="text-neutral-400" />
            <span className="tracking-widest uppercase text-[10px] sm:text-xs font-semibold">
              WELCOME TO <span className="text-white font-bold">MY</span> <span className="text-white font-bold">PORTFOLIO</span>
            </span>
          </div>

          {/* Right: Location & Real-time Live Clock */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <MapPin size={12} className="text-neutral-400" />
              <span>{personalData.location}</span>
            </div>
            <span className="text-neutral-600">|</span>
            <div className="flex items-center gap-1.5 text-white font-bold tracking-wide">
              <Clock size={12} className="text-white animate-pulse" />
              <span>{timeString || '10:05:01 IST'}</span>
            </div>
          </div>
        </div>

        {/* Row 2: Inset Main Navigation Bar */}
        <div className="relative rounded-xl sm:rounded-2xl bg-[#0d1222]/80 border border-white/10 p-1.5 sm:p-2 flex items-center justify-between gap-2 shadow-inner">
          {/* Left: Avatar AS badge + Full Name */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-extrabold text-white text-xs sm:text-sm tracking-wider shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:border-white/40 transition-all">
                {personalData.initials}
              </div>
              <span className="font-extrabold text-white text-xs sm:text-sm font-sans tracking-tight whitespace-nowrap group-hover:text-neutral-300 transition-colors">
                {personalData.name}
              </span>
            </button>
          </div>

          {/* Center Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 relative whitespace-nowrap
                    ${isActive 
                      ? 'bg-white/10 text-white font-bold border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'}
                  `}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-neutral-400'} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] inline-block ml-0.5 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Social Action Links */}
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-px bg-white/15 mx-1 hidden lg:block"></div>
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
              <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all shadow-sm" title="GitHub">
                <GithubIcon size={14} />
              </a>
              <a href={personalData.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all shadow-sm" title="LinkedIn">
                <LinkedinIcon size={14} />
              </a>
              <a href={personalData.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all shadow-sm" title="Twitter / X">
                <XIcon size={13} />
              </a>
              <button onClick={copyEmail} className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all shadow-sm" title="Copy Email">
                {copiedEmail ? <Check size={14} className="text-white" /> : <Mail size={14} />}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:border-white/25 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden rounded-xl bg-[#0d1222] border border-white/10 p-3 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
            <nav className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all
                      ${isActive 
                        ? 'bg-white/10 text-white border border-white/25 font-bold' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Connect Social Row */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-around text-neutral-400">
              <a href={personalData.socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-white">
                <GithubIcon size={14} />
              </a>
              <a href={personalData.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-white">
                <LinkedinIcon size={14} />
              </a>
              <a href={personalData.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-white">
                <XIcon size={13} />
              </a>
              <button onClick={copyEmail} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-white">
                {copiedEmail ? <Check size={14} className="text-white" /> : <Mail size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
