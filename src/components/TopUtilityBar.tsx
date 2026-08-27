'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Command } from 'lucide-react';
import { personalData } from '@/data/portfolioData';

export default function TopUtilityBar() {
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

  return (
    <div className="w-full h-10 px-4 bg-[#08090c] border-b border-[#1a1d26] flex items-center justify-between text-xs font-mono text-neutral-400 select-none z-30">
      {/* Left: Welcome Tag */}
      <div className="flex items-center gap-2 text-neutral-400">
        <Command size={13} className="text-neutral-500" />
        <span className="tracking-widest uppercase text-[11px] text-neutral-400 font-semibold">WELCOME TO MY PORTFOLIO</span>
      </div>

      {/* Right: Location & Real-time Live Clock */}
      <div className="flex items-center gap-5 text-neutral-300">
        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
          <MapPin size={13} className="text-neutral-400" />
          <span>{personalData.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-white font-semibold">
          <Clock size={13} className="text-white animate-pulse" />
          <span>{timeString || '14:37:52 IST'}</span>
        </div>
      </div>
    </div>
  );
}
