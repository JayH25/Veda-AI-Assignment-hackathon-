"use client";

import Link from 'next/link';
import { Home, Users, FileText, Wrench, BookOpen, Plus, Bell, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
// ... rest of your code

export default function Sidebar() {
  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'My Groups', icon: Users, href: '#' },
    { name: 'Assignments', icon: FileText, href: '/', active: true },
    { name: "AI Teacher's Toolkit", icon: Wrench, href: '#' },
    { name: 'My Library', icon: BookOpen, href: '#' },
  ];

  return (
    <div className="w-64 h-screen border-r border-border bg-card flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="h-20 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-2 font-black text-2xl text-foreground tracking-tighter">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              V
            </div>
            VedaAI
          </div>
        </div>
        
        <div className="p-4">
          <Link href="/" className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
            <Plus size={18} />
            New Assessment
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1.5 mt-2">
          
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-sm font-bold group">
            <Home size={18} className="group-hover:text-primary transition-colors" /> Home
          </Link>

          <button 
            onClick={() => toast('👥 My Groups is coming soon in V2!')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-sm font-bold group"
          >
            <Users size={18} className="group-hover:text-primary transition-colors" /> My Groups
          </button>

          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 text-primary transition-all text-sm font-black border border-primary/10">
            <FileText size={18} /> Assignments
          </Link>

          <button 
            onClick={() => toast('✨ AI Toolkit is coming soon in V2!')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-sm font-bold group"
          >
            <Wrench size={18} className="group-hover:text-primary transition-colors" /> AI Toolkit
          </button>

          <button 
            onClick={() => toast('📚 My Library is coming soon in V2!')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all text-sm font-bold group"
          >
            <BookOpen size={18} className="group-hover:text-primary transition-colors" /> My Library
          </button>

        </nav>
      </div>

      <div className="p-4 border-t border-border space-y-3">
        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground rounded-2xl hover:bg-secondary transition-all">
          <Settings size={18} />
          Settings
        </Link>
        <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl cursor-pointer hover:shadow-md transition-all border border-border group">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary border border-primary/20 group-hover:scale-110 transition-transform">
            DP
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black text-foreground truncate leading-none mb-1">Delhi Public School</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </div>
  );
}