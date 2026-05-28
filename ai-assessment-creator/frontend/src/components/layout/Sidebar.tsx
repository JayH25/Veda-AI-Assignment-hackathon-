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
    <div className="w-64 h-screen border-r border-gray-200 bg-white flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
            <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white">V</div>
            VedaAI
          </div>
        </div>
        <div className="p-4">
          {/* Primary Action Button */}
        <div className="p-4">
          <Link href="/create" className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            <Plus size={18} />
            Create Assignment
          </Link>
        </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-4">
          
          {/* Real Link for Home */}
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
            <Home size={18} /> Home
          </Link>

          {/* Fake Button for My Groups */}
          <button 
            onClick={() => toast('👥 My Groups is coming soon in V2!')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Users size={18} /> My Groups
          </button>

          {/* Real Link for Assignments (Active State) */}
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-100 text-gray-900 transition-colors text-sm font-medium">
            <FileText size={18} /> Assignments
          </Link>

          {/* Fake Button for AI Toolkit */}
          <button 
            onClick={() => toast('✨ AI Toolkit is coming soon in V2!')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Wrench size={18} /> AI Teacher's Toolkit
          </button>

          {/* Fake Button for My Library */}
          <button 
            onClick={() => toast('📚 My Library is coming soon in V2!')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <BookOpen size={18} /> My Library
          </button>

        </nav>
      </div>
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
          <Settings size={18} />
          Settings
        </Link>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mt-2 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 border border-orange-200">
            DP
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">Delhi Public School</p>
            <p className="text-xs text-gray-500">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </div>
  );
}