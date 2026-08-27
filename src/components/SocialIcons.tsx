import React from 'react';

export function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
  );
}

export function LinkedinIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

export function XIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

/* Brand Icons for Tech Stack */
export function ReactLogo({ size = 16, className = "text-cyan-400" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function NextLogo({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`w-4 h-4 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-[10px] leading-none ${className}`}>
      N
    </div>
  );
}

export function TSLogo({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`w-4 h-4 rounded bg-blue-600 text-white font-extrabold flex items-center justify-center text-[9px] leading-none font-mono ${className}`}>
      TS
    </div>
  );
}

export function NodeLogo({ size = 16, className = "text-white" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1v7.2L12 19.7 4.5 15.6V8.4L12 4.3z" />
    </svg>
  );
}

export function SpringLogo({ size = 16, className = "text-white" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm-1 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

export function PostgresLogo({ size = 16, className = "text-blue-400" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm0 14c-3.87 0-6-1.34-6-2v-2.3c1.44.82 3.6 1.3 6 1.3s4.56-.48 6-1.3V17c0 .66-2.13 2-6 2z" />
    </svg>
  );
}

export function TailwindLogo({ size = 16, className = "text-sky-400" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 6c-3.3 0-5.3 1.6-6 4.9 1.3-1.6 2.8-2.1 4.5-1.5 1 0.4 1.8 1.2 2.6 2.1 1.3 1.4 2.8 3 6.4 3 3.3 0 5.3-1.6 6-4.9-1.3 1.6-2.8 2.1-4.5 1.5-1-0.4-1.8-1.2-2.6-2.1-1.3-1.4-2.8-3-6.4-3zm-6 6c-3.3 0-5.3 1.6-6 4.9 1.3-1.6 2.8-2.1 4.5-1.5 1 0.4 1.8 1.2 2.6 2.1 1.3 1.4 2.8 3 6.4 3 3.3 0 5.3-1.6 6-4.9-1.3 1.6-2.8 2.1-4.5 1.5-1-0.4-1.8-1.2-2.6-2.1-1.3-1.4-2.8-3-6.4-3z" />
    </svg>
  );
}

export function DockerLogo({ size = 16, className = "text-blue-400" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.9 11h2.4v2.3h-2.4V11zm-3.1 0h2.4v2.3h-2.4V11zm-3.1 0h2.4v2.3H7.7V11zm-3.1 0h2.4v2.3H4.6V11zm6.2-3.1h2.4v2.3h-2.4V7.9zm-3.1 0h2.4v2.3H7.7V7.9zm6.2-3.1h2.4v2.3h-2.4V4.8zM2 15.6c.5 3.5 3.5 6.4 7.2 6.4 4.8 0 8.8-3.9 8.8-8.7V12h3c.6 0 1-.4 1-1s-.4-1-1-1h-3.4c-.6 0-1 .4-1 1v.3C15.6 10 14 9 12 9H2v6.6z" />
    </svg>
  );
}

export function AWSLogo({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`px-1 py-0.5 rounded bg-amber-500/20 text-amber-400 font-extrabold text-[9px] font-mono leading-none border border-amber-500/30 ${className}`}>
      AWS
    </div>
  );
}

export function GitLogo({ size = 16, className = "text-orange-500" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2.6 10.6L11.4 1.8c.8-.8 2-.8 2.8 0l8 8c.8.8.8 2 0 2.8l-8.8 8.8c-.8.8-2 .8-2.8 0l-8-8c-.8-.8-.8-2 0-2.8zm11 7.2c.4-.2.7-.6.7-1.1v-2.3c.7-.3 1.2-1 1.2-1.8 0-1.1-.9-2-2-2-.5 0-1 .2-1.3.5l-2.2-2.2v-.8c.5-.3.8-.8.8-1.4 0-1.1-.9-2-2-2s-2 .9-2 2c0 .6.3 1.1.8 1.4v4.5c-.5.3-.8.8-.8 1.4 0 1.1.9 2 2 2 .5 0 1-.2 1.3-.5l2.1 2.1z" />
    </svg>
  );
}
