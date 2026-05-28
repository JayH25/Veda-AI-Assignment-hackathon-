import { Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="text-gray-400">
           <span className="cursor-pointer hover:text-gray-600">←</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>⊞</span>
          <span>Assignment</span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
            JD
          </div>
          <span className="text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}