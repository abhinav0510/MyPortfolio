'use client';

import React, { useState } from 'react';
import { 
  Mail, MapPin, Phone, Send, ArrowRight, CheckCircle2, User, Tag, Pencil, ShieldCheck
} from 'lucide-react';
import { personalData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from './SocialIcons';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactList = [
    {
      id: 'location',
      label: 'LOCATION',
      value: personalData.location,
      icon: MapPin,
      href: '#'
    },
    {
      id: 'email',
      label: 'EMAIL',
      value: personalData.email,
      icon: Mail,
      href: `mailto:${personalData.email}`
    },
    {
      id: 'phone',
      label: 'PHONE',
      value: personalData.phone,
      icon: Phone,
      href: `tel:${personalData.phone}`
    },
    {
      id: 'telegram',
      label: 'TELEGRAM',
      value: personalData.telegram,
      icon: Send,
      href: `https://t.me/${personalData.telegram.replace('@', '')}`
    }
  ];

  return (
    <section id="contact" className="py-10 font-sans select-none">
      {/* Outer Card Container */}
      <div className="relative rounded-3xl bg-[#06080e]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Subtle dot matrix texture on bottom-left background */}
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[16px_16px] opacity-5 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column: Contact Header & Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Badge & Heading */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase">
                <span>LET'S CONNECT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_#ffffff]"></span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
                Let&apos;s build something <span className="text-neutral-300 font-bold">great together</span>
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                I&apos;m always open to discussing new opportunities, collaborations or just having a chat. Feel free to reach out anytime!
              </p>
            </div>

            {/* Contact Items List */}
            <div className="space-y-3 pt-1">
              {contactList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0a0c13] border border-white/5 hover:border-white/20 transition-all duration-300 group shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#111420] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase block">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-white font-sans">
                          {item.value}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#111420] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Media Links */}
            <div className="pt-2 space-y-3">
              <span className="text-xs text-neutral-400 font-sans font-medium block">
                Connect with me
              </span>
              <div className="flex items-center gap-2.5">
                <a 
                  href={personalData.socials.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-[#0a0c13] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a 
                  href={personalData.socials.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-[#0a0c13] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a 
                  href={personalData.socials.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-[#0a0c13] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all shadow-sm"
                  title="Twitter / X"
                >
                  <XIcon size={16} />
                </a>
                <a 
                  href={personalData.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-[#0a0c13] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all shadow-sm"
                  title="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form Box */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl bg-[#090b11] border border-white/10 p-6 sm:p-8 space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              
              {/* Form Box Header */}
              <div className="flex items-center gap-3.5 pb-2 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#121522] border border-white/10 flex items-center justify-center text-white">
                  <Send size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Send me a message
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans">
                    I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 size={48} className="text-white mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-white font-sans">Message Sent Successfully!</h3>
                  <p className="text-sm text-neutral-400 max-w-sm mx-auto font-sans">
                    Thank you for reaching out, Abhinav will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400">Your Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="text"
                          required
                          placeholder="Abhinav Srivastava"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05060a] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-400">Your Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                          type="email"
                          required
                          placeholder="abhinav@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05060a] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400">Subject</label>
                    <div className="relative">
                      <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Project Inquiry / Opportunity"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05060a] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-400">Your Message</label>
                    <div className="relative">
                      <Pencil size={16} className="absolute left-3.5 top-3 text-neutral-500" />
                      <textarea
                        rows={4}
                        required
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#05060a] border border-white/10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all font-sans resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
                  >
                    <Send size={16} className="text-black group-hover:translate-x-0.5 transition-transform" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>

                  {/* Privacy Subtext */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-sans pt-1">
                    <ShieldCheck size={14} className="text-neutral-400" />
                    <span>Your information is safe with me. I respect your privacy.</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
