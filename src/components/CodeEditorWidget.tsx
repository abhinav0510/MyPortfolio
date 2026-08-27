'use client';

import React, { useState } from 'react';
import { Copy, Check, Minus, X } from 'lucide-react';

interface CodeSnippet {
  filename: string;
  language: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    filename: 'main.js',
    language: 'javascript',
    code: `import React from 'react';

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h1>Building digital
        products, brands and
        experiences.</h1>
      <p>Clean code. Scalable systems.</p>
      <p>Impactful solutions.</p>
    </div>
  );
}

export default Portfolio;`
  },
  {
    filename: 'skills.ts',
    language: 'typescript',
    code: `interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
}

export const stack: TechStack = {
  frontend: ["Next.js", "React", "TypeScript", "Tailwind"],
  backend: ["Node.js", "Express", "Spring Boot"],
  database: ["PostgreSQL", "MongoDB", "MySQL"]
};`
  },
  {
    filename: 'about.md',
    language: 'markdown',
    code: `# Abhinav Srivastava
Full Stack Developer

- Location: Delhi, India
- Experience: 1+ Years
- Core Stack: Next.js, Spring Boot, React
- Status: Available for opportunities`
  }
];

export default function CodeEditorWidget() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSnippet = snippets[activeTab];

  const renderSyntaxLine = (line: string) => {
    if (line.startsWith('import')) {
      return (
        <>
          <span className="text-purple-400">import </span>
          <span className="text-blue-300">React </span>
          <span className="text-purple-400">from </span>
          <span className="text-neutral-200">'react'</span>
          <span className="text-neutral-400">;</span>
        </>
      );
    }
    if (line.includes('const Portfolio')) {
      return (
        <>
          <span className="text-purple-400">const </span>
          <span className="text-amber-300">Portfolio </span>
          <span className="text-purple-400">= () =&gt; {'{'}</span>
        </>
      );
    }
    if (line.includes('export default')) {
      return (
        <>
          <span className="text-purple-400">export default </span>
          <span className="text-blue-300">Portfolio</span>
          <span className="text-neutral-400">;</span>
        </>
      );
    }
    if (line.includes('return (') || line.trim() === '};' || line.trim() === '}') {
      return <span className="text-purple-400">{line}</span>;
    }
    if (line.includes('<') && line.includes('>')) {
      return line.split(/(<[^>]+>)/g).map((part, i) => {
        if (part.startsWith('<') && part.endsWith('>')) {
          return <span key={i} className="text-cyan-400">{part}</span>;
        }
        return <span key={i} className="text-sky-200">{part}</span>;
      });
    }
    return <span className="text-neutral-300">{line}</span>;
  };

  return (
    <div className="w-full rounded-xl bg-[#090a0e] border border-[#1a1d26] overflow-hidden transition-all hover:border-[#2a3045]">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d0f16] border-b border-[#1a1d26] select-none">
        {/* Left: traffic lights + file tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 inline-block"></span>
          </div>

          <div className="flex items-center gap-0.5 overflow-x-auto">
            {snippets.map((snip, index) => (
              <button
                key={snip.filename}
                onClick={() => setActiveTab(index)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors
                  ${activeTab === index 
                    ? 'bg-[#090a0e] text-white border border-[#22262f]' 
                    : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {snip.filename}
              </button>
            ))}
          </div>
        </div>

        {/* Right: copy + window controls */}
        <div className="flex items-center gap-2 text-neutral-500">
          <button onClick={handleCopy} className="hover:text-white transition-colors" title="Copy">
            {copied ? <Check size={13} className="text-white" /> : <Copy size={13} />}
          </button>
          <Minus size={13} className="hover:text-white cursor-pointer" />
          <X size={13} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Code Content */}
      <div className="p-3 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto bg-[#07080b] text-neutral-300 min-h-55">
        <table className="w-full border-collapse">
          <tbody>
            {currentSnippet.code.split('\n').map((line, idx) => (
              <tr key={idx} className="hover:bg-white/1.5">
                <td className="w-7 select-none text-neutral-600 text-right pr-3 text-[11px] font-mono align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono">
                  {renderSyntaxLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terminal status line */}
      <div className="px-3 py-2 bg-[#050608] border-t border-[#1a1d26] font-mono text-[11px] text-white flex items-center gap-1.5">
        <span className="text-neutral-500">&gt;</span>
        <span>abhinav@portfolio:~ $ Building the future...</span>
        <span className="w-1.5 h-3 bg-white inline-block animate-pulse"></span>
      </div>
    </div>
  );
}
