'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, 
  Terminal, Copy, Check, RefreshCw, MessageSquareText
} from 'lucide-react';
import { Project } from '@/data/portfolioData';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

interface AIExplainerModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AIExplainerModal({ project, isOpen, onClose }: AIExplainerModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcript,
    setTranscript,
    isSpeaking,
    audioMuted,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    toggleMute
  } = useVoiceAssistant();

  // Sync transcript from voice recognition into input field
  useEffect(() => {
    if (transcript) {
      setInputQuery(transcript);
    }
  }, [transcript]);

  // Initial welcome message when modal opens with a project
  useEffect(() => {
    if (isOpen && project) {
      const initialMessage: Message = {
        id: 'welcome',
        sender: 'ai',
        text: `Greetings! I am the **AI System Architect** for **${project.title}**. Ask me technical questions about architecture, scaling, stack choices (${project.tags.join(', ')}), or use voice commands! 🎙️`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMessage]);
      setInputQuery('');
    } else {
      stopSpeaking();
    }
  }, [isOpen, project, stopSpeaking]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen || !project) return null;

  const handleSendQuery = async (queryToSend?: string) => {
    const finalQuery = (queryToSend || inputQuery).trim();
    if (!finalQuery || isLoading) return;

    // Stop listening if active
    if (isListening) stopListening();

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: finalQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setTranscript('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/project-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          prompt: finalQuery,
          messages: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
        })
      });

      const data = await res.json();
      const aiReply = data.reply || "I couldn't process that technical query right now. Please try again.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Auto speak AI voice response if not muted
      speakText(aiReply);

    } catch (err) {
      console.error('Failed to get AI explanation:', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'System connection error. Unable to contact AI Explainer engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const presetQuestions = project.aiContext?.suggestedQuestions || [
    '⚡ How does this system scale?',
    '🛠️ What were the major technical challenges?',
    '💼 Summarize in 3 sentences for a Recruiter',
    '🔒 System design & architecture breakdown'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in font-sans select-none">
      
      {/* Main Glass Modal Window */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#080a10] border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d0f18] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <Sparkles size={18} className="animate-spin-slow text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  AI Architecture Copilot
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-neutral-300">
                  {project.title}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                Voice & Text Cross-Questioning System
              </p>
            </div>
          </div>

          {/* Header Action Controls (Voice Visualizer, Mute, Close) */}
          <div className="flex items-center gap-3">
            
            {/* Audio Waveform Equalizer Visualizer */}
            {isSpeaking && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                <span className="w-1 h-3 bg-white animate-bounce"></span>
                <span className="w-1 h-4 bg-white animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-1 h-2 bg-white animate-bounce [animation-delay:0.3s]"></span>
                <span className="w-1 h-3.5 bg-white animate-bounce [animation-delay:0.45s]"></span>
                <span className="text-[10px] font-mono text-white ml-1">AI Speaking</span>
              </div>
            )}

            {/* Mute/Unmute Voice Audio Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border transition-all ${
                audioMuted 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
              }`}
              title={audioMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            >
              {audioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                if (isListening) stopListening();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Chat Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-[#05060b]">
          
          {/* Preset Suggested Question Chips */}
          <div className="space-y-2 pb-2">
            <span className="text-[11px] font-mono text-neutral-400 tracking-wider uppercase block">
              Suggested Technical Queries:
            </span>
            <div className="flex flex-wrap gap-2">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuery(q)}
                  className="px-3 py-1.5 rounded-xl bg-[#0e111a] border border-white/10 hover:border-white/30 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-all text-left shadow-sm flex items-center gap-1.5"
                >
                  <span>{q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Avatar Icon */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-[#121522] border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Terminal size={15} />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1.5 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-white text-black font-medium rounded-tr-none'
                      : 'bg-[#0d1019] border border-white/10 text-neutral-200 rounded-tl-none font-sans'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-neutral-400 pb-1 border-b border-white/5">
                    <span className={msg.sender === 'user' ? 'text-black/70 font-semibold' : 'text-neutral-400'}>
                      {msg.sender === 'user' ? 'YOU (VOICE/TEXT)' : 'AI SYSTEM ARCHITECT'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'ai' && (
                        <button
                          onClick={() => handleCopyText(msg.text, index)}
                          className="hover:text-white transition-colors"
                          title="Copy explanation"
                        >
                          {copiedIndex === index ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Body Content */}
                  <div className="whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <MessageSquareText size={15} />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#121522] border border-white/10 flex items-center justify-center text-white shrink-0">
                  <RefreshCw size={14} className="animate-spin text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#0d1019] border border-white/10 p-3.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span className="text-xs font-mono text-neutral-400">Analyzing architecture & generating response...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

        </div>

        {/* Input Controls Bar (Mic + Text Input + Send) */}
        <div className="p-4 bg-[#0c0e17] border-t border-white/10 space-y-2">
          
          {/* Live Voice Recording Indicator */}
          {isListening && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Listening for voice command... Speak now!</span>
              </div>
              <button
                onClick={stopListening}
                className="text-[10px] underline hover:text-white"
              >
                Stop Listening
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            
            {/* Microphone Voice Command Trigger Button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse'
                  : 'bg-[#121522] border-white/10 text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/5'
              }`}
              title={isListening ? 'Stop Voice Recording' : 'Start Voice Command (Speech-to-Text)'}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Input Text Box */}
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : "Ask a technical or architecture question..."}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendQuery();
                }
              }}
              className="flex-1 px-4 py-3 rounded-xl bg-[#05060b] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all font-sans"
            />

            {/* Submit Send Button */}
            <button
              type="button"
              onClick={() => handleSendQuery()}
              disabled={!inputQuery.trim() || isLoading}
              className="px-4 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <span>Ask</span>
              <Send size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
