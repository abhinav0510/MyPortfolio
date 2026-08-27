'use client';

import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPostsData } from '@/data/portfolioData';

export default function BlogSection() {
  return (
    <section id="blog" className="py-10 space-y-8 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Articles & Insights
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            Thoughts on web architecture, Next.js performance optimization, and AI integrations.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPostsData.map((post) => (
          <article
            key={post.id}
            className="p-6 rounded-2xl bg-[#12141c] border border-white/10 hover:border-white/25 transition-all duration-200 flex flex-col justify-between space-y-4 group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white">
              <span>Read Full Article</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
